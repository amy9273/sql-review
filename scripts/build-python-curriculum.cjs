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

// Curated specialized content for lessons: Formula, Quick Reference, Common Mistakes, and tailored Challenges
const LESSON_ENRICHMENTS = {
  // Lesson: Variables and Types in Python
  'Variables and Types in Python': {
    sections: [
      {
        title: '1. What are Variables?',
        body: 'Python allows you to store values in variables, which is essential when performing multi-step calculations. A variable is a named storage container for a value in memory.\n\n• **Case-Sensitive**: Python variable names are case-sensitive (`Height` and `height` are two different variables).\n• **Assignment**: Use the equals sign (`=`) to assign a value to a variable.\n• **Retrieval**: Once defined, simply reference the variable name to fetch its stored value.',
        exampleCode: `# Storing values in variables
height = 1.79   # Height in meters
weight = 68.7   # Weight in kilograms

# Inspecting assigned variables
print("Height:", height)
print("Weight:", weight)`
      },
      {
        title: '2. Calculating Body Mass Index (BMI)',
        body: 'Variables make complex calculations reusable and readable. For example, Body Mass Index (BMI) is calculated by dividing body weight in kilograms by the square of body height in meters.\n\nIn Python, you can calculate BMI directly using your assigned variables. Storing the result in a new variable, `bmi`, creates a reusable metric across your analytical scripts.',
        formula: {
          title: 'Body Mass Index (BMI) Formula',
          expression: 'BMI = weight / (height ** 2)',
          variables: [
            { name: 'weight', meaning: 'Body weight measured in kilograms (kg)' },
            { name: 'height', meaning: 'Height measured in meters (m)' },
            { name: '** 2', meaning: 'Python exponentiation operator (squared)' }
          ]
        },
        exampleCode: `# Calculate BMI using variables
height = 1.79
weight = 68.7

# BMI = weight / (height ** 2)
bmi = weight / (height ** 2)
print("Calculated BMI:", round(bmi, 2))  # Output: 21.44`
      },
      {
        title: '3. Reproducibility with Variables',
        body: 'If your BMI calculation is written in a script, updating calculations for a different person or timestamp is effortless.\n\nSimply change the `weight` variable and re-run the script. The `bmi` variable automatically recalculates with the new value—without needing to rewrite any formulas. This demonstrates why variables are fundamental: they make code dynamic and adaptable.',
        exampleCode: `# Easily update weight without rewriting the formula
height = 1.79
weight = 75.0  # Updated weight

bmi = weight / (height ** 2)
print("Updated BMI:", round(bmi, 2))  # Output: 23.41`
      },
      {
        title: '4. Core Python Data Types',
        body: 'Every value in Python belongs to a specific data type that defines what operations can be performed on it. You can inspect any variable\'s type using the built-in `type()` function:\n\n• **`int` (Integer)**: Whole numbers without fractional parts (e.g. `21`, `100`, `-5`).\n• **`float` (Floating Point)**: Real numbers with fractional decimal points (e.g. `1.79`, `21.44`).\n• **`str` (String)**: Text sequences enclosed in either single (`\'...\'`) or double (`"..."`) quotes.\n• **`bool` (Boolean)**: Logical truth values—either `True` or `False`—vital for filtering and conditional logic.',
        exampleCode: `# Checking Python data types
age = 21
bmi = 21.44
city = "New York"
is_active = True

print(type(age))        # <class 'int'>
print(type(bmi))        # <class 'float'>
print(type(city))       # <class 'str'>
print(type(is_active))  # <class 'bool'>`
      },
      {
        title: '5. Type-Dependent Behavior',
        body: 'Python operators behave differently depending on the operand data types. This principle is called **type-dependent behavior**:\n\n• **Integers & Floats (`+`)**: Performs mathematical addition (`5 + 5` = `10`).\n• **Strings (`+`)**: Performs concatenation, joining texts together (`"data" + "frame"` = `"dataframe"`).\n• **Mismatched Types**: Adding a string and a number (`"age: " + 21`) raises a `TypeError`. You must explicitly convert numbers using `str()`.',
        exampleCode: `# Math addition
print(5 + 5)                # 10

# String concatenation
print("data" + "frame")     # 'dataframe'

# Explicit casting when combining types
print("My age is " + str(21))  # 'My age is 21'`
      }
    ],
    quickReference: [
      { goal: 'Assign integer variable', syntax: 'x = 42' },
      { goal: 'Assign float (decimal)', syntax: 'price = 19.99' },
      { goal: 'Assign text string', syntax: 'city = "Chicago"' },
      { goal: 'Assign boolean literal', syntax: 'is_active = True' },
      { goal: 'Inspect data type', syntax: 'type(variable)' },
      { goal: 'Exponentiation (power of 2)', syntax: 'height ** 2' },
      { goal: 'Convert integer/float to string', syntax: 'str(42)' }
    ],
    commonMistake: {
      wrongCode: `# Mistake 1: Exponentiation syntax confusion or lack of parentheses\nbmi = weight / height ** 2\n\n# Mistake 2: Concatenating string and integer without casting\nprint("Total: " + 100)  # Raises TypeError!`,
      correctCode: `# Parentheses ensure clear mathematical precedence:\nbmi = weight / (height ** 2)\n\n# Explicitly cast numbers using str():\nprint("Total: " + str(100))`,
      explanation: 'In Python, ** has higher precedence than /, but using parentheses (height ** 2) eliminates any ambiguity. Also, Python will not automatically coerce numbers to strings when using +; you must call str(number).'
    },
    challenge: {
      title: 'Calculate Patient BMI and Verify Data Types',
      scenario: 'The hospital analytics unit needs to calculate the Body Mass Index (BMI) for incoming patients and verify that the calculated metric is stored as a floating-point number.',
      instructions: '1. Given patient height of `1.82` meters and weight of `78.4` kilograms, calculate `bmi = weight / (height ** 2)` and round to 2 decimal places using `round()`.\n2. Assign the result to `bmi`.\n3. Inspect the data type of `bmi` using `type(bmi)` and assign the type to `bmi_type`.\n4. Print `bmi` and `bmi_type`.',
      starterCode: `# Patient vitals
height = 1.82  # meters
weight = 78.4  # kg

# 1. Calculate BMI and round to 2 decimal places
bmi = None

# 2. Inspect type using type()
bmi_type = None

print("BMI:", bmi)
print("Type:", bmi_type)
`,
      expectedCode: `height = 1.82
weight = 78.4
bmi = round(weight / (height ** 2), 2)
bmi_type = type(bmi)
print("BMI:", bmi)
print("Type:", bmi_type)
`,
      validationScript: `assert 'bmi' in locals(), "Variable 'bmi' must be defined"
assert 'bmi_type' in locals(), "Variable 'bmi_type' must be defined"
assert abs(bmi - 23.67) < 0.05, f"Expected BMI to be ~23.67, got {bmi}"
assert bmi_type == float, "bmi_type should be float"
`,
      hints: [
        'Use weight / (height ** 2) to compute BMI.',
        'Use round(val, 2) to round to two decimal places.',
        'Assign type(bmi) to bmi_type.'
      ],
      solutionExplanation: 'Storing calculations in variables enables reproducible downstream analysis, while type() ensures data validation before pipeline ingestion.'
    }
  },

  // Lesson: Python Lists
  'Python Lists': {
    sections: [
      {
        title: '1. Introduction to Python Lists',
        body: 'Basic data types like `int`, `float`, `str`, and `bool` store individual scalar values. However, data analysis requires handling collections of data points—such as sensor temperatures, employee salaries, or customer IDs.\n\nA **list** is a compound data structure that stores multiple items in an ordered sequence under a single variable name. Lists are created using square brackets `[ ]` with elements separated by commas.',
        exampleCode: `# Creating a list of family heights (in meters)
fam = [1.73, 1.68, 1.71, 1.89]
print("Family heights:", fam)
print("Total family members:", len(fam))`
      },
      {
        title: '2. Storing Heterogeneous & Mixed Types',
        body: 'Unlike arrays in some other programming languages, Python lists can store elements of **any** data type together in the same list:\n\n• **Numbers**: Integers and floats\n• **Strings**: Text sequences\n• **Booleans**: Logical flags\n• **Nested Lists**: Lists containing other lists',
        exampleCode: `# Mixed-type list containing names and heights
fam_mixed = ["liz", 1.73, "emma", 1.68, "mom", 1.71, "dad", 1.89]
print(fam_mixed)`
      },
      {
        title: '3. Nested Sublists (2D Collections)',
        body: 'To organize paired data more cleanly, you can group related items into sublists. For instance, pairing each person\'s name and height into a 2-element sublist creates a list of lists.\n\nThis nested structure is the foundational conceptual model for tabular data (rows and columns) before moving to NumPy matrices and pandas DataFrames.',
        exampleCode: `# List of sublists (each sublist represents one record)
fam_nested = [
    ["liz", 1.73],
    ["emma", 1.68],
    ["mom", 1.71],
    ["dad", 1.89]
]
print("Nested list:", fam_nested)
print("First record:", fam_nested[0])`
      }
    ],
    quickReference: [
      { goal: 'Create an empty list', syntax: 'my_list = []' },
      { goal: 'Create a numeric list', syntax: 'prices = [19.99, 49.50, 9.99]' },
      { goal: 'Get list length (count)', syntax: 'len(prices)' },
      { goal: 'Create nested 2D list', syntax: 'matrix = [[1, 2], [3, 4]]' },
      { goal: 'Check list type', syntax: 'type(prices) # <class \'list\'>' }
    ],
    commonMistake: {
      wrongCode: `# Using parentheses () instead of square brackets []:\nmy_list = (1, 2, 3)  # This creates an immutable tuple, NOT a list!`,
      correctCode: `# Always use square brackets [] for lists:\nmy_list = [1, 2, 3]`,
      explanation: 'Parentheses (1, 2, 3) create a tuple, which cannot be modified in-place. Square brackets [1, 2, 3] create a mutable list.'
    },
    challenge: {
      title: 'Assemble a Multi-Metric Warehouse Inventory List',
      scenario: 'The logistics warehouse needs to bundle product SKU tags, quantities on hand, and replenishment status into an organized Python list structure.',
      instructions: '1. Create a list named `inventory` containing 4 items: SKU string `"SKU-902"`, stock integer `450`, unit price float `19.95`, and in-stock boolean `True`.\n2. Compute the total item count using `len(inventory)` and assign to `item_count`.\n3. Print `inventory` and `item_count`.',
      starterCode: `# Build warehouse inventory record
# 1. Create list with SKU, stock, price, and status
inventory = None

# 2. Get length
item_count = None

print("Inventory:", inventory)
print("Item count:", item_count)
`,
      expectedCode: `inventory = ["SKU-902", 450, 19.95, True]
item_count = len(inventory)
print("Inventory:", inventory)
print("Item count:", item_count)
`,
      validationScript: `assert 'inventory' in locals(), "inventory must be defined"
assert isinstance(inventory, list), "inventory must be a list"
assert len(inventory) == 4, "inventory should contain 4 items"
assert inventory[0] == "SKU-902", "First item should be 'SKU-902'"
assert item_count == 4, "item_count must equal 4"
`,
      hints: [
        'Use square brackets: inventory = ["SKU-902", 450, 19.95, True].',
        'Use len(inventory) to calculate item_count.'
      ],
      solutionExplanation: 'Lists allow data pipelines to bundle heterogeneous attributes into unified records for batch serialization.'
    }
  },

  // Lesson: Subsetting and Slicing Python Lists
  'Subsetting and Slicing Python Lists': {
    sections: [
      {
        title: '1. Zero-Based Indexing',
        body: 'Python uses **zero-based indexing**, meaning the first element in a list is at index `0`, the second is at index `1`, and so on.\n\nTo access a specific element, write the list name followed by the index in square brackets: `list[index]`.',
        exampleCode: `fam = ["liz", 1.73, "emma", 1.68, "mom", 1.71, "dad", 1.89]

print("First element (index 0):", fam[0])   # 'liz'
print("Second element (index 1):", fam[1])  # 1.73`
      },
      {
        title: '2. Negative Indexing (From the End)',
        body: 'Python also supports negative indexing to count backwards from the end of the list:\n\n• `list[-1]`: The very last element\n• `list[-2]`: The second-to-last element\n\nThis is extremely convenient when you don\'t know or don\'t want to calculate the length of the list.',
        exampleCode: `fam = ["liz", 1.73, "emma", 1.68, "mom", 1.71, "dad", 1.89]

print("Last element (-1):", fam[-1])            # 1.89
print("Second to last element (-2):", fam[-2])  # 'dad'`
      },
      {
        title: '3. List Slicing (`start:end`)',
        body: 'Slicing extracts a contiguous sub-range of elements using the syntax `list[start:end]`.\n\n• **Start is Inclusive**: The element at index `start` is included.\n• **End is Exclusive**: The slice stops *before* reaching index `end`.\n• **Omitting bounds**: `list[:3]` starts from the beginning; `list[4:]` slices through the very end.',
        exampleCode: `fam = ["liz", 1.73, "emma", 1.68, "mom", 1.71, "dad", 1.89]

# Slice elements at index 3 and 4 (stops before 5)
middle = fam[3:5]
print("Middle slice [3:5]:", middle)  # [1.68, 'mom']

# Slice first 4 elements
first_four = fam[:4]
print("First 4 elements [:4]:", first_four)

# Slice from index 5 to end
tail = fam[5:]
print("From index 5 to end [5:]:", tail)`
      }
    ],
    quickReference: [
      { goal: 'Get first element', syntax: 'lst[0]' },
      { goal: 'Get last element', syntax: 'lst[-1]' },
      { goal: 'Slice from index 1 to 3 (exclusive)', syntax: 'lst[1:3]' },
      { goal: 'Slice first N elements', syntax: 'lst[:N]' },
      { goal: 'Slice from index N to end', syntax: 'lst[N:]' },
      { goal: 'Full shallow copy slice', syntax: 'lst[:]' }
    ],
    commonMistake: {
      wrongCode: `# Expecting lst[1:3] to include index 3:\nsub = fam[1:3]  # Only contains indices 1 and 2!\n\n# Out-of-bounds index:\nlast = fam[len(fam)]  # Raises IndexError!`,
      correctCode: `# To include index 3, set end to 4:\nsub = fam[1:4]\n\n# Use -1 or len(fam) - 1 for last element:\nlast = fam[-1]`,
      explanation: 'Slices are half-open intervals [start, end), where the end index is excluded. Python lists are 0-indexed, so index len(list) is out of bounds.'
    },
    challenge: {
      title: 'Extract Regional Store Sales via Indexing & Slicing',
      scenario: 'The regional retail manager wants to isolate the top-performing stores and the baseline stores from a quarterly sales report list.',
      instructions: 'Given `sales = [12000, 18500, 24000, 31000, 42000, 56000]`:\n1. Extract the last store\'s sales using negative indexing into `top_store`.\n2. Slice the middle stores (index `2` through `4` inclusive) into `mid_stores`.\n3. Print `top_store` and `mid_stores`.',
      starterCode: `sales = [12000, 18500, 24000, 31000, 42000, 56000]

# 1. Last element using negative index
top_store = None

# 2. Slice index 2 through 4 (remember end index is exclusive)
mid_stores = None

print("Top store:", top_store)
print("Mid stores:", mid_stores)
`,
      expectedCode: `sales = [12000, 18500, 24000, 31000, 42000, 56000]
top_store = sales[-1]
mid_stores = sales[2:5]
print("Top store:", top_store)
print("Mid stores:", mid_stores)
`,
      validationScript: `assert top_store == 56000, "top_store must be 56000"
assert mid_stores == [24000, 31000, 42000], f"Expected [24000, 31000, 42000], got {mid_stores}"
`,
      hints: [
        'Use sales[-1] for the last store.',
        'To include index 4, use slice sales[2:5].'
      ],
      solutionExplanation: 'Zero-based indexing and half-open slicing are universal paradigms across Python, NumPy arrays, and pandas Series.'
    }
  },

  // Lesson: Manipulating Python Lists
  'Manipulating Python Lists': {
    sections: [
      {
        title: '1. Changing List Elements',
        body: 'Python lists are **mutable**, which means you can update their elements in-place without creating a brand new list.\n\nTo update an element, select it using index notation and assign a new value with `=`.',
        exampleCode: `fam = ["liz", 1.73, "emma", 1.68, "mom", 1.71, "dad", 1.89]

# Update Emma's height at index 3
fam[3] = 1.69
print("Updated list:", fam)`
      },
      {
        title: '2. Adding and Removing Elements',
        body: 'You can concatenate lists together using the `+` operator, or delete specific items using the `del` keyword:\n\n• **Concatenation (`+`)**: Joins two lists together into a new expanded list.\n• **Deletion (`del`)**: Removes an element at a specified index in-place.',
        exampleCode: `fam = ["liz", 1.73, "emma", 1.68, "mom", 1.71, "dad", 1.89]

# Append new family member using +
fam_ext = fam + ["me", 1.79]
print("Extended list:", fam_ext)

# Delete 'dad' and his height
del fam_ext[6:8]
print("After deletion:", fam_ext)`
      },
      {
        title: '3. Behind the Scenes: Memory References vs Copies',
        body: 'When you assign `y = x`, Python does **not** make a copy of the list. Instead, it copies the reference pointing to the same list in memory! Any modification to `y` will immediately change `x` as well.\n\nTo create a completely independent copy, use `list(x)` or slice `x[:]`.',
        exampleCode: `# The copy trap:
x = ["a", "b", "c"]
y = x          # Copies REFERENCE, not list!
y[1] = "z"
print("x is also modified:", x)  # ['a', 'z', 'c']

# Safe independent copy:
x = ["a", "b", "c"]
y = list(x)    # or y = x[:]
y[1] = "z"
print("x remains intact:", x)   # ['a', 'b', 'c']`
      }
    ],
    quickReference: [
      { goal: 'Update element in-place', syntax: 'lst[i] = new_val' },
      { goal: 'Concatenate two lists', syntax: 'combined = lst1 + lst2' },
      { goal: 'Delete element by index', syntax: 'del lst[i]' },
      { goal: 'Create independent shallow copy', syntax: 'copied = list(lst) # or lst[:]' }
    ],
    commonMistake: {
      wrongCode: `# Shallow reference alias bug:\nx = [1, 2, 3]\ny = x\ny[0] = 99  # Modifies x as well!`,
      correctCode: `# Create a true independent copy:\nx = [1, 2, 3]\ny = list(x) # or x[:]\ny[0] = 99  # x remains [1, 2, 3]`,
      explanation: 'In Python, variables store references to compound objects in memory. Simple assignment (y = x) binds a new name to the exact same list.'
    },
    challenge: {
      title: 'Safely Clone and Modify Server Cluster Nodes',
      scenario: 'The infrastructure automation pipeline needs to duplicate a base server cluster list and add standby backup nodes without mutating the production configuration.',
      instructions: 'Given `base_cluster = ["node-1", "node-2", "node-3"]`:\n1. Make an independent copy of `base_cluster` into `backup_cluster` using `list()` or `[:]`.\n2. Append `["standby-1", "standby-2"]` to `backup_cluster` using the `+` operator.\n3. Modify the first element of `backup_cluster` to `"primary-backup"`.\n4. Print `base_cluster` and `backup_cluster` (verify `base_cluster` did not change).',
      starterCode: `base_cluster = ["node-1", "node-2", "node-3"]

# 1. Independent copy
backup_cluster = None

# 2. Append standby nodes
# 3. Modify first node

print("Base cluster:", base_cluster)
print("Backup cluster:", backup_cluster)
`,
      expectedCode: `base_cluster = ["node-1", "node-2", "node-3"]
backup_cluster = list(base_cluster) + ["standby-1", "standby-2"]
backup_cluster[0] = "primary-backup"
print("Base cluster:", base_cluster)
print("Backup cluster:", backup_cluster)
`,
      validationScript: `assert base_cluster == ["node-1", "node-2", "node-3"], "base_cluster must not be mutated"
assert backup_cluster == ["primary-backup", "node-2", "node-3", "standby-1", "standby-2"], f"Incorrect backup_cluster: {backup_cluster}"
`,
      hints: [
        'Use backup_cluster = list(base_cluster) to avoid reference aliasing.',
        'Add standby nodes with + ["standby-1", "standby-2"].'
      ],
      solutionExplanation: 'Explicitly cloning lists protects against mutation side-effects across asynchronous data transformation pipelines.'
    }
  }
};

