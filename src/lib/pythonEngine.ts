/**
 * Pyodide In-Browser WebAssembly Python Engine
 * Executes Python 3, pandas, numpy, and matplotlib client-side with zero backend dependencies.
 */

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<any>;
  }
}

let pyodideInstance: any = null;
let isInitializing = false;
let initPromise: Promise<any> | null = null;

export const SEED_CSVS = {
  'customers.csv': `customer_id,first_name,last_name,email,city,signup_date
1,Alice,Morgan,alice.m@gmail.com,New York,2023-01-15
2,Bob,Stone,bob.stone@yahoo.com,Chicago,2023-02-20
3,Charlie,Kim,,San Francisco,2023-03-10
4,Diana,Prince,diana.p@gmail.com,Austin,2023-04-05
5,Evan,Wright,,Seattle,2023-04-12
6,Fiona,Gallagher,fiona.g@hotmail.com,Boston,2023-05-01
7,Bob,Stone,bob.stone@yahoo.com,Chicago,2023-05-18
8,George,Miller,,Denver,2023-06-22
9,Hannah,Abbott,hannah.a@gmail.com,Dallas,2023-07-04
10,Ian,Malcolm,ian.m@jurassic.org,Orlando,2023-08-11`,

  'products.csv': `product_id,product_name,category,price
101,Mechanical Keyboard Pro,Electronics,149.99
102,4K Ultra-wide Monitor,Electronics,499.99
103,Ergonomic Desk Chair,Furniture,299.50
104,Standing Desk Converter,Furniture,199.00
105,Noise-canceling Headset,Audio,179.99
106,Titanium Coffee Mug,Kitchen,45.00
107,Vintage Desk Lamp,Furniture,55.00
108,USB-C Thunderbolt Dock,Electronics,129.00`,

  'sales.csv': `sale_id,customer_id,product_id,region,sale_amount,sale_date
1001,1,101,East,149.99,2024-01-10
1002,1,102,East,499.99,2024-01-22
1003,2,103,Midwest,299.50,2024-01-25
1004,3,105,West,179.99,2024-02-03
1005,4,102,South,499.99,2024-02-14
1006,1,108,East,129.00,2024-02-18
1007,6,101,East,149.99,2024-03-01
1008,9,103,South,299.50,2024-03-12
1009,10,104,South,199.00,2024-03-20
1010,4,105,South,179.99,2024-04-05
1011,2,108,Midwest,129.00,2024-04-19
1012,1,104,East,199.00,2024-05-02
1013,10,102,South,499.99,2024-05-15
1014,6,105,East,179.99,2024-05-28`,

  'employees.csv': `employee_id,name,department_id,salary,hire_date
201,Amaya Balion,10,135000,2021-03-15
202,Marcus Vance,10,110000,2022-06-01
203,Elena Rostova,10,95000,2023-01-10
204,David Chen,20,140000,2020-08-20
205,Sarah Jenkins,20,125000,2021-11-15
206,Priya Patel,20,160000,2019-04-01
207,Liam O'Connor,30,85000,2023-09-01
208,Zoe Washington,30,105000,2022-02-15`,

  'departments.csv': `department_id,department_name
10,Data Engineering
20,Platform Infra
30,Product Analytics`,

  'brics.csv': `country_code,country,capital,area,population
BR,Brazil,Brasilia,8.516,200.4
RU,Russia,Moscow,17.100,143.5
IN,India,New Delhi,3.286,1252.0
CH,China,Beijing,9.597,1357.0
SA,South Africa,Pretoria,1.221,52.98`
};

export interface PythonExecutionResult {
  stdout: string;
  error?: string;
  dataframe?: {
    columns: string[];
    values: any[][];
    shape: [number, number];
  };
  plots: string[]; // base64 encoded pngs
  executionTimeMs: number;
}

/**
 * Initializes Pyodide runtime and pre-loads packages + seed CSV files
 */
export async function initPyodide(
  onProgress?: (status: string) => void
): Promise<any> {
  if (pyodideInstance) {
    return pyodideInstance;
  }

  if (isInitializing && initPromise) {
    return initPromise;
  }

  isInitializing = true;

  initPromise = (async () => {
    try {
      onProgress?.('Loading WebAssembly Python runtime...');
      if (!window.loadPyodide) {
        throw new Error(
          'Pyodide script not loaded. Check internet connection or index.html script tag.'
        );
      }

      const pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
      });

      onProgress?.('Loading pandas, numpy, and matplotlib...');
      await pyodide.loadPackage(['numpy', 'pandas', 'matplotlib']);

      onProgress?.('Mounting datasets (sales.csv, customers.csv, etc.)...');
      // Mount CSV files into Pyodide virtual filesystem
      for (const [filename, content] of Object.entries(SEED_CSVS)) {
        pyodide.FS.writeFile(filename, content);
      }

      // Configure matplotlib non-interactive backend
      await pyodide.runPythonAsync(`
import matplotlib
matplotlib.use('Agg')
import io, base64
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
`);

      pyodideInstance = pyodide;
      onProgress?.('Python engine ready!');
      return pyodide;
    } catch (err) {
      console.error('Failed to init Pyodide:', err);
      throw err;
    } finally {
      isInitializing = false;
    }
  })();

  return initPromise;
}

