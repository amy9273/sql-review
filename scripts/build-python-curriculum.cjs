const fs = require('fs');
const path = require('path');

const tabs = JSON.parse(fs.readFileSync(path.resolve('scripts/extracted_doc_tabs.json'), 'utf8'));

const MODULES = [
  {
    id: 1,
    title: 'Part 1: Python & NumPy Foundations',
    description: 'Learn variables, lists, slicing, functions, methods, packages, and master NumPy arrays and vectorization.'
  },
  {
    id: 2,
    title: 'Part 2: Intermediate Python & Visualizations',
    description: 'Master Matplotlib plots & histograms, dictionaries, pandas Series/DataFrames, boolean filtering, and loops.'
  },
  {
    id: 3,
    title: 'Part 3: Data Manipulation with pandas',
    description: 'Explore DataFrames, sorting, new columns, summary statistics, groupby aggregations, pivot tables, and missing values.'
  },
  {
    id: 4,
    title: 'Part 4: Relational Data & Joining with pandas',
    description: 'Connect datasets with inner, left, outer, and self joins, vertical concatenations, integrity checks, and ordered merges.'
  }
];

// Helper to clean and format paragraphs
function parseContentToSections(content, tabTitle) {
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  const sections = [];
  let currentTitle = tabTitle;
  let currentBody = [];
  let currentExample = '';

  for (const line of lines) {
    if (line.startsWith('#') || (line.length < 50 && line.endsWith(':') && !line.includes('('))) {
      if (currentBody.length > 0) {
        sections.push({
          title: currentTitle,
          body: currentBody.join('\n\n'),
          exampleCode: currentExample || undefined
        });
        currentBody = [];
        currentExample = '';
      }
      currentTitle = line.replace(/^[#:\s]+|[#:\s]+$/g, '');
    } else if (line.startsWith('import ') || line.startsWith('df.') || line.includes(' = ') || line.startsWith('plt.')) {
      currentExample = currentExample ? currentExample + '\n' + line : line;
      currentBody.push(`\`${line}\``);
    } else {
      currentBody.push(line);
    }
  }

  if (currentBody.length > 0) {
    sections.push({
      title: currentTitle,
      body: currentBody.join('\n\n'),
      exampleCode: currentExample || undefined
    });
  }

  if (sections.length === 0) {
    sections.push({
      title: tabTitle,
      body: content,
      exampleCode: undefined
    });
  }

  return sections;
}

// Generate tailored coding challenges for key lessons
function getLessonChallenge(title, parentModule, lessonIndex) {
  const cleanTitle = title.toLowerCase();

  if (cleanTitle.includes('numpy array') || cleanTitle.includes('numpy overview')) {
    return {
      title: 'Vectorized Price Inflation Calculator',
      scenario: 'The pricing operations team wants to simulate a 10% inflation increase across product prices without using slow Python loops.',
      instructions: 'Given a NumPy array of product prices `prices = np.array([149.99, 499.99, 299.50, 199.00, 179.99])`, calculate `inflated_prices` by multiplying the array by 1.10 and round to 2 decimal places using `np.round()`. Print `inflated_prices`.',
      starterCode: `import numpy as np

prices = np.array([149.99, 499.99, 299.50, 199.00, 179.99])

# Calculate 10% inflated prices using vectorization and round to 2 decimal places
inflated_prices = None

print(inflated_prices)
`,
      expectedCode: `import numpy as np

prices = np.array([149.99, 499.99, 299.50, 199.00, 179.99])
inflated_prices = np.round(prices * 1.10, 2)
print(inflated_prices)
`,
      validationScript: `assert 'inflated_prices' in locals(), "Variable 'inflated_prices' must be defined"
assert np.allclose(inflated_prices, np.round(prices * 1.10, 2)), "inflated_prices values are incorrect"
`,
      hints: [
        'NumPy arrays support element-wise math directly: prices * 1.10.',
        'Use np.round(prices * 1.10, 2) to round to two decimal places.',
        'Print the resulting array.'
      ],
      solutionExplanation: 'NumPy performs vectorized operations across C-level memory buffers without Python loop overhead, scaling effortlessly to millions of rows.'
    };
  }

  if (cleanTitle.includes('plot') || cleanTitle.includes('matplotlib') || cleanTitle.includes('histogram')) {
    return {
      title: 'Visualize Sales Distribution',
      scenario: 'The marketing analytics team needs a histogram visualization of order amounts to understand customer spending buckets.',
      instructions: 'Using pandas and matplotlib, read `sales.csv`. Plot a histogram of the `sale_amount` column with `bins=5`. Set the title to "Sales Distribution" and xlabel to "Order Amount ($)". Display the plot using `plt.show()`.',
      starterCode: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('sales.csv')

# Plot a histogram of sale_amount with 5 bins
# Add title and xlabel, then call plt.show()
`,
      expectedCode: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('sales.csv')
plt.hist(df['sale_amount'], bins=5, edgecolor='black')
plt.title('Sales Distribution')
plt.xlabel('Order Amount ($)')
plt.show()
`,
      validationScript: `assert 'df' in locals(), "DataFrame 'df' must be loaded"
assert len(df) == 14, "sales.csv should contain 14 rows"
`,
      hints: [
        "Use df = pd.read_csv('sales.csv') to read the dataset.",
        "Call plt.hist(df['sale_amount'], bins=5).",
        "Add plt.title('Sales Distribution') and plt.xlabel('Order Amount ($)')."
      ],
      solutionExplanation: 'Histograms divide continuous numeric data into frequency bins, allowing data engineers to quickly spot skewness and outliers.'
    };
  }

  if (cleanTitle.includes('loc') || cleanTitle.includes('iloc') || cleanTitle.includes('pandas - 2')) {
    return {
      title: 'Targeted Country Subsetting with loc',
      scenario: 'The trade strategy department needs to inspect the capital and population for Brazil (BR) and China (CH) from the BRICS dataset.',
      instructions: "Load `brics.csv` with `index_col='country_code'`. Use `.loc` to select the rows for `['BR', 'CH']` and the columns `['capital', 'population']`. Assign to `subset_df` and print it.",
      starterCode: `import pandas as pd

brics = pd.read_csv('brics.csv', index_col='country_code')

# Select BR and CH with columns capital and population using .loc
subset_df = None

print(subset_df)
`,
      expectedCode: `import pandas as pd

brics = pd.read_csv('brics.csv', index_col='country_code')
subset_df = brics.loc[['BR', 'CH'], ['capital', 'population']]
print(subset_df)
`,
      validationScript: `assert 'subset_df' in locals(), "Variable 'subset_df' must be defined"
assert list(subset_df.index) == ['BR', 'CH'], "Index must be BR and CH"
assert list(subset_df.columns) == ['capital', 'population'], "Columns must be capital and population"
`,
      hints: [
        "Use brics.loc[['BR', 'CH'], ['capital', 'population']].",
        "Remember that row labels come before column labels separated by a comma."
      ],
      solutionExplanation: 'The .loc method provides explicit, label-based 2D indexing that guarantees predictable column and row extraction.'
    };
  }

  if (cleanTitle.includes('group') || cleanTitle.includes('grouped')) {
    return {
      title: 'Regional Revenue Aggregation',
      scenario: 'The CFO needs to review total revenue and order volume broken down by sales region.',
      instructions: "Read `sales.csv`. Group by `region` and calculate total revenue `sum` and order count `count` on `sale_amount`. Assign the grouped result to `regional_summary` and print it.",
      starterCode: `import pandas as pd

sales = pd.read_csv('sales.csv')

# Group by region and aggregate sale_amount with sum and count
regional_summary = None

print(regional_summary)
`,
      expectedCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
regional_summary = sales.groupby('region')['sale_amount'].agg(['sum', 'count']).round(2)
print(regional_summary)
`,
      validationScript: `assert 'regional_summary' in locals(), "Variable 'regional_summary' must be defined"
assert len(regional_summary) == 4, "Should have 4 regions (East, Midwest, South, West)"
`,
      hints: [
        "Use sales.groupby('region')['sale_amount'].agg(['sum', 'count']).",
        "Round to 2 decimal places using .round(2)."
      ],
      solutionExplanation: 'Split-apply-combine with groupby and agg computes multi-metric summaries in a single vectorized pass.'
    };
  }

  if (cleanTitle.includes('missing') || cleanTitle.includes('cleaning')) {
    return {
      title: 'Clean Incomplete Customer Emails',
      scenario: 'The CRM sync job fails when customer emails are null or missing. Impute missing emails with a placeholder.',
      instructions: "Read `customers.csv`. Count missing emails with `.isna().sum()`. Replace all missing values in the `email` column with `'support@company.com'`. Assign to `clean_customers`.",
      starterCode: `import pandas as pd

customers = pd.read_csv('customers.csv')

# Replace missing emails with 'support@company.com'
clean_customers = customers.copy()
# your code here

print(clean_customers[['customer_id', 'first_name', 'email']])
`,
      expectedCode: `import pandas as pd

customers = pd.read_csv('customers.csv')
clean_customers = customers.copy()
clean_customers['email'] = clean_customers['email'].fillna('support@company.com')
print(clean_customers[['customer_id', 'first_name', 'email']])
`,
      validationScript: `assert 'clean_customers' in locals(), "Variable 'clean_customers' must be defined"
assert clean_customers['email'].isna().sum() == 0, "No missing emails should remain"
`,
      hints: [
        "Use clean_customers['email'].fillna('support@company.com').",
        "Assign back to clean_customers['email']."
      ],
      solutionExplanation: 'fillna preserves record integrity without discarding valuable customer rows.'
    };
  }

  if (cleanTitle.includes('join') || cleanTitle.includes('merge')) {
    return {
      title: 'Enrich Sales with Customer Profiles',
      scenario: 'The analytics team needs customer demographic information attached to every order transaction.',
      instructions: "Read `sales.csv` and `customers.csv`. Perform an inner join on `customer_id` using `pd.merge()`. Return the merged DataFrame with `sale_id`, `customer_id`, `first_name`, and `sale_amount` as `enriched_sales`.",
      starterCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
customers = pd.read_csv('customers.csv')

# Perform inner merge on customer_id
enriched_sales = None

print(enriched_sales.head())
`,
      expectedCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
customers = pd.read_csv('customers.csv')
enriched_sales = pd.merge(sales, customers, on='customer_id', how='inner')
print(enriched_sales[['sale_id', 'customer_id', 'first_name', 'sale_amount']].head())
`,
      validationScript: `assert 'enriched_sales' in locals(), "Variable 'enriched_sales' must be defined"
assert 'first_name' in enriched_sales.columns, "Merged DataFrame must contain customer first_name"
`,
      hints: [
        "Use pd.merge(sales, customers, on='customer_id', how='inner')."
      ],
      solutionExplanation: 'pd.merge combines datasets on shared relational keys, creating enriched dimensional data warehouse models.'
    };
  }

  // Default challenge
  return {
    title: `Practice Drill: ${title}`,
    scenario: `Apply the concepts learned in ${title} to process sample tabular data.`,
    instructions: `Write Python code using pandas or standard Python to explore and verify data behavior for ${title}.`,
    starterCode: `# Practice Challenge: ${title}
import pandas as pd
import numpy as np

df = pd.read_csv('sales.csv')
print("Loaded sales records:", len(df))
print(df.head(3))
`,
    expectedCode: `import pandas as pd
import numpy as np

df = pd.read_csv('sales.csv')
print(df.describe())
`,
    validationScript: `assert 'df' in locals(), "DataFrame df must be loaded"
`,
    hints: [
      'Inspect the DataFrame using .head() or .info().',
      'Follow the examples demonstrated in the lesson guide.'
    ],
    solutionExplanation: `Mastering this operation ensures consistent data pipeline quality when manipulating structured data.`
  };
}

// 8 Practical Exercises requested by the user
const PRACTICAL_EXERCISES = [
  {
    id: 'py-ex-1-read-csv',
    order: 1,
    title: '1. Read a CSV File Using pandas',
    difficulty: 'Beginner',
    category: 'File Handling',
    context: 'Data engineers frequently ingest raw CSV files deposited into cloud storage buckets or local staging disks.',
    goal: "Read 'sales.csv' into a DataFrame named `df`. Print the first 5 rows with `.head()`, the total shape (rows and columns), and the column data types.",
    csvsUsed: ['sales.csv'],
    starterCode: `import pandas as pd

# Exercise 1: Read 'sales.csv' and inspect structure
df = None

# Print head and shape
`,
    expectedCode: `import pandas as pd

df = pd.read_csv('sales.csv')
print("Shape:", df.shape)
print("Columns:", list(df.columns))
print(df.head(5))
`,
    validationScript: `assert 'df' in locals(), "You must assign the loaded dataset to a variable named 'df'"
assert len(df) == 14, "Expected df to have 14 rows from sales.csv"
assert 'sale_amount' in df.columns, "df must contain 'sale_amount' column"
`,
    hints: [
      "Use pd.read_csv('sales.csv') to load the file.",
      "Use df.shape to get the dimensions.",
      "Call df.head(5) to view the first 5 records."
    ],
    walkthrough: "pd.read_csv() parses flat delimited text into memory, inferring column data types automatically."
  },
  {
    id: 'py-ex-2-remove-duplicates',
    order: 2,
    title: '2. Find and Remove Duplicate Records',
    difficulty: 'Beginner',
    category: 'Data Cleaning',
    context: 'Upstream CRM webhooks accidentally double-fire, creating duplicate customer records with identical names and emails.',
    goal: "Read 'customers.csv'. Identify how many duplicate rows exist using `df.duplicated().sum()`. Drop duplicate records using `df.drop_duplicates()`. Save the deduplicated dataset to `cleaned_customers`.",
    csvsUsed: ['customers.csv'],
    starterCode: `import pandas as pd

customers = pd.read_csv('customers.csv')

# Step 1: Count duplicates
dup_count = None

# Step 2: Drop duplicates and assign to cleaned_customers
cleaned_customers = None

print(f"Duplicates removed: {dup_count}")
print(f"Final customer count: {len(cleaned_customers) if cleaned_customers is not None else 0}")
`,
    expectedCode: `import pandas as pd

customers = pd.read_csv('customers.csv')
dup_count = customers.duplicated(subset=['first_name', 'last_name', 'email']).sum()
cleaned_customers = customers.drop_duplicates(subset=['first_name', 'last_name', 'email'], keep='first')
print(f"Duplicates removed: {dup_count}")
print(f"Final customer count: {len(cleaned_customers)}")
`,
    validationScript: `assert 'cleaned_customers' in locals(), "Variable 'cleaned_customers' must be created"
assert len(cleaned_customers) < len(customers), "cleaned_customers should have fewer rows than the raw dataset"
`,
    hints: [
      "Use customers.duplicated().sum() to count duplicate entries.",
      "Use customers.drop_duplicates() to eliminate repeated rows.",
      "Assign the clean result to cleaned_customers."
    ],
    walkthrough: "drop_duplicates() detects matching keys across specified columns and preserves only the first occurrence."
  },
  {
    id: 'py-ex-3-replace-missing-values',
    order: 3,
    title: '3. Replace Missing Values (Imputation)',
    difficulty: 'Beginner',
    category: 'Data Cleaning',
    context: 'Data pipelines often encounter null values from optional form fields. Missing values must be imputed cleanly before loading into downstream analytics marts.',
    goal: "Read 'customers.csv'. Count missing values per column with `.isna().sum()`. Fill missing email entries with `'no_email_provided@domain.com'`. Assign the result to `imputed_customers`.",
    csvsUsed: ['customers.csv'],
    starterCode: `import pandas as pd

customers = pd.read_csv('customers.csv')

# Step 1: Count missing values per column
missing_counts = None

# Step 2: Fill null emails with 'no_email_provided@domain.com'
imputed_customers = customers.copy()
# your code here

print(imputed_customers[['customer_id', 'first_name', 'email']])
`,
    expectedCode: `import pandas as pd

customers = pd.read_csv('customers.csv')
missing_counts = customers.isna().sum()
imputed_customers = customers.copy()
imputed_customers['email'] = imputed_customers['email'].fillna('no_email_provided@domain.com')
print(imputed_customers[['customer_id', 'first_name', 'email']])
`,
    validationScript: `assert 'imputed_customers' in locals(), "Variable 'imputed_customers' must be created"
assert imputed_customers['email'].isna().sum() == 0, "All null emails must be filled"
`,
    hints: [
      "Use customers.isna().sum() to count nulls.",
      "Use imputed_customers['email'].fillna('no_email_provided@domain.com') to impute missing text values."
    ],
    walkthrough: "fillna replaces NaN values with a domain-appropriate constant, preventing runtime errors in downstream transformations."
  },
  {
    id: 'py-ex-4-average-sales-region',
    order: 4,
    title: '4. Calculate the Average Sales per Region',
    difficulty: 'Intermediate',
    category: 'Data Transformation',
    context: 'The sales performance team needs regional benchmark metrics to set quarterly quotas.',
    goal: "Read 'sales.csv'. Group by `region` and compute the average `sale_amount` rounded to 2 decimal places. Sort regions by average sale amount descending. Save the result to `regional_avg`.",
    csvsUsed: ['sales.csv'],
    starterCode: `import pandas as pd

sales = pd.read_csv('sales.csv')

# Group by region, calculate mean of sale_amount, round to 2 decimals, sort descending
regional_avg = None

print(regional_avg)
`,
    expectedCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
regional_avg = sales.groupby('region')['sale_amount'].mean().round(2).sort_values(ascending=False)
print(regional_avg)
`,
    validationScript: `assert 'regional_avg' in locals(), "Variable 'regional_avg' must be defined"
assert len(regional_avg) == 4, "Should have 4 regions in the summary"
assert regional_avg.iloc[0] >= regional_avg.iloc[-1], "Result must be sorted in descending order"
`,
    hints: [
      "Use sales.groupby('region')['sale_amount'].mean().",
      "Round using .round(2).",
      "Sort using .sort_values(ascending=False)."
    ],
    walkthrough: "groupby isolates records into buckets, calculates the mean on numeric sale amounts, and orders values."
  },
  {
    id: 'py-ex-5-merge-datasets',
    order: 5,
    title: '5. Merge Two Datasets Using a Common Column',
    difficulty: 'Intermediate',
    category: 'Data Merging',
    context: 'Order transactions only store customer IDs. To produce customer-facing invoice reports, sales data must be merged with customer demographic profiles.',
    goal: "Read 'sales.csv' and 'customers.csv'. Merge them on `customer_id` using an `inner` join. Keep `sale_id`, `customer_id`, `first_name`, `last_name`, `sale_amount`, and `sale_date`. Assign to `merged_sales`.",
    csvsUsed: ['sales.csv', 'customers.csv'],
    starterCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
customers = pd.read_csv('customers.csv')

# Merge sales and customers on 'customer_id'
merged_sales = None

print(merged_sales.head())
`,
    expectedCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
customers = pd.read_csv('customers.csv')
merged_sales = pd.merge(sales, customers, on='customer_id', how='inner')[
    ['sale_id', 'customer_id', 'first_name', 'last_name', 'sale_amount', 'sale_date']
]
print(merged_sales.head())
`,
    validationScript: `assert 'merged_sales' in locals(), "Variable 'merged_sales' must be defined"
assert 'first_name' in merged_sales.columns, "Merged DataFrame must contain customer first_name"
assert 'sale_amount' in merged_sales.columns, "Merged DataFrame must contain sale_amount"
`,
    hints: [
      "Use pd.merge(sales, customers, on='customer_id', how='inner').",
      "Filter the required columns by passing a list of column names."
    ],
    walkthrough: "pd.merge aligns rows from both tables on matching customer_id keys, creating a unified denormalized record."
  },
  {
    id: 'py-ex-6-consistent-dates',
    order: 6,
    title: '6. Convert Dates into a Consistent Format',
    difficulty: 'Intermediate',
    category: 'Data Transformation',
    context: 'Date strings from disparate sources often contain inconsistent time formats or strings that break time-series partitioning.',
    goal: "Read 'sales.csv'. Convert `sale_date` into a proper pandas datetime using `pd.to_datetime()`. Extract the year-month string formatted as `YYYY-MM` into a new column called `sale_year_month`. Print the first 5 records of `sales[['sale_date', 'sale_year_month']]`.",
    csvsUsed: ['sales.csv'],
    starterCode: `import pandas as pd

sales = pd.read_csv('sales.csv')

# Step 1: Convert sale_date to datetime
# Step 2: Create 'sale_year_month' formatted as '%Y-%m'

print(sales[['sale_date', 'sale_year_month']].head())
`,
    expectedCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
sales['sale_date'] = pd.to_datetime(sales['sale_date'])
sales['sale_year_month'] = sales['sale_date'].dt.strftime('%Y-%m')
print(sales[['sale_date', 'sale_year_month']].head())
`,
    validationScript: `assert 'sale_year_month' in sales.columns, "Column 'sale_year_month' must be created"
assert pd.api.types.is_datetime64_any_dtype(sales['sale_date']), "sale_date must be converted to datetime"
`,
    hints: [
      "Use sales['sale_date'] = pd.to_datetime(sales['sale_date']).",
      "Use the .dt accessor: sales['sale_date'].dt.strftime('%Y-%m')."
    ],
    walkthrough: "Converting raw text to pandas datetime unlocks the .dt accessor for effortless date formatting, truncation, and cohort grouping."
  },
  {
    id: 'py-ex-7-export-cleaned-csv',
    order: 7,
    title: '7. Export Cleaned Data into Another CSV File',
    difficulty: 'Intermediate',
    category: 'File Handling & Pipeline',
    context: 'After completing data cleansing and enrichment in memory, pipelines must persist production-ready files for downstream consumers.',
    goal: "Read 'products.csv'. Filter out any products priced under $100. Sort by price descending. Export the resulting DataFrame to `'premium_products.csv'` with `index=False`. Verify by reading the exported file back into `exported_df`.",
    csvsUsed: ['products.csv'],
    starterCode: `import pandas as pd

products = pd.read_csv('products.csv')

# Step 1: Filter products with price >= 100
# Step 2: Sort by price descending
# Step 3: Export to 'premium_products.csv' without index
# Step 4: Verify by reading 'premium_products.csv' into exported_df

exported_df = None
print(exported_df)
`,
    expectedCode: `import pandas as pd

products = pd.read_csv('products.csv')
premium = products[products['price'] >= 100].sort_values(by='price', ascending=False)
premium.to_csv('premium_products.csv', index=False)
exported_df = pd.read_csv('premium_products.csv')
print(exported_df)
`,
    validationScript: `assert 'exported_df' in locals(), "Variable 'exported_df' must be loaded from 'premium_products.csv'"
assert (exported_df['price'] >= 100).all(), "All products in exported_df must have price >= 100"
assert os.path.exists('premium_products.csv') or len(exported_df) > 0, "File 'premium_products.csv' must exist"
`,
    hints: [
      "Filter with products[products['price'] >= 100].",
      "Export with premium.to_csv('premium_products.csv', index=False).",
      "Read back with pd.read_csv('premium_products.csv')."
    ],
    walkthrough: "to_csv(index=False) generates clean flat files without arbitrary sequential integer index columns."
  },
  {
    id: 'py-ex-8-generate-summary-report',
    order: 8,
    title: '8. Generate an Automated Summary Report',
    difficulty: 'Advanced',
    category: 'Automation & Reporting',
    context: 'Data engineering jobs often conclude by computing executive KPIs and emitting summary stats for leadership dashboards.',
    goal: "Read 'sales.csv' and 'employees.csv'. Compute overall metrics:\n1. `total_sales_revenue` (sum of sale_amount)\n2. `total_orders_count` (total number of sales)\n3. `avg_order_value` (mean of sale_amount, rounded to 2 decimals)\n4. `total_payroll` (sum of employee salaries)\nStore these metrics in a dictionary called `executive_report` and print it.",
    csvsUsed: ['sales.csv', 'employees.csv'],
    starterCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
employees = pd.read_csv('employees.csv')

# Build the executive_report dictionary with total_sales_revenue, total_orders_count, avg_order_value, and total_payroll
executive_report = {}

print("Executive Summary Report:")
print(executive_report)
`,
    expectedCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
employees = pd.read_csv('employees.csv')

executive_report = {
    'total_sales_revenue': round(float(sales['sale_amount'].sum()), 2),
    'total_orders_count': int(len(sales)),
    'avg_order_value': round(float(sales['sale_amount'].mean()), 2),
    'total_payroll': round(float(employees['salary'].sum()), 2)
}
print(executive_report)
`,
    validationScript: `assert 'executive_report' in locals(), "executive_report dictionary must be defined"
assert 'total_sales_revenue' in executive_report, "Report must include 'total_sales_revenue'"
assert 'total_payroll' in executive_report, "Report must include 'total_payroll'"
assert executive_report['total_orders_count'] == 14, "Expected total_orders_count to be 14"
`,
    hints: [
      "Use sales['sale_amount'].sum() for revenue.",
      "Use len(sales) for order count.",
      "Use employees['salary'].sum() for payroll."
    ],
    walkthrough: "Aggregating KPIs into structured dictionaries enables easy serialization to JSON, webhook payloads, or automated email digests."
  }
];

// Build Lessons array from extracted tabs
const LESSONS = [];

let mOrder = 1;
let lOrder = 1;

for (const [tabId, tabData] of Object.entries(tabs)) {
  if (tabData.nesting === 0) {
    continue; // parent header
  }

  // Determine module ID from parentModule title
  let modId = 1;
  let modTitle = 'Part 1: Python & NumPy Foundations';
  if (tabData.parentModule.includes('Intermediate')) {
    modId = 2;
    modTitle = 'Part 2: Intermediate Python & Visualizations';
  } else if (tabData.parentModule.includes('Manipulation')) {
    modId = 3;
    modTitle = 'Part 3: Data Manipulation with pandas';
  } else if (tabData.parentModule.includes('Joining')) {
    modId = 4;
    modTitle = 'Part 4: Relational Data & Joining with pandas';
  }

  const sections = parseContentToSections(tabData.content, tabData.title);
  const challenge = getLessonChallenge(tabData.title, tabData.parentModule, lOrder);

  LESSONS.push({
    id: `py-lesson-${tabId.replace(/\./g, '-')}`,
    tabId,
    moduleTitle: modTitle,
    moduleOrder: modId,
    lessonOrder: lOrder++,
    title: tabData.title,
    description: sections[0]?.body.slice(0, 160).replace(/\n/g, ' ') + '...' || `Master ${tabData.title} in Python.`,
    sections,
    challenge
  });
}

console.log(`Generated ${LESSONS.length} Python lessons and ${PRACTICAL_EXERCISES.length} practical exercises.`);

// Write out TypeScript file
const fileContent = `export interface PythonLessonSection {
  title: string;
  body: string;
  exampleCode?: string;
}

export interface PythonChallenge {
  title: string;
  scenario: string;
  instructions: string;
  starterCode: string;
  expectedCode: string;
  validationScript: string;
  hints: string[];
  solutionExplanation: string;
}

export interface PythonLesson {
  id: string;
  tabId: string;
  moduleTitle: string;
  moduleOrder: number;
  lessonOrder: number;
  title: string;
  description: string;
  sections: PythonLessonSection[];
  challenge: PythonChallenge;
}

export interface PythonExercise {
  id: string;
  order: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  context: string;
  goal: string;
  csvsUsed: string[];
  starterCode: string;
  expectedCode: string;
  validationScript: string;
  hints: string[];
  walkthrough: string;
}

export const PYTHON_MODULES = ${JSON.stringify(MODULES, null, 2)};

export const PYTHON_LESSONS: PythonLesson[] = ${JSON.stringify(LESSONS, null, 2)};

export const PYTHON_EXERCISES: PythonExercise[] = ${JSON.stringify(PRACTICAL_EXERCISES, null, 2)};
`;

fs.writeFileSync(path.resolve('src/data/pythonCurriculum.ts'), fileContent, 'utf8');
console.log('Successfully created src/data/pythonCurriculum.ts!');