// Intelligently parse raw Google Doc text into clean, structured sections
function cleanDocContent(content, tabTitle) {
  let clean = content
    .replace(/[\u000b\u200b\r]/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .trim();

  // Strip formula latex glitches
  clean = clean.replace(/`?BMI=weight \(kg\)height \(m\)2\\text\{BMI\} = \\frac\{\\text\{weight \(kg\)\}\}\{\\text\{height \(m\)\}\^2\}BMI=height \(m\)2weight \(kg\)​?`?/g, 'BMI = weight / (height ** 2)');

  return clean;
}

function isRealHeading(line, tabTitle) {
  const l = line.trim();
  if (l.length < 4 || l.length > 55) return false;
  if (/^\d+$/.test(l)) return false;
  if (l.toLowerCase() === tabTitle.toLowerCase()) return false;
  if (/^[\#]/.test(l)) return true;
  if (/[.,;:?!]$/.test(l)) return false;
  if (/^(for example|for instance|such as|here|by |in short|in addition|to |you can|the key|the first|you then|and |with |if |when |person |address |smith|hopkins|table \d|start with|merge with|match rows)/i.test(l)) return false;
  if (l.includes('→') || l.includes('=>') || l.includes('(') || l.includes('=')) return false;
  if (/\b(is|are|was|were|will|can|could|should|would|have|has|do|does)\b/i.test(l) && l.split(' ').length > 4) return false;
  if (l.split(' ').length === 1 && !/^(Customization|Histogram|Summary|Packages|Functions)$/i.test(l)) return false;
  if (!/^[A-Z0-9]/.test(l)) return false;
  return true;
}

function parseContentToSections(content, tabTitle) {
  if (LESSON_ENRICHMENTS[tabTitle]) {
    return LESSON_ENRICHMENTS[tabTitle].sections;
  }

  const clean = cleanDocContent(content, tabTitle);
  const rawLines = clean.split('\n').map(l => l.trim()).filter(Boolean);

  let lines = rawLines;
  if (lines.length > 0 && lines[0].toLowerCase() === tabTitle.toLowerCase()) {
    lines = lines.slice(1);
  }

  const sections = [];
  let currentTitle = '1. Concept Overview';
  let currentBody = [];
  let currentExample = '';
  let sectionIndex = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (isRealHeading(line, tabTitle) && currentBody.length > 0) {
      sections.push({
        title: currentTitle,
        body: currentBody.join('\n\n'),
        exampleCode: currentExample.trim() || undefined
      });
      currentBody = [];
      currentExample = '';
      sectionIndex++;
      currentTitle = `${sectionIndex}. ${line.replace(/^[#:\s]+|[#:\s]+$/g, '')}`;
    } else if (
      line.startsWith('import ') ||
      line.startsWith('from ') ||
      line.startsWith('plt.') ||
      line.startsWith('df.') ||
      line.startsWith('pd.') ||
      line.startsWith('np.') ||
      (line.includes(' = ') && line.length < 80 && !line.includes('This ') && !line.includes('The '))
    ) {
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
      exampleCode: currentExample.trim() || undefined
    });
  }

  if (sections.length === 0) {
    sections.push({
      title: '1. Lesson Fundamentals',
      body: content,
      exampleCode: undefined
    });
  }

  return sections;
}

function getLessonQuickReference(title, tabData) {
  if (LESSON_ENRICHMENTS[title]?.quickReference) {
    return LESSON_ENRICHMENTS[title].quickReference;
  }

  const clean = title.toLowerCase();
  if (clean.includes('numpy array') || clean.includes('numpy overview')) {
    return [
      { goal: 'Import NumPy', syntax: 'import numpy as np' },
      { goal: 'Create 1D array', syntax: 'arr = np.array([1, 2, 3])' },
      { goal: 'Element-wise multiplication', syntax: 'doubled = arr * 2' },
      { goal: 'Inspect 2D array shape', syntax: 'arr_2d.shape # (rows, cols)' },
      { goal: 'Select 2D row 0, col 1', syntax: 'arr_2d[0, 1]' },
      { goal: 'Select entire column', syntax: 'arr_2d[:, 0]' }
    ];
  }

  if (clean.includes('plot') || clean.includes('matplotlib') || clean.includes('histogram')) {
    return [
      { goal: 'Import PyPlot', syntax: 'import matplotlib.pyplot as plt' },
      { goal: 'Line plot', syntax: 'plt.plot(x, y)' },
      { goal: 'Scatter plot', syntax: 'plt.scatter(x, y)' },
      { goal: 'Histogram with bins', syntax: 'plt.hist(data, bins=5)' },
      { goal: 'Set title and labels', syntax: 'plt.title("Title"); plt.xlabel("X")' },
      { goal: 'Show chart canvas', syntax: 'plt.show()' }
    ];
  }

  if (clean.includes('dictionary') || clean.includes('dictionaries')) {
    return [
      { goal: 'Define dictionary', syntax: 'd = {"a": 1, "b": 2}' },
      { goal: 'Lookup by key', syntax: 'val = d["a"]' },
      { goal: 'Add/update key', syntax: 'd["c"] = 3' },
      { goal: 'Check membership', syntax: '"a" in d' },
      { goal: 'Iterate pairs', syntax: 'for k, v in d.items():' }
    ];
  }

  if (clean.includes('loc') || clean.includes('iloc') || clean.includes('subset')) {
    return [
      { goal: 'Label-based indexing', syntax: 'df.loc[row_label, col_label]' },
      { goal: 'Position-based indexing', syntax: 'df.iloc[row_idx, col_idx]' },
      { goal: 'Select column as Series', syntax: 'df["col_name"]' },
      { goal: 'Select multiple columns', syntax: 'df[["col_a", "col_b"]]' },
      { goal: 'Boolean mask filter', syntax: 'df[df["col"] > 100]' }
    ];
  }

  if (clean.includes('group') || clean.includes('agg') || clean.includes('pivot')) {
    return [
      { goal: 'Group by and sum', syntax: 'df.groupby("region")["sales"].sum()' },
      { goal: 'Multiple aggregations', syntax: 'df.groupby("region")["sales"].agg(["mean", "count"])' },
      { goal: '2D Pivot Table', syntax: 'df.pivot_table(values="sales", index="region", columns="prod")' }
    ];
  }

  if (clean.includes('join') || clean.includes('merge') || clean.includes('concat')) {
    return [
      { goal: 'Inner join on key', syntax: 'pd.merge(df1, df2, on="id", how="inner")' },
      { goal: 'Left join', syntax: 'pd.merge(df1, df2, on="id", how="left")' },
      { goal: 'Vertical stack', syntax: 'pd.concat([df1, df2], ignore_index=True)' }
    ];
  }

  return [
    { goal: 'Inspect first 5 rows', syntax: 'df.head(5)' },
    { goal: 'Inspect column metadata', syntax: 'df.info()' },
    { goal: 'Summary statistics', syntax: 'df.describe()' },
    { goal: 'Check dimensions', syntax: 'df.shape' }
  ];
}

function getLessonCommonMistake(title, tabData) {
  if (LESSON_ENRICHMENTS[title]?.commonMistake) {
    return LESSON_ENRICHMENTS[title].commonMistake;
  }

  const clean = title.toLowerCase();
  if (clean.includes('numpy array') || clean.includes('numpy overview')) {
    return {
      wrongCode: `# Multiplying standard Python list duplicates elements:\n[1, 2, 3] * 2  # Returns [1, 2, 3, 1, 2, 3]!`,
      correctCode: `# Convert to NumPy array for element-wise calculation:\nnp.array([1, 2, 3]) * 2  # array([2, 4, 6])`,
      explanation: 'Python lists repeat when multiplied. NumPy arrays execute element-wise operations across high-performance C vector buffers.'
    };
  }

  if (clean.includes('plot') || clean.includes('matplotlib') || clean.includes('histogram')) {
    return {
      wrongCode: `# Creating new plot without clearing previous canvas:\nplt.hist(data1)\nplt.show()\nplt.plot(data2)  # Overlays on previous figure!`,
      correctCode: `# Clear figure buffer between separate charts:\nplt.hist(data1)\nplt.show()\nplt.clf()  # Clear canvas\nplt.plot(data2)`,
      explanation: 'Matplotlib keeps internal plot state active until plt.clf() is called, causing subsequent charts to overlap unintentionally.'
    };
  }

  if (clean.includes('dictionary') || clean.includes('dictionaries')) {
    return {
      wrongCode: `# Direct square bracket lookup on missing key:\nval = my_dict["missing_key"]  # Raises KeyError!`,
      correctCode: `# Use .get() method with a fallback default:\nval = my_dict.get("missing_key", None)`,
      explanation: 'Accessing a non-existent key with square brackets raises KeyError. Using dict.get(key, default) avoids pipeline crashes.'
    };
  }

  if (clean.includes('loc') || clean.includes('iloc') || clean.includes('subset') || clean.includes('filter')) {
    return {
      wrongCode: `# Using Python 'and'/'or' for Series boolean filtering:\ndf[df["price"] > 100 and df["region"] == "East"]`,
      correctCode: `# Use bitwise & and | with parentheses around each condition:\ndf[(df["price"] > 100) & (df["region"] == "East")]`,
      explanation: 'Pandas requires bitwise operators (& and |) with parentheses. Standard Python and/or operators fail because the truth value of a whole Series is ambiguous.'
    };
  }

  if (clean.includes('join') || clean.includes('merge')) {
    return {
      wrongCode: `# Merging with mismatched key data types (string vs int):\npd.merge(df1, df2, on="customer_id")  # Empty result or TypeError!`,
      correctCode: `# Cast keys to matching data types before merging:\ndf1["customer_id"] = df1["customer_id"].astype(int)\ndf2["customer_id"] = df2["customer_id"].astype(int)\npd.merge(df1, df2, on="customer_id")`,
      explanation: 'Pandas strictly requires merge key columns to share the exact same data type. If one column is string and another is integer, the join matches zero records.'
    };
  }

  return {
    wrongCode: `# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!`,
    correctCode: `# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()`,
    explanation: 'Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable.'
  };
}

function getLessonChallenge(title, parentModule, lessonIndex) {
  if (LESSON_ENRICHMENTS[title]?.challenge) {
    return LESSON_ENRICHMENTS[title].challenge;
  }

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

// 8 Practical Exercises requested by user
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
    title: '3. Replace Missing Values in Columns',
    difficulty: 'Beginner',
    category: 'Data Cleaning',
    context: 'Missing data causes arithmetic failures and incorrect downstream report generation. Identify and impute missing values.',
    goal: "Read 'customers.csv'. Count missing values in the `email` column using `.isna().sum()`. Impute missing emails with the placeholder `'unspecified@customer.internal'`. Save to `filled_customers`.",
    csvsUsed: ['customers.csv'],
    starterCode: `import pandas as pd

customers = pd.read_csv('customers.csv')

# Count missing emails
missing_count = None

# Impute missing values
filled_customers = customers.copy()
# your code here

print("Missing count:", missing_count)
print("Any nulls remaining?", filled_customers['email'].isna().any())
`,
    expectedCode: `import pandas as pd

customers = pd.read_csv('customers.csv')
missing_count = customers['email'].isna().sum()
filled_customers = customers.copy()
filled_customers['email'] = filled_customers['email'].fillna('unspecified@customer.internal')
print("Missing count:", missing_count)
print("Any nulls remaining?", filled_customers['email'].isna().any())
`,
    validationScript: `assert 'filled_customers' in locals(), "Variable 'filled_customers' must be defined"
assert filled_customers['email'].isna().sum() == 0, "No null values should remain in 'email' column"
`,
    hints: [
      "Count missing values with customers['email'].isna().sum().",
      "Fill missing values using filled_customers['email'].fillna('unspecified@customer.internal')."
    ],
    walkthrough: "fillna() safely replaces NaN placeholders without altering existing valid records."
  },
  {
    id: 'py-ex-4-average-sales-per-region',
    order: 4,
    title: '4. Calculate Average Sales per Region',
    difficulty: 'Intermediate',
    category: 'Data Transformation',
    context: 'The executive team wants regional performance metrics to guide territory marketing budget allocations.',
    goal: "Read 'sales.csv'. Group by the `region` column and calculate both the average (`mean`) and total (`sum`) `sale_amount`. Round results to 2 decimal places. Assign to `regional_metrics`.",
    csvsUsed: ['sales.csv'],
    starterCode: `import pandas as pd

sales = pd.read_csv('sales.csv')

# Group by region and aggregate sale_amount with mean and sum
regional_metrics = None

print(regional_metrics)
`,
    expectedCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
regional_metrics = sales.groupby('region')['sale_amount'].agg(['mean', 'sum']).round(2)
print(regional_metrics)
`,
    validationScript: `assert 'regional_metrics' in locals(), "Variable 'regional_metrics' must be defined"
assert len(regional_metrics) == 4, "Expected 4 regions"
assert 'mean' in regional_metrics.columns, "Aggregations must include 'mean'"
assert 'sum' in regional_metrics.columns, "Aggregations must include 'sum'"
`,
    hints: [
      "Use sales.groupby('region')['sale_amount'].agg(['mean', 'sum']).",
      "Call .round(2) on the resulting grouped dataframe."
    ],
    walkthrough: "groupby() splits records into buckets, applies aggregate statistical functions, and recombines the results into a compact summary table."
  },
  {
    id: 'py-ex-5-merge-datasets',
    order: 5,
    title: '5. Merge Two Datasets Using a Common Column',
    difficulty: 'Intermediate',
    category: 'Data Merging',
    context: 'In data warehousing, transactional purchase orders must be enriched with customer demographic profiles.',
    goal: "Read 'sales.csv' and 'customers.csv'. Merge them on `customer_id` using an `inner` join. Store the result in `sales_with_customers`. Verify that the merged result has the customer's `first_name` and `city`.",
    csvsUsed: ['sales.csv', 'customers.csv'],
    starterCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
customers = pd.read_csv('customers.csv')

# Inner merge sales and customers on customer_id
sales_with_customers = None

print(sales_with_customers.head(3))
`,
    expectedCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
customers = pd.read_csv('customers.csv')
sales_with_customers = pd.merge(sales, customers, on='customer_id', how='inner')
print(sales_with_customers.head(3))
`,
    validationScript: `assert 'sales_with_customers' in locals(), "Variable 'sales_with_customers' must be created"
assert 'first_name' in sales_with_customers.columns, "Merged dataset must contain 'first_name'"
assert len(sales_with_customers) > 0, "Merged result should contain rows"
`,
    hints: [
      "Use pd.merge(sales, customers, on='customer_id', how='inner')."
    ],
    walkthrough: "pd.merge() matches foreign keys across two DataFrames, producing an enriched relational table."
  },
  {
    id: 'py-ex-6-convert-dates',
    order: 6,
    title: '6. Convert Dates into a Consistent Format',
    difficulty: 'Intermediate',
    category: 'Data Validation',
    context: 'Transaction dates exported from legacy systems often arrive as raw strings, preventing time-series math.',
    goal: "Read 'sales.csv'. Convert the `sale_date` column to datetime objects using `pd.to_datetime()`. Extract the year and month into a new column named `year_month` formatted as 'YYYY-MM'. Assign to `sales_dated`.",
    csvsUsed: ['sales.csv'],
    starterCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
sales_dated = sales.copy()

# Step 1: Convert sale_date to datetime
# your code here

# Step 2: Create 'year_month' column using dt.strftime('%Y-%m')
# your code here

print(sales_dated[['sale_id', 'sale_date', 'year_month']].head(5))
`,
    expectedCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
sales_dated = sales.copy()
sales_dated['sale_date'] = pd.to_datetime(sales_dated['sale_date'])
sales_dated['year_month'] = sales_dated['sale_date'].dt.strftime('%Y-%m')
print(sales_dated[['sale_id', 'sale_date', 'year_month']].head(5))
`,
    validationScript: `assert 'sales_dated' in locals(), "sales_dated must be defined"
assert pd.api.types.is_datetime64_any_dtype(sales_dated['sale_date']), "sale_date must be converted to datetime"
assert 'year_month' in sales_dated.columns, "sales_dated must have 'year_month' column"
`,
    hints: [
      "Use sales_dated['sale_date'] = pd.to_datetime(sales_dated['sale_date']).",
      "Use sales_dated['sale_date'].dt.strftime('%Y-%m') to format."
    ],
    walkthrough: "pd.to_datetime() parses string timestamps into POSIX datetimes, unlocking accessor methods like .dt.year, .dt.month, and time-based indexing."
  },
  {
    id: 'py-ex-7-export-cleaned-data',
    order: 7,
    title: '7. Export Cleaned Data to CSV',
    difficulty: 'Beginner',
    category: 'Automation',
    context: 'After completing data cleansing pipelines, data engineers export artifacts to S3 or downstream consumers without raw index noise.',
    goal: "Filter 'sales.csv' to include only transactions with `sale_amount >= 200`. Save the filtered records to a file named `'high_value_sales.csv'` using `.to_csv(index=False)`. Confirm the exported file exists by reading it back into `exported_df`.",
    csvsUsed: ['sales.csv'],
    starterCode: `import pandas as pd

sales = pd.read_csv('sales.csv')

# Step 1: Filter sale_amount >= 200
high_value = None

# Step 2: Export to 'high_value_sales.csv' without index
# your code here

# Step 3: Read back into exported_df to verify
exported_df = None

print("Exported rows:", len(exported_df) if exported_df is not None else 0)
`,
    expectedCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
high_value = sales[sales['sale_amount'] >= 200]
high_value.to_csv('high_value_sales.csv', index=False)
exported_df = pd.read_csv('high_value_sales.csv')
print("Exported rows:", len(exported_df))
`,
    validationScript: `assert 'exported_df' in locals(), "Variable 'exported_df' must be defined"
assert (exported_df['sale_amount'] >= 200).all(), "All exported rows must have sale_amount >= 200"
`,
    hints: [
      "Filter with sales[sales['sale_amount'] >= 200].",
      "Export with high_value.to_csv('high_value_sales.csv', index=False).",
      "Verify by reading with pd.read_csv('high_value_sales.csv')."
    ],
    walkthrough: "Always pass index=False to to_csv() unless your DataFrame explicitly relies on an index that needs persistence; this avoids generating redundant 'Unnamed: 0' columns."
  },
  {
    id: 'py-ex-8-generate-summary-report',
    order: 8,
    title: '8. Generate an Automated KPI Summary Report',
    difficulty: 'Advanced',
    category: 'Automation',
    context: 'Automated executive dashboards require batch jobs that aggregate multiple data sources into a single structured KPI summary payload.',
    goal: "Ingest 'sales.csv' and 'employees.csv'. Calculate:\n1. `total_revenue`: sum of `sale_amount` in sales (rounded to 2 decimal places).\n2. `total_orders_count`: total number of sales records.\n3. `avg_order_value`: average sale amount (rounded to 2 decimal places).\n4. `total_payroll`: sum of `salary` in employees.\nStore these 4 metrics in a Python dictionary named `executive_report`. Print `executive_report`.",
    csvsUsed: ['sales.csv', 'employees.csv'],
    starterCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
employees = pd.read_csv('employees.csv')

# Compute KPIs
executive_report = {
    'total_revenue': None,
    'total_orders_count': None,
    'avg_order_value': None,
    'total_payroll': None
}

print("Executive KPI Summary:")
print(executive_report)
`,
    expectedCode: `import pandas as pd

sales = pd.read_csv('sales.csv')
employees = pd.read_csv('employees.csv')

executive_report = {
    'total_revenue': round(float(sales['sale_amount'].sum()), 2),
    'total_orders_count': int(len(sales)),
    'avg_order_value': round(float(sales['sale_amount'].mean()), 2),
    'total_payroll': round(float(employees['salary'].sum()), 2)
}

print("Executive KPI Summary:")
print(executive_report)
`,
    validationScript: `assert 'executive_report' in locals(), "Variable 'executive_report' must be defined"
assert 'total_revenue' in executive_report, "Report must include 'total_revenue'"
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
let lOrder = 1;

for (const [tabId, tabData] of Object.entries(tabs)) {
  if (tabData.nesting === 0) {
    continue; // parent header
  }

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
  const quickReference = getLessonQuickReference(tabData.title, tabData);
  const commonMistake = getLessonCommonMistake(tabData.title, tabData);

  LESSONS.push({
    id: `py-lesson-${tabId.replace(/\./g, '-')}`,
    tabId,
    moduleTitle: modTitle,
    moduleOrder: modId,
    lessonOrder: lOrder++,
    title: tabData.title,
    description: sections[0]?.body.slice(0, 160).replace(/\n/g, ' ') + '...' || `Master ${tabData.title} in Python.`,
    sections,
    quickReference,
    commonMistake,
    challenge
  });
}

console.log(`Generated ${LESSONS.length} Python lessons and ${PRACTICAL_EXERCISES.length} practical exercises.`);

// Write out TypeScript file
const fileContent = `export interface PythonLessonFormula {
  title: string;
  expression: string;
  explanation?: string;
  variables?: { name: string; meaning: string }[];
}

export interface PythonLessonSection {
  title: string;
  body: string;
  exampleCode?: string;
  formula?: PythonLessonFormula;
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

export interface PythonCommonMistake {
  wrongCode: string;
  correctCode: string;
  explanation: string;
}

export interface PythonQuickReference {
  goal: string;
  syntax: string;
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
  quickReference?: PythonQuickReference[];
  commonMistake?: PythonCommonMistake;
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