/**
 * Executes Python code, captures stdout, plots, and DataFrame representations
 */
export async function executePythonCode(code: string): Promise<PythonExecutionResult> {
  const startTime = performance.now();
  const pyodide = await initPyodide();

  // Python wrapper script to safely capture stdout, figures, and dataframes
  const runnerScript = `
import sys
import io
import json
import base64
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

__stdout_capture = io.StringIO()
sys.stdout = __stdout_capture

__exec_error = None
__dataframe_output = None
__plots_output = []

try:
    # Clear any previous figures
    plt.close('all')

    # Execute user code in a dedicated globals dict
    __user_globals = {
        'pd': pd,
        'np': np,
        'plt': plt
    }
    
    # Run user script
    exec("""${code.replace(/\\/g, '\\\\').replace(/"""/g, '\\"\\"\\"')}""", __user_globals)

    # Check for any generated matplotlib plots
    for __fig_num in plt.get_fignums():
        __fig = plt.figure(__fig_num)
        __buf = io.BytesIO()
        __fig.savefig(__buf, format='png', bbox_inches='tight', dpi=100)
        __buf.seek(0)
        __plots_output.append(base64.b64encode(__buf.read()).decode('utf-8'))
    plt.close('all')

    # Look for any DataFrame in user variables
    for __var_name, __var_val in reversed(list(__user_globals.items())):
        if isinstance(__var_val, pd.DataFrame) and not __var_name.startswith('_'):
            __dataframe_output = {
                'columns': [str(c) for c in __var_val.columns],
                'values': __var_val.head(50).fillna('NULL').astype(str).values.tolist(),
                'shape': list(__var_val.shape)
            }
            break
        elif isinstance(__var_val, pd.Series) and not __var_name.startswith('_'):
            __df = __var_val.to_frame()
            __dataframe_output = {
                'columns': [str(c) for c in __df.columns],
                'values': __df.head(50).fillna('NULL').astype(str).values.tolist(),
                'shape': list(__df.shape)
            }
            break

except Exception as __e:
    __exec_error = str(__e)

finally:
    sys.stdout = sys.__stdout__

__output_json = json.dumps({
    'stdout': __stdout_capture.getvalue(),
    'error': __exec_error,
    'dataframe': __dataframe_output,
    'plots': __plots_output
})
__output_json
`;

  try {
    const rawResultJson = await pyodide.runPythonAsync(runnerScript);
    const parsed = JSON.parse(rawResultJson);
    const endTime = performance.now();

    return {
      stdout: parsed.stdout || '',
      error: parsed.error || undefined,
      dataframe: parsed.dataframe || undefined,
      plots: parsed.plots || [],
      executionTimeMs: Math.round((endTime - startTime) * 10) / 10
    };
  } catch (err: any) {
    const endTime = performance.now();
    return {
      stdout: '',
      error: err.message || 'Execution error',
      plots: [],
      executionTimeMs: Math.round((endTime - startTime) * 10) / 10
    };
  }
}

/**
 * Validates Python student submission against an expected query/assert script
 */
export async function validatePythonSubmission(
  userCode: string,
  validationTestScript: string
): Promise<{ passed: boolean; message: string; userResult: PythonExecutionResult }> {
  // First, run user code
  const userResult = await executePythonCode(userCode);
  if (userResult.error) {
    return {
      passed: false,
      message: `Syntax or Runtime Error: ${userResult.error}`,
      userResult
    };
  }

  // Next, run user code followed by assertions
  const fullValidationCode = `
${userCode}

# --- VALIDATION ASSERTIONS ---
${validationTestScript}
`;

  const validationResult = await executePythonCode(fullValidationCode);
  if (validationResult.error) {
    // AssertionError or failure
    const cleanMsg = validationResult.error
      .replace(/^AssertionError:\s*/i, '')
      .replace(/^Exception:\s*/i, '');
    return {
      passed: false,
      message: cleanMsg || 'Output did not match expected solution requirements.',
      userResult
    };
  }

  return {
    passed: true,
    message: 'All automated assertions passed! Excellent Python implementation.',
    userResult
  };
}
