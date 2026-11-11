export interface PythonLessonFormula {
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

export const PYTHON_MODULES = [
  {
    "id": 1,
    "title": "Part 1: Python & NumPy Foundations",
    "description": "Learn variables, lists, slicing, functions, methods, packages, and master NumPy arrays and vectorization."
  },
  {
    "id": 2,
    "title": "Part 2: Intermediate Python & Visualizations",
    "description": "Master Matplotlib plots & histograms, dictionaries, pandas Series/DataFrames, boolean filtering, and loops."
  },
  {
    "id": 3,
    "title": "Part 3: Data Manipulation with pandas",
    "description": "Explore DataFrames, sorting, new columns, summary statistics, groupby aggregations, pivot tables, and missing values."
  },
  {
    "id": 4,
    "title": "Part 4: Relational Data & Joining with pandas",
    "description": "Connect datasets with inner, left, outer, and self joins, vertical concatenations, integrity checks, and ordered merges."
  }
];

export const PYTHON_LESSONS: PythonLesson[] = [
  {
    "id": "py-lesson-t-2xydjr19tt6b",
    "tabId": "t.2xydjr19tt6b",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 1,
    "title": "Introduction to Python for Data Science",
    "description": "The course is hosted by Hugo, a data scientist and educator at DataCamp. It is designed to teach Python for Data Science through a combination of video lessons ...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "The course is hosted by Hugo, a data scientist and educator at DataCamp. It is designed to teach Python for Data Science through a combination of video lessons and interactive exercises. You will have access to your own Python session where you can experiment with code, try to solve exercises, and receive instant feedback. This “learning by doing” approach ensures that you build your coding skills gradually and effectively."
      },
      {
        "title": "2. About Python",
        "body": "Python was created by Guido van Rossum and began as a hobby project that eventually evolved into a widely used general-purpose programming language. There are a few reasons why Python has become so popular:\n\nOpen Source: Python is free to use and share.\n\nPackage Ecosystem: Python allows developers to build and share packages—prewritten code that solves specific problems. Over time, many data science–specific packages have been created.\n\nFor example, if you want to:\n\nMake visualizations of sales data, there’s a package for that.\n\nConnect to a database to analyze sensor measurements, there’s a package for that too.\n\nBecause of its flexibility, Python is often referred to as the Swiss Army knife of programming languages, capable of handling almost any programming task. In this course, you will gradually develop your data science coding skills to harness the power of Python."
      },
      {
        "title": "3. Experimenting with Python: IPython Shell",
        "body": "The course introduces the IPython Shell, an enhanced interactive Python environment. Unlike a standard Python shell, IPython provides additional features that make coding and testing snippets of Python easier.\n\nYou can type Python code and immediately see the result.\n\nFor example, typing 4 + 5 and pressing Enter outputs 9.\n\nIPython is part of the broader Jupyter ecosystem and was created by Fernando Pérez.\n\nUsing the IPython Shell is ideal for experimentation and testing ideas before turning them into structured scripts."
      },
      {
        "title": "4. Python Scripts",
        "body": "A Python script is simply a text file with a .py extension that contains a series of Python commands. Scripts allow you to:\n\nOrganize code systematically.\n\nAvoid retyping commands repeatedly—just modify the script and rerun it.\n\nWhen executing scripts, output does not automatically appear unless you use print() statements. For example, wrapping the calculation 4 + 5 in a print() call will display the result in the output pane."
      },
      {
        "title": "5. Using the DataCamp Interface",
        "body": "In the DataCamp environment, you have two main ways to work with Python:\n\nIPython Shell: Best for experimenting and testing code snippets.\n\nPython Script Editor: Use this to write structured code that will be executed and checked for correctness.\n\nBy combining both, you can explore Python interactively and then formalize your solutions in scripts for submission."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Introduction to Python for Data Science",
      "scenario": "Apply the concepts learned in Introduction to Python for Data Science to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Introduction to Python for Data Science.",
      "starterCode": "# Practice Challenge: Introduction to Python for Data Science\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-c8oos18bpn0n",
    "tabId": "t.c8oos18bpn0n",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 2,
    "title": "Variables and Types in Python",
    "description": "Python allows you to store values in variables, which is essential when performing multi-step calculations. A variable is a named storage container for a value ...",
    "sections": [
      {
        "title": "1. What are Variables?",
        "body": "Python allows you to store values in variables, which is essential when performing multi-step calculations. A variable is a named storage container for a value in memory.\n\n• **Case-Sensitive**: Python variable names are case-sensitive (`Height` and `height` are two different variables).\n• **Assignment**: Use the equals sign (`=`) to assign a value to a variable.\n• **Retrieval**: Once defined, simply reference the variable name to fetch its stored value.",
        "exampleCode": "# Storing values in variables\nheight = 1.79   # Height in meters\nweight = 68.7   # Weight in kilograms\n\n# Inspecting assigned variables\nprint(\"Height:\", height)\nprint(\"Weight:\", weight)"
      },
      {
        "title": "2. Calculating Body Mass Index (BMI)",
        "body": "Variables make complex calculations reusable and readable. For example, Body Mass Index (BMI) is calculated by dividing body weight in kilograms by the square of body height in meters.\n\nIn Python, you can calculate BMI directly using your assigned variables. Storing the result in a new variable, `bmi`, creates a reusable metric across your analytical scripts.",
        "formula": {
          "title": "Body Mass Index (BMI) Formula",
          "expression": "BMI = weight / (height ** 2)",
          "variables": [
            {
              "name": "weight",
              "meaning": "Body weight measured in kilograms (kg)"
            },
            {
              "name": "height",
              "meaning": "Height measured in meters (m)"
            },
            {
              "name": "** 2",
              "meaning": "Python exponentiation operator (squared)"
            }
          ]
        },
        "exampleCode": "# Calculate BMI using variables\nheight = 1.79\nweight = 68.7\n\n# BMI = weight / (height ** 2)\nbmi = weight / (height ** 2)\nprint(\"Calculated BMI:\", round(bmi, 2))  # Output: 21.44"
      },
      {
        "title": "3. Reproducibility with Variables",
        "body": "If your BMI calculation is written in a script, updating calculations for a different person or timestamp is effortless.\n\nSimply change the `weight` variable and re-run the script. The `bmi` variable automatically recalculates with the new value—without needing to rewrite any formulas. This demonstrates why variables are fundamental: they make code dynamic and adaptable.",
        "exampleCode": "# Easily update weight without rewriting the formula\nheight = 1.79\nweight = 75.0  # Updated weight\n\nbmi = weight / (height ** 2)\nprint(\"Updated BMI:\", round(bmi, 2))  # Output: 23.41"
      },
      {
        "title": "4. Core Python Data Types",
        "body": "Every value in Python belongs to a specific data type that defines what operations can be performed on it. You can inspect any variable's type using the built-in `type()` function:\n\n• **`int` (Integer)**: Whole numbers without fractional parts (e.g. `21`, `100`, `-5`).\n• **`float` (Floating Point)**: Real numbers with fractional decimal points (e.g. `1.79`, `21.44`).\n• **`str` (String)**: Text sequences enclosed in either single (`'...'`) or double (`\"...\"`) quotes.\n• **`bool` (Boolean)**: Logical truth values—either `True` or `False`—vital for filtering and conditional logic.",
        "exampleCode": "# Checking Python data types\nage = 21\nbmi = 21.44\ncity = \"New York\"\nis_active = True\n\nprint(type(age))        # <class 'int'>\nprint(type(bmi))        # <class 'float'>\nprint(type(city))       # <class 'str'>\nprint(type(is_active))  # <class 'bool'>"
      },
      {
        "title": "5. Type-Dependent Behavior",
        "body": "Python operators behave differently depending on the operand data types. This principle is called **type-dependent behavior**:\n\n• **Integers & Floats (`+`)**: Performs mathematical addition (`5 + 5` = `10`).\n• **Strings (`+`)**: Performs concatenation, joining texts together (`\"data\" + \"frame\"` = `\"dataframe\"`).\n• **Mismatched Types**: Adding a string and a number (`\"age: \" + 21`) raises a `TypeError`. You must explicitly convert numbers using `str()`.",
        "exampleCode": "# Math addition\nprint(5 + 5)                # 10\n\n# String concatenation\nprint(\"data\" + \"frame\")     # 'dataframe'\n\n# Explicit casting when combining types\nprint(\"My age is \" + str(21))  # 'My age is 21'"
      }
    ],
    "quickReference": [
      {
        "goal": "Assign integer variable",
        "syntax": "x = 42"
      },
      {
        "goal": "Assign float (decimal)",
        "syntax": "price = 19.99"
      },
      {
        "goal": "Assign text string",
        "syntax": "city = \"Chicago\""
      },
      {
        "goal": "Assign boolean literal",
        "syntax": "is_active = True"
      },
      {
        "goal": "Inspect data type",
        "syntax": "type(variable)"
      },
      {
        "goal": "Exponentiation (power of 2)",
        "syntax": "height ** 2"
      },
      {
        "goal": "Convert integer/float to string",
        "syntax": "str(42)"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Mistake 1: Exponentiation syntax confusion or lack of parentheses\nbmi = weight / height ** 2\n\n# Mistake 2: Concatenating string and integer without casting\nprint(\"Total: \" + 100)  # Raises TypeError!",
      "correctCode": "# Parentheses ensure clear mathematical precedence:\nbmi = weight / (height ** 2)\n\n# Explicitly cast numbers using str():\nprint(\"Total: \" + str(100))",
      "explanation": "In Python, ** has higher precedence than /, but using parentheses (height ** 2) eliminates any ambiguity. Also, Python will not automatically coerce numbers to strings when using +; you must call str(number)."
    },
    "challenge": {
      "title": "Calculate Patient BMI and Verify Data Types",
      "scenario": "The hospital analytics unit needs to calculate the Body Mass Index (BMI) for incoming patients and verify that the calculated metric is stored as a floating-point number.",
      "instructions": "1. Given patient height of `1.82` meters and weight of `78.4` kilograms, calculate `bmi = weight / (height ** 2)` and round to 2 decimal places using `round()`.\n2. Assign the result to `bmi`.\n3. Inspect the data type of `bmi` using `type(bmi)` and assign the type to `bmi_type`.\n4. Print `bmi` and `bmi_type`.",
      "starterCode": "# Patient vitals\nheight = 1.82  # meters\nweight = 78.4  # kg\n\n# 1. Calculate BMI and round to 2 decimal places\nbmi = None\n\n# 2. Inspect type using type()\nbmi_type = None\n\nprint(\"BMI:\", bmi)\nprint(\"Type:\", bmi_type)\n",
      "expectedCode": "height = 1.82\nweight = 78.4\nbmi = round(weight / (height ** 2), 2)\nbmi_type = type(bmi)\nprint(\"BMI:\", bmi)\nprint(\"Type:\", bmi_type)\n",
      "validationScript": "assert 'bmi' in locals(), \"Variable 'bmi' must be defined\"\nassert 'bmi_type' in locals(), \"Variable 'bmi_type' must be defined\"\nassert abs(bmi - 23.67) < 0.05, f\"Expected BMI to be ~23.67, got {bmi}\"\nassert bmi_type == float, \"bmi_type should be float\"\n",
      "hints": [
        "Use weight / (height ** 2) to compute BMI.",
        "Use round(val, 2) to round to two decimal places.",
        "Assign type(bmi) to bmi_type."
      ],
      "solutionExplanation": "Storing calculations in variables enables reproducible downstream analysis, while type() ensures data validation before pipeline ingestion."
    }
  },
  {
    "id": "py-lesson-t-5u8yp8e7fzom",
    "tabId": "t.5u8yp8e7fzom",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 3,
    "title": "Python Lists",
    "description": "Basic data types like `int`, `float`, `str`, and `bool` store individual scalar values. However, data analysis requires handling collections of data points—such...",
    "sections": [
      {
        "title": "1. Introduction to Python Lists",
        "body": "Basic data types like `int`, `float`, `str`, and `bool` store individual scalar values. However, data analysis requires handling collections of data points—such as sensor temperatures, employee salaries, or customer IDs.\n\nA **list** is a compound data structure that stores multiple items in an ordered sequence under a single variable name. Lists are created using square brackets `[ ]` with elements separated by commas.",
        "exampleCode": "# Creating a list of family heights (in meters)\nfam = [1.73, 1.68, 1.71, 1.89]\nprint(\"Family heights:\", fam)\nprint(\"Total family members:\", len(fam))"
      },
      {
        "title": "2. Storing Heterogeneous & Mixed Types",
        "body": "Unlike arrays in some other programming languages, Python lists can store elements of **any** data type together in the same list:\n\n• **Numbers**: Integers and floats\n• **Strings**: Text sequences\n• **Booleans**: Logical flags\n• **Nested Lists**: Lists containing other lists",
        "exampleCode": "# Mixed-type list containing names and heights\nfam_mixed = [\"liz\", 1.73, \"emma\", 1.68, \"mom\", 1.71, \"dad\", 1.89]\nprint(fam_mixed)"
      },
      {
        "title": "3. Nested Sublists (2D Collections)",
        "body": "To organize paired data more cleanly, you can group related items into sublists. For instance, pairing each person's name and height into a 2-element sublist creates a list of lists.\n\nThis nested structure is the foundational conceptual model for tabular data (rows and columns) before moving to NumPy matrices and pandas DataFrames.",
        "exampleCode": "# List of sublists (each sublist represents one record)\nfam_nested = [\n    [\"liz\", 1.73],\n    [\"emma\", 1.68],\n    [\"mom\", 1.71],\n    [\"dad\", 1.89]\n]\nprint(\"Nested list:\", fam_nested)\nprint(\"First record:\", fam_nested[0])"
      }
    ],
    "quickReference": [
      {
        "goal": "Create an empty list",
        "syntax": "my_list = []"
      },
      {
        "goal": "Create a numeric list",
        "syntax": "prices = [19.99, 49.50, 9.99]"
      },
      {
        "goal": "Get list length (count)",
        "syntax": "len(prices)"
      },
      {
        "goal": "Create nested 2D list",
        "syntax": "matrix = [[1, 2], [3, 4]]"
      },
      {
        "goal": "Check list type",
        "syntax": "type(prices) # <class 'list'>"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Using parentheses () instead of square brackets []:\nmy_list = (1, 2, 3)  # This creates an immutable tuple, NOT a list!",
      "correctCode": "# Always use square brackets [] for lists:\nmy_list = [1, 2, 3]",
      "explanation": "Parentheses (1, 2, 3) create a tuple, which cannot be modified in-place. Square brackets [1, 2, 3] create a mutable list."
    },
    "challenge": {
      "title": "Assemble a Multi-Metric Warehouse Inventory List",
      "scenario": "The logistics warehouse needs to bundle product SKU tags, quantities on hand, and replenishment status into an organized Python list structure.",
      "instructions": "1. Create a list named `inventory` containing 4 items: SKU string `\"SKU-902\"`, stock integer `450`, unit price float `19.95`, and in-stock boolean `True`.\n2. Compute the total item count using `len(inventory)` and assign to `item_count`.\n3. Print `inventory` and `item_count`.",
      "starterCode": "# Build warehouse inventory record\n# 1. Create list with SKU, stock, price, and status\ninventory = None\n\n# 2. Get length\nitem_count = None\n\nprint(\"Inventory:\", inventory)\nprint(\"Item count:\", item_count)\n",
      "expectedCode": "inventory = [\"SKU-902\", 450, 19.95, True]\nitem_count = len(inventory)\nprint(\"Inventory:\", inventory)\nprint(\"Item count:\", item_count)\n",
      "validationScript": "assert 'inventory' in locals(), \"inventory must be defined\"\nassert isinstance(inventory, list), \"inventory must be a list\"\nassert len(inventory) == 4, \"inventory should contain 4 items\"\nassert inventory[0] == \"SKU-902\", \"First item should be 'SKU-902'\"\nassert item_count == 4, \"item_count must equal 4\"\n",
      "hints": [
        "Use square brackets: inventory = [\"SKU-902\", 450, 19.95, True].",
        "Use len(inventory) to calculate item_count."
      ],
      "solutionExplanation": "Lists allow data pipelines to bundle heterogeneous attributes into unified records for batch serialization."
    }
  },
  {
    "id": "py-lesson-t-46vxscplspgb",
    "tabId": "t.46vxscplspgb",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 4,
    "title": "Subsetting and Slicing Python Lists",
    "description": "Python uses **zero-based indexing**, meaning the first element in a list is at index `0`, the second is at index `1`, and so on.  To access a specific element, ...",
    "sections": [
      {
        "title": "1. Zero-Based Indexing",
        "body": "Python uses **zero-based indexing**, meaning the first element in a list is at index `0`, the second is at index `1`, and so on.\n\nTo access a specific element, write the list name followed by the index in square brackets: `list[index]`.",
        "exampleCode": "fam = [\"liz\", 1.73, \"emma\", 1.68, \"mom\", 1.71, \"dad\", 1.89]\n\nprint(\"First element (index 0):\", fam[0])   # 'liz'\nprint(\"Second element (index 1):\", fam[1])  # 1.73"
      },
      {
        "title": "2. Negative Indexing (From the End)",
        "body": "Python also supports negative indexing to count backwards from the end of the list:\n\n• `list[-1]`: The very last element\n• `list[-2]`: The second-to-last element\n\nThis is extremely convenient when you don't know or don't want to calculate the length of the list.",
        "exampleCode": "fam = [\"liz\", 1.73, \"emma\", 1.68, \"mom\", 1.71, \"dad\", 1.89]\n\nprint(\"Last element (-1):\", fam[-1])            # 1.89\nprint(\"Second to last element (-2):\", fam[-2])  # 'dad'"
      },
      {
        "title": "3. List Slicing (`start:end`)",
        "body": "Slicing extracts a contiguous sub-range of elements using the syntax `list[start:end]`.\n\n• **Start is Inclusive**: The element at index `start` is included.\n• **End is Exclusive**: The slice stops *before* reaching index `end`.\n• **Omitting bounds**: `list[:3]` starts from the beginning; `list[4:]` slices through the very end.",
        "exampleCode": "fam = [\"liz\", 1.73, \"emma\", 1.68, \"mom\", 1.71, \"dad\", 1.89]\n\n# Slice elements at index 3 and 4 (stops before 5)\nmiddle = fam[3:5]\nprint(\"Middle slice [3:5]:\", middle)  # [1.68, 'mom']\n\n# Slice first 4 elements\nfirst_four = fam[:4]\nprint(\"First 4 elements [:4]:\", first_four)\n\n# Slice from index 5 to end\ntail = fam[5:]\nprint(\"From index 5 to end [5:]:\", tail)"
      }
    ],
    "quickReference": [
      {
        "goal": "Get first element",
        "syntax": "lst[0]"
      },
      {
        "goal": "Get last element",
        "syntax": "lst[-1]"
      },
      {
        "goal": "Slice from index 1 to 3 (exclusive)",
        "syntax": "lst[1:3]"
      },
      {
        "goal": "Slice first N elements",
        "syntax": "lst[:N]"
      },
      {
        "goal": "Slice from index N to end",
        "syntax": "lst[N:]"
      },
      {
        "goal": "Full shallow copy slice",
        "syntax": "lst[:]"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Expecting lst[1:3] to include index 3:\nsub = fam[1:3]  # Only contains indices 1 and 2!\n\n# Out-of-bounds index:\nlast = fam[len(fam)]  # Raises IndexError!",
      "correctCode": "# To include index 3, set end to 4:\nsub = fam[1:4]\n\n# Use -1 or len(fam) - 1 for last element:\nlast = fam[-1]",
      "explanation": "Slices are half-open intervals [start, end), where the end index is excluded. Python lists are 0-indexed, so index len(list) is out of bounds."
    },
    "challenge": {
      "title": "Extract Regional Store Sales via Indexing & Slicing",
      "scenario": "The regional retail manager wants to isolate the top-performing stores and the baseline stores from a quarterly sales report list.",
      "instructions": "Given `sales = [12000, 18500, 24000, 31000, 42000, 56000]`:\n1. Extract the last store's sales using negative indexing into `top_store`.\n2. Slice the middle stores (index `2` through `4` inclusive) into `mid_stores`.\n3. Print `top_store` and `mid_stores`.",
      "starterCode": "sales = [12000, 18500, 24000, 31000, 42000, 56000]\n\n# 1. Last element using negative index\ntop_store = None\n\n# 2. Slice index 2 through 4 (remember end index is exclusive)\nmid_stores = None\n\nprint(\"Top store:\", top_store)\nprint(\"Mid stores:\", mid_stores)\n",
      "expectedCode": "sales = [12000, 18500, 24000, 31000, 42000, 56000]\ntop_store = sales[-1]\nmid_stores = sales[2:5]\nprint(\"Top store:\", top_store)\nprint(\"Mid stores:\", mid_stores)\n",
      "validationScript": "assert top_store == 56000, \"top_store must be 56000\"\nassert mid_stores == [24000, 31000, 42000], f\"Expected [24000, 31000, 42000], got {mid_stores}\"\n",
      "hints": [
        "Use sales[-1] for the last store.",
        "To include index 4, use slice sales[2:5]."
      ],
      "solutionExplanation": "Zero-based indexing and half-open slicing are universal paradigms across Python, NumPy arrays, and pandas Series."
    }
  },
  {
    "id": "py-lesson-t-e8b4sj7oaf2z",
    "tabId": "t.e8b4sj7oaf2z",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 5,
    "title": "Manipulating Python Lists",
    "description": "Python lists are **mutable**, which means you can update their elements in-place without creating a brand new list.  To update an element, select it using index...",
    "sections": [
      {
        "title": "1. Changing List Elements",
        "body": "Python lists are **mutable**, which means you can update their elements in-place without creating a brand new list.\n\nTo update an element, select it using index notation and assign a new value with `=`.",
        "exampleCode": "fam = [\"liz\", 1.73, \"emma\", 1.68, \"mom\", 1.71, \"dad\", 1.89]\n\n# Update Emma's height at index 3\nfam[3] = 1.69\nprint(\"Updated list:\", fam)"
      },
      {
        "title": "2. Adding and Removing Elements",
        "body": "You can concatenate lists together using the `+` operator, or delete specific items using the `del` keyword:\n\n• **Concatenation (`+`)**: Joins two lists together into a new expanded list.\n• **Deletion (`del`)**: Removes an element at a specified index in-place.",
        "exampleCode": "fam = [\"liz\", 1.73, \"emma\", 1.68, \"mom\", 1.71, \"dad\", 1.89]\n\n# Append new family member using +\nfam_ext = fam + [\"me\", 1.79]\nprint(\"Extended list:\", fam_ext)\n\n# Delete 'dad' and his height\ndel fam_ext[6:8]\nprint(\"After deletion:\", fam_ext)"
      },
      {
        "title": "3. Behind the Scenes: Memory References vs Copies",
        "body": "When you assign `y = x`, Python does **not** make a copy of the list. Instead, it copies the reference pointing to the same list in memory! Any modification to `y` will immediately change `x` as well.\n\nTo create a completely independent copy, use `list(x)` or slice `x[:]`.",
        "exampleCode": "# The copy trap:\nx = [\"a\", \"b\", \"c\"]\ny = x          # Copies REFERENCE, not list!\ny[1] = \"z\"\nprint(\"x is also modified:\", x)  # ['a', 'z', 'c']\n\n# Safe independent copy:\nx = [\"a\", \"b\", \"c\"]\ny = list(x)    # or y = x[:]\ny[1] = \"z\"\nprint(\"x remains intact:\", x)   # ['a', 'b', 'c']"
      }
    ],
    "quickReference": [
      {
        "goal": "Update element in-place",
        "syntax": "lst[i] = new_val"
      },
      {
        "goal": "Concatenate two lists",
        "syntax": "combined = lst1 + lst2"
      },
      {
        "goal": "Delete element by index",
        "syntax": "del lst[i]"
      },
      {
        "goal": "Create independent shallow copy",
        "syntax": "copied = list(lst) # or lst[:]"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Shallow reference alias bug:\nx = [1, 2, 3]\ny = x\ny[0] = 99  # Modifies x as well!",
      "correctCode": "# Create a true independent copy:\nx = [1, 2, 3]\ny = list(x) # or x[:]\ny[0] = 99  # x remains [1, 2, 3]",
      "explanation": "In Python, variables store references to compound objects in memory. Simple assignment (y = x) binds a new name to the exact same list."
    },
    "challenge": {
      "title": "Safely Clone and Modify Server Cluster Nodes",
      "scenario": "The infrastructure automation pipeline needs to duplicate a base server cluster list and add standby backup nodes without mutating the production configuration.",
      "instructions": "Given `base_cluster = [\"node-1\", \"node-2\", \"node-3\"]`:\n1. Make an independent copy of `base_cluster` into `backup_cluster` using `list()` or `[:]`.\n2. Append `[\"standby-1\", \"standby-2\"]` to `backup_cluster` using the `+` operator.\n3. Modify the first element of `backup_cluster` to `\"primary-backup\"`.\n4. Print `base_cluster` and `backup_cluster` (verify `base_cluster` did not change).",
      "starterCode": "base_cluster = [\"node-1\", \"node-2\", \"node-3\"]\n\n# 1. Independent copy\nbackup_cluster = None\n\n# 2. Append standby nodes\n# 3. Modify first node\n\nprint(\"Base cluster:\", base_cluster)\nprint(\"Backup cluster:\", backup_cluster)\n",
      "expectedCode": "base_cluster = [\"node-1\", \"node-2\", \"node-3\"]\nbackup_cluster = list(base_cluster) + [\"standby-1\", \"standby-2\"]\nbackup_cluster[0] = \"primary-backup\"\nprint(\"Base cluster:\", base_cluster)\nprint(\"Backup cluster:\", backup_cluster)\n",
      "validationScript": "assert base_cluster == [\"node-1\", \"node-2\", \"node-3\"], \"base_cluster must not be mutated\"\nassert backup_cluster == [\"primary-backup\", \"node-2\", \"node-3\", \"standby-1\", \"standby-2\"], f\"Incorrect backup_cluster: {backup_cluster}\"\n",
      "hints": [
        "Use backup_cluster = list(base_cluster) to avoid reference aliasing.",
        "Add standby nodes with + [\"standby-1\", \"standby-2\"]."
      ],
      "solutionExplanation": "Explicitly cloning lists protects against mutation side-effects across asynchronous data transformation pipelines."
    }
  },
  {
    "id": "py-lesson-t-q5o6gvdjurex",
    "tabId": "t.q5o6gvdjurex",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 6,
    "title": "Functions in Python",
    "description": "Functions are reusable pieces of code designed to perform a specific task. You’ve already used functions in Python without realizing it—for example, the type() ...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Functions are reusable pieces of code designed to perform a specific task. You’ve already used functions in Python without realizing it—for example, the type() function returns the type of a value. Instead of writing code manually every time you want to perform a task, functions allow you to call them with input values and get results automatically."
      },
      {
        "title": "2. Using Functions: Examples",
        "body": "Consider a list of family members’ heights stored in fam. To find the tallest height, instead of manually comparing each number, you can use Python’s built-in max() function:\n\nYou pass the list fam as an argument to max() inside parentheses.\n\nThe function then computes the maximum value and returns it.\n\nYou can assign the result to a new variable, e.g., tallest = max(fam), and use it like any other variable in further calculations.\n\nThe max() function acts like a black box: you don’t need to know its internal implementation—just that it works.\n\nAnother commonly used function is round(), which rounds numbers:\n\nround(number, ndigits) takes two arguments:\n\nnumber – the value to round\n\nndigits – how many decimal places to keep\n\nFor example, round(1.68, 1) rounds 1.68 to one decimal place, giving 1.7. If you call round() with only one argument, Python automatically rounds to the nearest integer because ndigits is an optional argument. Internally, the function uses these arguments like variables to perform the calculation and return a result."
      },
      {
        "title": "3. Finding and Using Functions",
        "body": "Many common tasks in Python already have functions built in, or available through packages. You don’t need to reinvent the wheel—just search online or use resources like DataCamp to discover functions that solve your problem. Using built-in or well-documented functions will save time, reduce errors, and make your code more readable."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Functions in Python",
      "scenario": "Apply the concepts learned in Functions in Python to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Functions in Python.",
      "starterCode": "# Practice Challenge: Functions in Python\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-9pa088fo8r8g",
    "tabId": "t.9pa088fo8r8g",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 7,
    "title": "Methods in Python",
    "description": "In Python, functions like max(), len(), and round() are just one part of the story. Sometimes, tasks such as finding the index of an element in a list or revers...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "In Python, functions like max(), len(), and round() are just one part of the story. Sometimes, tasks such as finding the index of an element in a list or reversing a list are not covered by built-in functions. This is where methods come into play."
      },
      {
        "title": "2. Python Objects and Methods",
        "body": "Everything in Python is an object. Numbers, strings, lists, booleans—all of these are objects with a specific type, such as int, float, str, or list. In addition to representing values, Python objects come with methods, which are functions that “belong” to the object and are specific to its type.\n\nExamples of methods:\n\nStrings have methods like capitalize() and replace().\n\nLists have methods like index() and count().\n\nFloats, integers, and booleans also have their own specific methods.\n\nYou call a method using dot notation, for example, fam.index(\"mom\") returns the index of \"mom\" in the list fam. Similarly, fam.count(1.73) counts how many times 1.73 occurs in the list. For strings, sister.capitalize() returns the string with the first letter capitalized, and sister.replace(\"z\", \"sa\") replaces occurrences of \"z\" with \"sa\"."
      },
      {
        "title": "3. Key Principles About Methods",
        "body": "Methods depend on object type: The available methods vary depending on whether the object is a list, string, float, etc.\n\nSame method name, different behavior: Some methods exist on multiple types but behave differently. For instance, index() on a string returns the position of a character, while on a list it returns the position of an element.\n\nMethods can modify objects: Some methods, like append() on a list, modify the object in place. For example, fam.append(\"me\") adds \"me\" to the fam list. Others may return a new object without changing the original."
      },
      {
        "title": "4. Summary",
        "body": "In Python, you have:\n\nFunctions: General-purpose reusable code, such as max(), type(), and round().\n\nMethods: Functions that are specific to objects. Methods behave differently depending on the object type and can sometimes modify the object directly. They are accessed using dot notation and allow you to work efficiently with Python objects.\n\nUnderstanding the difference between functions and methods, and how methods depend on object types, is key to working effectively with Python data structures."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Methods in Python",
      "scenario": "Apply the concepts learned in Methods in Python to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Methods in Python.",
      "starterCode": "# Practice Challenge: Methods in Python\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-2p1s4tloh6kr",
    "tabId": "t.2p1s4tloh6kr",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 8,
    "title": "Packages",
    "description": "Python Packages  Python functions and methods are powerful, but including all available functions in the core Python distribution would be overwhelming and inef...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Python Packages\n\nPython functions and methods are powerful, but including all available functions in the core Python distribution would be overwhelming and inefficient. Most of the code would never be used, and maintaining it would be a huge challenge. This is where packages come in.\n\nA package is essentially a directory of Python scripts, where each script is called a module. Modules contain functions, methods, and new Python types aimed at solving specific problems. There are thousands of Python packages available online, many tailored for data science:\n\nNumPy: Efficiently works with arrays.\n\nMatplotlib: Used for data visualization.\n\nscikit-learn: Used for machine learning.\n\nNot all packages are included with Python by default, so you often need to install them before use. On your own system, this is usually done with pip, Python’s package management tool. The general workflow is:\n\nDownload get-pip.py and run it using python3 get-pip.py.\n\nInstall a package, e.g., pip3 install numpy.\n\nOnce installed, you need to import packages in your script to use them. There are several ways to do this:\n\nImport the whole package:\n\n`import numpy`\n\nTo use the array function, you call numpy.array(list).\n\nImport with an alias:\n\n`import numpy as np`\n\nThis allows you to write np.array(list) instead of numpy.array(list), making code shorter.\n\nImport specific functions:\n\n`from numpy import array`\n\nThis lets you call array(list) directly. While concise, it can make your code less clear for someone reading it later, because it’s not obvious that array comes from NumPy.\n\nFor clarity and readability, importing the full package is generally preferred, as numpy.array clearly shows that the function belongs to the NumPy package.",
        "exampleCode": "import numpy\nimport numpy as np\nfrom numpy import array"
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Packages",
      "scenario": "Apply the concepts learned in Packages to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Packages.",
      "starterCode": "# Practice Challenge: Packages\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-971t4n2aark5",
    "tabId": "t.971t4n2aark5",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 9,
    "title": "NumPy Overview",
    "description": "Python lists are powerful—they can hold different types, and you can change, add, or remove elements. However, when performing calculations over entire collecti...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Python lists are powerful—they can hold different types, and you can change, add, or remove elements. However, when performing calculations over entire collections of values, such as calculating BMIs for a family, lists become inefficient. Python cannot perform operations element-wise on lists, so trying to divide weights by squared heights directly results in an error. Doing it manually for each element is possible but tedious and slow."
      },
      {
        "title": "2. The Solution: NumPy",
        "body": "NumPy, short for Numeric Python, provides an elegant solution. It introduces NumPy arrays, which are similar to lists but come with a key advantage: you can perform operations across entire arrays element-wise. NumPy arrays are fast and efficient, making them ideal for data science tasks. To use NumPy, you install it via pip (pip3 install numpy) and then import it in your Python script:\n\n`import numpy as np`\n\nYou can then create arrays from regular Python lists:\n\n`np_height = np.array(height)`\n\n`np_weight = np.array(weight)`\n\nNow, calculating BMI for all family members can be done in a single, elegant line:\n\n`bmi = np_weight / np_height**2`",
        "exampleCode": "import numpy as np\nnp_height = np.array(height)\nnp_weight = np.array(weight)\nbmi = np_weight / np_height**2"
      },
      {
        "title": "3. Why NumPy Works",
        "body": "NumPy arrays are designed to contain values of a single type. If you try mixing types, NumPy will convert all elements to a compatible type, often to strings. They are a new kind of Python type, similar to float, str, or list, with their own methods and behavior. One key difference to note:\n\nPython lists: python_list + python_list → elements are concatenated.\n\nNumPy arrays: np_array + np_array → element-wise addition.\n\nThis difference can be subtle but is important when switching between types."
      },
      {
        "title": "4. Subsetting NumPy Arrays",
        "body": "Working with NumPy arrays is similar to lists, but there are additional features. You can subset arrays using square brackets, just like lists, e.g., bmi[1] retrieves the BMI of the second person. A more advanced feature is boolean subsetting:\n\nCreate a boolean array using a comparison, e.g., bmi > 23.\n\nUse this boolean array to select elements: bmi[bmi > 23].\n\nThis allows you to quickly filter data and extract meaningful insights, such as identifying family members with BMI above a certain threshold."
      }
    ],
    "quickReference": [
      {
        "goal": "Import NumPy",
        "syntax": "import numpy as np"
      },
      {
        "goal": "Create 1D array",
        "syntax": "arr = np.array([1, 2, 3])"
      },
      {
        "goal": "Element-wise multiplication",
        "syntax": "doubled = arr * 2"
      },
      {
        "goal": "Inspect 2D array shape",
        "syntax": "arr_2d.shape # (rows, cols)"
      },
      {
        "goal": "Select 2D row 0, col 1",
        "syntax": "arr_2d[0, 1]"
      },
      {
        "goal": "Select entire column",
        "syntax": "arr_2d[:, 0]"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Multiplying standard Python list duplicates elements:\n[1, 2, 3] * 2  # Returns [1, 2, 3, 1, 2, 3]!",
      "correctCode": "# Convert to NumPy array for element-wise calculation:\nnp.array([1, 2, 3]) * 2  # array([2, 4, 6])",
      "explanation": "Python lists repeat when multiplied. NumPy arrays execute element-wise operations across high-performance C vector buffers."
    },
    "challenge": {
      "title": "Vectorized Price Inflation Calculator",
      "scenario": "The pricing operations team wants to simulate a 10% inflation increase across product prices without using slow Python loops.",
      "instructions": "1. Given product prices array `prices = np.array([149.99, 499.99, 299.50, 199.00, 179.99])`.\n2. Calculate `inflated_prices = np.round(prices * 1.10, 2)` to apply a 10% inflation increase rounded to `2` decimal places.\n3. Print `inflated_prices`.",
      "starterCode": "import numpy as np\n\nprices = np.array([149.99, 499.99, 299.50, 199.00, 179.99])\n\n# Calculate 10% inflated prices using vectorization and round to 2 decimal places\ninflated_prices = None\n\nprint(inflated_prices)\n",
      "expectedCode": "import numpy as np\n\nprices = np.array([149.99, 499.99, 299.50, 199.00, 179.99])\ninflated_prices = np.round(prices * 1.10, 2)\nprint(inflated_prices)\n",
      "validationScript": "assert 'inflated_prices' in locals(), \"Variable 'inflated_prices' must be defined\"\nassert np.allclose(inflated_prices, np.round(prices * 1.10, 2)), \"inflated_prices values are incorrect\"\n",
      "hints": [
        "NumPy arrays support element-wise math directly: prices * 1.10.",
        "Use np.round(prices * 1.10, 2) to round to two decimal places.",
        "Print the resulting array."
      ],
      "solutionExplanation": "NumPy performs vectorized operations across C-level memory buffers without Python loop overhead, scaling effortlessly to millions of rows."
    }
  },
  {
    "id": "py-lesson-t-xb49ptat9izv",
    "tabId": "t.xb49ptat9izv",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 10,
    "title": "NumPy Arrays",
    "description": "2D NumPy Arrays  In the previous lesson, you worked with one-dimensional NumPy arrays. When you check their type using type(), Python tells you they are numpy.n...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "2D NumPy Arrays\n\nIn the previous lesson, you worked with one-dimensional NumPy arrays. When you check their type using type(), Python tells you they are numpy.ndarray. The numpy. prefix means the type comes from the NumPy package, and ndarray stands for n-dimensional array.\n\nAlthough earlier examples used 1D arrays, NumPy can handle arrays with many dimensions — 2D, 3D, and even higher. In this lesson, the focus is on 2D arrays, which are extremely common in data science because they resemble tables of data (rows and columns)."
      },
      {
        "title": "2. Creating a 2D NumPy Array",
        "body": "A 2D NumPy array can be created from a list of lists in Python. Each inner list represents a row in the array. For example, if you combine height and weight data into one structure, each sublist becomes a row of the 2D array.\n\nWhen you print the array, you’ll see a rectangular structure. You can inspect its dimensions using the .shape attribute:\n\n.shape returns a tuple showing the number of rows and columns.\n\nFor example, (2, 5) means 2 rows and 5 columns.\n\nIt’s important to understand that .shape is an attribute, not a method. The difference is:\n\nAttributes do not use parentheses → array.shape\n\nMethods use parentheses → array.mean()\n\nLike 1D arrays, 2D NumPy arrays must contain elements of a single data type. If one element is changed to a string, NumPy will convert all elements to strings to maintain consistency."
      },
      {
        "title": "3. Subsetting 2D NumPy Arrays",
        "body": "You can think of a 2D NumPy array as an improved list of lists. However, NumPy offers more powerful and intuitive ways to subset data.\n\nIf you want to access a specific element, such as the first row and third column, there are two approaches.\n\nThe first approach is step-by-step indexing:\n\nSelect the row using square brackets.\n\nThen select the column from that row using another pair of brackets.\n\nThe second approach is more common and cleaner. You use a single pair of square brackets with a comma:\n\nThe value before the comma represents the row.\n\nThe value after the comma represents the column.\n\nThe result is the intersection of that row and column.\n\nThis second method is preferred because it is more readable and flexible."
      },
      {
        "title": "4. Slicing Rows and Columns",
        "body": "NumPy slicing becomes especially powerful in 2D arrays.\n\nIf you want to select multiple rows or columns, you can use colons (:):\n\nA colon before the comma selects all rows.\n\nA colon after the comma selects all columns.\n\nYou can specify ranges using start:end, where the end index is not included.\n\nFor example:\n\nSelecting both rows but only columns 1 and 2 returns a smaller 2D array.\n\nSelecting only row 1 but all columns returns that entire row.\n\nSelecting all rows but only column 1 returns a column of values.\n\nThe key idea is that slicing works as:\n\narray[row_selection, column_selection]"
      },
      {
        "title": "5. Element-wise Calculations in 2D Arrays",
        "body": "Just like with 1D arrays, 2D NumPy arrays support element-wise operations. This means you can perform calculations across entire arrays without loops.\n\nFor example, you can:\n\nMultiply all elements by a number.\n\nAdd two arrays of the same shape together.\n\nApply mathematical operations across the entire dataset.\n\nThis is one of the biggest advantages of NumPy over regular Python lists. It makes mathematical computations cleaner, faster, and more efficient."
      },
      {
        "title": "6. Key Takeaways",
        "body": "numpy.ndarray means n-dimensional array.\n\n2D arrays are created from lists of lists.\n\nUse .shape to check dimensions.\n\nArrays must contain only one data type.\n\nSubsetting uses the format: array[row, column].\n\nSlicing with : allows selecting ranges.\n\nElement-wise calculations work across the entire array."
      }
    ],
    "quickReference": [
      {
        "goal": "Import NumPy",
        "syntax": "import numpy as np"
      },
      {
        "goal": "Create 1D array",
        "syntax": "arr = np.array([1, 2, 3])"
      },
      {
        "goal": "Element-wise multiplication",
        "syntax": "doubled = arr * 2"
      },
      {
        "goal": "Inspect 2D array shape",
        "syntax": "arr_2d.shape # (rows, cols)"
      },
      {
        "goal": "Select 2D row 0, col 1",
        "syntax": "arr_2d[0, 1]"
      },
      {
        "goal": "Select entire column",
        "syntax": "arr_2d[:, 0]"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Multiplying standard Python list duplicates elements:\n[1, 2, 3] * 2  # Returns [1, 2, 3, 1, 2, 3]!",
      "correctCode": "# Convert to NumPy array for element-wise calculation:\nnp.array([1, 2, 3]) * 2  # array([2, 4, 6])",
      "explanation": "Python lists repeat when multiplied. NumPy arrays execute element-wise operations across high-performance C vector buffers."
    },
    "challenge": {
      "title": "Vectorized Price Inflation Calculator",
      "scenario": "The pricing operations team wants to simulate a 10% inflation increase across product prices without using slow Python loops.",
      "instructions": "1. Given product prices array `prices = np.array([149.99, 499.99, 299.50, 199.00, 179.99])`.\n2. Calculate `inflated_prices = np.round(prices * 1.10, 2)` to apply a 10% inflation increase rounded to `2` decimal places.\n3. Print `inflated_prices`.",
      "starterCode": "import numpy as np\n\nprices = np.array([149.99, 499.99, 299.50, 199.00, 179.99])\n\n# Calculate 10% inflated prices using vectorization and round to 2 decimal places\ninflated_prices = None\n\nprint(inflated_prices)\n",
      "expectedCode": "import numpy as np\n\nprices = np.array([149.99, 499.99, 299.50, 199.00, 179.99])\ninflated_prices = np.round(prices * 1.10, 2)\nprint(inflated_prices)\n",
      "validationScript": "assert 'inflated_prices' in locals(), \"Variable 'inflated_prices' must be defined\"\nassert np.allclose(inflated_prices, np.round(prices * 1.10, 2)), \"inflated_prices values are incorrect\"\n",
      "hints": [
        "NumPy arrays support element-wise math directly: prices * 1.10.",
        "Use np.round(prices * 1.10, 2) to round to two decimal places.",
        "Print the resulting array."
      ],
      "solutionExplanation": "NumPy performs vectorized operations across C-level memory buffers without Python loop overhead, scaling effortlessly to millions of rows."
    }
  },
  {
    "id": "py-lesson-t-kyddi4deny6h",
    "tabId": "t.kyddi4deny6h",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 11,
    "title": "Data Analysis",
    "description": "Data Analysis with NumPy  Data analysis starts with understanding your data. When you’re working with small datasets, it’s easy to inspect values manually. Howe...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Data Analysis with NumPy\n\nData analysis starts with understanding your data. When you’re working with small datasets, it’s easy to inspect values manually. However, in real-world data science, you often deal with thousands, millions, or even billions of numbers. In those cases, simply looking at raw data is not helpful. Instead, you rely on summary statistics to extract meaningful insights."
      },
      {
        "title": "2. Example: City-Wide Survey",
        "body": "Imagine conducting a survey of 5000 adults in a city, collecting their height and weight. The data is stored in a 2D NumPy array called np_city:\n\n5000 rows → each row represents one person\n\n2 columns → height and weight\n\nJust staring at this massive table of numbers won’t reveal patterns. To understand the dataset, you generate summarizing statistics."
      },
      {
        "title": "3. Summary Statistics with NumPy",
        "body": "NumPy is not only efficient for storing numerical data, but it also provides powerful statistical functions.\n\nTo calculate the average (mean) height:\n\n`np.mean(np_city[:, 0])`\n\nHere:\n\nnp_city[:, 0] selects all rows from the first column (height).\n\n`np.mean() calculates the average.`\n\nIf the result is 1.75 meters, that gives a reasonable estimate of average height.\n\nTo calculate the median (the middle value when sorted):\n\n`np.median(np_city[:, 0])`\n\nThis avoids writing complex sorting logic yourself.\n\nYou can perform the same operations on the weight column.\n\nThese summary statistics act as a sanity check. For example:\n\nIf the average weight turns out to be 2000 kg, something is clearly wrong with the data.",
        "exampleCode": "np.mean(np_city[:, 0])\nnp.mean() calculates the average.\nnp.median(np_city[:, 0])"
      },
      {
        "title": "4. Other Useful NumPy Functions",
        "body": "NumPy provides many additional functions for analysis, including:\n\n`np.corrcoef() → checks correlation between variables (e.g., height and weight)`\n\n`np.std() → calculates standard deviation`\n\n`np.sum() → sums elements`\n\n`np.sort() → sorts values`\n\nSome of these functions also exist in basic Python. However, NumPy is much faster, because it enforces a single data type inside arrays, allowing optimized numerical computations.",
        "exampleCode": "np.corrcoef() → checks correlation between variables (e.g., height and weight)\nnp.std() → calculates standard deviation\nnp.sum() → sums elements\nnp.sort() → sorts values"
      },
      {
        "title": "5. Generating Data with NumPy",
        "body": "In the example, the height and weight data were simulated using NumPy itself. Random distributions were sampled 5000 times to create arrays, and then combined using:\n\n`np.column_stack() → combines separate arrays into columns of a 2D array`\n\nThis shows that NumPy is not only useful for analyzing data but also for generating and manipulating datasets.",
        "exampleCode": "np.column_stack() → combines separate arrays into columns of a 2D array"
      },
      {
        "title": "6. Final Insight",
        "body": "Summary statistics help you understand and validate your data quickly. Another powerful way to explore data is through visualization, which builds intuition and reveals patterns that numbers alone might hide. That typically involves tools like Matplotlib, which comes next in the learning journey."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Data Analysis",
      "scenario": "Apply the concepts learned in Data Analysis to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Data Analysis.",
      "starterCode": "# Practice Challenge: Data Analysis\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-9i2wgaxppch5",
    "tabId": "t.9i2wgaxppch5",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 12,
    "title": "Basic Plots with Matplotlib",
    "description": "Data visualization is an essential part of data analysis. It allows you to explore your dataset to uncover patterns and insights, and it also helps you communic...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Data visualization is an essential part of data analysis. It allows you to explore your dataset to uncover patterns and insights, and it also helps you communicate findings effectively to others. Beautiful visualizations can make your data tell a story by themselves. For example, Hans Rosling’s bubble charts illustrate global development in an intuitive way: each bubble represents a country, its size reflects population, the horizontal axis shows GDP per capita, and the vertical axis shows life expectancy. From such a plot, you can quickly see trends, like the correlation between higher GDP and longer life expectancy, and differences between countries with similar income levels."
      },
      {
        "title": "2. Matplotlib Overview",
        "body": "`import matplotlib.pyplot as plt`\n\nPython has many visualization packages, but the most fundamental is Matplotlib, specifically its subpackage pyplot, which is conventionally imported as plt. To create a plot, you first prepare your data in lists or arrays. For example, you might have a list of years (year) and a list of corresponding world populations (pop) in billions.\n\nTo visualize this as a line chart, you use:\n\n`plt.plot(year, pop)`\n\n`plt.show()`\n\n`plt.plot() tells Python what to plot and how, mapping the first argument to the horizontal axis and the second to the vertical axis.`\n\n`plt.show() actually displays the plot, allowing you to add customizations before rendering, like titles, labels, or colors.`\n\nLooking at the line chart, the horizontal axis shows years, the vertical axis shows population, and Python draws lines connecting the points. For example, in 1950 the population was around 2.5 billion, and in 2010 it was around 7 billion—nearly tripling in sixty years.",
        "exampleCode": "import matplotlib.pyplot as plt\nplt.plot(year, pop)\nplt.show()\nplt.plot() tells Python what to plot and how, mapping the first argument to the horizontal axis and the second to the vertical axis.\nplt.show() actually displays the plot, allowing you to add customizations before rendering, like titles, labels, or colors."
      },
      {
        "title": "3. Scatter Plots",
        "body": "Another useful plot type is the scatter plot. Unlike a line chart, a scatter plot shows each data point individually without connecting them. You create it by replacing plot with scatter in your code:\n\n`plt.scatter(year, pop)`\n\n`plt.show()`\n\nScatter plots are often preferred when you want a more honest representation of your data, especially when there are few data points. They make it clear that the plot is based on individual observations rather than a continuous line.",
        "exampleCode": "plt.scatter(year, pop)\nplt.show()"
      },
      {
        "title": "4. Key Takeaways",
        "body": "Visualization helps both exploration and communication of data.\n\nMatplotlib is the fundamental Python package for plotting; pyplot is its most-used subpackage.\n\nLine plots connect points to show trends over time.\n\nScatter plots show individual points, offering a clear view of the raw data.\n\n`plt.plot() / plt.scatter() define the plot, and plt.show() displays it.`",
        "exampleCode": "plt.plot() / plt.scatter() define the plot, and plt.show() displays it."
      }
    ],
    "quickReference": [
      {
        "goal": "Import PyPlot",
        "syntax": "import matplotlib.pyplot as plt"
      },
      {
        "goal": "Line plot",
        "syntax": "plt.plot(x, y)"
      },
      {
        "goal": "Scatter plot",
        "syntax": "plt.scatter(x, y)"
      },
      {
        "goal": "Histogram with bins",
        "syntax": "plt.hist(data, bins=5)"
      },
      {
        "goal": "Set title and labels",
        "syntax": "plt.title(\"Title\"); plt.xlabel(\"X\")"
      },
      {
        "goal": "Show chart canvas",
        "syntax": "plt.show()"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Creating new plot without clearing previous canvas:\nplt.hist(data1)\nplt.show()\nplt.plot(data2)  # Overlays on previous figure!",
      "correctCode": "# Clear figure buffer between separate charts:\nplt.hist(data1)\nplt.show()\nplt.clf()  # Clear canvas\nplt.plot(data2)",
      "explanation": "Matplotlib keeps internal plot state active until plt.clf() is called, causing subsequent charts to overlap unintentionally."
    },
    "challenge": {
      "title": "Visualize Sales Distribution",
      "scenario": "The marketing analytics team needs a histogram visualization of order amounts to understand customer spending buckets.",
      "instructions": "1. Read `sales.csv` using `pd.read_csv(\"sales.csv\")`.\n2. Plot a histogram of the `sale_amount` column with `bins = 5` and `edgecolor = \"black\"` using `plt.hist()`.\n3. Set the title to `\"Sales Distribution\"` and xlabel to `\"Order Amount ($)\"`.\n4. Call `plt.show()` to render the plot.",
      "starterCode": "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv('sales.csv')\n\n# Plot a histogram of sale_amount with 5 bins\n# Add title and xlabel, then call plt.show()\n",
      "expectedCode": "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv('sales.csv')\nplt.hist(df['sale_amount'], bins=5, edgecolor='black')\nplt.title('Sales Distribution')\nplt.xlabel('Order Amount ($)')\nplt.show()\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame 'df' must be loaded\"\nassert len(df) == 14, \"sales.csv should contain 14 rows\"\n",
      "hints": [
        "Use df = pd.read_csv('sales.csv') to read the dataset.",
        "Call plt.hist(df['sale_amount'], bins=5).",
        "Add plt.title('Sales Distribution') and plt.xlabel('Order Amount ($)')."
      ],
      "solutionExplanation": "Histograms divide continuous numeric data into frequency bins, allowing data engineers to quickly spot skewness and outliers."
    }
  },
  {
    "id": "py-lesson-t-fv7rehs4aeaj",
    "tabId": "t.fv7rehs4aeaj",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 13,
    "title": "Histogram",
    "description": "Histograms  A histogram is a type of visualization that is very useful for exploring data distributions. It helps you understand how values are spread across a ...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Histograms\n\nA histogram is a type of visualization that is very useful for exploring data distributions. It helps you understand how values are spread across a range. To visualize this, imagine you have 12 values between 0 and 6 placed along a number line.\n\nTo create a histogram, you divide the number line into equal chunks called bins. For example, if you choose 3 bins, each with a width of 2, you then count how many data points fall into each bin:\n\nThe first bin contains 4 data points.\n\nThe second bin contains 6 data points.\n\nThe third bin contains 2 data points.\n\nNext, you draw a bar for each bin, where the height of the bar corresponds to the number of data points in that bin. The resulting histogram gives a clear visual overview of the distribution. In this example, most values are clustered in the middle, but there are more values below 2 than above 4."
      },
      {
        "title": "2. Creating Histograms with Matplotlib",
        "body": "To create histograms in Python, you can use Matplotlib. Start by importing the pyplot subpackage:\n\n`import matplotlib.pyplot as plt`\n\nThe main function to build histograms is hist. Its two most important arguments are:\n\nx – the list of values to create a histogram for.\n\nbins – the number of bins to divide your data into. If not specified, it defaults to 10.\n\nExample: Suppose you have a list of 12 values and you want to divide them into 3 bins:\n\n`values = [1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6]`\n\n`plt.hist(values, bins=3)`\n\n`plt.show()`\n\nThis generates a histogram with three bars corresponding to the bin counts. Histograms are powerful because they allow you to see patterns and trends in the data at a glance.",
        "exampleCode": "import matplotlib.pyplot as plt\nvalues = [1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6]\nplt.hist(values, bins=3)\nplt.show()"
      },
      {
        "title": "3. Example: Population Pyramid",
        "body": "A more advanced application of histograms is the population pyramid, which shows age distributions for males and females. In the European Union in 2010, the bins were horizontal, with the largest bins corresponding to ages 40–44, representing the baby boom generation. By 2050, the distribution becomes flatter, illustrating how the population ages over time. This demonstrates how histograms can quickly reveal demographic changes and trends."
      }
    ],
    "quickReference": [
      {
        "goal": "Import PyPlot",
        "syntax": "import matplotlib.pyplot as plt"
      },
      {
        "goal": "Line plot",
        "syntax": "plt.plot(x, y)"
      },
      {
        "goal": "Scatter plot",
        "syntax": "plt.scatter(x, y)"
      },
      {
        "goal": "Histogram with bins",
        "syntax": "plt.hist(data, bins=5)"
      },
      {
        "goal": "Set title and labels",
        "syntax": "plt.title(\"Title\"); plt.xlabel(\"X\")"
      },
      {
        "goal": "Show chart canvas",
        "syntax": "plt.show()"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Creating new plot without clearing previous canvas:\nplt.hist(data1)\nplt.show()\nplt.plot(data2)  # Overlays on previous figure!",
      "correctCode": "# Clear figure buffer between separate charts:\nplt.hist(data1)\nplt.show()\nplt.clf()  # Clear canvas\nplt.plot(data2)",
      "explanation": "Matplotlib keeps internal plot state active until plt.clf() is called, causing subsequent charts to overlap unintentionally."
    },
    "challenge": {
      "title": "Visualize Sales Distribution",
      "scenario": "The marketing analytics team needs a histogram visualization of order amounts to understand customer spending buckets.",
      "instructions": "1. Read `sales.csv` using `pd.read_csv(\"sales.csv\")`.\n2. Plot a histogram of the `sale_amount` column with `bins = 5` and `edgecolor = \"black\"` using `plt.hist()`.\n3. Set the title to `\"Sales Distribution\"` and xlabel to `\"Order Amount ($)\"`.\n4. Call `plt.show()` to render the plot.",
      "starterCode": "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv('sales.csv')\n\n# Plot a histogram of sale_amount with 5 bins\n# Add title and xlabel, then call plt.show()\n",
      "expectedCode": "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv('sales.csv')\nplt.hist(df['sale_amount'], bins=5, edgecolor='black')\nplt.title('Sales Distribution')\nplt.xlabel('Order Amount ($)')\nplt.show()\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame 'df' must be loaded\"\nassert len(df) == 14, \"sales.csv should contain 14 rows\"\n",
      "hints": [
        "Use df = pd.read_csv('sales.csv') to read the dataset.",
        "Call plt.hist(df['sale_amount'], bins=5).",
        "Add plt.title('Sales Distribution') and plt.xlabel('Order Amount ($)')."
      ],
      "solutionExplanation": "Histograms divide continuous numeric data into frequency bins, allowing data engineers to quickly spot skewness and outliers."
    }
  },
  {
    "id": "py-lesson-t-bvpmj4klnehg",
    "tabId": "t.bvpmj4klnehg",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 14,
    "title": "Customization",
    "description": "Customizing Plots in Matplotlib  Creating a plot is only the first step in data visualization. The real challenge is making a plot that clearly communicates the...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Customizing Plots in Matplotlib\n\nCreating a plot is only the first step in data visualization. The real challenge is making a plot that clearly communicates the intended message. Every visualization offers many customization options, and the choices you make should depend on:\n\nThe data you are working with"
      },
      {
        "title": "2. The story you want to tell",
        "body": "You can modify colors, markers, labels, axes, titles, ticks, and much more. Because there are so many possibilities, the best way to understand customization is through practical examples."
      },
      {
        "title": "3. Improving a Basic Line Plot",
        "body": "Suppose you already created a line plot showing world population growth, including projections up to the year 2100. The graph already shows an important trend: population growth is expected to slow down by the end of the century.\n\nHowever, two improvements are necessary:\n\nIt should clearly explain what data is being shown.\n\nIt should better highlight the population explosion.\n\nCustomization helps achieve both goals."
      },
      {
        "title": "4. Adding Axis Labels",
        "body": "The first essential step in improving any plot is labeling the axes. Without labels, viewers cannot properly interpret the data.\n\nYou can use:\n\n`plt.xlabel(\"Year\")`\n\n`plt.ylabel(\"Population\")`\n\nThese functions add descriptive text to the horizontal and vertical axes. They must be called before plt.show(); otherwise, the customizations will not appear.\n\nAxis labels immediately make the plot more understandable, especially for someone seeing it for the first time.",
        "exampleCode": "plt.xlabel(\"Year\")\nplt.ylabel(\"Population\")"
      },
      {
        "title": "5. Adding a Title",
        "body": "To give even more context, you can add a title:\n\n`plt.title(\"World Population Projections\")`\n\nA title summarizes what the plot represents and strengthens the overall message. With axis labels and a title, the visualization becomes much more informative.\n\nCustomizing the Y-Axis (Ticks)\n\nTo better emphasize growth, you might want the y-axis to start from zero. You can adjust the tick marks using:\n\n`plt.yticks([0, 2, 4, 6, 8, 10])`\n\nThis makes it clearer that the world already had about 2.5 billion people in 1950. The visual perspective changes when the axis scale is adjusted properly.\n\nYou can also customize how tick labels appear. For example, to show that values represent billions:\n\n`plt.yticks([0, 2, 4, 6, 8, 10],`\n\n[\"0\", \"2B\", \"4B\", \"6B\", \"8B\", \"10B\"])\n\nHere:\n\nThe first list defines tick positions.\n\nThe second list defines how those ticks are displayed.\n\nThe “B” stands for billions, making the units explicit and avoiding confusion.",
        "exampleCode": "plt.title(\"World Population Projections\")\nplt.yticks([0, 2, 4, 6, 8, 10])\nplt.yticks([0, 2, 4, 6, 8, 10],"
      },
      {
        "title": "6. Adding Historical Data",
        "body": "To better illustrate the population explosion, you can add earlier historical data points, such as population figures from 1800, 1850, and 1900. By extending your year and pop lists, the plot gains more context.\n\nAdding these extra data points shows that population growth dramatically accelerated in the last 60 years compared to previous centuries. This strengthens the narrative of the visualization."
      },
      {
        "title": "7. Before vs After",
        "body": "A simple line plot shows data.\n\nA customized line plot tells a story.\n\nBy adding:"
      },
      {
        "title": "8. Axis labels",
        "body": "A descriptive title"
      },
      {
        "title": "9. Properly formatted ticks",
        "body": "Additional historical context\n\nyou transform an average graph into a clear, compelling visualization."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Customization",
      "scenario": "Apply the concepts learned in Customization to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Customization.",
      "starterCode": "# Practice Challenge: Customization\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-872nr5cssyut",
    "tabId": "t.872nr5cssyut",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 15,
    "title": "Dictionaries - 1",
    "description": "Dictionaries (Part 1)  A dictionary is a powerful Python data type that allows you to store data in a way that directly connects related pieces of information. ...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Dictionaries (Part 1)\n\nA dictionary is a powerful Python data type that allows you to store data in a way that directly connects related pieces of information. It is especially useful in data science, where you often need to map one thing to another — for example, a country to its population."
      },
      {
        "title": "2. The Problem with Lists",
        "body": "Imagine you work for the World Bank and want to store the population of different countries. One approach is to create a list of populations:\n\n`pop = [30.55, 2.77, 40.0]`\n\nThen, to know which population belongs to which country, you create a second list:\n\n`countries = [\"Afghanistan\", \"Albania\", \"Algeria\"]`\n\nThe idea is that both lists share the same order, so the index connects them. If you want the population of Albania, you would:\n\nUse countries.index(\"Albania\") to find its position.\n\nUse that index to retrieve the value from pop.\n\nAlthough this works, it has major drawbacks:\n\nIt’s not intuitive.\n\nIt requires extra steps.\n\nIt becomes messy and inefficient for large datasets.\n\nThere should be a more direct way to connect a country to its population. That’s where dictionaries come in.",
        "exampleCode": "pop = [30.55, 2.77, 40.0]\ncountries = [\"Afghanistan\", \"Albania\", \"Algeria\"]"
      },
      {
        "title": "3. Introducing Dictionaries",
        "body": "A dictionary stores data using key–value pairs. Instead of relying on positions (like lists do), dictionaries allow you to directly associate a key with a value.\n\nYou create a dictionary using curly brackets {}. Inside, each key and value are separated by a colon :.\n\nExample:\n\n`world = {`\n\n\"Afghanistan\": 30.55,\n\n\"Albania\": 2.77,\n\n\"Algeria\": 40.0\n\n}\n\nHere:\n\nThe keys are country names.\n\nThe values are the corresponding populations (in millions).\n\nEach key-value pair follows this format:\n\nkey : value",
        "exampleCode": "world = {"
      },
      {
        "title": "4. Accessing Values in a Dictionary",
        "body": "To retrieve a value, you use the key inside square brackets:\n\nworld[\"Albania\"]\n\nThis directly returns:\n\n2.77\n\nThere is no need to search for an index first. The key immediately gives access to its value.\n\nThis approach is:"
      },
      {
        "title": "5. More intuitive",
        "body": "Cleaner to read"
      },
      {
        "title": "6. More efficient",
        "body": "Python is optimized to look up dictionary keys very quickly, even when the dictionary contains a huge amount of data."
      },
      {
        "title": "7. Key Insight",
        "body": "Lists connect elements by position (index).\n\nDictionaries connect elements by meaning (key).\n\nThat difference makes dictionaries one of the most important data structures in Python, especially in data science."
      }
    ],
    "quickReference": [
      {
        "goal": "Define dictionary",
        "syntax": "d = {\"a\": 1, \"b\": 2}"
      },
      {
        "goal": "Lookup by key",
        "syntax": "val = d[\"a\"]"
      },
      {
        "goal": "Add/update key",
        "syntax": "d[\"c\"] = 3"
      },
      {
        "goal": "Check membership",
        "syntax": "\"a\" in d"
      },
      {
        "goal": "Iterate pairs",
        "syntax": "for k, v in d.items():"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Direct square bracket lookup on missing key:\nval = my_dict[\"missing_key\"]  # Raises KeyError!",
      "correctCode": "# Use .get() method with a fallback default:\nval = my_dict.get(\"missing_key\", None)",
      "explanation": "Accessing a non-existent key with square brackets raises KeyError. Using dict.get(key, default) avoids pipeline crashes."
    },
    "challenge": {
      "title": "Practice Drill: Dictionaries - 1",
      "scenario": "Apply the concepts learned in Dictionaries - 1 to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Dictionaries - 1.",
      "starterCode": "# Practice Challenge: Dictionaries - 1\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-8pd128kwb4dt",
    "tabId": "t.8pd128kwb4dt",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 16,
    "title": "Dictionaries - 2",
    "description": "Dictionaries (Part 2)  In the previous lesson, you created a dictionary called world, which stores country populations as key–value pairs. You accessed values b...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Dictionaries (Part 2)\n\nIn the previous lesson, you created a dictionary called world, which stores country populations as key–value pairs. You accessed values by passing a key inside square brackets, such as:\n\nworld[\"Albania\"]\n\nThis works because dictionaries are designed for fast lookups based on unique keys."
      },
      {
        "title": "2. Important Rules About Dictionary Keys",
        "body": "For dictionaries to function properly, their keys must follow two important rules:\n\nKeys must be unique.\n\nKeys must be immutable objects.\n\nIf you try to define the same key twice when creating a dictionary, Python will keep only the last value assigned to that key. There cannot be duplicate keys.\n\nKeys must also be immutable, meaning their contents cannot change after creation. Examples of immutable types include:\n\nStrings\n\nIntegers\n\nFloats\n\nBooleans\n\nLists, however, are mutable (their contents can change), so they cannot be used as dictionary keys. Attempting to use a list as a key will result in an error."
      },
      {
        "title": "3. Adding New Key–Value Pairs",
        "body": "You can add new data to an existing dictionary by assigning a value to a new key using square brackets.\n\nFor example, suppose you want to add “Sealand” with a population of 27 (in millions format):\n\n`world[\"Sealand\"] = 0.000027`\n\nIf you print world afterward, Sealand will appear in the dictionary.\n\nTo check whether a key exists in a dictionary, you can use the in keyword:\n\n\"Sealand\" in world\n\nThis returns True if the key exists.",
        "exampleCode": "world[\"Sealand\"] = 0.000027"
      },
      {
        "title": "4. Updating Values",
        "body": "If you assign a new value to an existing key, Python will update the value rather than create a new pair:\n\n`world[\"Sealand\"] = 0.000028`\n\nBecause dictionary keys are unique, Python knows you want to modify the existing entry.",
        "exampleCode": "world[\"Sealand\"] = 0.000028"
      },
      {
        "title": "5. Removing Key–Value Pairs",
        "body": "To delete a key–value pair, you use the del keyword:\n\ndel world[\"Sealand\"]\n\nAfter this operation, Sealand will no longer exist in the dictionary."
      },
      {
        "title": "6. Lists vs Dictionaries",
        "body": "Lists and dictionaries may look similar because both allow you to:"
      },
      {
        "title": "7. Select elements",
        "body": "Update elements"
      },
      {
        "title": "8. Remove elements",
        "body": "using square bracket notation.\n\nHowever, they are fundamentally different.\n\nA list:\n\nIs an ordered sequence of values\n\nIs indexed by numbers (positions)\n\nIs best when order matters or when you need slicing and subsets\n\nA dictionary:\n\nIs a collection of key–value pairs\n\nIs indexed by unique, immutable keys\n\nIs best when you need fast lookups (like a lookup table)\n\nWhen to Use Which\n\nUse a list when:"
      },
      {
        "title": "9. The order of elements matters",
        "body": "You frequently work with subsets or slices\n\nUse a dictionary when:"
      },
      {
        "title": "10. You need fast access to values",
        "body": "You want to map unique identifiers (keys) to data\n\nYou are building a lookup table"
      }
    ],
    "quickReference": [
      {
        "goal": "Define dictionary",
        "syntax": "d = {\"a\": 1, \"b\": 2}"
      },
      {
        "goal": "Lookup by key",
        "syntax": "val = d[\"a\"]"
      },
      {
        "goal": "Add/update key",
        "syntax": "d[\"c\"] = 3"
      },
      {
        "goal": "Check membership",
        "syntax": "\"a\" in d"
      },
      {
        "goal": "Iterate pairs",
        "syntax": "for k, v in d.items():"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Direct square bracket lookup on missing key:\nval = my_dict[\"missing_key\"]  # Raises KeyError!",
      "correctCode": "# Use .get() method with a fallback default:\nval = my_dict.get(\"missing_key\", None)",
      "explanation": "Accessing a non-existent key with square brackets raises KeyError. Using dict.get(key, default) avoids pipeline crashes."
    },
    "challenge": {
      "title": "Practice Drill: Dictionaries - 2",
      "scenario": "Apply the concepts learned in Dictionaries - 2 to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Dictionaries - 2.",
      "starterCode": "# Practice Challenge: Dictionaries - 2\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-ynceuz9dj9lk",
    "tabId": "t.ynceuz9dj9lk",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 17,
    "title": "Pandas - 1",
    "description": "Pandas (Part 1) – Working with Tabular Data  As a data scientist, you’ll often work with large amounts of data. Very frequently, this data can be structured in ...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Pandas (Part 1) – Working with Tabular Data\n\nAs a data scientist, you’ll often work with large amounts of data. Very frequently, this data can be structured in a tabular format — meaning rows and columns, like a spreadsheet. Each row represents an observation, and each column represents a variable describing that observation.\n\nFor example, imagine temperature measurements in a chemical plant. Each row could represent one measurement, and the columns might include temperature, date, time, and location. Another example is data about the BRICS countries (Brazil, Russia, India, China, and South Africa), where each row represents a country and columns include the capital, area, and population.\n\nWhy Not Just Use NumPy?\n\nYou already know that a 2D NumPy array can represent tabular data. However, NumPy arrays are not ideal when your dataset contains different data types.\n\nIn the BRICS example:\n\nCountry and capital are strings\n\nArea and population are floats\n\nNumPy prefers arrays with a single data type, so it’s not the best choice for mixed data. That’s where Pandas comes in.\n\nWhat is Pandas?\n\nPandas is a high-level data manipulation library built on top of NumPy. It was developed by Wes McKinney and is widely used in data science.\n\nThe main data structure in Pandas for tabular data is called a DataFrame.\n\nA DataFrame:"
      },
      {
        "title": "2. Represents data in rows and columns",
        "body": "Allows different data types in different columns\n\nHas labeled rows (index)"
      },
      {
        "title": "3. Has labeled columns",
        "body": "This makes it much more powerful and flexible for real-world datasets."
      },
      {
        "title": "4. Structure of a DataFrame",
        "body": "In a Pandas DataFrame:\n\nRows represent observations (e.g., countries)\n\nColumns represent variables (e.g., capital, area, population)\n\nEach row has a unique label (called the index)\n\nEach column has a name (column label)\n\nUnlike NumPy arrays, columns can contain different data types."
      },
      {
        "title": "5. Creating a DataFrame from a Dictionary",
        "body": "One way to create a DataFrame is by starting from a Python dictionary.\n\nIn this approach:"
      },
      {
        "title": "6. The dictionary keys become column names",
        "body": "The dictionary values (lists) become the column data\n\nAfter importing Pandas as pd, you create a DataFrame like this:\n\n`import pandas as pd`\n\n`data = {`\n\n\"country\": [\"Brazil\", \"Russia\", \"India\", \"China\", \"South Africa\"],\n\n\"capital\": [\"Brasilia\", \"Moscow\", \"New Delhi\", \"Beijing\", \"Pretoria\"],\n\n\"area\": [8.52, 17.10, 3.29, 9.60, 1.22],\n\n\"population\": [200.4, 143.5, 1252, 1357, 52.98]\n\n}\n\n`brics = pd.DataFrame(data)`\n\nBy default, Pandas assigns row labels 0, 1, 2, 3, 4.\n\nYou can manually set row labels using the index attribute:\n\n`brics.index = [\"BR\", \"RU\", \"IN\", \"CH\", \"SA\"]`\n\nNow your DataFrame has proper row labels.",
        "exampleCode": "import pandas as pd\ndata = {\nbrics = pd.DataFrame(data)\nbrics.index = [\"BR\", \"RU\", \"IN\", \"CH\", \"SA\"]"
      },
      {
        "title": "7. Creating a DataFrame from a CSV File",
        "body": "In real-world data science, you usually won’t build DataFrames manually. Instead, you import data from external files — often CSV files (Comma Separated Values).\n\nTo read a CSV file:\n\n`brics = pd.read_csv(\"brics.csv\")`\n\nHowever, sometimes the first column in the CSV file contains row labels. Pandas might interpret this as a normal column. To fix this, use the index_col argument:\n\n`brics = pd.read_csv(\"brics.csv\", index_col=0)`\n\nThis tells Pandas that the first column should be used as row labels.\n\nThe read_csv() function has many optional arguments that allow you to:",
        "exampleCode": "brics = pd.read_csv(\"brics.csv\")\nbrics = pd.read_csv(\"brics.csv\", index_col=0)"
      },
      {
        "title": "8. Handle missing values",
        "body": "Specify separators"
      },
      {
        "title": "9. Rename columns",
        "body": "Skip rows\n\nAnd much more\n\nIt’s one of the most important functions in Pandas."
      },
      {
        "title": "10. Key Takeaways",
        "body": "Pandas is designed for structured, tabular data and offers advantages over NumPy when:"
      },
      {
        "title": "11. Your dataset contains mixed data types",
        "body": "You need labeled rows and columns"
      },
      {
        "title": "12. You want easier data manipulation",
        "body": "In short:\n\nNumPy is great for numerical computations\n\nPandas is great for real-world datasets and data analysis"
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Pandas - 1",
      "scenario": "Apply the concepts learned in Pandas - 1 to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Pandas - 1.",
      "starterCode": "# Practice Challenge: Pandas - 1\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-sayq0sohbfyl",
    "tabId": "t.sayq0sohbfyl",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 18,
    "title": "Pandas - 2",
    "description": "Pandas (Part 2) – Indexing and Selecting Data  In the previous video, we created the brics DataFrame, containing basic data on the BRICS countries. Proper row a...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Pandas (Part 2) – Indexing and Selecting Data\n\nIn the previous video, we created the brics DataFrame, containing basic data on the BRICS countries. Proper row and column labels make it much easier to access specific columns, rows, or individual elements in the DataFrame. In this section, we’ll explore different ways to index and select data, starting with square brackets and then moving to the more advanced loc and iloc methods, which make Pandas extremely powerful.\n\nx\n\nTo select a single column, such as the country column, you can use square brackets:\n\nbrics[\"country\"]\n\nThis returns a Pandas Series, which you can think of as a 1-dimensional, labeled array. Series objects are the building blocks of DataFrames — if you combine multiple Series, you get a DataFrame.\n\nIf you want the result to stay as a DataFrame rather than a Series, you use double square brackets:\n\nbrics[[\"country\"]]\n\nYou can extend this approach to select multiple columns by passing a list of column labels:\n\nbrics[[\"country\", \"capital\"]]\n\nThe resulting DataFrame is a \"sub-DataFrame\" containing only the selected columns."
      },
      {
        "title": "2. Accessing Rows with Square Brackets",
        "body": "To select rows using basic square brackets, you use slicing. For example, to get the 2nd, 3rd, and 4th rows:\n\nbrics[1:4]\n\nRemember, Python uses zero-based indexing, and the end of the slice is exclusive. While this works, square brackets offer limited flexibility compared to NumPy-style subsetting.\n\nloc – Label-Based Indexing\n\nThe loc method allows you to select data by row and column labels, similar to how you would index a 2D NumPy array.\n\nTo get a single row by label, for example Russia:\n\nbrics.loc[\"RU\"]\n\nThis returns a Series. To keep the result as a DataFrame, wrap the label in double brackets:\n\nbrics.loc[[\"RU\"]]\n\nTo select multiple rows by labels, you pass a list of row labels:\n\nbrics.loc[[\"RU\", \"IN\", \"CH\"]]\n\nYou can also select specific columns at the same time using a comma:\n\nbrics.loc[[\"RU\", \"IN\", \"CH\"], [\"country\", \"capital\"]]\n\nTo select all rows but only certain columns, use a colon for the rows:\n\nbrics.loc[:, [\"country\", \"capital\"]]\n\nUsing loc makes Pandas subsetting very similar to NumPy arrays, with the main difference being that loc uses labels instead of positions.\n\niloc – Position-Based Indexing\n\nThe iloc method works almost identically to loc, but instead of labels, you use integer positions.\n\nTo select the row for Russia (which has index 1):\n\nbrics.iloc[[1]]\n\nFor multiple rows (Russia, India, China):\n\nbrics.iloc[1:4]\n\nTo select rows and specific columns by position:\n\nbrics.iloc[[1, 2, 3], [0, 1]]\n\nTo select all rows and only the first two columns:\n\nbrics.iloc[:, [0, 1]]\n\nIn summary, loc and iloc provide flexible ways to select rows, columns, or both simultaneously:\n\nloc → label-based (row/column names)\n\niloc → position-based (integer indexes)\n\nBoth methods mirror the intuitive subsetting style of 2D NumPy arrays, making it easier to manipulate and explore DataFrames efficiently. Practicing with these techniques will help you master DataFrame indexing and selection."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Targeted Country Subsetting with loc",
      "scenario": "The trade strategy department needs to inspect the capital and population for Brazil (BR) and China (CH) from the BRICS dataset.",
      "instructions": "1. Load `brics.csv` with `index_col = \"country_code\"`.\n2. Use `.loc` to select the rows for `[\"BR\", \"CH\"]` and columns `[\"capital\", \"population\"]`.\n3. Assign to `subset_df`.\n4. Print `subset_df`.",
      "starterCode": "import pandas as pd\n\nbrics = pd.read_csv('brics.csv', index_col='country_code')\n\n# Select BR and CH with columns capital and population using .loc\nsubset_df = None\n\nprint(subset_df)\n",
      "expectedCode": "import pandas as pd\n\nbrics = pd.read_csv('brics.csv', index_col='country_code')\nsubset_df = brics.loc[['BR', 'CH'], ['capital', 'population']]\nprint(subset_df)\n",
      "validationScript": "assert 'subset_df' in locals(), \"Variable 'subset_df' must be defined\"\nassert list(subset_df.index) == ['BR', 'CH'], \"Index must be BR and CH\"\nassert list(subset_df.columns) == ['capital', 'population'], \"Columns must be capital and population\"\n",
      "hints": [
        "Use brics.loc[['BR', 'CH'], ['capital', 'population']].",
        "Remember that row labels come before column labels separated by a comma."
      ],
      "solutionExplanation": "The .loc method provides explicit, label-based 2D indexing that guarantees predictable column and row extraction."
    }
  },
  {
    "id": "py-lesson-t-4t2lu7toqjna",
    "tabId": "t.4t2lu7toqjna",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 19,
    "title": "Comparison Operators",
    "description": "Comparison Operators – Notes  Comparison operators allow you to compare two values and determine how they relate to each other. The result of any comparison is ...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Comparison Operators – Notes\n\nComparison operators allow you to compare two values and determine how they relate to each other. The result of any comparison is always a Boolean value: True or False. These operators are fundamental in decision-making, filtering data, and logical operations in Python."
      },
      {
        "title": "2. Basic Numeric Comparisons",
        "body": "At the simplest level, comparison operators work with numbers. For example, checking whether 2 < 3 returns True because 2 is indeed smaller than 3. If you check equality using 2 == 3, the result is False, since the values are not the same.\n\nYou can also combine comparison logic, such as checking if a number is smaller than or equal to another using <=. For example, both 2 <= 3 and 3 <= 3 return True. These comparisons work not only with direct values but also with variables that store numbers."
      },
      {
        "title": "3. Comparison Operators Overview",
        "body": "Here are the main comparison operators in Python:\n\n< → less than\n\n> → greater than\n\n<= → less than or equal to\n\n>= → greater than or equal to\n\n== → equal to\n\n!= → not equal to (inequality)\n\nThe != operator is simply the opposite of ==. If two values are not equal, it returns True."
      },
      {
        "title": "4. Comparing Strings",
        "body": "Comparison operators also work with strings. Python compares strings alphabetically (based on character order). For example, \"carl\" < \"chris\" returns True because “carl” comes before “chris” in alphabetical order.\n\nHowever, comparing values of different types usually results in an error. For example, trying to compare an integer like 3 with a string like \"chris\" will raise an error. Python typically cannot determine how objects of completely different types relate to each other.\n\nAn important exception is numeric types like integers and floats. Python allows comparisons between them (e.g., 3 < 3.5) without errors.\n\nAs a general rule, always try to compare objects of the same type to avoid unexpected errors."
      },
      {
        "title": "5. Comparison with NumPy Arrays",
        "body": "When working with NumPy arrays, comparisons become even more powerful. If you compare an entire NumPy array to a single number, NumPy performs the comparison element-wise.\n\nFor example, if you compare a bmi array to 23 using bmi > 23, NumPy checks each value in the array against 23 and returns a Boolean array of the same size. Behind the scenes, NumPy efficiently applies the comparison to every element.\n\nThis makes filtering data concise and efficient — which is especially useful in data science."
      },
      {
        "title": "6. Key Takeaways",
        "body": "Comparison operators:\n\nReturn Boolean values (True or False)\n\nWork with numbers and strings (if types are compatible)"
      },
      {
        "title": "7. Require caution when comparing different data types",
        "body": "Become very powerful when used with NumPy arrays due to element-wise comparison\n\nMastering comparison operators is essential because they are the foundation of filtering data, conditional statements, and logical expressions in Python."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Comparison Operators",
      "scenario": "Apply the concepts learned in Comparison Operators to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Comparison Operators.",
      "starterCode": "# Practice Challenge: Comparison Operators\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-nqmypr2ms700",
    "tabId": "t.nqmypr2ms700",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 20,
    "title": "Boolean Operators",
    "description": "Boolean Operators – Notes  Now that you know how to create Boolean values using comparison operators (like >, <, ==), the next step is learning how to combine t...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Boolean Operators – Notes\n\nNow that you know how to create Boolean values using comparison operators (like >, <, ==), the next step is learning how to combine these Boolean values. This is where Boolean operators come in.\n\nThe three most important Boolean operators in Python are:\n\nand\n\nor\n\nnot\n\nThese operators allow you to build more complex logical conditions."
      },
      {
        "title": "2. The and Operator",
        "body": "The and operator returns True only if both conditions are True.\n\nFor example:\n\nTrue and True → True\n\nTrue and False → False\n\nFalse and True → False\n\nFalse and False → False\n\nSo both sides must evaluate to True for the entire expression to be True.\n\nYou’ll usually use and with comparisons. Suppose:\n\n`x = 12`\n\nIf you want to check whether x is greater than 5 and less than 15:\n\nx > 5 and x < 15\n\nBoth conditions evaluate to True, so the final result is True. This makes sense because 12 lies between 5 and 15.",
        "exampleCode": "x = 12"
      },
      {
        "title": "3. The or Operator",
        "body": "The or operator is less strict. It returns True if at least one condition is True.\n\nFor example:\n\nTrue or True → True\n\nTrue or False → True\n\nFalse or True → True\n\nFalse or False → False\n\nOnly when both conditions are False does the result become False.\n\nSuppose:\n\n`y = 5`\n\nIf you check:\n\ny < 7 or y > 13\n\nThe first condition (5 < 7) is True, and the second (5 > 13) is False. Since at least one condition is True, the entire expression evaluates to True.",
        "exampleCode": "y = 5"
      },
      {
        "title": "4. The not Operator",
        "body": "The not operator simply reverses a Boolean value:\n\nnot True → False\n\nnot False → True\n\nIt is often used to negate the result of a condition, especially when combining multiple logical expressions.\n\nFor example:\n\nnot (x > 5 and x < 15)\n\nThis would return the opposite of the combined condition."
      },
      {
        "title": "5. Boolean Operators with NumPy Arrays",
        "body": "When working with NumPy arrays, things change slightly. The standard Python operators and, or, and not do not work element-wise on arrays.\n\nFor example, if you try:\n\nbmi > 21 and bmi < 22\n\nYou will get an error. This happens because and cannot handle arrays of multiple Boolean values.\n\nInstead, NumPy provides special functions:\n\n`np.logical_and()`\n\n`np.logical_or()`\n\n`np.logical_not()`\n\nThese functions perform element-wise logical operations.\n\nTo find which BMI values are greater than 21 and less than 22:\n\n`np.logical_and(bmi > 21, bmi < 22)`\n\nNumPy evaluates the condition for each element individually. Wherever both conditions are True, the result is True; otherwise, it’s False.\n\nYou can then use this Boolean array to filter the original array:\n\nbmi[np.logical_and(bmi > 21, bmi < 22)]\n\nThis is a powerful pattern in data science:\n\nCreate a Boolean condition.\n\nUse it to filter data.",
        "exampleCode": "np.logical_and()\nnp.logical_or()\nnp.logical_not()\nnp.logical_and(bmi > 21, bmi < 22)"
      },
      {
        "title": "6. Key Takeaways",
        "body": "Boolean operators allow you to combine logical conditions:\n\nand → both must be True\n\nor → at least one must be True\n\nnot → reverses a Boolean value\n\nWith regular Python values, you use and, or, and not.\n\nWith NumPy arrays, you must use logical_and(), logical_or(), and logical_not() for element-wise operations.\n\nUnderstanding this distinction is very important when moving from basic Python logic to numerical and data analysis work."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Boolean Operators",
      "scenario": "Apply the concepts learned in Boolean Operators to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Boolean Operators.",
      "starterCode": "# Practice Challenge: Boolean Operators\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-nhv5od5vyr36",
    "tabId": "t.nhv5od5vyr36",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 21,
    "title": "if, elif, else",
    "description": "Conditional Statements: if, elif, else – Notes  Now that you understand comparison operators (like <, >, ==) and Boolean operators (and, or, not), the next step...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Conditional Statements: if, elif, else – Notes\n\nNow that you understand comparison operators (like <, >, ==) and Boolean operators (and, or, not), the next step is using them to control how your program behaves. This is where conditional statements come in. They allow your code to make decisions and execute different blocks depending on whether a condition is True or False.\n\nThe three main conditional keywords in Python are:\n\nif\n\nelif\n\nelse"
      },
      {
        "title": "2. The if Statement",
        "body": "The if statement is the foundation of conditional logic. It checks whether a condition is True. If it is, Python executes the indented block of code below it.\n\nFor example:\n\n`z = 4`\n\nif z % 2 == 0:\n\nprint(\"z is even\")\n\nHere, % is the modulo operator. z % 2 == 0 checks if z is divisible by 2 (which means it’s even).\n\nIf the condition evaluates to True, the indented code runs. If it’s False, nothing happens.\n\nThere are two very important syntax rules with if:\n\nA colon (:) must follow the condition.\n\nThe code block underneath must be indented (usually 4 spaces).\n\nIndentation tells Python which lines belong to the if statement. When the indentation stops, Python understands that the conditional block has ended.\n\nYou can include multiple lines inside an if block:\n\nif z % 2 == 0:\n\nprint(\"z is even\")\n\nprint(\"This was checked using modulo.\")\n\nIf the condition is False, none of the indented lines will execute.",
        "exampleCode": "z = 4"
      },
      {
        "title": "3. The else Statement",
        "body": "Sometimes you want an alternative action if the condition is not met. That’s where else comes in.\n\nFor example:\n\n`z = 5`\n\nif z % 2 == 0:\n\nprint(\"z is even\")\n\nelse:\n\nprint(\"z is odd\")\n\nIf the if condition is False, the else block runs automatically.\n\nUnlike if, the else statement:\n\nDoes not require a condition.\n\nRuns only if the corresponding if condition is False.\n\nIt acts as a fallback option.",
        "exampleCode": "z = 5"
      },
      {
        "title": "4. The elif Statement",
        "body": "Sometimes two possibilities are not enough. You may want to check multiple conditions. This is where elif (short for “else if”) is useful.\n\nFor example:\n\n`z = 3`\n\nif z % 2 == 0:\n\nprint(\"divisible by 2\")\n\nelif z % 3 == 0:\n\nprint(\"divisible by 3\")\n\nHere’s how Python processes this:\n\nIt checks the if condition.\n\nIf it’s False, it checks the elif condition.\n\nIf that condition is True, it executes the corresponding block.\n\nAfter executing one matching block, Python exits the entire structure.\n\nThis is very important:\n\nEven if multiple conditions are technically True, Python stops at the first True condition it encounters.\n\nFor example, if:\n\n`z = 6`\n\nBoth z % 2 == 0 and z % 3 == 0 are True. However, only \"divisible by 2\" will print, because Python executes the first matching condition and then leaves the control structure.",
        "exampleCode": "z = 3\nz = 6"
      },
      {
        "title": "5. General Structure",
        "body": "The full structure of conditional logic looks like this:\n\nif condition1:\n\nexpression1\n\nelif condition2:\n\nexpression2\n\nelif condition3:\n\nexpression3\n\nelse:\n\nexpression4\n\nPython evaluates conditions from top to bottom and stops once a True condition is found."
      },
      {
        "title": "6. Key Takeaways",
        "body": "Conditional statements allow your program to make decisions.\n\nif → runs code if a condition is True\n\nelif → checks additional conditions if previous ones were False\n\nelse → runs code if none of the above conditions were True\n\nTwo crucial concepts to remember:\n\nIndentation defines code blocks.\n\nPython stops checking conditions once it finds the first True condition.\n\nMastering if, elif, and else is essential because they form the backbone of logic and decision-making in Python programs."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: if, elif, else",
      "scenario": "Apply the concepts learned in if, elif, else to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for if, elif, else.",
      "starterCode": "# Practice Challenge: if, elif, else\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-lsy98vgab236",
    "tabId": "t.lsy98vgab236",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 22,
    "title": "Filtering pandas DataFrames",
    "description": "Filtering Pandas DataFrames – Notes  In earlier lessons, you learned how NumPy allows element-wise comparisons that return Boolean arrays. The same idea applies...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Filtering Pandas DataFrames – Notes\n\nIn earlier lessons, you learned how NumPy allows element-wise comparisons that return Boolean arrays. The same idea applies to Pandas DataFrames, since Pandas is built on top of NumPy. This makes filtering data very powerful and intuitive.\n\nLet’s use the BRICS dataset as an example. Suppose we want to keep only the countries whose area is greater than 8 million square kilometers. Filtering a DataFrame like this typically follows three logical steps."
      },
      {
        "title": "2. The 3-Step Filtering Process",
        "body": "Filtering a DataFrame using conditions can be broken down into:"
      },
      {
        "title": "3. Select the column you want to evaluate",
        "body": "Perform a comparison to create a Boolean Series"
      },
      {
        "title": "4. Use that Boolean Series to subset the DataFrame",
        "body": "Let’s walk through this clearly."
      },
      {
        "title": "5. Step 1: Select the Column",
        "body": "First, we extract the area column. It’s best to retrieve it as a Pandas Series, not a DataFrame.\n\nbrics[\"area\"]\n\nYou could also use .loc or .iloc, but square brackets are perfectly fine here."
      },
      {
        "title": "6. Step 2: Perform the Comparison",
        "body": "Next, we compare the area values to 8:\n\nbrics[\"area\"] > 8\n\nThis returns a Boolean Series — a list of True and False values corresponding to each row. Countries with area greater than 8 million square kilometers will have True; others will have False.\n\nYou can store this result:\n\n`is_huge = brics[\"area\"] > 8`\n\nNow is_huge contains Boolean values aligned with the DataFrame’s rows.",
        "exampleCode": "is_huge = brics[\"area\"] > 8"
      },
      {
        "title": "7. Step 3: Subset the DataFrame",
        "body": "The final step is to use the Boolean Series to filter the DataFrame:\n\nbrics[is_huge]\n\nThis keeps only the rows where is_huge is True. In this case, the result includes:\n\nBrazil\n\nRussia\n\nChina\n\nThis works because Pandas automatically keeps rows where the Boolean value is True."
      },
      {
        "title": "8. Writing It in One Line",
        "body": "Instead of storing the Boolean Series in a separate variable, you can directly place the condition inside the square brackets:\n\nbrics[brics[\"area\"] > 8]\n\nThis is a very common and clean way to filter DataFrames."
      },
      {
        "title": "9. Using Boolean Operators with Pandas",
        "body": "You can also combine conditions. Since Pandas is built on NumPy, you can use NumPy’s logical functions for element-wise Boolean operations.\n\nSuppose you want countries with area between 8 and 10 million square kilometers. You can use np.logical_and():\n\n`import numpy as np`\n\nbrics[np.logical_and(brics[\"area\"] > 8,\n\nbrics[\"area\"] < 10)]\n\nThis creates a Boolean Series where both conditions must be True. The result includes only:\n\nBrazil\n\nChina\n\nRussia is excluded because its area is much larger than 10.",
        "exampleCode": "import numpy as np"
      },
      {
        "title": "10. Key Idea Behind Filtering",
        "body": "Filtering in Pandas works because:\n\nComparisons on a column return a Boolean Series.\n\nA Boolean Series can be used inside square brackets to filter rows.\n\nOnly rows corresponding to True values are kept.\n\nThis pattern — select column → compare → filter — is one of the most important techniques in data analysis. It allows you to quickly extract meaningful subsets of data in a very readable and efficient way.\n\nOnce you master this, you unlock a huge part of Pandas’ real power."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Using Python 'and'/'or' for Series boolean filtering:\ndf[df[\"price\"] > 100 and df[\"region\"] == \"East\"]",
      "correctCode": "# Use bitwise & and | with parentheses around each condition:\ndf[(df[\"price\"] > 100) & (df[\"region\"] == \"East\")]",
      "explanation": "Pandas requires bitwise operators (& and |) with parentheses. Standard Python and/or operators fail because the truth value of a whole Series is ambiguous."
    },
    "challenge": {
      "title": "Practice Drill: Filtering pandas DataFrames",
      "scenario": "Apply the concepts learned in Filtering pandas DataFrames to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Filtering pandas DataFrames.",
      "starterCode": "# Practice Challenge: Filtering pandas DataFrames\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-nbmyaxcf7xae",
    "tabId": "t.nbmyaxcf7xae",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 23,
    "title": "while loop",
    "description": "The while Loop – Notes  In the previous chapter, you learned about the if-elif-else structure. An if statement checks a condition once, executes the correspondi...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "The while Loop – Notes\n\nIn the previous chapter, you learned about the if-elif-else structure. An if statement checks a condition once, executes the corresponding block if the condition is True, and then continues with the rest of the script. The key idea is that the code inside an if statement runs only once when the condition is checked.\n\nA while loop is similar in that it also checks a condition. However, the major difference is this:\n\nA while loop keeps executing its code block over and over again as long as the condition remains True."
      },
      {
        "title": "2. Basic Idea of a While Loop",
        "body": "The syntax looks very similar to an if statement:\n\nwhile condition:\n\nexpression\n\nJust like with if:\n\nThere is a colon (:) after the condition.\n\nThe body of the loop must be indented.\n\nThe difference is that instead of running once, the code block repeats until the condition becomes False.\n\nWhen to Use a While Loop\n\nA while loop is useful when you want to:"
      },
      {
        "title": "3. Repeat an action",
        "body": "Continue until a certain condition is met\n\nRun an algorithm until a stopping rule is satisfied\n\nFor example, in numerical modeling or optimization problems, you often repeat calculations until the error becomes small enough."
      },
      {
        "title": "4. Example: Reducing Error",
        "body": "Suppose we start with an error value of 50. Our “algorithm” divides the error by 4 each time it runs. We want to keep running the algorithm until the error is no longer greater than 1.\n\n`error = 50`\n\nwhile error > 1:\n\n`error = error / 4`\n\nprint(error)\n\nLet’s walk through what happens:\n\nThe initial error is 50. Since 50 > 1, the condition is True, so the loop runs.\n\nThe error becomes 12.5, and it gets printed.\n\nPython checks the condition again. 12.5 > 1 is still True, so the loop runs again.\n\nThe error becomes 3.125.\n\nThe process repeats until the error drops below 1.\n\nOnce the condition becomes False, the loop stops.\n\nThe loop automatically exits when the condition is no longer satisfied.",
        "exampleCode": "error = 50\nerror = error / 4"
      },
      {
        "title": "5. The Crucial Part: Updating the Condition",
        "body": "Inside a while loop, something must eventually make the condition False. In our example, the line:\n\n`error = error / 4`\n\nis essential. It updates the variable so that the condition will eventually fail.\n\nIf you remove that update, the value of error never changes. The condition error > 1 would always stay True, and the loop would run forever. This is called an infinite loop.\n\nAn infinite loop:",
        "exampleCode": "error = error / 4"
      },
      {
        "title": "6. Never reaches a stopping condition",
        "body": "Keeps running indefinitely"
      },
      {
        "title": "7. May freeze or crash your session",
        "body": "If this happens on your own computer, you can stop the program manually (for example, by pressing Ctrl + C)."
      },
      {
        "title": "8. Key Takeaways",
        "body": "A while loop:\n\nRepeats code as long as a condition is True"
      },
      {
        "title": "9. Uses indentation and a colon, just like if",
        "body": "Requires a change inside the loop so the condition eventually becomes False\n\nThe most important thing to remember is:\n\nAlways make sure your loop has a clear stopping condition.\n\nWithout that, your program may run forever."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: while loop",
      "scenario": "Apply the concepts learned in while loop to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for while loop.",
      "starterCode": "# Practice Challenge: while loop\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-v9e6icp29mhn",
    "tabId": "t.v9e6icp29mhn",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 24,
    "title": "for loop",
    "description": "The for Loop – Notes  Next to the while loop, Python also provides the for loop, which is ideal for iterating over sequences such as lists, strings, or other it...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "The for Loop – Notes\n\nNext to the while loop, Python also provides the for loop, which is ideal for iterating over sequences such as lists, strings, or other iterable objects. The general recipe of a for loop can be read as:\n\nFor each var in seq, execute the expressions.\n\nHere, var is a variable that temporarily holds each element of the sequence seq during each iteration."
      },
      {
        "title": "2. Example: Iterating over a List",
        "body": "Suppose you have a list fam containing the heights of your family members:\n\n`fam = [1.73, 1.68, 1.71, 1.89]`\n\nInstead of writing separate print statements for each element, you can use a for loop:\n\nfor height in fam:\n\nprint(height)\n\nHere’s what happens step by step:\n\nPython first evaluates fam and sees that it contains 4 elements.\n\nOn the first iteration, height takes the value 1.73, and print(height) outputs 1.73.\n\nOn the second iteration, height becomes 1.68, which gets printed.\n\nThis process continues until all elements are printed, producing four separate outputs.\n\nThis approach avoids repetitive code, although you don’t have access to the index of the elements in this basic form.\n\nAccessing Indices with enumerate()\n\nIf you want to print both the index and the value, Python provides the enumerate() function. You can rewrite the loop like this:\n\nfor index, height in enumerate(fam):\n\nprint(str(index) + \": \" + str(height))\n\nenumerate(fam) produces two values on each iteration: the index and the value.\n\nindex stores the current position, while height stores the value itself.\n\nYou can then use a print statement to combine both, converting numbers to strings when necessary.\n\nThis results in output like:",
        "exampleCode": "fam = [1.73, 1.68, 1.71, 1.89]"
      },
      {
        "title": "3. 0: 1.73",
        "body": "1: 1.68"
      },
      {
        "title": "4. 2: 1.71",
        "body": "3: 1.89"
      },
      {
        "title": "5. Looping Over Strings",
        "body": "for loops are not limited to lists. You can also iterate over strings, character by character. For example:\n\nfor c in \"family\":\n\nprint(c.upper())\n\nEach iteration stores a single character in c.\n\nUsing .upper(), the character is capitalized and printed.\n\nSince \"family\" has 7 characters, the loop produces 7 printouts."
      },
      {
        "title": "6. Key Takeaways",
        "body": "The for loop iterates over sequences, executing the same code block for each element.\n\nUse enumerate() when you need access to the index during iteration.\n\nfor loops work on any iterable, including lists, strings, tuples, and more.\n\nThey are especially useful to replace repetitive code with concise, readable loops.\n\nThis makes for loops an essential tool for structured iteration in Python."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: for loop",
      "scenario": "Apply the concepts learned in for loop to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for for loop.",
      "starterCode": "# Practice Challenge: for loop\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-1jartsuuuw2h",
    "tabId": "t.1jartsuuuw2h",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 25,
    "title": "Loop Data Structures Part 1",
    "description": "Looping Over Other Data Structures – Notes  So far, we’ve seen how to loop over lists and strings using the for loop. But what about other common data structure...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Looping Over Other Data Structures – Notes\n\nSo far, we’ve seen how to loop over lists and strings using the for loop. But what about other common data structures, like dictionaries and NumPy arrays? The same for loop construct works in both cases, but the way you define the sequence to iterate over differs depending on the structure."
      },
      {
        "title": "2. Looping Over Dictionaries",
        "body": "Consider a dictionary world that contains country names as keys and populations as values. If you want to print each key-value pair on a new line, you might try directly unpacking them in a loop, similar to how enumerate() works for lists. This approach, however, raises an error because Python doesn’t automatically know how to provide two values per iteration.\n\nThe solution is to call the items() method on the dictionary:\n\nfor key, value in world.items():\n\nprint(key + \": \" + str(value))\n\nitems() generates key-value pairs for each iteration.\n\nThe order of iteration is not fixed in standard Python dictionaries (pre-3.6), so the output may not match the order in which you added elements.\n\nThe variable names are arbitrary; for example, key, value could be k, v. What matters is the order: the first variable receives the key, the second receives the value.\n\nThis is a reliable way to iterate over all dictionary pairs and access both components in the loop."
      },
      {
        "title": "3. Looping Over NumPy Arrays",
        "body": "NumPy arrays, the “data science equivalent” of Python lists, can also be iterated over with a basic for loop. For a 1D array, like bmi, a simple loop works perfectly:\n\nfor value in bmi:\n\nprint(value)\n\nHowever, for 2D arrays, things get trickier. Consider a 2D array meas created by combining height and weight arrays:\n\n`meas = np.array([np_height, np_weight])`\n\nUsing a normal for loop on meas prints each row array as a whole, not individual elements. To iterate over each element in a 2D array, use NumPy’s nditer() function:\n\nfor element in np.nditer(meas):\n\nprint(element)\n\nnditer() allows you to iterate element-wise over any array, regardless of its dimensions.\n\nIn our example, it prints all height values first, followed by all weight values, one per line.",
        "exampleCode": "meas = np.array([np_height, np_weight])"
      },
      {
        "title": "4. Key Takeaways",
        "body": "For dictionaries, use the items() method to define the sequence of key-value pairs in a for loop.\n\nFor NumPy arrays, use the nditer() function when you need to iterate over each element individually, especially for 2D or higher-dimensional arrays.\n\nThe choice of sequence definition depends on the data structure: dictionaries require a method, while NumPy arrays require a function.\n\nThis approach ensures you can handle more complex data structures efficiently in Python while keeping your loops clean and readable."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Loop Data Structures Part 1",
      "scenario": "Apply the concepts learned in Loop Data Structures Part 1 to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Loop Data Structures Part 1.",
      "starterCode": "# Practice Challenge: Loop Data Structures Part 1\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-wth7ndnih03d",
    "tabId": "t.wth7ndnih03d",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 26,
    "title": "Loop Data Structures Part 2",
    "description": "Looping Over Pandas DataFrames – Notes  Up to this point, we’ve learned how to loop over lists, strings, dictionaries, and NumPy arrays. There’s one more “kille...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Looping Over Pandas DataFrames – Notes\n\nUp to this point, we’ve learned how to loop over lists, strings, dictionaries, and NumPy arrays. There’s one more “killer” data structure for data analysis that deserves attention: the Pandas DataFrame. Looping over a DataFrame is slightly different from looping over a 2D NumPy array."
      },
      {
        "title": "2. Basic For Loop with DataFrames",
        "body": "If you try a basic for loop on a DataFrame, expecting it to iterate over rows like a 2D array, you’ll quickly notice something unexpected: the loop iterates over column names, not rows. This is because DataFrames don’t automatically treat rows as the default sequence for iteration. To explicitly iterate over rows, you need a dedicated method.\n\nUsing iterrows()\n\nThe iterrows() method allows you to loop over DataFrame rows in a controlled way. Each iteration returns two pieces of data: the row label and the row itself as a Pandas Series. For example:\n\nfor lab, row in brics.iterrows():\n\nprint(lab)\n\nprint(row)\n\nlab contains the row index (label).\n\nrow contains the row data as a Series, allowing you to select specific columns using familiar subsetting techniques.\n\nThis is useful if you want to perform operations or print selective information. For instance, to print the label and the capital of each country:\n\nfor lab, row in brics.iterrows():\n\nprint(lab, row[\"capital\"])"
      },
      {
        "title": "3. Adding a New Column via a Loop",
        "body": "You can also use iterrows() to calculate and add new columns to a DataFrame. For example, adding a column name_length to store the number of characters in each country’s name:\n\nIterate over rows with iterrows().\n\nCalculate the length of the country name using len(row[\"country\"]).\n\nAssign this value to a new column using loc[lab, \"name_length\"].\n\nfor lab, row in brics.iterrows():\n\n`brics.loc[lab, \"name_length\"] = len(row[\"country\"])`\n\nThis works fine for small DataFrames, but it’s inefficient because a new Series object is created on every iteration. For very large datasets, this can slow down performance.\n\nUsing apply() – The Vectorized Approach\n\nA more efficient and readable alternative to a for loop is the apply() function. It allows you to perform element-wise operations on a DataFrame column without explicit iteration. For example, to create the same name_length column:\n\n`brics[\"name_length\"] = brics[\"country\"].apply(len)`\n\nHere, len is applied to each element in the country column.\n\nThis produces a new array that can be stored directly in the DataFrame.\n\nThe code is cleaner, faster, and more \"Pythonic\" than using a for loop.",
        "exampleCode": "brics.loc[lab, \"name_length\"] = len(row[\"country\"])\nbrics[\"name_length\"] = brics[\"country\"].apply(len)"
      },
      {
        "title": "4. Key Takeaways",
        "body": "Looping over a DataFrame with a simple for loop iterates over columns, not rows.\n\nUse iterrows() to iterate over rows, getting both the label and row data as a Series.\n\nYou can perform selective operations or add new columns with iterrows(), but it’s not the most efficient method for large datasets.\n\nUse apply() for vectorized, element-wise operations on a column—cleaner, faster, and easier to read.\n\nMastering both iterrows() and apply() equips you with flexible tools for iterating, transforming, and manipulating DataFrames effectively."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Loop Data Structures Part 2",
      "scenario": "Apply the concepts learned in Loop Data Structures Part 2 to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Loop Data Structures Part 2.",
      "starterCode": "# Practice Challenge: Loop Data Structures Part 2\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-qsklpo9qeqmr",
    "tabId": "t.qsklpo9qeqmr",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 27,
    "title": "Random Numbers",
    "description": "Random Numbers – Notes  In this chapter, we move into a more applied scenario using everything we’ve learned so far. The focus is on simulating random processes...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Random Numbers – Notes\n\nIn this chapter, we move into a more applied scenario using everything we’ve learned so far. The focus is on simulating random processes in Python, which allows us to model complex, probabilistic events without relying solely on analytical solutions."
      },
      {
        "title": "2. Example Scenario",
        "body": "Imagine a game where you’re walking up the Empire State Building to DataCamp Headquarters. You throw a die 100 times, with these rules:\n\nIf the die shows 1 or 2, you move one step down.\n\nIf it shows 3, 4, or 5, you move one step up.\n\nIf it shows 6, you roll the die again and move up by that number of steps.\n\nAdditional rules: you cannot go below step 0, and there is a 0.1% chance of falling down the stairs with each move, sending you back to step 0. Your goal is to see the probability of reaching step 60.\n\nRather than solving this analytically, we can simulate the process thousands of times and calculate the fraction of simulations where we reach 60 steps. This is a practical application of “hacker statistics” — using computation to explore probability."
      },
      {
        "title": "3. Random Number Generators",
        "body": "To simulate these random processes, we rely on NumPy’s random generators.\n\nImport NumPy and access its random package.\n\nThe rand() function generates a random number between 0 and 1.\n\nBehind the scenes, these numbers are pseudo-random, meaning they are generated by a mathematical formula starting from a seed. You can set the seed manually for reproducibility:\n\n`import numpy as np`\n\n`np.random.seed(123)`\n\n`np.random.rand()`\n\n`np.random.rand()`\n\nSetting the seed to the same number will produce the same sequence of random numbers every time.\n\nThis reproducibility is crucial in data science, as it allows others to reproduce your experiments.",
        "exampleCode": "import numpy as np\nnp.random.seed(123)\nnp.random.rand()\nnp.random.rand()"
      },
      {
        "title": "4. Simulating a Coin Toss",
        "body": "Random numbers can simulate simple events like a coin toss:\n\nSet a seed for reproducibility.\n\nUse randint(0, 2) to randomly generate 0 or 1.\n\nCombine with an if-else statement to interpret the result:\n\n`np.random.seed(123)`\n\n`coin = np.random.randint(0, 2)`\n\nif coin == 0:\n\nprint(\"heads\")\n\nelse:\n\nprint(\"tails\")\n\nHere, 0 represents “heads” and 1 represents “tails”.\n\nBecause the seed is fixed, the coin toss result is consistent between runs.\n\nThis demonstrates how random numbers can be used to simulate real-life chance events in Python, laying the foundation for more complex simulations, like the dice game described earlier.",
        "exampleCode": "np.random.seed(123)\ncoin = np.random.randint(0, 2)"
      },
      {
        "title": "5. Key Points",
        "body": "Random numbers generated in Python are pseudo-random, controlled by a seed.\n\nReproducibility is achieved by setting the seed.\n\nNumPy functions like rand() and randint() allow for flexible simulations of probabilistic events.\n\nCombining randomness with control structures (e.g., if-else) lets us model complex scenarios and explore probabilities computationally.\n\nThis forms the backbone for simulation-based probability studies, Monte Carlo methods, and other stochastic modeling in Python."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Random Numbers",
      "scenario": "Apply the concepts learned in Random Numbers to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Random Numbers.",
      "starterCode": "# Practice Challenge: Random Numbers\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-2kharp2uilsq",
    "tabId": "t.2kharp2uilsq",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 28,
    "title": "Random Walk",
    "description": "Random Walk – Notes  In probability and simulation, a random step occurs when the next move in a process is determined by chance, such as rolling a die. If this...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Random Walk – Notes\n\nIn probability and simulation, a random step occurs when the next move in a process is determined by chance, such as rolling a die. If this random decision happens repeatedly, the sequence of movements is called a random walk. For example, if you roll a die 100 times and let each roll determine whether you move up or down a step, the resulting sequence of movements forms a random walk.\n\nRandom walks are widely used in science and modeling. They help describe processes where movement or change happens unpredictably over time. For instance, the path of a molecule moving through a liquid or gas can be modeled as a random walk. Another example is the financial status of a gambler, which can increase or decrease randomly depending on wins and losses. To simulate such processes in Python, we need a way to record each step over time, which can be done by gradually building a list inside a loop."
      },
      {
        "title": "2. Recording Random Outcomes with a Loop",
        "body": "One way to start understanding random processes is by simulating a simple heads-or-tails game several times. In Python, this can be done using NumPy’s random number generator.\n\nThe basic idea is:\n\nImport NumPy and set a random seed for reproducibility.\n\nCreate an empty list to store outcomes.\n\nRun a for loop a certain number of times (for example, 10).\n\nIn each iteration, generate a random number (0 or 1).\n\nAppend either \"heads\" or \"tails\" to the list depending on the result.\n\nThe loop uses the range() function, which generates a sequence of numbers that the loop can iterate over. During each iteration, the outcome is added to the list using the append() method. After the loop finishes, the list contains all outcomes from the 10 simulated coin tosses.\n\nAlthough this produces random results, it does not yet form a random walk, because each outcome is independent and not influenced by previous outcomes."
      },
      {
        "title": "3. Turning Random Outcomes into a Random Walk",
        "body": "To create a true random walk, we must track how the result changes over time based on previous values. In the coin toss example, this can be done by tracking the total number of tails thrown so far.\n\nInstead of storing strings like \"heads\" or \"tails\", we store the cumulative count of tails. The process works like this:\n\nStart with a list called tails that contains a single value [0], since initially no tails have been thrown.\n\nRun a loop 10 times using range().\n\nGenerate a random number (0 for heads, 1 for tails).\n\nAdd the result (coin) to the previous number of tails.\n\nAppend this new value to the list.\n\nEach new value depends on the previous state, meaning the sequence evolves step by step. When the script finishes, the list contains 11 numbers (the starting value plus 10 steps)."
      },
      {
        "title": "4. From Random Steps to Random Walk",
        "body": "When comparing the simple outcomes list with the cumulative tails list, the difference becomes clear. In the second version:\n\nThe numbers increase by 1 whenever tails appears.\n\nThe sequence reflects the history of previous events.\n\nThis transformation—from independent random results to a cumulative process—is what turns random steps into a random walk. Random walks are an important concept in data science and statistics because they help model many real-world systems where change happens gradually and unpredictably over time."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Random Walk",
      "scenario": "Apply the concepts learned in Random Walk to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Random Walk.",
      "starterCode": "# Practice Challenge: Random Walk\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-axyekgfhoxjq",
    "tabId": "t.axyekgfhoxjq",
    "moduleTitle": "Part 2: Intermediate Python & Visualizations",
    "moduleOrder": 2,
    "lessonOrder": 29,
    "title": "Distribution of Random Walk",
    "description": "Distribution of Random Walks – Notes  In this final segment, we explore how to understand the distribution of outcomes in a random walk. Recall the scenario: yo...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Distribution of Random Walks – Notes\n\nIn this final segment, we explore how to understand the distribution of outcomes in a random walk. Recall the scenario: you roll a die 100 times, and depending on the result, you move steps up or down. This sequence of steps forms a random walk. While simulating a single walk gives one possible outcome, the question we want to answer is: what is the chance of reaching a certain step, like step 60?\n\nThe key idea is that each simulation of the random walk may end at a different final step. If we repeat the walk thousands of times, we obtain a set of final steps. This set represents a distribution of outcomes, from which we can estimate probabilities."
      },
      {
        "title": "2. Random Walk Example with Coin Toss",
        "body": "We can illustrate this concept with a simpler example: tracking the total number of tails in 10 coin tosses. Starting at zero, we generate a random number 10 times, either 0 (heads) or 1 (tails), and cumulatively track the number of tails. After 10 tosses, we record the final count of tails.\n\nTo examine the distribution of results across many trials:\n\nSet a random seed for reproducibility.\n\nCreate an empty list called final_tails to store the outcomes.\n\nRun a for loop a number of times (say, 100 iterations) to simulate repeated games.\n\nInside the loop, build the tails list as before.\n\nAfter each simulated game, append the last element of the tails list (the final number of tails) to final_tails.\n\nThe result is a list of integers between 0 and 10, each representing the outcome of a single 10-toss game.\n\nThese values form a distribution, which we can visualize using a histogram."
      },
      {
        "title": "3. Visualizing the Distribution",
        "body": "To create a histogram of the simulated outcomes:\n\nImport pyplot from Matplotlib.\n\nReplace the print statement with plt.hist(final_tails, bins=10).\n\nCall plt.show() to display the plot.\n\nAs you increase the number of simulations, the histogram becomes smoother:\n\n100 runs: Gives a rough idea of the distribution.\n\n1,000 runs: The histogram starts to show a clearer pattern.\n\n10,000 runs: The distribution starts to converge to a bell shape, resembling the theoretical binomial distribution.\n\nFrom such a curve, we can extract probabilities. For instance, in 10,000 games, about 2,500 games might result in exactly 5 tails."
      },
      {
        "title": "4. Key Takeaways",
        "body": "Random walks produce distributions: Repeating the simulation many times allows us to estimate probabilities.\n\nVisualization helps: Histograms reveal the shape and tendencies of the distribution.\n\nConvergence: Increasing the number of simulations brings the empirical distribution closer to the theoretical one.\n\nThis technique can be extended to more complex scenarios, such as the Empire State Building die-rolling game, allowing you to estimate the probability of reaching step 60 or any other outcome.\n\nSimulating random processes repeatedly and analyzing the distribution of results is a powerful method in data science for understanding chance and probability in complex systems."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Distribution of Random Walk",
      "scenario": "Apply the concepts learned in Distribution of Random Walk to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Distribution of Random Walk.",
      "starterCode": "# Practice Challenge: Distribution of Random Walk\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-m39rhigodj9o",
    "tabId": "t.m39rhigodj9o",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 30,
    "title": "Data Aggregation",
    "description": "Data Aggregation Fundamentals  A data summary provides insights that would otherwise be difficult to recognize by examining raw data.  Data aggregation is the d...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Data Aggregation Fundamentals\n\nA data summary provides insights that would otherwise be difficult to recognize by examining raw data.\n\nData aggregation is the data manipulation operation used to summarize data by applying operations to specific columns to produce single values."
      },
      {
        "title": "2. Design Framework",
        "body": "To effectively design a data aggregation operation, answer two key questions:\n\nWhich column do we wish to summarize? Select the column containing values relevant to your question.\n\nWhich summary operation do we wish to apply? Choose the appropriate operation based on the insight you need."
      },
      {
        "title": "3. Mean vs. Median",
        "body": "The mean is the sum of all values divided by the number of values.\n\nThe median is the middle value when data is sorted.\n\nThe median is not affected by outliers because it only considers the middle value(s), while the mean is influenced by outliers because it takes into account all values.\n\nChoose median when you don't want outliers to affect your summary, and mean when there are no outliers or when you want to capture their effect."
      },
      {
        "title": "4. Working with DataFrames",
        "body": "In Python, a table of data is called a DataFrame. We often create a new DataFrame by loading data into Python from CSV files.\n\n`orders_df = pd.read_csv('orders.csv')`\n\nTo extract a column from a DataFrame, use the bracket [] operator. The column is returned as a Series.\n\n`amounts = orders_df['amount']`",
        "exampleCode": "orders_df = pd.read_csv('orders.csv')\namounts = orders_df['amount']"
      },
      {
        "title": "5. Summarizing Data in Python",
        "body": "To summarize data in Python, we apply our aggregation method on the extracted columns:\n\namounts= orders_df['amount']\n\n`total_revenue = amounts.sum()`\n\nThe key summary methods:\n\nsum(): Calculates the total of all values\n\nmean(): Calculates the average value\n\nmedian(): Identifies the middle value when data is sorted\n\nmin() and max(): Finds the minimum or maximum value\n\ncount(): Counts the number of rows or values\n\nnunique(): Counts the number of unique values",
        "exampleCode": "total_revenue = amounts.sum()"
      }
    ],
    "quickReference": [
      {
        "goal": "Group by and sum",
        "syntax": "df.groupby(\"region\")[\"sales\"].sum()"
      },
      {
        "goal": "Multiple aggregations",
        "syntax": "df.groupby(\"region\")[\"sales\"].agg([\"mean\", \"count\"])"
      },
      {
        "goal": "2D Pivot Table",
        "syntax": "df.pivot_table(values=\"sales\", index=\"region\", columns=\"prod\")"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Data Aggregation",
      "scenario": "Apply the concepts learned in Data Aggregation to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Data Aggregation.",
      "starterCode": "# Practice Challenge: Data Aggregation\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-fiepsjjm9w10",
    "tabId": "t.fiepsjjm9w10",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 31,
    "title": "Introduction to DataFrames",
    "description": "Introducing DataFrames (Pandas Notes)  What is pandas?  pandas is a powerful Python package mainly used for data manipulation and analysis. It is one of the mos...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Introducing DataFrames (Pandas Notes)\n\nWhat is pandas?\n\npandas is a powerful Python package mainly used for data manipulation and analysis. It is one of the most important tools in data science because real-world data is usually large, messy, and stored in tables. pandas helps organize and work with this data efficiently.\n\nThe course introduces pandas step by step:"
      },
      {
        "title": "2. Chapter 1 focuses on DataFrames",
        "body": "Chapter 2 covers aggregating and analyzing data"
      },
      {
        "title": "3. Chapter 3 teaches slicing and indexing",
        "body": "Chapter 4 discusses:\n\nvisualization\n\nmissing data\n\nimporting data into DataFrames\n\npandas is built on NumPy and Matplotlib\n\npandas is built on top of two important Python libraries:\n\nNumPy — provides fast multidimensional arrays and numerical operations.\n\nMatplotlib — provides data visualization and plotting features.\n\nBecause pandas uses these libraries internally, it becomes both powerful and flexible for handling datasets."
      },
      {
        "title": "4. Why pandas is popular",
        "body": "pandas is widely used in the data science community because it simplifies working with datasets. Millions of Python users rely on it for tasks such as:\n\ncleaning data\n\nfiltering information\n\nperforming calculations\n\nanalyzing trends\n\npreparing data for machine learning\n\nvisualizing results\n\nIt has become one of the standard tools for data analysis in Python."
      },
      {
        "title": "5. Rectangular or Tabular Data",
        "body": "Most datasets are stored in rectangular (tabular) form, similar to spreadsheets or database tables.\n\nExample: a dataset about dogs.\n\nEach row represents one observation (one dog).\n\nEach column represents a variable or property:\n\nname\n\nbreed\n\nage\n\nweight\n\ncolor\n\nThis table-like structure is exactly what pandas is designed to handle.\n\nDataFrames\n\nThe main object in pandas is the DataFrame.\n\nA DataFrame is a table with:\n\n`rows = observations`\n\n`columns = variables/features`\n\nEach column contains values of the same data type, but different columns may contain different types.\n\nExample:\n\nage → integers\n\nweight → floats\n\nname → strings\n\nThis flexibility makes DataFrames better than regular NumPy arrays for mixed datasets.",
        "exampleCode": "rows = observations\ncolumns = variables/features"
      },
      {
        "title": "6. Exploring a DataFrame",
        "body": "When receiving a new dataset, the first step is usually to explore and understand it.\n\npandas provides several useful methods and attributes for this.\n\n.head()\n\nThe .head() method displays the first few rows of a DataFrame.\n\ndogs.head()\n\nThis is useful for quickly previewing the dataset structure and contents.\n\nBy default, it shows the first 5 rows.\n\n.info()\n\nThe .info() method gives technical information about the DataFrame.\n\ndogs.info()\n\nIt shows:\n\ncolumn names\n\ndata types\n\nnumber of non-missing values\n\nmemory usage\n\nThis is especially useful for checking missing data and understanding the structure of the dataset.\n\n.shape\n\nThe .shape attribute returns the dimensions of the DataFrame.\n\ndogs.shape\n\nOutput example:\n\n(7, 4)\n\nMeaning:"
      },
      {
        "title": "7. 7 rows",
        "body": "4 columns\n\nUnlike methods, attributes do not use parentheses.\n\n.describe()\n\nThe .describe() method generates summary statistics for numerical columns.\n\ndogs.describe()\n\nIt usually includes:\n\ncount\n\nmean\n\nstandard deviation\n\nminimum value\n\nquartiles\n\nmaximum value\n\nThis gives a quick statistical overview of numeric data."
      },
      {
        "title": "8. Components of a DataFrame",
        "body": "A DataFrame has three important parts.\n\n1. Data Values → .to_numpy()\n\nYou can convert the DataFrame values into a NumPy array.\n\ndogs.to_numpy()\n\nThis returns a 2D NumPy array containing only the raw data values.\n\n2. Column Labels → .columns\n\nThe .columns attribute contains the column names.\n\ndogs.columns\n\nExample output:\n\nIndex(['name', 'breed', 'age'])\n\n3. Row Labels → .index\n\nThe .index attribute stores row labels.\n\ndogs.index\n\nThese labels may be:\n\nrow numbers\n\ncustom names\n\ndates\n\nIDs\n\nImportant note:\n\nRow labels are accessed using .index, not .rows.\n\npandas Philosophy\n\nPython generally follows the idea that there should be one obvious way to solve a problem. pandas is different.\n\nIn pandas:\n\nthere are often multiple ways to do the same task\n\nusers can choose whichever method they prefer\n\nThis makes pandas:\n\nvery flexible\n\nextremely powerful\n\nslightly harder to learn at first\n\nA good way to think about pandas is like a Swiss Army knife:\n\nit provides many tools for handling data efficiently."
      },
      {
        "title": "9. Key Takeaways",
        "body": "pandas is a Python library for data analysis and manipulation.\n\nThe main pandas structure is the DataFrame.\n\nDataFrames store data in rows and columns.\n\npandas works especially well with tabular data.\n\nImportant exploration tools include:\n\n.head()\n\n.info()\n\n.shape\n\n.describe()\n\nDataFrames also contain:\n\nvalues\n\ncolumn labels\n\nrow labels\n\npandas is built on top of NumPy and Matplotlib."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Introduction to DataFrames",
      "scenario": "Apply the concepts learned in Introduction to DataFrames to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Introduction to DataFrames.",
      "starterCode": "# Practice Challenge: Introduction to DataFrames\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-ke06sr99nxz8",
    "tabId": "t.ke06sr99nxz8",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 32,
    "title": "Sorting and Subsetting",
    "description": "Sorting and Subsetting in pandas  Sorting and subsetting are two of the most important skills when working with pandas DataFrames. These techniques help you qui...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Sorting and Subsetting in pandas\n\nSorting and subsetting are two of the most important skills when working with pandas DataFrames. These techniques help you quickly focus on the most useful or interesting parts of your dataset.\n\nA DataFrame can contain thousands or even millions of rows, so instead of looking at everything at once, you usually:\n\nsort the data to organize it better\n\nsubset the data to focus only on specific rows or columns"
      },
      {
        "title": "2. Sorting Data",
        "body": "Sorting changes the order of the rows in a DataFrame.\n\nIn pandas, this is done using the .sort_values() method."
      },
      {
        "title": "3. Sorting by One Column",
        "body": "Suppose you have a dogs DataFrame and want to sort dogs by weight.\n\ndogs.sort_values(\"weight_kg\")\n\nThis sorts the rows from smallest weight to largest weight by default.\n\nResult:\n\nlightest dog appears first\n\nheaviest dog appears last"
      },
      {
        "title": "4. Sorting in Descending Order",
        "body": "To reverse the order, use the ascending=False argument.\n\ndogs.sort_values(\"weight_kg\", ascending=False)\n\nNow the heaviest dogs appear first."
      },
      {
        "title": "5. Sorting by Multiple Columns",
        "body": "You can also sort using more than one column.\n\ndogs.sort_values([\"weight_kg\", \"height_cm\"])\n\nThis means:\n\nsort by weight first\n\nif weights are equal, sort by height\n\nThis is useful when several rows share the same values in one column."
      },
      {
        "title": "6. Different Sort Directions for Multiple Columns",
        "body": "You can control the direction for each column separately using a list in ascending.\n\ndogs.sort_values(\n\n[\"weight_kg\", \"height_cm\"],\n\nascending=[True, False]\n\n)\n\nMeaning:\n\nweight → ascending\n\nheight → descending\n\nSo rows with equal weight are ordered from tallest to shortest."
      },
      {
        "title": "7. Subsetting Columns",
        "body": "Subsetting means selecting only the data you need.\n\nTo select one column:\n\ndogs[\"name\"]\n\nThis returns a pandas Series containing only the name column."
      },
      {
        "title": "8. Selecting Multiple Columns",
        "body": "To keep multiple columns, use double square brackets.\n\ndogs[[\"name\", \"height_cm\"]]\n\nWhy double brackets?\n\nouter brackets → subset the DataFrame\n\ninner brackets → create a list of column names\n\nThe result is a smaller DataFrame containing only those columns."
      },
      {
        "title": "9. Subsetting Rows",
        "body": "Rows are usually filtered using conditions that produce True or False."
      },
      {
        "title": "10. Filtering Numeric Data",
        "body": "Example: dogs taller than 50 cm.\n\ndogs[\"height_cm\"] > 50\n\nThis produces a Boolean Series:"
      },
      {
        "title": "11. True if condition matches",
        "body": "False otherwise\n\nTo actually filter the DataFrame:\n\ndogs[dogs[\"height_cm\"] > 50]\n\nOnly rows where the condition is True are returned."
      },
      {
        "title": "12. Filtering Text Data",
        "body": "You can also filter categorical or text columns.\n\nExample: get only Labradors.\n\ndogs[dogs[\"breed\"] == \"Labrador\"]\n\nThe double equals == checks equality."
      },
      {
        "title": "13. Filtering Dates",
        "body": "Dates can also be compared.\n\nExample: dogs born before 2015.\n\ndogs[dogs[\"date_of_birth\"] < \"2015-01-01\"]\n\nDate format used:\n\nYYYY-MM-DD\n\nThis is the international standard format."
      },
      {
        "title": "14. Filtering with Multiple Conditions",
        "body": "Sometimes one condition is not enough.\n\nExample:\n\ndogs taller than 50 cm\n\nAND weighing more than 20 kg\n\ndogs[\n\n(dogs[\"height_cm\"] > 50) &\n\n(dogs[\"weight_kg\"] > 20)\n\n]\n\nImportant:\n\nuse parentheses around each condition\n\nuse:\n\n& for AND\n\n| for OR\n\nIn pandas, you do not use normal Python and and or for Series comparisons.\n\nFiltering with .isin()\n\nIf you want multiple possible values from a category, .isin() is easier.\n\nExample: dogs that are black or brown.\n\ndogs[dogs[\"color\"].isin([\"Black\", \"Brown\"])]\n\n.isin() checks whether each value exists inside the list provided."
      },
      {
        "title": "15. Key Takeaways",
        "body": "Sorting:\n\n.sort_values() sorts rows\n\nascending=False reverses order\n\nmultiple columns can be used for sorting\n\nSubsetting Columns:\n\nsingle brackets → one column\n\ndouble brackets → multiple columns\n\nSubsetting Rows:\n\nuse logical conditions\n\nconditions return Boolean values\n\nplace conditions inside square brackets\n\nUseful filtering techniques:\n\nnumeric filtering\n\ntext filtering\n\ndate filtering\n\nmultiple conditions using & and |\n\n.isin() for multiple category values\n\nThese operations are essential because most real-world data analysis involves:\n\norganizing data\n\nfiltering relevant information\n\nnarrowing large datasets into useful insights"
      }
    ],
    "quickReference": [
      {
        "goal": "Label-based indexing",
        "syntax": "df.loc[row_label, col_label]"
      },
      {
        "goal": "Position-based indexing",
        "syntax": "df.iloc[row_idx, col_idx]"
      },
      {
        "goal": "Select column as Series",
        "syntax": "df[\"col_name\"]"
      },
      {
        "goal": "Select multiple columns",
        "syntax": "df[[\"col_a\", \"col_b\"]]"
      },
      {
        "goal": "Boolean mask filter",
        "syntax": "df[df[\"col\"] > 100]"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Using Python 'and'/'or' for Series boolean filtering:\ndf[df[\"price\"] > 100 and df[\"region\"] == \"East\"]",
      "correctCode": "# Use bitwise & and | with parentheses around each condition:\ndf[(df[\"price\"] > 100) & (df[\"region\"] == \"East\")]",
      "explanation": "Pandas requires bitwise operators (& and |) with parentheses. Standard Python and/or operators fail because the truth value of a whole Series is ambiguous."
    },
    "challenge": {
      "title": "Practice Drill: Sorting and Subsetting",
      "scenario": "Apply the concepts learned in Sorting and Subsetting to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Sorting and Subsetting.",
      "starterCode": "# Practice Challenge: Sorting and Subsetting\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-agkgxcliakxl",
    "tabId": "t.agkgxcliakxl",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 33,
    "title": "New Columns",
    "description": "New Columns in pandas  When working with pandas DataFrames, the data you receive is often not exactly in the format you need. Because of this, one of the most c...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "New Columns in pandas\n\nWhen working with pandas DataFrames, the data you receive is often not exactly in the format you need. Because of this, one of the most common tasks in pandas is creating new columns based on existing data.\n\nThis process can also be called:\n\ntransforming a DataFrame\n\nmutating a DataFrame\n\nfeature engineering\n\nFeature engineering is especially important in data science and machine learning because new variables can reveal better insights from the data."
      },
      {
        "title": "2. Adding a New Column",
        "body": "Creating a new column is straightforward in pandas.\n\nThe general format is:\n\n`df[\"new_column\"] = calculation`\n\nLeft side → name of the new column\n\nRight side → calculation or transformation",
        "exampleCode": "df[\"new_column\"] = calculation"
      },
      {
        "title": "3. Example: Converting Height to Meters",
        "body": "Suppose the dogs DataFrame has a column called height_cm.\n\nTo create a new column for height in meters:\n\n`dogs[\"height_m\"] = dogs[\"height_cm\"] / 100`\n\nWhat happens here:\n\npandas takes every value in height_cm\n\ndivides it by 100\n\nstores the result in a new column called height_m\n\nThe original DataFrame is updated automatically.",
        "exampleCode": "dogs[\"height_m\"] = dogs[\"height_cm\"] / 100"
      },
      {
        "title": "4. Creating Columns Using Multiple Existing Columns",
        "body": "New columns can also be created using calculations involving several columns."
      },
      {
        "title": "5. Example: Doggy BMI",
        "body": "BMI (Body Mass Index) is calculated as:\n\n`BMI = weight / (height²)`\n\nFor dogs:\n\n`dogs[\"bmi\"] = dogs[\"weight_kg\"] / dogs[\"height_m\"] ** 2`\n\nExplanation:\n\ndogs[\"height_m\"] ** 2\n\n→ squares the height values\n\nweight is divided by squared height\n\nresults are stored in a new bmi column\n\nThis demonstrates how pandas performs calculations element-by-element across entire columns.",
        "exampleCode": "BMI = weight / (height²)\ndogs[\"bmi\"] = dogs[\"weight_kg\"] / dogs[\"height_m\"] ** 2"
      },
      {
        "title": "6. Combining Multiple pandas Operations",
        "body": "The real strength of pandas comes from chaining operations together.\n\nYou can:\n\ncreate new columns\n\nfilter rows\n\nsort data\n\nselect specific columns\n\nall in a logical workflow."
      },
      {
        "title": "7. Example: Finding Tall Skinny Dogs",
        "body": "Suppose we define skinny dogs as dogs with BMI below 100.\n\nFirst, filter the DataFrame:\n\n`skinny_dogs = dogs[dogs[\"bmi\"] < 100]`\n\nNext, sort by height in descending order:\n\n`skinny_dogs = skinny_dogs.sort_values(`\n\n\"height_cm\",\n\nascending=False\n\n)\n\nFinally, select only the columns we want:\n\nskinny_dogs[[\"name\", \"height_cm\", \"bmi\"]]\n\nThis produces a cleaner DataFrame focused only on the relevant information.\n\nWhy New Columns Are Important\n\nCreating derived columns allows you to:\n\ncalculate statistics\n\nconvert units\n\nclassify observations\n\nprepare features for machine learning\n\nsimplify analysis\n\nInstead of manually calculating values one at a time, pandas automatically performs operations across entire columns efficiently.",
        "exampleCode": "skinny_dogs = dogs[dogs[\"bmi\"] < 100]\nskinny_dogs = skinny_dogs.sort_values("
      },
      {
        "title": "8. Key Takeaways",
        "body": "New columns are created using:\n\n`df[\"new_column\"] = calculation`\n\nCalculations can use:\n\nconstants\n\none column\n\nmultiple columns\n\npandas performs operations element-wise across rows automatically.\n\nCreating new columns is commonly called:\n\nmutation\n\ntransformation\n\nfeature engineering\n\npandas becomes especially powerful when combining:\n\nfiltering\n\nsorting\n\ncolumn selection\n\nnew column creation\n\nThese transformations are a core part of real-world data analysis workflows.",
        "exampleCode": "df[\"new_column\"] = calculation"
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: New Columns",
      "scenario": "Apply the concepts learned in New Columns to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for New Columns.",
      "starterCode": "# Practice Challenge: New Columns\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-3ejmflolppnf",
    "tabId": "t.3ejmflolppnf",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 34,
    "title": "Summary Statistics",
    "description": "Summary Statistics in pandas  In pandas, summary statistics are numerical values that help describe and summarize a dataset. Instead of manually checking every ...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Summary Statistics in pandas\n\nIn pandas, summary statistics are numerical values that help describe and summarize a dataset. Instead of manually checking every row, summary statistics give a quick overview of the data and help identify patterns, trends, or unusual values.\n\nThis chapter focuses on aggregating data, which means combining many values into meaningful summaries."
      },
      {
        "title": "2. Summarizing Numerical Data",
        "body": "One of the most common summary statistics is the mean (average). The mean gives an idea of the “center” of the data.\n\nTo calculate the mean of a column:\n\ndogs[\"weight_kg\"].mean()\n\nThis computes the average weight of all dogs in the dataset."
      },
      {
        "title": "3. Common Summary Statistics",
        "body": "pandas provides many built-in statistical methods.\n\nSome important ones are:\n\nMethod\n\nDescription\n\n.mean()"
      },
      {
        "title": "4. Average value",
        "body": ".median()"
      },
      {
        "title": "5. Middle value",
        "body": ".mode()"
      },
      {
        "title": "6. Most common value",
        "body": ".min()"
      },
      {
        "title": "7. Smallest value",
        "body": ".max()"
      },
      {
        "title": "8. Largest value",
        "body": ".var()\n\nVariance\n\n.std()"
      },
      {
        "title": "9. Standard deviation",
        "body": ".sum()"
      },
      {
        "title": "10. Total sum",
        "body": ".quantile()"
      },
      {
        "title": "11. Specific percentile",
        "body": "Example:\n\ndogs[\"height_cm\"].median()\n\nThis returns the median height."
      },
      {
        "title": "12. Summarizing Dates",
        "body": "Summary statistics also work for date columns.\n\nFor example:\n\ndogs[\"date_of_birth\"].min()\n\nThis gives the oldest dog's birth date because earlier dates are smaller.\n\nSimilarly:\n\ndogs[\"date_of_birth\"].max()\n\nreturns the youngest dog's birth date.\n\nThe .agg() Method\n\nThe .agg() method (short for aggregate) allows you to compute custom or multiple summary statistics.\n\nYou can create your own function and apply it to a column."
      },
      {
        "title": "13. Example: 30th Percentile",
        "body": "def pct30(column):\n\nreturn column.quantile(0.3)\n\nThis function returns the 30th percentile of a column.\n\nUsing .agg():\n\ndogs[\"weight_kg\"].agg(pct30)\n\nThis computes the 30th percentile of dog weights.\n\nUsing .agg() on Multiple Columns\n\nYou can apply the same aggregation to several columns at once.\n\ndogs[[\"weight_kg\", \"height_cm\"]].agg(pct30)\n\nThis calculates the 30th percentile for both weight and height."
      },
      {
        "title": "14. Multiple Summary Statistics at Once",
        "body": ".agg() can also calculate several statistics simultaneously.\n\nExample:\n\ndef pct40(column):\n\nreturn column.quantile(0.4)\n\nNow apply both functions:\n\ndogs[\"weight_kg\"].agg([pct30, pct40])\n\nThis returns:"
      },
      {
        "title": "15. 30th percentile",
        "body": "40th percentile\n\nfor the same column.\n\nThis is useful when comparing different summaries together."
      },
      {
        "title": "16. Cumulative Statistics",
        "body": "Unlike normal summary statistics that return one value, cumulative statistics return a running total or running calculation across rows."
      },
      {
        "title": "17. Cumulative Sum",
        "body": "The .cumsum() method computes a running total.\n\ndogs[\"weight_kg\"].cumsum()\n\nHow it works:\n\nfirst row → first value\n\nsecond row → first + second\n\nthird row → first + second + third\n\nand so on\n\nThe last value equals the total sum of the column."
      },
      {
        "title": "18. Other Cumulative Methods",
        "body": "pandas also provides other cumulative functions:\n\nMethod\n\nDescription\n\n.cumsum()"
      },
      {
        "title": "19. Cumulative sum",
        "body": ".cummax()"
      },
      {
        "title": "20. Running maximum",
        "body": ".cummin()"
      },
      {
        "title": "21. Running minimum",
        "body": ".cumprod()"
      },
      {
        "title": "22. Running product",
        "body": "These methods return an entire Series instead of one summary number."
      },
      {
        "title": "23. Walmart Dataset",
        "body": "The course introduces a Walmart dataset to practice aggregation and summary statistics.\n\nThe dataset includes:\n\nweekly sales\n\nstore IDs\n\nstore types\n\ndepartment IDs\n\nholiday information\n\ntemperature\n\nfuel prices\n\nunemployment rates\n\nThis type of dataset is ideal for:\n\ncalculating averages\n\ncomparing stores\n\nanalyzing trends\n\nsummarizing performance"
      },
      {
        "title": "24. Key Takeaways",
        "body": "Summary statistics help quickly understand datasets without examining every row.\n\nImportant pandas methods include:\n\n.mean()\n\n.median()\n\n.min()\n\n.max()\n\n.std()\n\n.quantile()\n\nThe .agg() method:\n\napplies custom functions\n\nworks on one or multiple columns\n\ncan compute multiple statistics simultaneously\n\nCumulative methods like:\n\n.cumsum()\n\n.cummax()\n\n.cummin()\n\nreturn running calculations across rows.\n\nThese tools are essential in real-world data analysis because they help transform raw data into meaningful insights quickly and efficiently."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Summary Statistics",
      "scenario": "Apply the concepts learned in Summary Statistics to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Summary Statistics.",
      "starterCode": "# Practice Challenge: Summary Statistics\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-van30921kk8y",
    "tabId": "t.van30921kk8y",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 35,
    "title": "Counting",
    "description": "Counting and Summarizing Categorical Data in pandas  In pandas, summary statistics are not only useful for numbers. Sometimes, you also need to summarize catego...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Counting and Summarizing Categorical Data in pandas\n\nIn pandas, summary statistics are not only useful for numbers. Sometimes, you also need to summarize categorical data such as:\n\ndog breeds\n\ncolors\n\nstore types\n\ndepartments\n\ncategories\n\nThe most common way to summarize categorical variables is through counting."
      },
      {
        "title": "2. The Problem of Double Counting",
        "body": "Imagine a dataset containing vet visits.\n\nA dog may visit the vet multiple times, meaning the same dog can appear in several rows.\n\nExample:\n\nname\n\nbreed\n\nMax\n\nLabrador\n\nStella\n\nChihuahua\n\nMax\n\nLabrador\n\nIf we directly count breeds, the same dog could be counted multiple times, leading to inaccurate results.\n\nTo avoid this, we first remove duplicates."
      },
      {
        "title": "3. Removing Duplicate Rows",
        "body": "The .drop_duplicates() method removes repeated rows."
      },
      {
        "title": "4. Dropping Duplicates Based on One Column",
        "body": "Suppose we only want one row per dog name.\n\nvet_visits.drop_duplicates(subset=\"name\")\n\nThis keeps only the first occurrence of each dog name.\n\nHowever, this can create problems if different dogs share the same name.\n\nExample:"
      },
      {
        "title": "5. Max the Labrador",
        "body": "Max the Chow Chow\n\nOne of them would disappear."
      },
      {
        "title": "6. Dropping Duplicates Using Multiple Columns",
        "body": "To better identify unique dogs, we can use both:\n\nname\n\nBreed\n\nvet_visits.drop_duplicates(\n\nsubset=[\"name\", \"breed\"]\n\n)\n\nNow pandas only removes rows where both the name and breed are duplicates.\n\nThis preserves dogs that share the same name but are different breeds.\n\nCounting Categories with .value_counts()\n\nOnce duplicates are removed, we can count occurrences of each category.\n\nExample:\n\nunique_dogs[\"breed\"].value_counts()\n\nThis counts how many dogs belong to each breed.\n\nOutput example:"
      },
      {
        "title": "7. Labrador 4",
        "body": "Chihuahua 2"
      },
      {
        "title": "8. Poodle 1",
        "body": "By default, results are sorted from highest count to lowest count."
      },
      {
        "title": "9. Sorting Counts",
        "body": "You can control sorting using the sort argument.\n\nunique_dogs[\"breed\"].value_counts(sort=True)\n\nThis keeps the largest counts at the top."
      },
      {
        "title": "10. Calculating Proportions",
        "body": "Instead of raw counts, you may want percentages or proportions.\n\nUse normalize=True.\n\nunique_dogs[\"breed\"].value_counts(\n\nnormalize=True\n\n)\n\nOutput example:"
      },
      {
        "title": "11. Labrador 0.25",
        "body": "Chihuahua 0.15\n\nMeaning:"
      },
      {
        "title": "12. 25% are Labradors",
        "body": "15% are Chihuahuas\n\nThese are proportions of the total dataset."
      },
      {
        "title": "13. Why Counting is Important",
        "body": "Counting categorical data helps answer questions like:\n\nWhich category appears most often?\n\nWhat percentage belongs to each group?\n\nWhich values are rare?\n\nHow is the data distributed?\n\nThis is extremely common in:\n\nsurveys\n\ncustomer analysis\n\nsales data\n\nmachine learning preprocessing"
      },
      {
        "title": "14. Key Takeaways",
        "body": "Categorical data is summarized mainly through counting.\n\n.drop_duplicates() removes repeated rows.\n\nsubset= specifies which columns determine duplicates.\n\nMultiple columns can be used for more accurate duplicate handling.\n\nCounting methods:\n\n.value_counts() → counts occurrences\n\nnormalize=True → converts counts into proportions\n\nThese tools are essential for understanding distributions in categorical datasets and avoiding misleading duplicate counts."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Counting",
      "scenario": "Apply the concepts learned in Counting to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Counting.",
      "starterCode": "# Practice Challenge: Counting\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-j44lmkaauma",
    "tabId": "t.j44lmkaauma",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 36,
    "title": "Grouped summary statistics",
    "description": "Grouped Summary Statistics in pandas  Grouped summary statistics let you calculate statistics for different categories or groups inside your dataset instead of ...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Grouped Summary Statistics in pandas\n\nGrouped summary statistics let you calculate statistics for different categories or groups inside your dataset instead of calculating everything for the whole DataFrame at once. This is useful because comparing groups often reveals patterns and insights that would otherwise stay hidden.\n\nFor example, instead of asking:\n\n“What is the average weight of all dogs?”\n\nyou can ask:\n\n“What is the average weight for each dog color?”\n\n“Which breed is tallest on average?”\n\n“Do male dogs weigh more than female dogs?”\n\nThis is where the groupby() method becomes extremely powerful.\n\nWhy Use groupby()?\n\nWithout groupby(), you would have to manually create subsets for every category and calculate statistics one by one. That quickly becomes repetitive and messy.\n\nFor example, you could filter all black dogs, compute their mean weight, then repeat for brown dogs, white dogs, and so on. But that creates duplicate code and increases the chance of mistakes.\n\ngroupby() automates this process."
      },
      {
        "title": "2. Basic Grouped Summary",
        "body": "Suppose we have a DataFrame called dogs with columns like:\n\ncolor\n\nbreed\n\nweight_kg\n\nheight_cm\n\nIf we want the average weight for each dog color, we can do:\n\ndogs.groupby(\"color\")[\"weight_kg\"].mean()\n\nWhat happens here?\n\nStep by step:\n\ngroupby(\"color\")\n\nSplits the dataset into groups based on dog color.\n\n[\"weight_kg\"]\n\nSelects the weight column.\n\n.mean()\n\nCalculates the average weight for each group.\n\nThe result might look like:\n\nblack 26.5\n\nbrown 21.3\n\nwhite 18.7\n\nThis means black dogs weigh 26.5 kg on average, brown dogs 21.3 kg, and so on.\n\nMultiple Summary Statistics with .agg()\n\nYou are not limited to just one statistic. Using .agg() allows you to calculate several statistics at once.\n\nExample:\n\ndogs.groupby(\"color\")[\"weight_kg\"].agg([min, max, sum])\n\nThis calculates:"
      },
      {
        "title": "3. Minimum weight",
        "body": "Maximum weight"
      },
      {
        "title": "4. Total weight",
        "body": "for each dog color.\n\nThe result becomes a small summary table."
      },
      {
        "title": "5. Grouping by Multiple Columns",
        "body": "You can also group by more than one category.\n\nExample:\n\ndogs.groupby([\"color\", \"breed\"])[\"weight_kg\"].mean()\n\nNow pandas groups dogs by:\n\ncolor\n\nbreed\n\nThis creates more detailed summaries.\n\nInstead of:\n\n“Average weight of black dogs”\n\nyou now get:\n\n“Average weight of black Labradors”\n\n“Average weight of brown Poodles”\n\nand so on.\n\nThis is useful when one grouping category is not enough."
      },
      {
        "title": "6. Multiple Groups + Multiple Statistics",
        "body": "You can combine everything together:\n\ndogs.groupby([\"color\", \"breed\"])[\"weight_kg\"].agg([min, max, mean])\n\nThis gives grouped statistics for every breed-color combination.\n\nVery powerful for data analysis.\n\nKey Idea Behind groupby()\n\nThe overall process is:"
      },
      {
        "title": "7. Split the data into groups",
        "body": "Apply a calculation"
      },
      {
        "title": "8. Combine the results",
        "body": "This is often called:\n\nSplit → Apply → Combine\n\nand it is one of the core ideas in pandas."
      },
      {
        "title": "9. Important Notes",
        "body": "groupby() does NOT change the original DataFrame\n\nIt only creates grouped results."
      },
      {
        "title": "10. Common summary methods after grouping",
        "body": "Some commonly used methods are:\n\n.mean()\n\n.sum()\n\n.min()\n\n.max()\n\n.count()\n\n.median()\n\n.std()\n\n.var()\n\n.agg() is flexible\n\nYou can pass:\n\na single function\n\nmultiple functions\n\neven custom functions\n\nExample:\n\ndogs.groupby(\"color\")[\"weight_kg\"].agg([mean, median, max])"
      },
      {
        "title": "11. Simple Mental Model",
        "body": "Think of groupby() like organizing students into classroom groups before calculating grades.\n\nWithout grouping:\n\nOne average for the whole school.\n\nWith grouping:\n\nOne average per classroom.\n\nThat’s exactly what pandas is doing with your data."
      },
      {
        "title": "12. Quick Summary",
        "body": "groupby() is used to calculate statistics separately for categories or groups in your dataset.\n\nMain patterns:\n\n`df.groupby(\"column\")[\"value\"].mean()`\n\n`df.groupby(\"column\")[\"value\"].agg([min, max, mean])`\n\n`df.groupby([\"col1\", \"col2\"])[\"value\"].mean()`\n\nIt is one of the most important tools in pandas because real-world data analysis almost always involves comparing groups.",
        "exampleCode": "df.groupby(\"column\")[\"value\"].mean()\ndf.groupby(\"column\")[\"value\"].agg([min, max, mean])\ndf.groupby([\"col1\", \"col2\"])[\"value\"].mean()"
      }
    ],
    "quickReference": [
      {
        "goal": "Group by and sum",
        "syntax": "df.groupby(\"region\")[\"sales\"].sum()"
      },
      {
        "goal": "Multiple aggregations",
        "syntax": "df.groupby(\"region\")[\"sales\"].agg([\"mean\", \"count\"])"
      },
      {
        "goal": "2D Pivot Table",
        "syntax": "df.pivot_table(values=\"sales\", index=\"region\", columns=\"prod\")"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Regional Revenue Aggregation",
      "scenario": "The CFO needs to review total revenue and order volume broken down by sales region.",
      "instructions": "1. Read `sales.csv` into a DataFrame.\n2. Group by `region` and calculate total revenue `sum` and order count `count` on `sale_amount` using `.agg([\"sum\", \"count\"])`.\n3. Round values to `2` decimal places using `.round(2)`.\n4. Assign to `regional_summary` and print it.",
      "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\n\n# Group by region and aggregate sale_amount with sum and count\nregional_summary = None\n\nprint(regional_summary)\n",
      "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\nregional_summary = sales.groupby('region')['sale_amount'].agg(['sum', 'count']).round(2)\nprint(regional_summary)\n",
      "validationScript": "assert 'regional_summary' in locals(), \"Variable 'regional_summary' must be defined\"\nassert len(regional_summary) == 4, \"Should have 4 regions (East, Midwest, South, West)\"\n",
      "hints": [
        "Use sales.groupby('region')['sale_amount'].agg(['sum', 'count']).",
        "Round to 2 decimal places using .round(2)."
      ],
      "solutionExplanation": "Split-apply-combine with groupby and agg computes multi-metric summaries in a single vectorized pass."
    }
  },
  {
    "id": "py-lesson-t-m8ff97bp12rd",
    "tabId": "t.m8ff97bp12rd",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 37,
    "title": "Pivot Tables",
    "description": "Pivot Tables in pandas  Pivot tables are another powerful way to calculate grouped summary statistics in pandas. If you have ever used Excel or Google Sheets, y...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Pivot Tables in pandas\n\nPivot tables are another powerful way to calculate grouped summary statistics in pandas. If you have ever used Excel or Google Sheets, you may already be familiar with pivot tables. In pandas, they work similarly, but with Python code.\n\nA pivot table helps you summarize and organize data by grouping values together and applying calculations such as averages, sums, or counts."
      },
      {
        "title": "2. Basic Idea of a Pivot Table",
        "body": "Suppose you have a DataFrame of dogs with columns like:\n\ncolor\n\nbreed\n\nweight_kg\n\nIf you want the average weight for each dog color, you can use a pivot table.\n\ndogs.pivot_table(values=\"weight_kg\", index=\"color\")"
      },
      {
        "title": "3. Understanding the arguments",
        "body": "values\n\n→ the column you want to summarize\n\nindex\n\n→ the column you want to group by\n\nBy default, pivot_table() calculates the mean (average).\n\nSo this code means:\n\n“Group dogs by color and calculate the average weight.”"
      },
      {
        "title": "4. Changing the Summary Statistic",
        "body": "Pivot tables use the mean by default, but you can change the calculation using aggfunc.\n\nExample:\n\ndogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\naggfunc=\"median\"\n\n)\n\nThis calculates the median weight instead of the mean.\n\nYou can use many functions such as:\n\n\"mean\"\n\n\"median\"\n\n\"sum\"\n\n\"min\"\n\n\"max\"\n\n\"count\""
      },
      {
        "title": "5. Multiple Statistics at Once",
        "body": "You can calculate several statistics together by passing a list into aggfunc.\n\nExample:\n\ndogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\naggfunc=[\"mean\", \"median\"]\n\n)\n\nThis creates a table containing both:\n\naverage weight\n\nmedian weight\n\nfor every dog color."
      },
      {
        "title": "6. Grouping by Two Variables",
        "body": "Pivot tables become more powerful when you summarize data across two categories.\n\nExample:\n\ndogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\ncolumns=\"breed\"\n\n)\n\nWhat happens here?"
      },
      {
        "title": "7. Rows represent dog colors",
        "body": "Columns represent dog breeds\n\nValues inside the table are average weights\n\nThis creates a matrix-like summary table.\n\nMissing Values (NaN)\n\nSometimes certain combinations do not exist.\n\nFor example:\n\nmaybe there are no black Chihuahuas\n\nmaybe there are no gray Labradors\n\nIn these cases, pandas displays:\n\nNaN\n\nwhich means:\n\n“No data available.”"
      },
      {
        "title": "8. Filling Missing Values",
        "body": "You can replace missing values using fill_value.\n\nExample:\n\ndogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\ncolumns=\"breed\",\n\nfill_value=0\n\n)\n\nNow all missing values become 0.\n\nThis makes the table cleaner and easier to read.\n\nAdding Totals with margins=True\n\nPivot tables can also calculate overall summaries automatically.\n\nExample:\n\ndogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\ncolumns=\"breed\",\n\nfill_value=0,\n\nmargins=True\n\n)\n\nThis adds:\n\na final row\n\na final column\n\ncalled \"All\".\n\nThese contain summary statistics for:\n\nall rows\n\nall columns\n\nthe entire dataset\n\nSo you can instantly see:\n\naverage weight per color\n\naverage weight per breed\n\noverall average weight\n\nall in one table.\n\nDifference Between groupby() and pivot_table()\n\nBoth can calculate grouped statistics, but they are often used differently.\n\ngroupby()\n\nBest for:\n\nflexible analysis\n\ntransformations\n\nchaining operations\n\npivot_table()\n\nBest for:\n\nspreadsheet-style summaries\n\nclean table layouts\n\ncomparing categories visually\n\nYou can often solve the same problem with either one."
      },
      {
        "title": "9. Mental Model",
        "body": "Think of a pivot table like creating a report table.\n\nFor example:\n\nColor\n\nLabrador\n\nPoodle\n\nChihuahua\n\nBlack\n\n30\n\n12\n\nNaN\n\nBrown\n\n28\n\n10\n\n5\n\nInstead of reading raw rows one by one, pivot tables organize data into a compact summary."
      },
      {
        "title": "10. Important Parameters to Remember",
        "body": "Core arguments\n\nvalues\n\n→ what to summarize\n\nindex\n\n→ row groups\n\ncolumns\n\n→ column groups\n\naggfunc\n\n→ summary calculation"
      },
      {
        "title": "11. Useful optional arguments",
        "body": "fill_value\n\n→ replaces missing values\n\nmargins=True\n\n→ adds totals/overall summaries"
      },
      {
        "title": "12. Quick Examples",
        "body": "Average weight by color\n\ndogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\"\n\n)"
      },
      {
        "title": "13. Median weight by color",
        "body": "dogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\naggfunc=\"median\"\n\n)"
      },
      {
        "title": "14. Multiple statistics",
        "body": "dogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\naggfunc=[\"mean\", \"max\"]\n\n)"
      },
      {
        "title": "15. Two-variable pivot table",
        "body": "dogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\ncolumns=\"breed\"\n\n)"
      },
      {
        "title": "16. Key Takeaway",
        "body": "Pivot tables are a compact and powerful way to summarize data in pandas. They allow you to:\n\ngroup data\n\ncalculate statistics\n\ncompare categories\n\ncreate spreadsheet-style summaries\n\nall with very little code."
      }
    ],
    "quickReference": [
      {
        "goal": "Group by and sum",
        "syntax": "df.groupby(\"region\")[\"sales\"].sum()"
      },
      {
        "goal": "Multiple aggregations",
        "syntax": "df.groupby(\"region\")[\"sales\"].agg([\"mean\", \"count\"])"
      },
      {
        "goal": "2D Pivot Table",
        "syntax": "df.pivot_table(values=\"sales\", index=\"region\", columns=\"prod\")"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Pivot Tables",
      "scenario": "Apply the concepts learned in Pivot Tables to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Pivot Tables.",
      "starterCode": "# Practice Challenge: Pivot Tables\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-sa49vbakeagj",
    "tabId": "t.sa49vbakeagj",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 38,
    "title": "Explicit indexes",
    "description": "Explicit Indexes in pandas  In pandas, a DataFrame is made up of three main parts:  the actual data  column labels  row labels (called the index)  You already k...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Explicit Indexes in pandas\n\nIn pandas, a DataFrame is made up of three main parts:\n\nthe actual data\n\ncolumn labels\n\nrow labels (called the index)\n\nYou already know that:\n\n`df.columns`\n\nshows the column names, while:\n\n`df.index`\n\nshows the row labels.\n\nBy default, pandas automatically uses numbers like 0, 1, 2, 3... as row indexes, but you can replace these with more meaningful values. This is called setting an index.",
        "exampleCode": "df.columns\ndf.index"
      },
      {
        "title": "2. Setting a Column as the Index",
        "body": "Suppose you have a DataFrame of dogs with a name column.\n\nYou can make the dog names become the row labels using:\n\n`dogs = dogs.set_index(\"name\")`\n\nNow the name column is no longer part of the main table columns. Instead, it becomes the index.\n\nThis makes the DataFrame easier to read and sometimes easier to subset.\n\nOne visual clue is that index values are displayed on the far left side of the DataFrame.",
        "exampleCode": "dogs = dogs.set_index(\"name\")"
      },
      {
        "title": "3. Resetting the Index",
        "body": "If you want to bring the index back as a normal column again, use:\n\n`dogs = dogs.reset_index()`\n\nThis restores the default numbered index and moves the old index back into the DataFrame as a regular column.",
        "exampleCode": "dogs = dogs.reset_index()"
      },
      {
        "title": "4. Dropping the Index Completely",
        "body": "You can also remove the index entirely using:\n\n`dogs = dogs.reset_index(drop=True)`\n\nHere:\n\ndrop=True\n\nmeans:\n\n“Do not keep the old index as a column.”\n\nSo the custom index disappears completely.\n\nWhy Use Indexes?\n\nIndexes make certain types of subsetting much cleaner and easier.\n\nWithout indexes, filtering rows can look more complicated.\n\nExample without index:\n\ndogs[dogs[\"name\"].isin([\"Bella\", \"Stella\"])]\n\nThis works, but it is somewhat long.\n\nIf the name column is set as the index:\n\ndogs.loc[[\"Bella\", \"Stella\"]]\n\nThis is much simpler and easier to read.\n\nThe .loc[] method works directly with index labels.\n\nIndex Values Do NOT Need to Be Unique\n\nUnlike primary keys in databases, pandas indexes can contain duplicates.\n\nExample:\n\n`dogs = dogs.set_index(\"breed\")`\n\nIf there are multiple Labradors, the index can contain \"Labrador\" more than once.\n\nThen:\n\ndogs.loc[\"Labrador\"]\n\nreturns all Labrador rows.\n\nMulti-Level Indexes (Hierarchical Indexes)\n\nYou can also use more than one column as the index.\n\nExample:\n\n`dogs = dogs.set_index([\"breed\", \"color\"])`\n\nNow the DataFrame has two index levels:\n\nouter index → breed\n\ninner index → color\n\nThis is called:\n\na multi-level index\n\nor a hierarchical index\n\nBoth terms mean the same thing.",
        "exampleCode": "dogs = dogs.reset_index(drop=True)\ndogs = dogs.set_index(\"breed\")\ndogs = dogs.set_index([\"breed\", \"color\"])"
      },
      {
        "title": "5. Subsetting Multi-Level Indexes",
        "body": "Selecting outer-level indexes\n\nExample:\n\ndogs.loc[[\"Labrador\", \"Chihuahua\"]]\n\nThis returns all Labradors and Chihuahuas."
      },
      {
        "title": "6. Selecting inner-level combinations",
        "body": "For deeper filtering, use tuples.\n\nExample:\n\ndogs.loc[[(\"Labrador\", \"Brown\")]]\n\nThis means:\n\nGive rows where:\n\n`breed = Labrador`\n\n`color = Brown`\n\nEvery condition inside the tuple must match.",
        "exampleCode": "breed = Labrador\ncolor = Brown"
      },
      {
        "title": "7. Sorting by Index",
        "body": "Besides sorting by column values using:\n\nsort_values()\n\nyou can sort using index labels with:\n\ndogs.sort_index()\n\nThis sorts from outer index to inner index."
      },
      {
        "title": "8. Controlling Index Sorting",
        "body": "You can customize sorting behavior using:\n\nlevel\n\nascending\n\nExample:\n\ndogs.sort_index(level=[\"breed\", \"color\"], ascending=[True, False])\n\nThis allows different sorting directions for different levels."
      },
      {
        "title": "9. The Downsides of Indexes",
        "body": "Indexes are powerful, but they are somewhat controversial in pandas.\n\nWhy?\n\nBecause indexes are still data, but they are stored differently from normal columns.\n\nThis creates some issues:"
      },
      {
        "title": "10. 1. More complicated syntax",
        "body": "Working with indexes uses different syntax (loc) compared to normal columns.\n\nThat means more things to remember."
      },
      {
        "title": "11. 2. Violates “tidy data” principles",
        "body": "Tidy data says:\n\n`every row = one observation`\n\n`every column = one variable`\n\nIndexes are data that are not stored in columns, which breaks this structure somewhat.",
        "exampleCode": "every row = one observation\nevery column = one variable"
      },
      {
        "title": "12. 3. Can increase bugs",
        "body": "Since pandas has:\n\ncolumn-based syntax\n\nindex-based syntax\n\nyou may accidentally mix them up."
      },
      {
        "title": "13. Important Perspective",
        "body": "You do NOT always need indexes.\n\nMany pandas users prefer keeping everything as normal columns because it is simpler and easier to debug.\n\nHowever, indexes are still important because:\n\nmany pandas operations rely on them\n\nmany real-world datasets use them\n\nyou will often encounter them in other people's code\n\nSo understanding indexes is essential."
      },
      {
        "title": "14. Mental Model",
        "body": "Think of indexes as labels for rows.\n\nNormally rows are labeled:"
      },
      {
        "title": "15. 0, 1, 2, 3",
        "body": "But you can replace them with meaningful identifiers like:"
      },
      {
        "title": "16. Bella, Max, Charlie",
        "body": "or even combinations like:\n\n(Labrador, Brown)\n\nThis helps organize and access data more efficiently."
      },
      {
        "title": "17. Quick Summary",
        "body": "Setting an index\n\n`df.set_index(\"column\")`",
        "exampleCode": "df.set_index(\"column\")"
      },
      {
        "title": "18. Resetting the index",
        "body": "`df.reset_index()`",
        "exampleCode": "df.reset_index()"
      },
      {
        "title": "19. Dropping the old index",
        "body": "`df.reset_index(drop=True)`",
        "exampleCode": "df.reset_index(drop=True)"
      },
      {
        "title": "20. Selecting with .loc",
        "body": "`df.loc[\"Bella\"]`",
        "exampleCode": "df.loc[\"Bella\"]"
      },
      {
        "title": "21. Multi-level index",
        "body": "`df.set_index([\"breed\", \"color\"])`",
        "exampleCode": "df.set_index([\"breed\", \"color\"])"
      },
      {
        "title": "22. Sorting indexes",
        "body": "`df.sort_index()`",
        "exampleCode": "df.sort_index()"
      },
      {
        "title": "23. Key Takeaway",
        "body": "Indexes in pandas are special row labels that make certain operations, especially subsetting, cleaner and more powerful. They can simplify data access, support hierarchical organization, and improve readability, but they also introduce additional complexity."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Explicit indexes",
      "scenario": "Apply the concepts learned in Explicit indexes to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Explicit indexes.",
      "starterCode": "# Practice Challenge: Explicit indexes\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-g0h7wjiwhfrk",
    "tabId": "t.g0h7wjiwhfrk",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 39,
    "title": "Slicing and subsetting with .loc and .iloc",
    "description": "Slicing is a way of selecting consecutive parts of a sequence or dataset. In Python, you first learn slicing with lists, then apply the same idea to pandas Data...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Slicing is a way of selecting consecutive parts of a sequence or dataset. In Python, you first learn slicing with lists, then apply the same idea to pandas DataFrames. Understanding slicing is important because it allows you to quickly extract only the rows or columns you need from large datasets.\n\nWith Python lists, slicing uses positions (indexes). Remember that Python starts counting at 0. For example:\n\nbreeds[2:5]\n\nThis means:\n\nstart at position 2\n\nstop before position 5\n\nSo elements at positions 2, 3, and 4 are included. The last position is not included in normal Python slicing.\n\nYou can also simplify slices:\n\nbreeds[:3]"
      },
      {
        "title": "2. This means “from the start up to position 3.”",
        "body": "And:\n\nbreeds[:]\n\nmeans “take everything.”"
      },
      {
        "title": "3. Slicing DataFrames with .loc",
        "body": "For pandas DataFrames, slicing is usually done using .loc or .iloc.\n\nBefore slicing rows using index labels, it is important to sort the index first:\n\n`dogs = dogs.sort_index()`\n\nThis prevents unexpected results.\n\n.loc Uses Labels (Names)\n\n.loc slices using row or column labels instead of numeric positions.\n\nExample:\n\ndogs.loc[\"Chow Chow\":\"Poodle\"]\n\nThis selects all rows from \"Chow Chow\" to \"Poodle\".\n\nA very important difference from normal Python slicing:\n\nwith .loc, the ending value IS included\n\nSo \"Poodle\" will appear in the result.",
        "exampleCode": "dogs = dogs.sort_index()"
      },
      {
        "title": "4. Multi-Level Index Slicing",
        "body": "When using hierarchical or multi-level indexes, slicing becomes more advanced.\n\nSuppose the index has two levels:\n\nbreed\n\ncolor\n\nTrying to slice inner levels directly may fail:\n\ndogs.loc[\"Tan\":\"Grey\"]\n\nThis can return incorrect or empty results.\n\nThe correct way is to use tuples:\n\ndogs.loc[\n\n(\"Labrador\", \"Brown\"):\n\n(\"Schnauzer\", \"Grey\")\n\n]\n\nEach tuple represents a complete index position."
      },
      {
        "title": "5. Slicing Columns",
        "body": "Because DataFrames are two-dimensional, you can slice columns too.\n\nSyntax:\n\ndogs.loc[:, \"name\":\"height_cm\"]\n\nThe colon : means:\n\nkeep all rows\n\nThen the second argument slices the columns.\n\nThis selects all rows, but only columns from \"name\" to \"height_cm\"."
      },
      {
        "title": "6. Slicing Rows and Columns Together",
        "body": "You can slice both dimensions at the same time:\n\ndogs.loc[\n\n\"Labrador\":\"Poodle\",\n\n\"name\":\"height_cm\"\n\n]\n\nThis filters:\n\nspecific rows\n\nspecific columns\n\nall in one command."
      },
      {
        "title": "7. Date Slicing",
        "body": "Dates are extremely common in pandas datasets.\n\nIf a date column becomes the index:\n\n`dogs = dogs.set_index(\"date_of_birth\").sort_index()`\n\nyou can slice using date strings.\n\nExample:\n\ndogs.loc[\"2014\":\"2016\"]\n\nThis includes all rows between 2014 and 2016.\n\nOne useful pandas feature is partial date slicing. You do not always need full dates like \"2014-01-01\".\n\nYou can simply write:\n\ndogs.loc[\"2015\"]\n\nand pandas understands you mean the entire year.\n\n.iloc Uses Numeric Positions\n\nWhile .loc uses labels, .iloc uses integer positions.\n\nExample:\n\ndogs.iloc[2:5, 1:4]\n\nThis means:\n\nrows 2 to 4\n\ncolumns 1 to 3\n\nImportant difference:\n\n.iloc follows normal Python slicing rules\n\nthe ending position is NOT included\n\nSo position 5 and 4 are excluded.",
        "exampleCode": "dogs = dogs.set_index(\"date_of_birth\").sort_index()"
      },
      {
        "title": "8. Difference Between .loc and .iloc",
        "body": "A good way to remember them:\n\n.loc → labels/names\n\n.iloc → integer positions\n\nExample:\n\ndogs.loc[\"Bella\":\"Stella\"]\n\nuses names.\n\ndogs.iloc[0:3]\n\nuses row numbers."
      },
      {
        "title": "9. Key Things to Remember",
        "body": ".loc"
      },
      {
        "title": "10. Uses labels/index names",
        "body": "Ending value is included"
      },
      {
        "title": "11. Good for readable filtering",
        "body": ".iloc"
      },
      {
        "title": "12. Uses numeric positions",
        "body": "Ending value is excluded"
      },
      {
        "title": "13. Similar to normal Python slicing",
        "body": "Slicing Tips"
      },
      {
        "title": "14. Always sort indexes before slicing",
        "body": "Use tuples for multi-level indexes"
      },
      {
        "title": "15. Use : to mean “everything”",
        "body": "Date slicing works very naturally in pandas"
      },
      {
        "title": "16. Example Summary",
        "body": "# Slice rows by labels\n\ndogs.loc[\"A\":\"C\"]"
      },
      {
        "title": "17. Slice rows and columns",
        "body": "dogs.loc[\"A\":\"C\", \"name\":\"height_cm\"]"
      },
      {
        "title": "18. Slice by positions",
        "body": "dogs.iloc[0:3, 1:4]"
      },
      {
        "title": "19. Slice dates",
        "body": "dogs.loc[\"2014\":\"2016\"]\n\nThese slicing techniques are some of the most powerful tools in pandas because they allow you to quickly focus on the exact part of a dataset you want to analyze."
      }
    ],
    "quickReference": [
      {
        "goal": "Label-based indexing",
        "syntax": "df.loc[row_label, col_label]"
      },
      {
        "goal": "Position-based indexing",
        "syntax": "df.iloc[row_idx, col_idx]"
      },
      {
        "goal": "Select column as Series",
        "syntax": "df[\"col_name\"]"
      },
      {
        "goal": "Select multiple columns",
        "syntax": "df[[\"col_a\", \"col_b\"]]"
      },
      {
        "goal": "Boolean mask filter",
        "syntax": "df[df[\"col\"] > 100]"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Using Python 'and'/'or' for Series boolean filtering:\ndf[df[\"price\"] > 100 and df[\"region\"] == \"East\"]",
      "correctCode": "# Use bitwise & and | with parentheses around each condition:\ndf[(df[\"price\"] > 100) & (df[\"region\"] == \"East\")]",
      "explanation": "Pandas requires bitwise operators (& and |) with parentheses. Standard Python and/or operators fail because the truth value of a whole Series is ambiguous."
    },
    "challenge": {
      "title": "Targeted Country Subsetting with loc",
      "scenario": "The trade strategy department needs to inspect the capital and population for Brazil (BR) and China (CH) from the BRICS dataset.",
      "instructions": "1. Load `brics.csv` with `index_col = \"country_code\"`.\n2. Use `.loc` to select the rows for `[\"BR\", \"CH\"]` and columns `[\"capital\", \"population\"]`.\n3. Assign to `subset_df`.\n4. Print `subset_df`.",
      "starterCode": "import pandas as pd\n\nbrics = pd.read_csv('brics.csv', index_col='country_code')\n\n# Select BR and CH with columns capital and population using .loc\nsubset_df = None\n\nprint(subset_df)\n",
      "expectedCode": "import pandas as pd\n\nbrics = pd.read_csv('brics.csv', index_col='country_code')\nsubset_df = brics.loc[['BR', 'CH'], ['capital', 'population']]\nprint(subset_df)\n",
      "validationScript": "assert 'subset_df' in locals(), \"Variable 'subset_df' must be defined\"\nassert list(subset_df.index) == ['BR', 'CH'], \"Index must be BR and CH\"\nassert list(subset_df.columns) == ['capital', 'population'], \"Columns must be capital and population\"\n",
      "hints": [
        "Use brics.loc[['BR', 'CH'], ['capital', 'population']].",
        "Remember that row labels come before column labels separated by a comma."
      ],
      "solutionExplanation": "The .loc method provides explicit, label-based 2D indexing that guarantees predictable column and row extraction."
    }
  },
  {
    "id": "py-lesson-t-522kzxe41qyi",
    "tabId": "t.522kzxe41qyi",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 40,
    "title": "Working with pivot tables",
    "description": "Pivot tables are one of the most powerful tools in pandas for summarizing and analyzing grouped data. Earlier, you learned how to create them using pivot_table(...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Pivot tables are one of the most powerful tools in pandas for summarizing and analyzing grouped data. Earlier, you learned how to create them using pivot_table(). In this lesson, the focus is on how to work with pivot tables after they are created — especially how to subset them and compute additional statistics.\n\nA pivot table in pandas is essentially just another DataFrame, but with grouped and summarized data. Because of this, all the DataFrame skills you already learned — especially .loc, slicing, and summary methods — can also be applied to pivot tables."
      },
      {
        "title": "2. Creating a Pivot Table",
        "body": "A pivot table is created using .pivot_table().\n\nExample:\n\ndogs.pivot_table(\n\nvalues=\"height_cm\",\n\nindex=\"breed\",\n\ncolumns=\"color\"\n\n)\n\nThis means:\n\nvalues → the column to summarize\n\nindex → the groups shown as rows\n\ncolumns → the groups shown as columns\n\nBy default, pandas calculates the mean.\n\nSo this pivot table shows:\n\nthe average height of each dog breed for each color."
      },
      {
        "title": "3. Pivot Tables are DataFrames",
        "body": "A very important idea:\n\nPivot tables are just DataFrames with organized indexes.\n\nBecause of this, you can use everything you already know about DataFrames:\n\n.loc[]\n\nslicing\n\nfiltering\n\nsummary statistics\n\nindexing\n\nThis makes pivot tables extremely flexible."
      },
      {
        "title": "4. Using .loc[] with Pivot Tables",
        "body": "Since pivot tables have indexes, .loc[] works perfectly for selecting specific rows or columns.\n\nExample:\n\npt.loc[\"Chihuahua\":\"Poodle\"]\n\nThis slices breeds from \"Chihuahua\" to \"Poodle\".\n\nYou can also subset rows and columns together:\n\npt.loc[\n\n\"Chihuahua\":\"Poodle\",\n\n\"Brown\":\"Gray\"\n\n]\n\nThis selects:\n\nspecific breeds (rows)\n\nspecific colors (columns)\n\nat the same time.\n\nThis combination of .loc[] + slicing is one of the best ways to work with pivot tables."
      },
      {
        "title": "5. Summary Statistics on Pivot Tables",
        "body": "Because pivot tables usually contain only numeric values, you can easily calculate statistics on them.\n\nExample:\n\npt.mean()\n\nThis calculates the mean of each column."
      },
      {
        "title": "6. Understanding the axis Argument",
        "body": "Many pandas methods use an axis argument.\n\nThe default is:\n\naxis=\"index\"\n\nor equivalently:\n\naxis=0\n\nThis means:\n\ncalculate statistics down the rows (vertically)\n\nFor a pivot table, this calculates a result for each column."
      },
      {
        "title": "7. Calculating Across Rows",
        "body": "Example:\n\npt.mean(axis=\"index\")\n\nThis computes the average for each color across all breeds.\n\nSo the calculation moves vertically down each column."
      },
      {
        "title": "8. Calculating Across Columns",
        "body": "If you want calculations horizontally across columns, use:\n\npt.mean(axis=\"columns\")\n\nThis computes the average for each breed across all colors.\n\nSo now the calculation moves horizontally across each row."
      },
      {
        "title": "9. Why axis Matters More for Pivot Tables",
        "body": "In normal DataFrames, columns often contain different data types:\n\ntext\n\ndates\n\nnumbers\n\nBecause of that, calculations across columns often do not make sense.\n\nBut pivot tables are special because:\n\nalmost every value is numeric\n\nevery column usually represents the same type of measurement\n\nThat is why operations like .mean(axis=\"columns\") become very useful with pivot tables."
      },
      {
        "title": "10. Quick Comparison",
        "body": "axis=\"index\" (default)"
      },
      {
        "title": "11. Calculates vertically",
        "body": "Produces one result per column\n\nExample:\n\npt.mean(axis=\"index\")\n\naxis=\"columns\""
      },
      {
        "title": "12. Calculates horizontally",
        "body": "Produces one result per row\n\nExample:\n\npt.mean(axis=\"columns\")"
      },
      {
        "title": "13. Example Workflow",
        "body": "# Create pivot table\n\n`pt = dogs.pivot_table(`\n\nvalues=\"height_cm\",\n\nindex=\"breed\",\n\ncolumns=\"color\"\n\n)",
        "exampleCode": "pt = dogs.pivot_table("
      },
      {
        "title": "14. Subset breeds",
        "body": "pt.loc[\"Chihuahua\":\"Poodle\"]"
      },
      {
        "title": "15. Mean for each color",
        "body": "pt.mean()"
      },
      {
        "title": "16. Mean for each breed",
        "body": "pt.mean(axis=\"columns\")"
      },
      {
        "title": "17. Key Takeaways",
        "body": "Pivot tables are powerful because they combine:\n\ngrouping\n\naggregation\n\nreshaping\n\ninto a single structure.\n\nOnce created, you can treat them like normal DataFrames and use:\n\n.loc[]\n\nslicing\n\n.mean()\n\n.sum()\n\n.max()\n\n.min()\n\nand many other pandas operations on them.\n\nThe axis argument is especially important because it controls the direction of calculations:\n\naxis=\"index\" → down columns\n\naxis=\"columns\" → across rows"
      }
    ],
    "quickReference": [
      {
        "goal": "Group by and sum",
        "syntax": "df.groupby(\"region\")[\"sales\"].sum()"
      },
      {
        "goal": "Multiple aggregations",
        "syntax": "df.groupby(\"region\")[\"sales\"].agg([\"mean\", \"count\"])"
      },
      {
        "goal": "2D Pivot Table",
        "syntax": "df.pivot_table(values=\"sales\", index=\"region\", columns=\"prod\")"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Working with pivot tables",
      "scenario": "Apply the concepts learned in Working with pivot tables to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Working with pivot tables.",
      "starterCode": "# Practice Challenge: Working with pivot tables\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-8kt82i7ghmlo",
    "tabId": "t.8kt82i7ghmlo",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 41,
    "title": "Visualizing your data",
    "description": "Data visualization is one of the most important parts of data analysis because it helps transform raw numbers into something easier to understand. Instead of on...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Data visualization is one of the most important parts of data analysis because it helps transform raw numbers into something easier to understand. Instead of only reading tables of values, plots allow you to quickly notice patterns, trends, relationships, and outliers in your data.\n\nIn pandas, plotting is closely connected with the matplotlib library. Before creating visualizations, you usually import:\n\n`import matplotlib.pyplot as plt`\n\nJust like pd is the common alias for pandas, plt is the standard alias for matplotlib.pyplot.\n\nAfter creating a plot, you often need:\n\n`plt.show()`\n\nto actually display it.\n\nHistograms\n\nA histogram is used to visualize the distribution of a numeric variable. It groups values into ranges called bins and shows how many observations fall into each range.\n\nExample:\n\ndog_pack[\"height_cm\"].hist()\n\n`plt.show()`\n\nThis creates a histogram of dog heights.\n\nThe:\n\nx-axis represents the height ranges\n\ny-axis represents how many dogs fall into each range\n\nHistograms are useful for understanding:\n\nwhere most values are concentrated\n\nwhether data is spread out\n\nwhether the distribution is symmetric or skewed",
        "exampleCode": "import matplotlib.pyplot as plt\nplt.show()\nplt.show()"
      },
      {
        "title": "2. Changing the Number of Bins",
        "body": "You can control how detailed the histogram is using the bins argument.\n\nExample:\n\ndog_pack[\"height_cm\"].hist(bins=20)\n\n`plt.show()`\n\nfewer bins → simpler overview\n\nmore bins → more detailed distribution\n\nChoosing the right number of bins helps make patterns clearer.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "3. Bar Plots",
        "body": "Bar plots are useful for comparing categories.\n\nFor example, if you want to compare the average weight of each dog breed:\n\n`avg_weight = dog_pack.groupby(\"breed\")[\"weight_kg\"].mean()`\n\nThen create a bar plot:\n\navg_weight.plot(kind=\"bar\")\n\n`plt.show()`\n\nEach bar represents a breed, and the height of the bar represents the average weight.",
        "exampleCode": "avg_weight = dog_pack.groupby(\"breed\")[\"weight_kg\"].mean()\nplt.show()"
      },
      {
        "title": "4. Adding a Title",
        "body": "Plots become easier to understand when labeled properly.\n\nExample:\n\navg_weight.plot(\n\nkind=\"bar\",\n\ntitle=\"Average Weight per Breed\"\n\n)\n\n`plt.show()`\n\nTitles help explain what the visualization is showing.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "5. Line Plots",
        "body": "Line plots are excellent for showing how data changes over time.\n\nExample:\n\nsully.plot(\n\nx=\"date\",\n\ny=\"weight_kg\",\n\nkind=\"line\"\n\n)\n\n`plt.show()`\n\nThis visualizes Sully’s weight over time.\n\nLine plots are commonly used for:\n\ntime series data\n\ntrends\n\ngrowth or decline\n\ntracking changes",
        "exampleCode": "plt.show()"
      },
      {
        "title": "6. Rotating Axis Labels",
        "body": "Sometimes date labels overlap and become hard to read.\n\nYou can rotate labels using:\n\nsully.plot(\n\nx=\"date\",\n\ny=\"weight_kg\",\n\nkind=\"line\",\n\nrot=45\n\n)\n\n`plt.show()`\n\nrot=45 rotates labels by 45 degrees.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "7. Scatter Plots",
        "body": "Scatter plots are used to examine relationships between two numeric variables.\n\nExample:\n\ndog_pack.plot(\n\nx=\"height_cm\",\n\ny=\"weight_kg\",\n\nkind=\"scatter\"\n\n)\n\n`plt.show()`\n\nEach point represents one dog.\n\nThis helps identify:\n\ncorrelations\n\ntrends\n\nclusters\n\noutliers\n\nIn this example, taller dogs generally weigh more.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "8. Layering Plots",
        "body": "You can place multiple plots on top of each other to compare groups.\n\nExample:\n\ndog_pack[dog_pack[\"sex\"] == \"F\"][\"height_cm\"].hist()\n\ndog_pack[dog_pack[\"sex\"] == \"M\"][\"height_cm\"].hist()\n\n`plt.show()`\n\nThis overlays histograms for female and male dogs.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "9. Adding a Legend",
        "body": "When multiple plots overlap, it may be unclear which is which.\n\nUse:\n\n`plt.legend([\"Female\", \"Male\"])`\n\nto label the plots.\n\nExample:\n\n`plt.legend([\"Female\", \"Male\"])`\n\n`plt.show()`",
        "exampleCode": "plt.legend([\"Female\", \"Male\"])\nplt.legend([\"Female\", \"Male\"])\nplt.show()"
      },
      {
        "title": "10. Transparency with alpha",
        "body": "Overlapping plots can block each other visually. The alpha argument controls transparency.\n\nValues:\n\n0 → fully transparent\n\n1 → fully opaque\n\nExample:\n\ndog_pack[dog_pack[\"sex\"] == \"F\"][\"height_cm\"].hist(alpha=0.5)\n\ndog_pack[dog_pack[\"sex\"] == \"M\"][\"height_cm\"].hist(alpha=0.5)\n\n`plt.legend([\"Female\", \"Male\"])`\n\n`plt.show()`\n\nThis makes both histograms easier to compare.",
        "exampleCode": "plt.legend([\"Female\", \"Male\"])\nplt.show()"
      },
      {
        "title": "11. Choosing the Right Plot",
        "body": "Different plots are useful for different situations:\n\nHistogram → distribution of one numeric variable\n\nBar plot → compare categories\n\nLine plot → trends over time\n\nScatter plot → relationship between two numeric variables"
      },
      {
        "title": "12. Example Summary",
        "body": "# Histogram\n\ndog_pack[\"height_cm\"].hist()"
      },
      {
        "title": "13. Bar plot",
        "body": "avg_weight.plot(kind=\"bar\")"
      },
      {
        "title": "14. Line plot",
        "body": "dog_pack.plot(x=\"date\", y=\"weight_kg\", kind=\"line\")"
      },
      {
        "title": "15. Scatter plot",
        "body": "dog_pack.plot(\n\nx=\"height_cm\",\n\ny=\"weight_kg\",\n\nkind=\"scatter\"\n\n)\n\n`plt.show()`",
        "exampleCode": "plt.show()"
      },
      {
        "title": "16. Key Takeaways",
        "body": "Data visualization helps you:\n\nunderstand data faster\n\ndiscover trends and patterns\n\ncommunicate findings clearly\n\npandas makes plotting easy because plots can be created directly from DataFrames and Series using methods like:\n\n.hist()\n\n.plot()\n\ncombined with matplotlib tools such as:\n\n`plt.show()`\n\n`plt.legend()`\n\nand visualization settings like:\n\nbins\n\ntitle\n\nrot\n\nalpha",
        "exampleCode": "plt.show()\nplt.legend()"
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Visualizing your data",
      "scenario": "Apply the concepts learned in Visualizing your data to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Visualizing your data.",
      "starterCode": "# Practice Challenge: Visualizing your data\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-oog1odoch7uf",
    "tabId": "t.oog1odoch7uf",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 42,
    "title": "Missing values",
    "description": "Missing Values in pandas  In real-world datasets, missing values are extremely common. Data is rarely perfect — sometimes information is not recorded, sensors f...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Missing Values in pandas\n\nIn real-world datasets, missing values are extremely common. Data is rarely perfect — sometimes information is not recorded, sensors fail, users skip inputs, or files become incomplete. Because of this, knowing how to detect and handle missing values is an essential skill in data analysis.\n\nIn pandas, missing values are represented by:\n\nNaN\n\nwhich stands for:\n\n“Not a Number”\n\nEven though the name sounds numeric, NaN is used for many types of missing data in pandas."
      },
      {
        "title": "2. Why Missing Values Matter",
        "body": "Missing data can affect:\n\ncalculations\n\naverages\n\nmachine learning models\n\nvisualizations\n\nfiltering and grouping\n\nFor example, if some dog weights are missing because the scale was broken, calculations involving weight may become inaccurate or incomplete.\n\nThat’s why one of the first things you should do when receiving a new dataset is check for missing values.\n\nDetecting Missing Values with .isna()\n\nThe .isna() method checks every value in a DataFrame and returns:\n\nTrue → value is missing\n\nFalse → value exists\n\nExample:\n\ndogs.isna()\n\nThis creates a DataFrame of Booleans.\n\nExample result:\n\nname\n\nweight_kg\n\nFalse\n\nFalse\n\nFalse\n\nTrue\n\nHowever, for large datasets, this output can be difficult to read."
      },
      {
        "title": "3. Checking if Columns Contain Missing Values",
        "body": "To see whether a column contains any missing values, combine:\n\n.isna().any()\n\nExample:\n\ndogs.isna().any()\n\nResult:\n\nname False\n\nweight_kg True\n\nheight_cm False\n\nThis means:\n\nweight_kg contains at least one missing value\n\nother columns do not"
      },
      {
        "title": "4. Counting Missing Values",
        "body": "Since True is treated as 1 in Python, summing Boolean values counts the number of missing entries.\n\nExample:\n\ndogs.isna().sum()\n\nThis returns the number of missing values per column.\n\nExample output:\n\nname 0\n\nweight_kg 2\n\nheight_cm 0\n\nSo there are:"
      },
      {
        "title": "5. 2 missing weights",
        "body": "no missing names or heights"
      },
      {
        "title": "6. Visualizing Missing Values",
        "body": "You can plot the number of missing values using a bar plot.\n\nExample:\n\ndogs.isna().sum().plot(kind=\"bar\")\n\n`plt.show()`\n\nThis helps quickly identify which columns have the most missing data.\n\nVisualization becomes especially useful in large datasets with many variables.\n\nRemoving Missing Values with .dropna()\n\nOne approach is to remove rows that contain missing values.\n\nExample:\n\ndogs.dropna()\n\nThis removes all rows where at least one value is missing.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "7. Important Consideration",
        "body": "Dropping rows is simple, but it can be risky.\n\nIf many rows contain missing data:\n\nyou may lose a large part of your dataset\n\nyour analysis may become biased\n\nSo use .dropna() carefully.\n\nReplacing Missing Values with .fillna()\n\nInstead of deleting rows, you can replace missing values.\n\nExample:\n\ndogs.fillna(0)\n\nThis replaces all NaN values with 0."
      },
      {
        "title": "8. Filling with Other Values",
        "body": "You can also fill missing values using:\n\naverages\n\nmedians\n\ntext labels\n\ncalculated values\n\nExample:\n\ndogs[\"weight_kg\"].fillna(\n\ndogs[\"weight_kg\"].mean()\n\n)\n\nThis replaces missing weights with the average weight.\n\nThis is often better than removing data entirely."
      },
      {
        "title": "9. Common Missing Value Workflow",
        "body": "A typical workflow looks like this:"
      },
      {
        "title": "10. 1. Detect missing values",
        "body": "dogs.isna()"
      },
      {
        "title": "11. 2. Count them",
        "body": "dogs.isna().sum()\n\n3. Decide what to do\n\nremove rows → .dropna()\n\nreplace values → .fillna()"
      },
      {
        "title": "12. Example Summary",
        "body": "# Detect missing values\n\ndogs.isna()"
      },
      {
        "title": "13. Check columns with missing data",
        "body": "dogs.isna().any()"
      },
      {
        "title": "14. Count missing values",
        "body": "dogs.isna().sum()"
      },
      {
        "title": "15. Remove rows with missing values",
        "body": "dogs.dropna()"
      },
      {
        "title": "16. Replace missing values",
        "body": "dogs.fillna(0)"
      },
      {
        "title": "17. Key Takeaways",
        "body": "Missing values are a normal part of data analysis, and pandas provides powerful tools to handle them.\n\nImportant methods include:\n\n.isna() → detect missing values\n\n.any() → check if missing values exist\n\n.sum() → count missing values\n\n.dropna() → remove missing data\n\n.fillna() → replace missing data\n\nThe best method depends on the situation:\n\nsmall amount of missing data → dropping may be fine\n\nlarge amount of missing data → filling is often better\n\nHandling missing values properly helps ensure your analysis remains accurate and reliable."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Clean Incomplete Customer Emails",
      "scenario": "The CRM sync job fails when customer emails are null or missing. Impute missing emails with a placeholder.",
      "instructions": "1. Read `customers.csv`.\n2. Count missing emails using `.isna().sum()`.\n3. Replace all missing values in the `email` column with `\"support@company.com\"` using `.fillna()`.\n4. Assign the cleaned DataFrame to `clean_customers`.",
      "starterCode": "import pandas as pd\n\ncustomers = pd.read_csv('customers.csv')\n\n# Replace missing emails with 'support@company.com'\nclean_customers = customers.copy()\n# your code here\n\nprint(clean_customers[['customer_id', 'first_name', 'email']])\n",
      "expectedCode": "import pandas as pd\n\ncustomers = pd.read_csv('customers.csv')\nclean_customers = customers.copy()\nclean_customers['email'] = clean_customers['email'].fillna('support@company.com')\nprint(clean_customers[['customer_id', 'first_name', 'email']])\n",
      "validationScript": "assert 'clean_customers' in locals(), \"Variable 'clean_customers' must be defined\"\nassert clean_customers['email'].isna().sum() == 0, \"No missing emails should remain\"\n",
      "hints": [
        "Use clean_customers['email'].fillna('support@company.com').",
        "Assign back to clean_customers['email']."
      ],
      "solutionExplanation": "fillna preserves record integrity without discarding valuable customer rows."
    }
  },
  {
    "id": "py-lesson-t-9q0hm73ouxqh",
    "tabId": "t.9q0hm73ouxqh",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 43,
    "title": "Creating DataFrames",
    "description": "Creating DataFrames in pandas  After learning how to manipulate and analyze DataFrames, the next important skill is learning how to create them. In pandas, a Da...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Creating DataFrames in pandas\n\nAfter learning how to manipulate and analyze DataFrames, the next important skill is learning how to create them. In pandas, a DataFrame is the main structure used to store tabular or rectangular data, similar to a spreadsheet or SQL table.\n\nBefore creating DataFrames, it’s important to understand dictionaries, because pandas heavily uses them when building DataFrames.\n\nA dictionary in Python stores data as key-value pairs. The key acts like a label, while the value is the actual data connected to that label.\n\nExample:\n\n`book = {`\n\n\"title\": \"Charlotte's Web\",\n\n\"author\": \"E.B. White\"\n\n}\n\nHere:\n\n\"title\" and \"author\" are keys\n\n\"Charlotte's Web\" and \"E.B. White\" are values\n\nYou can access values using square brackets:\n\nbook[\"title\"]\n\nThis returns:",
        "exampleCode": "book = {"
      },
      {
        "title": "2. Charlotte's Web",
        "body": "Two Main Ways to Create DataFrames\n\nThere are many ways to create DataFrames, but this lesson focuses on two common methods:\n\nList of dictionaries → build DataFrame row by row\n\nDictionary of lists → build DataFrame column by column\n\n1. Creating a DataFrame from a List of Dictionaries (Row-Based)\n\nIn this method, each dictionary represents one row of data.\n\nYou first create a list, then place dictionaries inside it.\n\nExample:\n\n`import pandas as pd`\n\n`list_of_dicts = [`\n\n{\n\n\"name\": \"Ginger\",\n\n\"breed\": \"Dachshund\",\n\n\"height_cm\": 22,\n\n\"weight_kg\": 10\n\n},\n\n{\n\n\"name\": \"Scout\",\n\n\"breed\": \"Dalmatian\",\n\n\"height_cm\": 59,\n\n\"weight_kg\": 25\n\n}\n\n]\n\n`dogs = pd.DataFrame(list_of_dicts)`\n\nprint(dogs)\n\nOutput:\n\nname breed height_cm weight_kg",
        "exampleCode": "import pandas as pd\nlist_of_dicts = [\ndogs = pd.DataFrame(list_of_dicts)"
      },
      {
        "title": "3. 0 Ginger Dachshund 22 10",
        "body": "1 Scout Dalmatian 59 25"
      },
      {
        "title": "4. How it works",
        "body": "Each dictionary becomes:\n\none row in the DataFrame\n\nEach key becomes:\n\na column name\n\nEach value becomes:\n\nthe data inside that row and column\n\nThis approach is useful when your data naturally comes row-by-row, such as:"
      },
      {
        "title": "5. API responses",
        "body": "JSON objects\n\nmanually entered records\n\n2. Creating a DataFrame from a Dictionary of Lists (Column-Based)\n\nIn this method, each key is a column name, and each value is a list containing all values for that column.\n\nExample:\n\n`import pandas as pd`\n\n`dict_of_lists = {`\n\n\"name\": [\"Ginger\", \"Scout\"],\n\n\"breed\": [\"Dachshund\", \"Dalmatian\"],\n\n\"height_cm\": [22, 59],\n\n\"weight_kg\": [10, 25]\n\n}\n\n`dogs = pd.DataFrame(dict_of_lists)`\n\nprint(dogs)\n\nOutput:\n\nname breed height_cm weight_kg",
        "exampleCode": "import pandas as pd\ndict_of_lists = {\ndogs = pd.DataFrame(dict_of_lists)"
      },
      {
        "title": "6. 0 Ginger Dachshund 22 10",
        "body": "1 Scout Dalmatian 59 25"
      },
      {
        "title": "7. How it works",
        "body": "Keys become column names"
      },
      {
        "title": "8. Lists become column values",
        "body": "Each list must usually have the same length\n\nThis method is often cleaner and easier when working with structured data."
      },
      {
        "title": "9. Comparing the Two Methods",
        "body": "List of Dictionaries"
      },
      {
        "title": "10. Built row by row",
        "body": "Good for record-style data"
      },
      {
        "title": "11. Flexible for irregular data",
        "body": "Example mindset:\n\n“Here is one dog's information.”"
      },
      {
        "title": "12. Dictionary of Lists",
        "body": "Built column by column"
      },
      {
        "title": "13. Cleaner for organized datasets",
        "body": "Common in data analysis\n\nExample mindset:\n\n“Here are all the dog names, all the breeds, all the heights…”"
      },
      {
        "title": "14. Big Picture",
        "body": "A pandas DataFrame is basically:\n\n`rows = observations/items`\n\n`columns = variables/features`\n\nThese creation methods simply provide different ways to organize the same data before converting it into a DataFrame.\n\nYou can think of it like this:\n\nMethod",
        "exampleCode": "rows = observations/items\ncolumns = variables/features"
      },
      {
        "title": "15. Think About",
        "body": "List of dictionaries\n\nRows"
      },
      {
        "title": "16. Dictionary of lists",
        "body": "Columns"
      },
      {
        "title": "17. Important pandas Function",
        "body": "The key function used is:\n\n`pd.DataFrame()`\n\nThis converts Python data structures into a DataFrame.",
        "exampleCode": "pd.DataFrame()"
      },
      {
        "title": "18. Key Takeaways",
        "body": "DataFrames store tabular data in pandas.\n\nDictionaries use key-value pairs.\n\nYou can create DataFrames:\n\nrow-by-row using a list of dictionaries\n\ncolumn-by-column using a dictionary of lists\n\n`pd.DataFrame() converts Python structures into DataFrames.`\n\nColumn names usually come from dictionary keys.",
        "exampleCode": "pd.DataFrame() converts Python structures into DataFrames."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Creating DataFrames",
      "scenario": "Apply the concepts learned in Creating DataFrames to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Creating DataFrames.",
      "starterCode": "# Practice Challenge: Creating DataFrames\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-3nn0988lkfrg",
    "tabId": "t.3nn0988lkfrg",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 44,
    "title": "Reading and writing CSVs",
    "description": "Reading and Writing CSV Files in pandas  So far, you've learned how to manually create DataFrames, but in real-world data analysis, datasets are usually already...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Reading and Writing CSV Files in pandas\n\nSo far, you've learned how to manually create DataFrames, but in real-world data analysis, datasets are usually already stored in files. One of the most common file formats used for storing tabular data is the CSV file.\n\nCSV stands for Comma-Separated Values. It is a simple text file format where:\n\neach row of data is placed on a new line\n\neach value is separated by commas\n\nBecause CSV files are simple and universal, almost every programming language, spreadsheet software, and database system can read and write them. This makes CSV one of the most widely used formats for sharing data."
      },
      {
        "title": "2. What a CSV File Looks Like",
        "body": "Example CSV file:\n\nname,breed,height_cm,weight_kg\n\nGinger,Dachshund,22,10\n\nScout,Dalmatian,59,25\n\nThis is basically the same structure as a DataFrame:\n\ncolumns at the top\n\nrows underneath"
      },
      {
        "title": "3. Reading a CSV File into pandas",
        "body": "To load a CSV file into a pandas DataFrame, pandas provides the function:\n\n`pd.read_csv()`\n\nExample:\n\n`import pandas as pd`\n\n`dogs = pd.read_csv(\"new_dogs.csv\")`\n\nprint(dogs)\n\nWhat happens here?\n\n`pd.read_csv() reads the CSV file`\n\npandas converts the file into a DataFrame automatically\n\nthe variable dogs now stores the DataFrame\n\nThis is much faster and more practical than manually typing data into Python.",
        "exampleCode": "pd.read_csv()\nimport pandas as pd\ndogs = pd.read_csv(\"new_dogs.csv\")\npd.read_csv() reads the CSV file"
      },
      {
        "title": "4. Manipulating the DataFrame",
        "body": "Once the CSV is loaded into a DataFrame, you can use all the pandas operations you've learned.\n\nFor example, creating a BMI column:\n\n`dogs[\"height_m\"] = dogs[\"height_cm\"] / 100`\n\n`dogs[\"bmi\"] = dogs[\"weight_kg\"] / dogs[\"height_m\"] ** 2`\n\nThis adds new columns directly into the DataFrame.",
        "exampleCode": "dogs[\"height_m\"] = dogs[\"height_cm\"] / 100\ndogs[\"bmi\"] = dogs[\"weight_kg\"] / dogs[\"height_m\"] ** 2"
      },
      {
        "title": "5. Writing a DataFrame Back to CSV",
        "body": "After modifying the DataFrame, you may want to save the updated data.\n\nYou can convert a DataFrame back into a CSV file using:\n\nDataFrame.to_csv()\n\nExample:\n\ndogs.to_csv(\"new_dogs_with_bmi.csv\")"
      },
      {
        "title": "6. What this does",
        "body": "takes the DataFrame\n\nconverts it into CSV format\n\nsaves it as a new file\n\nThe new CSV file now contains the updated BMI column."
      },
      {
        "title": "7. Complete Example",
        "body": "`import pandas as pd`",
        "exampleCode": "import pandas as pd"
      },
      {
        "title": "8. Read CSV file",
        "body": "`dogs = pd.read_csv(\"new_dogs.csv\")`",
        "exampleCode": "dogs = pd.read_csv(\"new_dogs.csv\")"
      },
      {
        "title": "9. Create height in meters",
        "body": "`dogs[\"height_m\"] = dogs[\"height_cm\"] / 100`",
        "exampleCode": "dogs[\"height_m\"] = dogs[\"height_cm\"] / 100"
      },
      {
        "title": "10. Create BMI column",
        "body": "`dogs[\"bmi\"] = dogs[\"weight_kg\"] / dogs[\"height_m\"] ** 2`",
        "exampleCode": "dogs[\"bmi\"] = dogs[\"weight_kg\"] / dogs[\"height_m\"] ** 2"
      },
      {
        "title": "11. Save updated DataFrame",
        "body": "dogs.to_csv(\"new_dogs_with_bmi.csv\")"
      },
      {
        "title": "12. Important pandas Functions",
        "body": "Reading CSV files\n\n`pd.read_csv(\"file_name.csv\")`\n\nUsed to:\n\nload CSV data into a DataFrame",
        "exampleCode": "pd.read_csv(\"file_name.csv\")"
      },
      {
        "title": "13. Writing CSV files",
        "body": "DataFrame.to_csv(\"file_name.csv\")\n\nUsed to:\n\nsave DataFrames as CSV files"
      },
      {
        "title": "14. Big Picture",
        "body": "The usual pandas workflow is:"
      },
      {
        "title": "15. Read data from a file",
        "body": "Store it in a DataFrame"
      },
      {
        "title": "16. Analyze or manipulate the data",
        "body": "Save the updated data\n\nExample workflow:\n\nCSV File → pandas DataFrame → Data Analysis → Updated CSV File\n\nThis is one of the core workflows in data science and data analysis."
      },
      {
        "title": "17. Key Takeaways",
        "body": "CSV files store tabular data using commas.\n\n`pd.read_csv() loads CSV files into pandas DataFrames.`\n\nOnce loaded, DataFrames can be analyzed and modified.\n\nto_csv() saves DataFrames back into CSV files.\n\nCSV is widely used because it is simple and compatible with many tools.",
        "exampleCode": "pd.read_csv() loads CSV files into pandas DataFrames."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Reading and writing CSVs",
      "scenario": "Apply the concepts learned in Reading and writing CSVs to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Reading and writing CSVs.",
      "starterCode": "# Practice Challenge: Reading and writing CSVs\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-ild2myevgcl9",
    "tabId": "t.ild2myevgcl9",
    "moduleTitle": "Part 3: Data Manipulation with pandas",
    "moduleOrder": 3,
    "lessonOrder": 45,
    "title": "Wrap up",
    "description": "pandas Wrap-Up Notes  Congratulations — this marks the end of the introduction to pandas. Throughout the course, you learned the core foundations of working wit...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "pandas Wrap-Up Notes\n\nCongratulations — this marks the end of the introduction to pandas. Throughout the course, you learned the core foundations of working with data in Python using one of the most important libraries in data science.\n\npandas is mainly used for:\n\norganizing data\n\ncleaning data\n\nanalyzing data\n\ntransforming data\n\nvisualizing tabular datasets\n\nThe central structure in pandas is the DataFrame, which works like a spreadsheet or table with rows and columns."
      },
      {
        "title": "2. Chapter Recap",
        "body": "Chapter 1 — DataFrames Basics\n\nYou first learned how to work with DataFrames by:\n\nexploring datasets\n\nsorting rows\n\nsubsetting rows and columns\n\nfiltering data using conditions\n\ncreating new columns\n\nSome important skills included:\n\nsort_values()\n\nfiltering with conditions\n\nselecting columns with brackets\n\nadding calculated columns\n\nThis chapter focused on understanding and manipulating tabular data."
      },
      {
        "title": "3. Chapter 2 — Summary Statistics and Aggregation",
        "body": "Next, you learned how to summarize and analyze datasets.\n\nYou explored:\n\nmean\n\nmedian\n\nmin/max\n\ncumulative statistics\n\ngrouped statistics\n\ncounting categorical data\n\nYou also learned:\n\ngroupby()\n\nagg()\n\nvalue_counts()\n\npivot_table()\n\nThese tools help turn raw data into useful insights.\n\nThe main idea of this chapter was:\n\nanalyzing patterns and relationships inside datasets."
      },
      {
        "title": "4. Chapter 3 — Indexing and Slicing",
        "body": "This chapter focused on selecting data more efficiently.\n\nYou learned:\n\nhow indexes work\n\nhow to set and reset indexes\n\nslicing rows and columns\n\nusing .loc[]\n\nusing .iloc[]\n\nImportant distinction:\n\nMethod\n\nUses\n\n.loc[]\n\nlabels/names\n\n.iloc[]\n\npositions/numbers\n\nYou also learned about:\n\nhierarchical indexes\n\ndate slicing\n\nrow/column slicing\n\nThis chapter was mainly about:\n\naccessing exactly the data you want."
      },
      {
        "title": "5. Chapter 4 — Visualization and File Handling",
        "body": "Finally, you learned how to:\n\ncreate plots\n\nhandle missing values\n\nread data from CSV files\n\nwrite data back to CSV files\n\nVisualization methods included:\n\nhistograms\n\nbar plots\n\nline plots\n\nscatter plots\n\nYou also learned:\n\nisna()\n\ndropna()\n\nfillna()\n\n`pd.read_csv()`\n\nto_csv()\n\nThis chapter connected pandas to real-world workflows.",
        "exampleCode": "pd.read_csv()"
      },
      {
        "title": "6. The Bigger Picture",
        "body": "The full pandas workflow usually looks like this:\n\nRead Data → Clean Data → Analyze Data → Visualize Data → Save Results\n\nOr more specifically:\n\nCSV File → DataFrame → Manipulation & Analysis → Charts/Insights → New CSV\n\nThis is the foundation of many real data science, machine learning, and analytics projects."
      },
      {
        "title": "7. Important Realization About pandas",
        "body": "One of the biggest lessons from the course is that pandas is extremely powerful and flexible.\n\nUnlike regular Python, pandas often gives:\n\nmultiple ways to solve the same problem\n\nmany functions that overlap\n\ndifferent approaches depending on preference\n\nThis makes pandas:\n\npowerful\n\npractical\n\nsometimes harder to master\n\nYou can think of pandas like a toolbox:\n\nthere are many tools available, and part of learning pandas is learning which tool is best for a situation."
      },
      {
        "title": "8. Topics Beyond the Course",
        "body": "The course only covered the fundamentals. pandas can do much more, including:\n\nmerging/joining multiple DataFrames\n\nworking with Excel files"
      },
      {
        "title": "9. SQL integration",
        "body": "time series analysis\n\nadvanced missing data handling\n\nadvanced visualization\n\nlarge dataset optimization\n\nexploratory data analysis (EDA)\n\nThere is still a lot more to explore after the basics."
      },
      {
        "title": "10. Core pandas Skills You Learned",
        "body": "By the end of the course, you now know how to:\n\ncreate DataFrames\n\nread CSV files\n\nexplore datasets\n\nfilter and sort data\n\nslice rows and columns\n\ngroup and summarize data\n\ncreate pivot tables\n\nadd new columns\n\nhandle missing values\n\nvisualize data\n\nexport results\n\nThese are the essential beginner-to-intermediate pandas skills used in real projects."
      },
      {
        "title": "11. Final Takeaway",
        "body": "pandas is one of the most important Python libraries for data analysis because it makes working with tabular data:\n\nfaster\n\ncleaner\n\nmore efficient\n\neasier to analyze\n\nA lot of modern data science workflows begin with pandas.\n\nThis course gave you the foundation needed to continue into:\n\ndata analytics\n\nmachine learning"
      },
      {
        "title": "12. AI/data preprocessing",
        "body": "business intelligence\n\nscientific computing\n\nAnd most importantly:\n\nyou now understand the general workflow of working with data in Python."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Wrap up",
      "scenario": "Apply the concepts learned in Wrap up to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Wrap up.",
      "starterCode": "# Practice Challenge: Wrap up\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-zevfaipqhy6e",
    "tabId": "t.zevfaipqhy6e",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 46,
    "title": "Inner Join in pandas",
    "description": "In real-world data analysis, information is often split across multiple tables or DataFrames. Instead of storing everything in one huge table, datasets are usua...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "In real-world data analysis, information is often split across multiple tables or DataFrames. Instead of storing everything in one huge table, datasets are usually organized separately based on topic. Because of this, an important skill in pandas is learning how to combine tables together.\n\nIn pandas, combining tables is commonly called:\n\nmerging\n\nor sometimes joining\n\nIn this course, both terms mean essentially the same thing."
      },
      {
        "title": "2. Big Picture of Merging",
        "body": "Imagine you have two separate tables that share a common column:\n\n**Table 1 — Ward Government Data**\n| ward | alderman | address |\n| :--- | :--- | :--- |\n| 1 | Person A | Address A |\n| 2 | Person B | Address B |\n\n**Table 2 — Census Data**\n| ward | population |\n| :--- | :--- |\n| 1 | 50,000 |\n| 2 | 54,000 |\n\nBoth tables contain a common column: `ward`. This shared key column allows pandas to connect related rows together.\n\n### What is an Inner Join?\nAn inner join returns **only the rows where matching values exist in BOTH tables**.\n\nThink of it as: *“Keep only the rows that successfully match on both sides.”*\n* If `ward 2` exists in both tables, they are combined into one row.\n* If a ward exists in only one table, it gets excluded.\n\n### Using merge()\nThe primary pandas method for joining tables is `.merge()`:\n\n```python\nmerged_df = left_table.merge(right_table, on=\"common_column\")\nwards_census = wards.merge(census, on=\"ward\")\n```",
        "exampleCode": "wards_census = wards.merge(census, on=\"ward\")\nprint(wards_census.head())"
      },
      {
        "title": "3. How Inner Join Filters Rows",
        "body": "Suppose we merge these two DataFrames on `ward`:\n\n**wards table (Left):**\n| ward | alderman |\n| :--- | :--- |\n| 1 | Smith |\n| 2 | Hopkins |\n\n**census table (Right):**\n| ward | population |\n| :--- | :--- |\n| 2 | 54,361 |\n| 3 | 60,000 |\n\n**Result after Inner Join (`wards.merge(census, on=\"ward\")`):**\n| ward | alderman | population |\n| :--- | :--- | :--- |\n| 2 | Hopkins | 54,361 |\n\nKey observations:\n* **Ward 2** is kept because it exists in both tables.\n* **Ward 1** is dropped because it has no census match.\n* **Ward 3** is dropped because it has no ward match in the left table.",
        "exampleCode": "wards.merge(census, on=\"ward\")"
      },
      {
        "title": "4. Column Order in Result",
        "body": "The table written first becomes the “left” table.\n\nExample:\n\nwards.merge(census, on=\"ward\")\n\nResult:\n\ncolumns from wards\n\nthen columns from census"
      },
      {
        "title": "5. Overlapping Column Names",
        "body": "Sometimes both tables contain columns with the same name.\n\nExample:\n\naddress\n\nzip\n\npandas automatically avoids duplicate names by adding suffixes:\n\naddress_x\n\naddress_y\n\nWhere:\n\n_x → left table\n\n_y → right table"
      },
      {
        "title": "6. Using Custom Suffixes",
        "body": "You can make suffixes more readable using:\n\nsuffixes=\n\nExample:\n\nwards.merge(\n\ncensus,\n\non=\"ward\",\n\nsuffixes=(\"_ward\", \"_cen\")\n\n)\n\nResult:\n\naddress_ward\n\naddress_cen\n\nThis makes it easier to understand which table each column came from."
      },
      {
        "title": "7. General Structure of an Inner Join",
        "body": "`merged_df = left_df.merge(`\n\nright_df,\n\non=\"column_name\"\n\n)\n\nWith suffixes:\n\n`merged_df = left_df.merge(`\n\nright_df,\n\non=\"column_name\",\n\nsuffixes=(\"_left\", \"_right\")\n\n)",
        "exampleCode": "merged_df = left_df.merge(\nmerged_df = left_df.merge("
      },
      {
        "title": "8. Big Concept to Remember",
        "body": "Merging is basically:\n\nmatching related rows from different tables using a common column.\n\nThe common column is often called:\n\nkey\n\njoin key\n\nmerge key\n\nExamples:\n\nid\n\ncustomer_id\n\nward\n\nemployee_number"
      },
      {
        "title": "9. Why Merging is Important",
        "body": "Real datasets are usually separated into multiple tables because:\n\ndata is cleaner\n\neasier to maintain\n\navoids repetition\n\nFor example:\n\ncustomer info in one table\n\norders in another\n\npayments in another\n\nMerging allows you to combine them for analysis.\n\nThis is one of the most important skills in:\n\npandas\n\nSQL\n\ndata analytics\n\ndata science"
      },
      {
        "title": "10. Key Takeaways",
        "body": "merge() combines DataFrames together.\n\nAn inner join keeps only matching rows from both tables.\n\non= specifies the matching column.\n\nOverlapping column names get suffixes automatically.\n\nsuffixes= lets you customize overlapping column names.\n\nMerging is essential for real-world data analysis."
      }
    ],
    "quickReference": [
      {
        "goal": "Inner join on key",
        "syntax": "pd.merge(df1, df2, on=\"id\", how=\"inner\")"
      },
      {
        "goal": "Left join",
        "syntax": "pd.merge(df1, df2, on=\"id\", how=\"left\")"
      },
      {
        "goal": "Vertical stack",
        "syntax": "pd.concat([df1, df2], ignore_index=True)"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Merging with mismatched key data types (string vs int):\npd.merge(df1, df2, on=\"customer_id\")  # Empty result or TypeError!",
      "correctCode": "# Cast keys to matching data types before merging:\ndf1[\"customer_id\"] = df1[\"customer_id\"].astype(int)\ndf2[\"customer_id\"] = df2[\"customer_id\"].astype(int)\npd.merge(df1, df2, on=\"customer_id\")",
      "explanation": "Pandas strictly requires merge key columns to share the exact same data type. If one column is string and another is integer, the join matches zero records."
    },
    "challenge": {
      "title": "Enrich Sales with Customer Profiles",
      "scenario": "The analytics team needs customer demographic information attached to every order transaction.",
      "instructions": "1. Read `sales.csv` and `customers.csv`.\n2. Perform an inner merge on `customer_id` using `pd.merge(sales, customers, on=\"customer_id\", how=\"inner\")`.\n3. Assign the merged DataFrame to `enriched_sales`.\n4. Print the top `5` records with `enriched_sales.head(5)`.",
      "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\n\n# Perform inner merge on customer_id\nenriched_sales = None\n\nprint(enriched_sales.head())\n",
      "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\nenriched_sales = pd.merge(sales, customers, on='customer_id', how='inner')\nprint(enriched_sales[['sale_id', 'customer_id', 'first_name', 'sale_amount']].head())\n",
      "validationScript": "assert 'enriched_sales' in locals(), \"Variable 'enriched_sales' must be defined\"\nassert 'first_name' in enriched_sales.columns, \"Merged DataFrame must contain customer first_name\"\n",
      "hints": [
        "Use pd.merge(sales, customers, on='customer_id', how='inner')."
      ],
      "solutionExplanation": "pd.merge combines datasets on shared relational keys, creating enriched dimensional data warehouse models."
    }
  },
  {
    "id": "py-lesson-t-mtby4njtaxhy",
    "tabId": "t.mtby4njtaxhy",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 47,
    "title": "One-to-Many Relationships",
    "description": "One-to-Many Relationships in pandas  In the previous lesson, you learned how to merge two DataFrames using the merge() method. In this lesson, the focus is on u...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "One-to-Many Relationships in pandas\n\nIn the previous lesson, you learned how to merge two DataFrames using the merge() method. In this lesson, the focus is on understanding relationships between tables, especially the one-to-many relationship.\n\nBefore learning one-to-many, it helps to quickly review one-to-one relationships.\n\nA one-to-one relationship means that each row in one table matches exactly one row in another table. For example, the wards table and the census table both contain one row per ward. Ward 3 in the first table matches only ward 3 in the second table. Since there is only one population record for each ward, the relationship is naturally one-to-one.\n\nExample idea:\n\nOne ward → one census record\n\nOne row in the left table → one row in the right table\n\nA one-to-many relationship is different. In this case, one row in the left table can match multiple rows in the right table.\n\nThe example used is the relationship between:\n\nthe wards table\n\nthe licenses table\n\nThe wards table contains information about each ward, while the licenses table contains many business licenses. Since many businesses can exist inside one ward, a single ward can appear multiple times in the licenses table.\n\nSo the relationship becomes:\n\nOne ward → many businesses\n\nBoth tables are connected using the ward column.\n\nWhen using:\n\nwards.merge(licenses, on=\"ward\")\n\npandas automatically handles the one-to-many relationship.\n\nIf ward 1 has many businesses, the row for ward 1 from the wards table will be repeated for every matching business in the licenses table.\n\nThis is important because it explains why merged tables can suddenly become much larger.\n\nFor example:"
      },
      {
        "title": "2. Original wards table: 50 rows",
        "body": "After merging with licenses: 10,000 rows\n\nThe number of rows increases because each ward may match many business records."
      },
      {
        "title": "3. Key Idea",
        "body": "In a one-to-many relationship:\n\nThe left table usually contains unique values.\n\nThe right table can contain repeated values for the matching column.\n\nMerging repeats rows from the left table whenever multiple matches exist."
      },
      {
        "title": "4. Important Notes",
        "body": "One-to-One Relationship\n\nOne row matches exactly one row."
      },
      {
        "title": "5. Example: wards ↔ census",
        "body": "One-to-Many Relationship\n\nOne row matches several rows."
      },
      {
        "title": "6. Example: wards ↔ licenses",
        "body": "pandas Behavior\n\nThe same merge() syntax is used.\n\npandas automatically duplicates matching rows when needed.\n\nRow counts often increase after merging."
      },
      {
        "title": "7. Example Structure",
        "body": "wards table\n\nward\n\nalderman\n\n1\n\nJoe\n\n2\n\nBrian\n\nlicenses table\n\nbusiness\n\nward"
      },
      {
        "title": "8. Store A",
        "body": "1"
      },
      {
        "title": "9. Cafe B",
        "body": "1"
      },
      {
        "title": "10. Shop C",
        "body": "2\n\nmerged result\n\nward\n\nalderman\n\nbusiness\n\n1\n\nJoe"
      },
      {
        "title": "11. Store A",
        "body": "1\n\nJoe"
      },
      {
        "title": "12. Cafe B",
        "body": "2\n\nBrian"
      },
      {
        "title": "13. Shop C",
        "body": "Notice how ward 1 and Joe appear twice because there are two businesses in ward 1."
      },
      {
        "title": "14. Main Takeaway",
        "body": "A one-to-many merge is extremely common in real-world datasets. One category, customer, location, or ID often connects to many records in another table. pandas handles this automatically during merges, but you should always expect the resulting DataFrame to potentially have many more rows than the original table."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: One-to-Many Relationships",
      "scenario": "Apply the concepts learned in One-to-Many Relationships to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for One-to-Many Relationships.",
      "starterCode": "# Practice Challenge: One-to-Many Relationships\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-wj831piomyun",
    "tabId": "t.wj831piomyun",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 48,
    "title": "Merging Multiple DataFrames",
    "description": "In the previous lesson, you learned how to merge two tables together using merge(). In real-world data analysis, though, information is often spread across seve...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "In the previous lesson, you learned how to merge two tables together using merge(). In real-world data analysis, though, information is often spread across several different tables, not just two. Because of this, it’s very common to merge multiple DataFrames together step by step.\n\nThe lesson continues using datasets from the city of Chicago. Previously, there were two tables:\n\nlicenses → contains business license information\n\nwards → contains information about Chicago wards and government offices\n\nNow, a third table is introduced:\n\ngrants → contains information about businesses that received small business grant money\n\nThe goal is to combine all this information together so we can analyze things like:\n\nwhich businesses received grants\n\nwhere those businesses are located\n\nwhich wards received the most grant money"
      },
      {
        "title": "2. Connecting Multiple Tables",
        "body": "To combine all the information, the process is done in stages.\n\nFirst:\n\ngrants.merge(licenses, on=[\"address\", \"zip\"])\n\nThen:\n\nmerged_table.merge(wards, on=\"ward\")\n\nThis creates one final DataFrame containing:\n\nbusiness information\n\ngrant information\n\nward information\n\nWhy Merge on Multiple Columns?\n\nA very important concept introduced here is merging using more than one column.\n\nAt first glance, merging on only zip might seem enough, but it creates incorrect matches because many businesses can share the same zip code.\n\nSimilarly, merging only on address could also cause problems because addresses might repeat in different places.\n\nThe safer solution is to merge using BOTH:\n\naddress\n\nzip\n\nThis ensures that a row only matches when BOTH values are the same.\n\nExample:\n\ngrants.merge(licenses, on=[\"address\", \"zip\"])\n\nNotice that the on argument now receives a list instead of a single column name."
      },
      {
        "title": "3. Key Idea About Multi-Column Merges",
        "body": "When merging on multiple columns:\n\non=[\"address\", \"zip\"]\n\npandas requires ALL listed columns to match before rows are combined.\n\nThis helps avoid incorrect duplicates or mismatched data."
      },
      {
        "title": "4. Chaining Multiple Merges",
        "body": "You can continue merging more tables one after another.\n\nExample structure:\n\ngrants.merge(licenses, on=[\"address\", \"zip\"]) \\\n\n.merge(wards, on=\"ward\")\n\nThe backslash \\ is used for line continuation so Python treats it as one statement spread across multiple lines.\n\nThis technique keeps long merge operations cleaner and easier to read."
      },
      {
        "title": "5. Result of Multiple Merges",
        "body": "After combining the tables, you now have a richer dataset containing:\n\ngrant amounts\n\nbusiness details\n\nward details\n\nOnce all the data is connected, you can perform analysis more easily.\n\nFor example:\n\ncalculate total grant money per ward\n\ncompare wards\n\nvisualize which wards received more funding\n\nThis is one of the biggest reasons merging is important in data analysis: it allows information from different sources to work together."
      },
      {
        "title": "6. Important Concepts",
        "body": "Merging on Multiple Columns\n\nUse a list inside on.\n\non=[\"address\", \"zip\"]\n\nBoth columns must match."
      },
      {
        "title": "7. Chaining Merges",
        "body": "You can merge several DataFrames in sequence.\n\ndf1.merge(df2).merge(df3)"
      },
      {
        "title": "8. Why This Matters",
        "body": "Real datasets are often separated across multiple tables.\n\nYou may need to combine:\n\ncustomer data\n\ntransaction data\n\nproduct data\n\nlocation data\n\nbefore meaningful analysis can happen."
      },
      {
        "title": "9. Main Takeaway",
        "body": "Merging multiple DataFrames is a core skill in pandas because real-world data is rarely stored in one perfect table. pandas allows you to combine many datasets together step by step, and you can even merge using multiple matching columns to make the joins more accurate and reliable."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Merging Multiple DataFrames",
      "scenario": "Apply the concepts learned in Merging Multiple DataFrames to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Merging Multiple DataFrames.",
      "starterCode": "# Practice Challenge: Merging Multiple DataFrames\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-uoh31emdknho",
    "tabId": "t.uoh31emdknho",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 49,
    "title": "Left Join in pandas",
    "description": "Learn how left joins preserve every row from the primary table while gracefully pulling in optional matching data from a secondary table with NaN imputation.",
    "sections": [
      {
        "title": "1. What is a Left Join?",
        "body": "In earlier lessons, you learned how to merge tables using `df.merge()`. By default, pandas performs an **inner join**, which only keeps records where matching keys exist in *both* tables. Any row without a match is permanently discarded.\n\nA **left join** is different: it preserves **every single row from the left table**, regardless of whether a matching record exists in the right table.\n\nKey behaviors of a Left Join:\n* All rows from the left table are kept.\n* Matching rows from the right table are joined.\n* If no match exists in the right table, pandas fills the missing columns with `NaN` (null).\n\n### Join Behavior Comparison:\n| Left Table Key | Right Table Key | Inner Join Result | Left Join Result |\n| :--- | :--- | :--- | :--- |\n| Match exists | Match exists | Combined row kept | Combined row kept |\n| No match | — | Row removed | **Left row kept**; right side becomes `NaN` |"
      },
      {
        "title": "2. Real-World Example: Movies & Taglines",
        "body": "Consider a database with two tables:\n1. `movies` (4,803 rows: `id`, `title`, `popularity`)\n2. `taglines` (fewer rows: `id`, `tagline` — not every movie has a marketing tagline)\n\nIf we ran an inner join, all movies without a tagline would disappear! To prevent losing our movies, we use a left join:\n\n```python\n# Left join syntax:\nmovies_taglines = movies.merge(taglines, on=\"id\", how=\"left\")\n```\n\n### Breaking Down the Code:\n* `movies`: The left table. All 4,803 rows remain in the final result.\n* `taglines`: The right table. Only matching taglines are added.\n* `on=\"id\"`: The relational key connecting the two tables.\n* `how=\"left\"`: Explicitly specifies a left join (defaults to `'inner'` if omitted).\n\n### What the Result Looks Like:\n| id | title | tagline | Status |\n| :--- | :--- | :--- | :--- |\n| 1 | Movie A | \"Epic adventure\" | Match found: Tagline attached |\n| 2 | Movie B | `NaN` | **Preserved!** Tagline filled with `NaN` |",
        "exampleCode": "movies_taglines = movies.merge(taglines, on=\"id\", how=\"left\")\nprint(movies_taglines[['title', 'tagline']].head())"
      },
      {
        "title": "3. Row Count Properties & When to Use",
        "body": "An essential mathematical property of left joins:\n> In a one-to-one or many-to-one relationship, a left join **always returns the exact same number of rows as the left table**.\n\nBecause the `movies` table has 4,803 rows, `movies.merge(taglines, on=\"id\", how=\"left\")` will always return exactly 4,803 rows.\n\n### When are Left Joins Essential?\n* **Preserving the Primary Dataset**: When analyzing transactions, orders, or students, and you cannot afford to drop rows just because secondary details (like discount coupons or scholarship info) are missing.\n* **Auditing Missing Data**: You can filter for rows where the right table's columns are `isna()` to discover unlinked or orphaned records (e.g., finding customers who haven't placed an order yet)."
      }
    ],
    "quickReference": [
      {
        "goal": "Left join preserving all left rows",
        "syntax": "df1.merge(df2, on=\"id\", how=\"left\")"
      },
      {
        "goal": "Inner join (drops non-matches)",
        "syntax": "df1.merge(df2, on=\"id\", how=\"inner\")"
      },
      {
        "goal": "Check for unlinked records after left join",
        "syntax": "merged[merged[\"col_from_right\"].isna()]"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting how='left' (defaults to inner join, dropping records):\nfull_report = sales.merge(promotions, on='promo_id')",
      "correctCode": "# Explicitly pass how='left' to preserve all sales without promotions:\nfull_report = sales.merge(promotions, on='promo_id', how='left')",
      "explanation": "Pandas merge defaults to how='inner'. If promotions only exist for some sales, an inner join accidentally wipes out all standard sales!"
    },
    "challenge": {
      "title": "Left Join Sales with Customer Directory",
      "scenario": "The audit team needs customer details attached to sales orders. Even if a customer profile is unlinked or pending verification, every transaction record in sales.csv must be strictly preserved.",
      "instructions": "1. Read `sales.csv` and `customers.csv`.\n2. Perform a left join on `customer_id` using `sales.merge(customers, on=\"customer_id\", how=\"left\")`.\n3. Assign the merged DataFrame to `enriched_sales`.\n4. Print the top `5` records with `print(enriched_sales[['sale_id', 'customer_id', 'first_name', 'sale_amount']].head())`.",
      "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\n\n# Perform left join on customer_id\nenriched_sales = None\n\nprint(enriched_sales[['sale_id', 'customer_id', 'first_name', 'sale_amount']].head())\n",
      "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\nenriched_sales = sales.merge(customers, on='customer_id', how='left')\nprint(enriched_sales[['sale_id', 'customer_id', 'first_name', 'sale_amount']].head())\n",
      "validationScript": "assert 'enriched_sales' in locals(), \"Variable 'enriched_sales' must be defined\"\nassert 'first_name' in enriched_sales.columns, \"Merged DataFrame must contain customer first_name\"\nassert len(enriched_sales) == len(sales), \"Left join must preserve all rows from sales\"\n",
      "hints": [
        "Use sales.merge(customers, on='customer_id', how='left').",
        "A left join guarantees len(enriched_sales) equals len(sales)."
      ],
      "solutionExplanation": "how='left' ensures all sales records remain intact even if customer records are missing, filling empty slots with NaN."
    }
  },
  {
    "id": "py-lesson-t-cbtvxfsdf1pg",
    "tabId": "t.cbtvxfsdf1pg",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 50,
    "title": "Other Types of Joins in pandas",
    "description": "Master right joins, full outer joins, cross-table key name mapping with left_on and right_on, and conflict resolution using custom suffixes.",
    "sections": [
      {
        "title": "1. Right Joins & Full Outer Joins",
        "body": "In addition to inner and left joins, pandas supports two other fundamental join types:\n\n### 1. Right Join (`how=\"right\"`)\nA right join is the mirror opposite of a left join:\n* Keeps **ALL rows from the right table**.\n* Only matching rows from the left table are added.\n* If no match exists in the left table, left columns are populated with `NaN`.\n\n### 2. Full Outer Join (`how=\"outer\"`)\nAn outer join preserves **everything from BOTH tables**:\n* All rows from the left table AND all rows from the right table are kept.\n* Any non-matching column on either side is filled with `NaN`.\n\n### Summary Comparison of All 4 Joins:\n| Join Type | Kept Left Rows | Kept Right Rows | Handling of Unmatched Rows |\n| :--- | :--- | :--- | :--- |\n| **Inner** | Matching only | Matching only | Dropped completely |\n| **Left** | **All rows** | Matching only | Right columns filled with `NaN` |\n| **Right** | Matching only | **All rows** | Left columns filled with `NaN` |\n| **Outer** | **All rows** | **All rows** | Non-matches on either side filled with `NaN` |"
      },
      {
        "title": "2. Joining on Different Column Names",
        "body": "In real-world data pipelines, foreign keys don't always share the exact same column name. For example:\n* `orders` table has column `cust_id`.\n* `customers` table has column `id`.\n\nIf you use `on=\"id\"`, pandas throws a `KeyError`! To solve this, pandas provides `left_on` and `right_on`:\n\n```python\n# Merging tables with differing column names:\nmerged_df = orders.merge(\n    customers,\n    left_on=\"cust_id\",\n    right_on=\"id\",\n    how=\"left\"\n)\n```\nBoth columns are preserved in the result, allowing seamless relational mapping.",
        "exampleCode": "merged_df = orders.merge(customers, left_on=\"cust_id\", right_on=\"id\", how=\"left\")"
      },
      {
        "title": "3. Handling Overlapping Column Names with Suffixes",
        "body": "When both tables have columns with identical names (like `name`, `date`, or `status`), pandas automatically renames them to `_x` and `_y` to prevent collisions.\n\nYou can provide meaningful names using the `suffixes` parameter:\n\n```python\n# Customizing conflicting column suffixes:\nwards.merge(\n    census,\n    on=\"ward\",\n    suffixes=(\"_ward\", \"_census\")\n)\n# Output columns: address_ward, address_census\n```\nThis clarifies the data provenance for anyone auditing your analysis down the line."
      }
    ],
    "quickReference": [
      {
        "goal": "Right join",
        "syntax": "df1.merge(df2, on=\"id\", how=\"right\")"
      },
      {
        "goal": "Full outer join",
        "syntax": "df1.merge(df2, on=\"id\", how=\"outer\")"
      },
      {
        "goal": "Join on different column names",
        "syntax": "df1.merge(df2, left_on=\"l_id\", right_on=\"r_id\")"
      },
      {
        "goal": "Custom column collision suffixes",
        "syntax": "df1.merge(df2, on=\"id\", suffixes=(\"_left\", \"_right\"))"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Passing single on= when column names differ:\npd.merge(orders, users, on=\"user_id\")  # KeyError if users has 'id'!",
      "correctCode": "# Explicitly use left_on and right_on:\npd.merge(orders, users, left_on=\"user_id\", right_on=\"id\")",
      "explanation": "When join key names differ across DataFrames, use left_on and right_on rather than on."
    },
    "challenge": {
      "title": "Outer Join Products and Order Catalog",
      "scenario": "Inventory analysis requires combining products with sales transactions to find both top-selling products and catalog items that have zero sales.",
      "instructions": "1. Read `products.csv` and `sales.csv`.\n2. Perform a full outer join on `product_id` using `pd.merge(products, sales, on=\"product_id\", how=\"outer\", suffixes=(\"_catalog\", \"_sold\"))`.\n3. Assign the result to `full_catalog`.\n4. Print `full_catalog[['product_id', 'product_name', 'sale_amount']].head(5)`.",
      "starterCode": "import pandas as pd\n\nproducts = pd.read_csv('products.csv')\nsales = pd.read_csv('sales.csv')\n\n# Perform outer merge on product_id with suffixes\nfull_catalog = None\n\nprint(full_catalog[['product_id', 'product_name', 'sale_amount']].head())\n",
      "expectedCode": "import pandas as pd\n\nproducts = pd.read_csv('products.csv')\nsales = pd.read_csv('sales.csv')\nfull_catalog = pd.merge(products, sales, on='product_id', how='outer', suffixes=('_catalog', '_sold'))\nprint(full_catalog[['product_id', 'product_name', 'sale_amount']].head())\n",
      "validationScript": "assert 'full_catalog' in locals(), \"Variable 'full_catalog' must be defined\"\nassert 'product_name' in full_catalog.columns, \"Merged DataFrame must contain product_name\"\nassert len(full_catalog) >= len(sales), \"Outer join must contain all products and all sales\"\n",
      "hints": [
        "Use pd.merge(products, sales, on='product_id', how='outer', suffixes=('_catalog', '_sold')).",
        "Outer joins retain records from both sides, populating unmatched cells with NaN."
      ],
      "solutionExplanation": "how='outer' guarantees that products with zero transactions and sales with unknown products are all preserved for data reconciliation."
    }
  },
  {
    "id": "py-lesson-t-3ciu9p3rjw6a",
    "tabId": "t.3ciu9p3rjw6a",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 51,
    "title": "Merging a Table to Itself (Self Join)",
    "description": "A self join happens when you merge a table with itself. This sounds strange at first, but it’s very useful when rows inside the same table are related to other ...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "A self join happens when you merge a table with itself. This sounds strange at first, but it’s very useful when rows inside the same table are related to other rows in that same table.\n\nThe example in the lesson uses movie sequels.\n\nImagine a table like this:\n\nid\n\ntitle\n\nsequel\n\n862"
      },
      {
        "title": "2. Toy Story",
        "body": "863\n\n863"
      },
      {
        "title": "3. Toy Story 2",
        "body": "10193\n\n10193"
      },
      {
        "title": "4. Toy Story 3",
        "body": "NaN\n\nThe sequel column stores the ID of another movie inside the same table.\n\nToy Story (862) → sequel is movie 863\n\nToy Story 2 (863) → sequel is movie 10193\n\nThe problem is:\n\nthe sequel’s title is not directly stored in the row — only its ID is.\n\nSo we merge the table with itself to connect:\n\noriginal movie\n\nsequel movie\n\ninto one row."
      },
      {
        "title": "5. Basic Self Join",
        "body": "sequels.merge(\n\nsequels,\n\nleft_on=\"sequel\",\n\nright_on=\"id\",\n\nsuffixes=(\"_org\", \"_seq\")\n\n)"
      },
      {
        "title": "6. What Each Part Means",
        "body": "sequels.merge(sequels, ...)\n\nYou are merging the table with another copy of itself.\n\nThink of it like:\n\n`left table = original movies`\n\n`right table = sequel movies`\n\nEven though they are the same DataFrame.\n\nleft_on=\"sequel\"\n\nUse the sequel column from the left table.\n\nExample:\n\ntitle\n\nsequel",
        "exampleCode": "left table = original movies\nright table = sequel movies"
      },
      {
        "title": "7. Toy Story",
        "body": "863\n\nright_on=\"id\"\n\nMatch it to the id column in the right table.\n\nExample:\n\nid\n\ntitle\n\n863"
      },
      {
        "title": "8. Toy Story 2",
        "body": "Since:\n\n863 == 863\n\nthey get connected.\n\nResult\n\ntitle_org\n\ntitle_seq"
      },
      {
        "title": "9. Toy Story",
        "body": "Toy Story 2"
      },
      {
        "title": "10. Toy Story 2",
        "body": "Toy Story 3\n\nNow each movie is linked to its sequel."
      },
      {
        "title": "11. Why suffixes is Needed",
        "body": "Both tables have columns like:\n\nid\n\ntitle\n\nWithout suffixes, pandas wouldn’t know which is which.\n\nSo:\n\nsuffixes=(\"_org\", \"_seq\")\n\nrenames them internally to:\n\ntitle_org\n\ntitle_seq\n\nmeaning:\n\noriginal movie\n\nsequel movie"
      },
      {
        "title": "12. Inner Join vs Left Join",
        "body": "By default, merge uses an inner join.\n\nThat means:\n\nonly rows with matches are returned.\n\nSo movies without sequels disappear.\n\nExample:\n\ntitle\n\nsequel\n\nTitanic\n\nNaN\n\nTitanic gets removed because it has no matching sequel."
      },
      {
        "title": "13. Using a Left Join",
        "body": "sequels.merge(\n\nsequels,\n\nleft_on=\"sequel\",\n\nright_on=\"id\",\n\nhow=\"left\",\n\nsuffixes=(\"_org\", \"_seq\")\n\n)\n\nNow ALL original movies stay.\n\nMovies without sequels will have:\n\nNaN\n\nfor sequel columns."
      },
      {
        "title": "14. Real-World Uses of Self Joins",
        "body": "Self joins are common in hierarchical or connected data."
      },
      {
        "title": "15. Employee ↔ Manager",
        "body": "employee_id\n\nmanager_id\n\n1\n\n5\n\nYou can merge employees with employees again to get manager names."
      },
      {
        "title": "16. Social Networks",
        "body": "user\n\nfriend_id\n\nAlice\n\n3\n\nMerge users with users again to get friend information."
      },
      {
        "title": "17. Logistics / Routes",
        "body": "city\n\nnext_city\n\nManila\n\nBatangas\n\nSelf joins can connect travel paths."
      },
      {
        "title": "18. Big Picture",
        "body": "A self join is basically:\n\n“Use one row to look up another row in the same table.”\n\nYou are treating one DataFrame as if it were two related tables."
      }
    ],
    "quickReference": [
      {
        "goal": "Inner join on key",
        "syntax": "pd.merge(df1, df2, on=\"id\", how=\"inner\")"
      },
      {
        "goal": "Left join",
        "syntax": "pd.merge(df1, df2, on=\"id\", how=\"left\")"
      },
      {
        "goal": "Vertical stack",
        "syntax": "pd.concat([df1, df2], ignore_index=True)"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Merging with mismatched key data types (string vs int):\npd.merge(df1, df2, on=\"customer_id\")  # Empty result or TypeError!",
      "correctCode": "# Cast keys to matching data types before merging:\ndf1[\"customer_id\"] = df1[\"customer_id\"].astype(int)\ndf2[\"customer_id\"] = df2[\"customer_id\"].astype(int)\npd.merge(df1, df2, on=\"customer_id\")",
      "explanation": "Pandas strictly requires merge key columns to share the exact same data type. If one column is string and another is integer, the join matches zero records."
    },
    "challenge": {
      "title": "Enrich Sales with Customer Profiles",
      "scenario": "The analytics team needs customer demographic information attached to every order transaction.",
      "instructions": "1. Read `sales.csv` and `customers.csv`.\n2. Perform an inner merge on `customer_id` using `pd.merge(sales, customers, on=\"customer_id\", how=\"inner\")`.\n3. Assign the merged DataFrame to `enriched_sales`.\n4. Print the top `5` records with `enriched_sales.head(5)`.",
      "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\n\n# Perform inner merge on customer_id\nenriched_sales = None\n\nprint(enriched_sales.head())\n",
      "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\nenriched_sales = pd.merge(sales, customers, on='customer_id', how='inner')\nprint(enriched_sales[['sale_id', 'customer_id', 'first_name', 'sale_amount']].head())\n",
      "validationScript": "assert 'enriched_sales' in locals(), \"Variable 'enriched_sales' must be defined\"\nassert 'first_name' in enriched_sales.columns, \"Merged DataFrame must contain customer first_name\"\n",
      "hints": [
        "Use pd.merge(sales, customers, on='customer_id', how='inner')."
      ],
      "solutionExplanation": "pd.merge combines datasets on shared relational keys, creating enriched dimensional data warehouse models."
    }
  },
  {
    "id": "py-lesson-t-j5ws1afdf6mx",
    "tabId": "t.j5ws1afdf6mx",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 52,
    "title": "Merging on indexes",
    "description": "So far, merges used columns like:  movies.merge(taglines, on=\"id\")  But pandas can also merge using the index of a DataFrame.  This is useful because indexes of...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "So far, merges used columns like:\n\nmovies.merge(taglines, on=\"id\")\n\nBut pandas can also merge using the index of a DataFrame.\n\nThis is useful because indexes often contain unique IDs.\n\nWhat is an Index Again?\n\nNormally a DataFrame looks like this:\n\nindex\n\nid\n\ntitle\n\n0\n\n101\n\nAvatar\n\n1\n\n102\n\nTitanic\n\nThe leftmost numbers (0,1,2) are the default index.\n\nBut sometimes we make another column the index:\n\n`movies = movies.set_index(\"id\")`\n\nNow:\n\nid (index)\n\ntitle\n\n101\n\nAvatar\n\n102\n\nTitanic\n\nThe id column became the index.\n\nWhy Merge on an Index?\n\nIndexes are often:\n\nunique\n\noptimized for lookup\n\nused as identifiers\n\nSo merging on indexes is clean and efficient.",
        "exampleCode": "movies = movies.set_index(\"id\")"
      },
      {
        "title": "2. Simple Index Merge",
        "body": "If both tables use the same index name:\n\nmovies.merge(taglines, on=\"id\", how=\"left\")\n\nEven though id is now an index, pandas automatically understands it."
      },
      {
        "title": "3. Big Picture",
        "body": "This works because:\n\non=\"id\"\n\ncan refer to:\n\na column\n\nOR\n\nan index name\n\npandas detects it automatically."
      },
      {
        "title": "4. MultiIndex Merge",
        "body": "A MultiIndex means multiple index levels.\n\nExample:\n\nmovie_id\n\ncast_id\n\nactor\n\n1\n\n10"
      },
      {
        "title": "5. Samuel Jackson",
        "body": "If both movie_id and cast_id are indexes:\n\nsamuel.merge(cast, on=[\"movie_id\", \"cast_id\"])\n\nThis works exactly like merging on multiple columns.\n\nBoth values must match.\n\nWhen Index Names are Different\n\nSometimes the indexes have different names.\n\nExample:\n\nLeft table index:\n\nid\n\nRight table index:\n\nmovie_id\n\nThen you use:\n\nmovies.merge(\n\nmovie_to_genres,\n\nleft_on=\"id\",\n\nright_on=\"movie_id\",\n\nleft_index=True,\n\nright_index=True\n\n)"
      },
      {
        "title": "6. Important Part",
        "body": "When using:\n\nleft_on\n\nright_on\n\nwith indexes, you MUST specify:\n\nleft_index=True\n\nright_index=True\n\nThis tells pandas:\n\n“The keys are indexes, not regular columns.”"
      },
      {
        "title": "7. Quick Rule",
        "body": "Same index names\n\nUse:\n\non=\"id\""
      },
      {
        "title": "8. Different index names",
        "body": "Use:\n\nleft_on=\n\nright_on=\n\nleft_index=True\n\nright_index=True"
      },
      {
        "title": "9. Conceptual Understanding",
        "body": "Think of indexes as:\n\nhidden columns used to identify rows.\n\nNormally merges use visible columns.\n\nIndex merges use those hidden identifiers instead."
      },
      {
        "title": "10. Comparing Column Merge vs Index Merge",
        "body": "Column Merge\n\nmovies.merge(taglines, on=\"id\")\n\nUses normal columns."
      },
      {
        "title": "11. Index Merge",
        "body": "movies.set_index(\"id\")\n\ntaglines.set_index(\"id\")\n\nmovies.merge(taglines, on=\"id\")\n\nUses indexes instead."
      },
      {
        "title": "12. Important Insight",
        "body": "Indexes are mostly about:\n\nfaster lookup\n\ncleaner subsetting\n\nstructured data relationships\n\nAnd pandas lets merges work with them almost the same way as columns.\n\nThat’s why merging on indexes feels very similar to normal merging."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Merging on indexes",
      "scenario": "Apply the concepts learned in Merging on indexes to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Merging on indexes.",
      "starterCode": "# Practice Challenge: Merging on indexes\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-fa9ahp97u2ey",
    "tabId": "t.fa9ahp97u2ey",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 53,
    "title": "Filtering Joins",
    "description": "Up to this point, the joins you learned were mostly mutating joins.  A mutating join:  combines columns from two tables.  Example:  movies.merge(taglines)  This...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Up to this point, the joins you learned were mostly mutating joins.\n\nA mutating join:\n\ncombines columns from two tables.\n\nExample:\n\nmovies.merge(taglines)\n\nThis adds new columns from another table.\n\nFiltering Joins\n\nFiltering joins are different.\n\nInstead of adding columns, they:\n\nfilter rows based on whether matches exist in another table.\n\nThere are two main filtering joins:"
      },
      {
        "title": "2. Semi Join",
        "body": "Anti Join\n\npandas doesn’t have built-in methods named:\n\nsemi_join()\n\nanti_join()\n\nSo we recreate them manually using:\n\nmerge()\n\nisin()\n\nfiltering"
      },
      {
        "title": "3. Semi Join",
        "body": "A semi join returns:\n\nrows from the LEFT table that HAVE matches in the RIGHT table.\n\nImportant:\n\nonly columns from the left table are returned\n\nduplicates are not added\n\nit behaves like a filter\n\nExample\n\nSuppose:\n\ngenres table\n\ngid\n\ngenre\n\n1\n\nRock\n\n2\n\nJazz\n\n3\n\nPop\n\ntop_tracks table\n\ntrack\n\ngid"
      },
      {
        "title": "4. Song A",
        "body": "1"
      },
      {
        "title": "5. Song B",
        "body": "3\n\nWe want:\n\ngenres that appear in top tracks.\n\nResult:\n\ngid\n\ngenre\n\n1\n\nRock\n\n3\n\nPop\n\nJazz is removed because it doesn’t appear."
      },
      {
        "title": "6. Semi Join Process",
        "body": "Step 1 — Inner Merge\n\n`genres_tracks = genres.merge(top_tracks, on=\"gid\")`\n\nThis keeps only matching gids.\n\nStep 2 — Use isin()\n\ngenres[\"gid\"].isin(genres_tracks[\"gid\"])\n\nThis checks:\n\n“Does this gid exist in the merged table?”\n\nResult:\n\nTrue\n\nFalse\n\nTrue",
        "exampleCode": "genres_tracks = genres.merge(top_tracks, on=\"gid\")"
      },
      {
        "title": "7. Step 3 — Filter",
        "body": "`top_genres = genres[genres[\"gid\"].isin(genres_tracks[\"gid\"])]`\n\nNow only matching genres remain.",
        "exampleCode": "top_genres = genres[genres[\"gid\"].isin(genres_tracks[\"gid\"])]"
      },
      {
        "title": "8. Big Picture of Semi Join",
        "body": "Think of it as:\n\n“Keep rows from the left table IF they exist in the right table.”\n\nYou are not interested in adding columns.\n\nYou only care whether a match exists."
      },
      {
        "title": "9. Anti Join",
        "body": "An anti join is the opposite.\n\nIt returns:\n\nrows from the LEFT table that DO NOT have matches in the RIGHT table.\n\nExample\n\nUsing the same data:\n\ngenres\n\ngid\n\ngenre\n\n1\n\nRock\n\n2\n\nJazz\n\n3\n\nPop\n\ntop_tracks\n\ntrack\n\ngid"
      },
      {
        "title": "10. Song A",
        "body": "1"
      },
      {
        "title": "11. Song B",
        "body": "3\n\nResult of anti join:\n\ngid\n\ngenre\n\n2\n\nJazz\n\nBecause Jazz never appeared in top tracks."
      },
      {
        "title": "12. Anti Join Process",
        "body": "Step 1 — Left Merge with Indicator\n\n`genres_tracks = genres.merge(`\n\ntop_tracks,\n\non=\"gid\",\n\nhow=\"left\",\n\nindicator=True\n\n)\n\nThe important part:\n\nindicator=True\n\nadds a special column:\n\n_merge\n\n_merge Values\n\nThe _merge column tells where the row came from.\n\nPossible values:\n\nvalue\n\nmeaning\n\nboth\n\nexists in both tables\n\nleft_only\n\nexists only in left\n\nright_only\n\nexists only in right",
        "exampleCode": "genres_tracks = genres.merge("
      },
      {
        "title": "13. Step 2 — Get Unmatched Rows",
        "body": "`gid_list = genres_tracks.loc[`\n\ngenres_tracks[\"_merge\"] == \"left_only\",\n\n\"gid\"\n\n]\n\nThis extracts gids that were NOT matched.",
        "exampleCode": "gid_list = genres_tracks.loc["
      },
      {
        "title": "14. Step 3 — Filter Original Table",
        "body": "genres[genres[\"gid\"].isin(gid_list)]\n\nNow you get only genres absent from top_tracks."
      },
      {
        "title": "15. Big Picture",
        "body": "Semi Join"
      },
      {
        "title": "16. KEEP matching rows",
        "body": "Anti Join"
      },
      {
        "title": "17. KEEP non-matching rows",
        "body": "Mental Model\n\nImagine two circles."
      },
      {
        "title": "18. Inner Join",
        "body": "Returns the overlap AND combines columns."
      },
      {
        "title": "19. Semi Join",
        "body": "Returns only the left-side rows that overlap."
      },
      {
        "title": "20. Anti Join",
        "body": "Returns only the left-side rows outside the overlap."
      },
      {
        "title": "21. Quick Comparison",
        "body": "Join Type\n\nPurpose"
      },
      {
        "title": "22. Inner Join",
        "body": "combine matching rows"
      },
      {
        "title": "23. Left Join",
        "body": "keep all left rows"
      },
      {
        "title": "24. Semi Join",
        "body": "keep left rows WITH matches"
      },
      {
        "title": "25. Anti Join",
        "body": "keep left rows WITHOUT matches"
      },
      {
        "title": "26. Important Insight",
        "body": "Filtering joins are mostly used for:\n\nexistence checks\n\nremoving unmatched data\n\nvalidating datasets\n\nfinding missing relationships\n\nThey are very common in data cleaning and analytics."
      }
    ],
    "quickReference": [
      {
        "goal": "Inner join on key",
        "syntax": "pd.merge(df1, df2, on=\"id\", how=\"inner\")"
      },
      {
        "goal": "Left join",
        "syntax": "pd.merge(df1, df2, on=\"id\", how=\"left\")"
      },
      {
        "goal": "Vertical stack",
        "syntax": "pd.concat([df1, df2], ignore_index=True)"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Using Python 'and'/'or' for Series boolean filtering:\ndf[df[\"price\"] > 100 and df[\"region\"] == \"East\"]",
      "correctCode": "# Use bitwise & and | with parentheses around each condition:\ndf[(df[\"price\"] > 100) & (df[\"region\"] == \"East\")]",
      "explanation": "Pandas requires bitwise operators (& and |) with parentheses. Standard Python and/or operators fail because the truth value of a whole Series is ambiguous."
    },
    "challenge": {
      "title": "Enrich Sales with Customer Profiles",
      "scenario": "The analytics team needs customer demographic information attached to every order transaction.",
      "instructions": "1. Read `sales.csv` and `customers.csv`.\n2. Perform an inner merge on `customer_id` using `pd.merge(sales, customers, on=\"customer_id\", how=\"inner\")`.\n3. Assign the merged DataFrame to `enriched_sales`.\n4. Print the top `5` records with `enriched_sales.head(5)`.",
      "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\n\n# Perform inner merge on customer_id\nenriched_sales = None\n\nprint(enriched_sales.head())\n",
      "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\nenriched_sales = pd.merge(sales, customers, on='customer_id', how='inner')\nprint(enriched_sales[['sale_id', 'customer_id', 'first_name', 'sale_amount']].head())\n",
      "validationScript": "assert 'enriched_sales' in locals(), \"Variable 'enriched_sales' must be defined\"\nassert 'first_name' in enriched_sales.columns, \"Merged DataFrame must contain customer first_name\"\n",
      "hints": [
        "Use pd.merge(sales, customers, on='customer_id', how='inner')."
      ],
      "solutionExplanation": "pd.merge combines datasets on shared relational keys, creating enriched dimensional data warehouse models."
    }
  },
  {
    "id": "py-lesson-t-oy2ur03ab174",
    "tabId": "t.oy2ur03ab174",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 54,
    "title": "Concatenating DataFrames Vertically",
    "description": "Up to now, most operations used:  merge()  A merge usually combines tables side-by-side (horizontally).  Example:  id  name  age  id  salary  ↓  id  name  age  ...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Up to now, most operations used:\n\nmerge()\n\nA merge usually combines tables side-by-side (horizontally).\n\nExample:\n\nid\n\nname\n\nage\n\nid\n\nsalary\n\n↓\n\nid\n\nname\n\nage\n\nsalary\n\nThat’s horizontal growth."
      },
      {
        "title": "2. Concatenation is Different",
        "body": "concat() usually stacks tables:\n\ntop-to-bottom (vertically)\n\ninstead of side-by-side.\n\nThink:"
      },
      {
        "title": "3. January data",
        "body": "February data"
      },
      {
        "title": "4. March data",
        "body": "becoming one large table."
      },
      {
        "title": "5. Basic Vertical Concatenation",
        "body": "Suppose:\n\ninv_jan\n\ninv_feb\n\ninv_mar\n\nall have the same columns.\n\nYou combine them with:\n\n`pd.concat([inv_jan, inv_feb, inv_mar])`",
        "exampleCode": "pd.concat([inv_jan, inv_feb, inv_mar])"
      },
      {
        "title": "6. Mental Model",
        "body": "Imagine stacking papers:\n\nJanuary\n\n--------\n\nFebruary\n\n--------\n\nMarch\n\nThat’s vertical concatenation.\n\nExample\n\nJanuary\n\ncustomer\n\namount\n\nAlice\n\n10\n\nFebruary\n\ncustomer\n\namount\n\nBob\n\n20\n\nResult\n\ncustomer\n\namount\n\nAlice\n\n10\n\nBob\n\n20"
      },
      {
        "title": "7. The Index Problem",
        "body": "By default:\n\nconcat()\n\nkeeps original indexes.\n\nSo if each table starts at index 0:\n\n0\n\n1\n\n0\n\n1\n\n0\n\n1\n\nyou get duplicate indexes."
      },
      {
        "title": "8. Resetting the Index",
        "body": "Use:\n\n`pd.concat([...], ignore_index=True)`\n\nNow pandas creates a fresh index:\n\n0\n\n1\n\n2\n\n3\n\n4\n\n5",
        "exampleCode": "pd.concat([...], ignore_index=True)"
      },
      {
        "title": "9. Important Idea",
        "body": "merge()\n\nconnects related data using keys.\n\nconcat()\n\nsimply stacks data.\n\nNo matching keys required."
      },
      {
        "title": "10. Using keys",
        "body": "You can label where each row came from.\n\n`pd.concat(`\n\n[inv_jan, inv_feb, inv_mar],\n\nkeys=[\"jan\", \"feb\", \"mar\"]\n\n)\n\nThis creates a MultiIndex.",
        "exampleCode": "pd.concat("
      },
      {
        "title": "11. Result Conceptually",
        "body": "month\n\nindex\n\ncustomer\n\njan\n\n0\n\nAlice\n\nfeb\n\n0\n\nBob\n\nNow you know the source table."
      },
      {
        "title": "12. Important Rule",
        "body": "You cannot use:\n\nkeys=\n\ntogether with:\n\nignore_index=True\n\nbecause keys depend on the original index structure."
      },
      {
        "title": "13. Different Column Names",
        "body": "Suppose February has an extra column:\n\ncustomer\n\namount\n\ncountry\n\nwhile January does not.\n\nDefault Behavior (outer join)\n\n`pd.concat([inv_jan, inv_feb])`\n\npandas keeps ALL columns.\n\nMissing values become NaN.\n\nResult\n\ncustomer\n\namount\n\ncountry\n\nAlice\n\n10\n\nNaN\n\nBob\n\n20\n\nUSA\n\nWhy?\n\nBecause concat defaults to:\n\njoin=\"outer\"\n\nMeaning:\n\nkeep every column from every table.",
        "exampleCode": "pd.concat([inv_jan, inv_feb])"
      },
      {
        "title": "14. Keeping Only Shared Columns",
        "body": "Use:\n\n`pd.concat([inv_jan, inv_feb], join=\"inner\")`\n\nNow only common columns remain.\n\nResult\n\ncustomer\n\namount\n\nAlice\n\n10\n\nBob\n\n20\n\nThe country column disappears.\n\nsort=True\n\nWhen tables have different columns:\n\nsort=True\n\nalphabetically sorts columns.\n\nUsually not very important, but useful for organization.",
        "exampleCode": "pd.concat([inv_jan, inv_feb], join=\"inner\")"
      },
      {
        "title": "15. Big Picture",
        "body": "merge()\n\nUsed when:\n\ntables are related\n\nmatching keys exist\n\ncombining columns\n\nExample:\n\ncustomer_id\n\nmovie_id\n\nward\n\nconcat()\n\nUsed when:\n\ntables have same structure\n\ndifferent time periods\n\nappend more rows\n\nExample:"
      },
      {
        "title": "16. January sales",
        "body": "February sales"
      },
      {
        "title": "17. March sales",
        "body": "Quick Comparison\n\nOperation\n\nDirection\n\nPurpose\n\nmerge()\n\nhorizontal\n\ncombine related columns\n\nconcat()\n\nvertical\n\nstack rows"
      },
      {
        "title": "18. Very Important Intuition",
        "body": "concat() is basically:\n\n“Take these separate DataFrames and glue them together.”\n\nwhile merge() is:\n\n“Match rows based on relationships.”"
      }
    ],
    "quickReference": [
      {
        "goal": "Inner join on key",
        "syntax": "pd.merge(df1, df2, on=\"id\", how=\"inner\")"
      },
      {
        "goal": "Left join",
        "syntax": "pd.merge(df1, df2, on=\"id\", how=\"left\")"
      },
      {
        "goal": "Vertical stack",
        "syntax": "pd.concat([df1, df2], ignore_index=True)"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Concatenating DataFrames Vertically",
      "scenario": "Apply the concepts learned in Concatenating DataFrames Vertically to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Concatenating DataFrames Vertically.",
      "starterCode": "# Practice Challenge: Concatenating DataFrames Vertically\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-3gy0xrn5ya83",
    "tabId": "t.3gy0xrn5ya83",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 55,
    "title": "Verifying Integrity",
    "description": "When working with data, it is important to verify that the structure of the data is correct before performing analysis. The merge() and concat() methods in pand...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "When working with data, it is important to verify that the structure of the data is correct before performing analysis. The merge() and concat() methods in pandas both have built-in features that help check data integrity. These features help detect problems such as unexpected duplicate rows or incorrect table relationships.\n\nWhen merging tables, we may expect the relationship between two tables to be:\n\none-to-one\n\none-to-many\n\nmany-to-one\n\nmany-to-many\n\nHowever, duplicated values in the merge columns can accidentally change the relationship type. Similarly, when concatenating tables vertically, duplicate records may appear if the same row exists in multiple tables. To help prevent these issues, pandas provides:\n\nvalidate for merge()\n\nverify_integrity for concat()"
      },
      {
        "title": "2. Validating Merges",
        "body": "The validate argument in merge() checks whether the relationship between two tables matches what we expect. If the relationship is incorrect, pandas raises a MergeError.\n\nExample:\n\ntracks.merge(specs, on=\"tid\", validate=\"one_to_one\")\n\nIn this example, each track should only have one specification record, so the relationship should be one-to-one. However, if the specs table contains duplicate tid values, the merge becomes one-to-many instead. pandas detects this and raises an error.\n\nThe error helps identify problems before continuing the analysis.\n\nCommon validation options include:\n\n\"one_to_one\"\n\n\"one_to_many\"\n\n\"many_to_one\"\n\n\"many_to_many\"\n\nExample of a valid one-to-many merge:\n\nalbums.merge(tracks, on=\"album_id\", validate=\"one_to_many\")\n\nThis works because one album can contain multiple tracks."
      },
      {
        "title": "3. Verifying Concatenations",
        "body": "The concat() method has a parameter called verify_integrity.\n\nBy default:\n\nverify_integrity=False\n\nIf set to True, pandas checks whether duplicate index values exist after concatenation.\n\nExample:\n\n`pd.concat([inv_feb, inv_mar], verify_integrity=True)`\n\nIf both tables contain the same index value, pandas raises a ValueError.\n\nFor example, if invoice ID 9 exists in both February and March tables, concatenation with integrity checking enabled will fail because the indexes overlap.\n\nIf verify_integrity=False, pandas allows the duplicate indexes and concatenates the tables normally.",
        "exampleCode": "pd.concat([inv_feb, inv_mar], verify_integrity=True)"
      },
      {
        "title": "4. Why Verifying Integrity Matters",
        "body": "Real-world data is often messy and may not always follow the structure we expect. Duplicate rows or incorrect relationships can lead to:\n\nincorrect calculations\n\nmisleading averages\n\ninaccurate visualizations\n\nduplicated records\n\nUsing validate and verify_integrity helps catch these issues early.\n\nIf pandas raises a:\n\nMergeError\n\nValueError\n\nthe data should usually be cleaned or corrected before continuing. Duplicate rows may need to be removed or fixed to ensure accurate analysis."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Verifying Integrity",
      "scenario": "Apply the concepts learned in Verifying Integrity to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Verifying Integrity.",
      "starterCode": "# Practice Challenge: Verifying Integrity\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-19sno97rbqng",
    "tabId": "t.19sno97rbqng",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 56,
    "title": "Using merge_ordered()",
    "description": "merge_ordered() is a pandas function used for merging ordered or time-series data. It works similarly to a regular merge(), but the results are automatically so...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "merge_ordered() is a pandas function used for merging ordered or time-series data. It works similarly to a regular merge(), but the results are automatically sorted, making it especially useful when working with dates, financial data, or any data that follows a sequence.\n\nUnlike the normal merge() method which defaults to an \"inner\" join, merge_ordered() defaults to an \"outer\" join. This means all rows from both tables are kept, even if there is no match."
      },
      {
        "title": "2. Basic Syntax",
        "body": "`pd.merge_ordered(left_table, right_table, on=\"column_name\")`\n\nThe method is called from pandas directly using pd.merge_ordered() instead of using .merge() on a DataFrame.",
        "exampleCode": "pd.merge_ordered(left_table, right_table, on=\"column_name\")"
      },
      {
        "title": "3. Example: Merging Stock Data",
        "body": "Suppose we have two stock price tables:"
      },
      {
        "title": "4. Apple stock prices from February to June 2007",
        "body": "McDonald's stock prices from January to May 2007\n\nWe can merge them using the date column.\n\n`stocks = pd.merge_ordered(`\n\napple,\n\nmcd,\n\non=\"date\",\n\nsuffixes=(\"_apple\", \"_mcd\")\n\n)\n\nThe result will contain all dates from both tables in sorted order.\n\nIf a company has no stock value for a certain date, the value becomes NaN.\n\nExample:\n\nApple has no value for January\n\nMcDonald's has no value for June\n\nComparison with merge()\n\nmerge_ordered() and merge() share many similarities:\n\nBoth can merge on one or multiple columns",
        "exampleCode": "stocks = pd.merge_ordered("
      },
      {
        "title": "5. Both support different join types",
        "body": "Both support suffixes for duplicate column names\n\nHowever, there are important differences:\n\nFeature\n\nmerge()\n\nmerge_ordered()"
      },
      {
        "title": "6. Default Join",
        "body": "Inner Join"
      },
      {
        "title": "7. Outer Join",
        "body": "Result Sorting"
      },
      {
        "title": "8. Not guaranteed",
        "body": "Automatically sorted"
      },
      {
        "title": "9. Best For",
        "body": "General merging"
      },
      {
        "title": "10. Ordered/time-series data",
        "body": "Forward Filling (ffill)\n\nWhen merging ordered data, missing values are common. merge_ordered() supports forward filling using the fill_method argument.\n\nForward filling copies the previous available value into missing rows.\n\nExample:\n\n`stocks = pd.merge_ordered(`\n\napple,\n\nmcd,\n\non=\"date\",\n\nfill_method=\"ffill\",\n\nsuffixes=(\"_apple\", \"_mcd\")\n\n)\n\nIf McDonald's has no value for June, pandas fills it using the previous month's value.\n\nHowever, the very first missing value cannot be filled because there is no previous value available.\n\nWhy Use merge_ordered()?\n\nmerge_ordered() is useful when:",
        "exampleCode": "stocks = pd.merge_ordered("
      },
      {
        "title": "11. Working with time-series data",
        "body": "Handling ordered datasets"
      },
      {
        "title": "12. Combining financial or stock market data",
        "body": "You need automatically sorted results"
      },
      {
        "title": "13. You want to forward fill missing values",
        "body": "It is especially helpful because many machine learning and analysis tasks require complete datasets without missing values."
      }
    ],
    "quickReference": [
      {
        "goal": "Inner join on key",
        "syntax": "pd.merge(df1, df2, on=\"id\", how=\"inner\")"
      },
      {
        "goal": "Left join",
        "syntax": "pd.merge(df1, df2, on=\"id\", how=\"left\")"
      },
      {
        "goal": "Vertical stack",
        "syntax": "pd.concat([df1, df2], ignore_index=True)"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Merging with mismatched key data types (string vs int):\npd.merge(df1, df2, on=\"customer_id\")  # Empty result or TypeError!",
      "correctCode": "# Cast keys to matching data types before merging:\ndf1[\"customer_id\"] = df1[\"customer_id\"].astype(int)\ndf2[\"customer_id\"] = df2[\"customer_id\"].astype(int)\npd.merge(df1, df2, on=\"customer_id\")",
      "explanation": "Pandas strictly requires merge key columns to share the exact same data type. If one column is string and another is integer, the join matches zero records."
    },
    "challenge": {
      "title": "Enrich Sales with Customer Profiles",
      "scenario": "The analytics team needs customer demographic information attached to every order transaction.",
      "instructions": "1. Read `sales.csv` and `customers.csv`.\n2. Perform an inner merge on `customer_id` using `pd.merge(sales, customers, on=\"customer_id\", how=\"inner\")`.\n3. Assign the merged DataFrame to `enriched_sales`.\n4. Print the top `5` records with `enriched_sales.head(5)`.",
      "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\n\n# Perform inner merge on customer_id\nenriched_sales = None\n\nprint(enriched_sales.head())\n",
      "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\nenriched_sales = pd.merge(sales, customers, on='customer_id', how='inner')\nprint(enriched_sales[['sale_id', 'customer_id', 'first_name', 'sale_amount']].head())\n",
      "validationScript": "assert 'enriched_sales' in locals(), \"Variable 'enriched_sales' must be defined\"\nassert 'first_name' in enriched_sales.columns, \"Merged DataFrame must contain customer first_name\"\n",
      "hints": [
        "Use pd.merge(sales, customers, on='customer_id', how='inner')."
      ],
      "solutionExplanation": "pd.merge combines datasets on shared relational keys, creating enriched dimensional data warehouse models."
    }
  },
  {
    "id": "py-lesson-t-wjxh1vtk9fq3",
    "tabId": "t.wjxh1vtk9fq3",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 57,
    "title": "Using merge_asof()",
    "description": "merge_asof() is another pandas method used for working with ordered or time-series data. It behaves similarly to a left join, but instead of matching exact valu...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "merge_asof() is another pandas method used for working with ordered or time-series data. It behaves similarly to a left join, but instead of matching exact values, it matches the nearest value.\n\nThis method is especially useful when timestamps or ordered values between two tables do not perfectly align.\n\nOne important requirement is that the columns used for merging must already be sorted.\n\nHow merge_asof() Works\n\nUnlike a normal merge where values must be equal, merge_asof() looks for the closest matching value.\n\nBy default, it selects:\n\nthe last row in the right table whose key value is less than or equal to the left table’s value.\n\nThis default behavior is called \"backward\" matching.\n\nFor example:"
      },
      {
        "title": "2. Left Value",
        "body": "Right Match\n\n5\n\n3\n\nThe value 3 is chosen because it is the closest value that is still less than or equal to 5."
      },
      {
        "title": "3. Basic Syntax",
        "body": "`pd.merge_asof(`\n\nleft_table,\n\nright_table,\n\non=\"column_name\"\n\n)\n\nThe method is called directly from pandas using pd.merge_asof().",
        "exampleCode": "pd.merge_asof("
      },
      {
        "title": "4. Example: Stock Price Data",
        "body": "Suppose we have:"
      },
      {
        "title": "5. Visa stock prices recorded every hour",
        "body": "IBM stock prices recorded every 5 minutes\n\nThe timestamps do not perfectly match, so a normal merge would fail to align many rows properly.\n\n`stocks = pd.merge_asof(`\n\nvisa,\n\nibm,\n\non=\"date_time\",\n\nsuffixes=(\"_visa\", \"_ibm\")\n\n)\n\nThe result keeps all rows from the Visa table and finds the closest matching IBM timestamp that is less than or equal to each Visa timestamp.",
        "exampleCode": "stocks = pd.merge_asof("
      },
      {
        "title": "6. The direction Argument",
        "body": "The direction argument controls how pandas searches for matches.\n\n1. \"backward\" (default)\n\nSelects the closest value from the right table that is:\n\nless than or equal to the left value.\n\n`pd.merge_asof(`\n\nvisa,\n\nibm,\n\non=\"date_time\",\n\ndirection=\"backward\"\n\n)",
        "exampleCode": "pd.merge_asof("
      },
      {
        "title": "7. 2. \"forward\"",
        "body": "Selects the first value from the right table that is:\n\ngreater than or equal to the left value.\n\n`pd.merge_asof(`\n\nvisa,\n\nibm,\n\non=\"date_time\",\n\ndirection=\"forward\"\n\n)\n\nThis changes the matching behavior to future values instead of past values.",
        "exampleCode": "pd.merge_asof("
      },
      {
        "title": "8. 3. \"nearest\"",
        "body": "Selects the absolutely closest value regardless of whether it is before or after.\n\n`pd.merge_asof(`\n\nvisa,\n\nibm,\n\non=\"date_time\",\n\ndirection=\"nearest\"\n\n)\n\nWhen to Use merge_asof()\n\nmerge_asof() is useful when:",
        "exampleCode": "pd.merge_asof("
      },
      {
        "title": "9. Working with time-series data",
        "body": "Timestamps do not perfectly align\n\nData is sampled at different intervals\n\nMatching nearest observations is more useful than exact matches"
      },
      {
        "title": "10. Building time-series training datasets",
        "body": "Avoiding future data leakage in machine learning\n\nIt is commonly used in:\n\nfinancial datasets\n\nstock market analysis\n\nsensor data\n\nevent tracking systems\n\nreal-time monitoring systems"
      }
    ],
    "quickReference": [
      {
        "goal": "Inner join on key",
        "syntax": "pd.merge(df1, df2, on=\"id\", how=\"inner\")"
      },
      {
        "goal": "Left join",
        "syntax": "pd.merge(df1, df2, on=\"id\", how=\"left\")"
      },
      {
        "goal": "Vertical stack",
        "syntax": "pd.concat([df1, df2], ignore_index=True)"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Merging with mismatched key data types (string vs int):\npd.merge(df1, df2, on=\"customer_id\")  # Empty result or TypeError!",
      "correctCode": "# Cast keys to matching data types before merging:\ndf1[\"customer_id\"] = df1[\"customer_id\"].astype(int)\ndf2[\"customer_id\"] = df2[\"customer_id\"].astype(int)\npd.merge(df1, df2, on=\"customer_id\")",
      "explanation": "Pandas strictly requires merge key columns to share the exact same data type. If one column is string and another is integer, the join matches zero records."
    },
    "challenge": {
      "title": "Enrich Sales with Customer Profiles",
      "scenario": "The analytics team needs customer demographic information attached to every order transaction.",
      "instructions": "1. Read `sales.csv` and `customers.csv`.\n2. Perform an inner merge on `customer_id` using `pd.merge(sales, customers, on=\"customer_id\", how=\"inner\")`.\n3. Assign the merged DataFrame to `enriched_sales`.\n4. Print the top `5` records with `enriched_sales.head(5)`.",
      "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\n\n# Perform inner merge on customer_id\nenriched_sales = None\n\nprint(enriched_sales.head())\n",
      "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\nenriched_sales = pd.merge(sales, customers, on='customer_id', how='inner')\nprint(enriched_sales[['sale_id', 'customer_id', 'first_name', 'sale_amount']].head())\n",
      "validationScript": "assert 'enriched_sales' in locals(), \"Variable 'enriched_sales' must be defined\"\nassert 'first_name' in enriched_sales.columns, \"Merged DataFrame must contain customer first_name\"\n",
      "hints": [
        "Use pd.merge(sales, customers, on='customer_id', how='inner')."
      ],
      "solutionExplanation": "pd.merge combines datasets on shared relational keys, creating enriched dimensional data warehouse models."
    }
  },
  {
    "id": "py-lesson-t-7s5hjwleq240",
    "tabId": "t.7s5hjwleq240",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 58,
    "title": "Selecting Data with",
    "description": "Selecting Data with .query()  The .query() method in pandas is used to filter rows from a DataFrame using a string expression. It provides a cleaner and more re...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Selecting Data with .query()\n\nThe .query() method in pandas is used to filter rows from a DataFrame using a string expression. It provides a cleaner and more readable way to subset data compared to long Boolean indexing statements.\n\nThe syntax is similar to the WHERE clause in SQL, but prior SQL knowledge is not required."
      },
      {
        "title": "2. Basic Syntax",
        "body": "dataframe.query(\"condition\")\n\nThe condition is written as a string."
      },
      {
        "title": "3. Querying with a Single Condition",
        "body": "Suppose we have a DataFrame called stocks containing stock prices for companies like Nike and Disney.\n\nIf we want to select rows where Nike stock prices are greater than or equal to 90:\n\nstocks.query(\"nike >= 90\")\n\nThis returns all rows where the value in the nike column is at least 90."
      },
      {
        "title": "4. Querying with Multiple Conditions",
        "body": "You can combine conditions using:\n\nand\n\nor"
      },
      {
        "title": "5. Using and",
        "body": "To select rows where:\n\nNike is greater than 90\n\nAND Disney is less than 140\n\nstocks.query(\"nike > 90 and disney < 140\")\n\nBoth conditions must be true."
      },
      {
        "title": "6. Using or",
        "body": "To select rows where:\n\nNike is greater than 96\n\nOR Disney is less than 98\n\nstocks.query(\"nike > 96 or disney < 98\")\n\nAt least one condition must be true."
      },
      {
        "title": "7. Querying Text Values",
        "body": "The .query() method can also filter rows based on text/string values.\n\nExample:\n\nstocks.query('stock == \"nike\"')\n\nImportant notes:\n\nUse == when comparing values\n\nText values should be inside quotation marks\n\nIf the outer query string uses single quotes, the inner text usually uses double quotes"
      },
      {
        "title": "8. Combining Text and Numeric Conditions",
        "body": "Suppose we want:\n\nall Disney rows\n\nOR Nike rows where close price is below 90\n\nstocks.query('stock == \"disney\" or (stock == \"nike\" and close < 90)')\n\nThe parentheses help group conditions properly.\n\nThis query returns:\n\nevery row where stock is Disney\n\nplus Nike rows with close prices below 90\n\nWhy Use .query()?\n\n.query() is useful because it:\n\nmakes filtering code cleaner\n\nimproves readability\n\nworks well with multiple conditions\n\nis convenient for selecting rows using column names directly\n\nIt is especially helpful when filtering large DataFrames with many conditions."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Selecting Data with",
      "scenario": "Apply the concepts learned in Selecting Data with to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Selecting Data with.",
      "starterCode": "# Practice Challenge: Selecting Data with\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-l9201ou4l8de",
    "tabId": "t.l9201ou4l8de",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 59,
    "title": "Reshaping Data with",
    "description": "Reshaping Data with .melt()  The .melt() method in pandas is used to reshape data from wide format into long format. This process is also called unpivoting.  Lo...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Reshaping Data with .melt()\n\nThe .melt() method in pandas is used to reshape data from wide format into long format. This process is also called unpivoting.\n\nLong format is often easier for computers, data analysis tools, and visualization libraries to work with, while wide format is usually easier for humans to read."
      },
      {
        "title": "2. Wide vs Long Format",
        "body": "Wide Format\n\nIn wide format:\n\none row usually represents one subject\n\nmultiple columns store different attributes\n\nExample:\n\ncompany\n\n2018\n\n2019\n\nFacebook\n\n55\n\n70\n\nTwitter\n\n12\n\n14\n\nThe years are spread horizontally across columns."
      },
      {
        "title": "3. Long Format",
        "body": "In long format:\n\ninformation is spread vertically across rows\n\neach row represents one observation\n\nExample:\n\ncompany\n\nyear\n\nvalue\n\nFacebook\n\n2018\n\n55\n\nFacebook\n\n2019\n\n70\n\nTwitter\n\n2018\n\n12\n\nThis format is usually more computer-friendly.\n\nBasic .melt() Syntax\n\ndataframe.melt(id_vars=[\"column_name\"])\n\nThe id_vars argument specifies the columns that should remain unchanged.\n\nExample of .melt()\n\nSuppose we have a DataFrame called social_fin:\n\ncompany\n\n2016\n\n2017\n\n2018\n\nFacebook\n\n27\n\n40\n\n55\n\nTwitter\n\n2\n\n3\n\n4\n\nWe can convert the years into rows:\n\nsocial_fin.melt(id_vars=[\"company\"])\n\nResult:\n\ncompany\n\nvariable\n\nvalue\n\nFacebook\n\n2016\n\n27\n\nFacebook\n\n2017\n\n40\n\nFacebook\n\n2018\n\n55\n\nThe year columns are unpivoted into a single column called variable, while the numbers are placed into a column called value."
      },
      {
        "title": "4. Using value_vars",
        "body": "The value_vars argument lets you choose which columns to unpivot.\n\nExample:\n\nsocial_fin.melt(\n\nid_vars=[\"company\"],\n\nvalue_vars=[\"2018\", \"2017\"]\n\n)\n\nOnly the selected columns are melted.\n\nThe order in value_vars is preserved in the output."
      },
      {
        "title": "5. Renaming Output Columns",
        "body": "By default:\n\nthe melted column names become variable\n\nthe values become value\n\nYou can rename them using:\n\nvar_name\n\nvalue_name\n\nExample:\n\nsocial_fin.melt(\n\nid_vars=[\"company\"],\n\nvalue_vars=[\"2018\", \"2017\"],\n\nvar_name=\"year\",\n\nvalue_name=\"dollars\"\n\n)\n\nResult:\n\ncompany\n\nyear\n\ndollars\n\nFacebook\n\n2018\n\n55\n\nFacebook\n\n2017\n\n40\n\nThis makes the output cleaner and easier to understand.\n\nImportant Arguments in .melt()\n\nid_vars\n\ncolumns to keep unchanged\n\nvalue_vars\n\ncolumns to unpivot\n\nvar_name\n\nnew name for the variable column\n\nvalue_name\n\nnew name for the values column\n\nWhy Use .melt()?\n\n.melt() is useful when:\n\nconverting wide data into long format\n\npreparing data for visualization\n\npreparing datasets for machine learning\n\nsimplifying grouped analysis\n\ncleaning merged datasets with many columns\n\nIt is especially common in:\n\ntime-series analysis\n\nfinancial datasets\n\nsurvey data\n\nstatistical analysis\n\nplotting libraries like matplotlib or seaborn"
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Reshaping Data with",
      "scenario": "Apply the concepts learned in Reshaping Data with to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Reshaping Data with.",
      "starterCode": "# Practice Challenge: Reshaping Data with\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  },
  {
    "id": "py-lesson-t-yrwrwtk5o1u9",
    "tabId": "t.yrwrwtk5o1u9",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 60,
    "title": "Course Wrap-up",
    "description": "Congratulations! You have completed the course on combining and reshaping data with pandas. Throughout the lessons, you learned many important techniques used i...",
    "sections": [
      {
        "title": "1. Concept Overview",
        "body": "Congratulations! You have completed the course on combining and reshaping data with pandas. Throughout the lessons, you learned many important techniques used in real-world data analysis and data science workflows."
      },
      {
        "title": "2. Chapter 1 – Data Merging Basics",
        "body": "The course started with the fundamentals of combining tables using the merge() method.\n\nYou learned:\n\nhow to perform an inner join\n\nhow tables relate to one another\n\none-to-one and one-to-many relationships\n\nhow to merge multiple tables together\n\nThese concepts form the foundation of working with relational data in pandas."
      },
      {
        "title": "3. Chapter 2 – Different Join Types",
        "body": "In the second chapter, you explored several types of joins beyond the default inner join.\n\nYou learned:\n\nleft joins\n\nright joins\n\nouter joins\n\nself joins (merging a table with itself)\n\nmerging using indexes and multi-indexes\n\nThese techniques are useful when working with more complex datasets and relationships."
      },
      {
        "title": "4. Chapter 3 – Advanced Merging and Concatenation",
        "body": "The third chapter focused on more advanced data combination techniques.\n\nYou learned about:\n\nsemi joins\n\nanti joins\n\nvertical concatenation using concat()\n\nverifying data integrity\n\nYou also learned why validating merges and checking duplicate indexes is important to avoid inaccurate analysis.\n\nImportant methods and arguments included:\n\nvalidate\n\nverify_integrity\n\nconcat()\n\nfiltering joins using isin()"
      },
      {
        "title": "5. Chapter 4 – Ordered and Time-Series Data",
        "body": "In the final chapter, you worked with ordered and time-series datasets.\n\nYou learned how to use:\n\nmerge_ordered()\n\nmerge_asof()\n\nThese methods are especially useful for:\n\nfinancial data\n\nstock prices\n\ntimestamped datasets\n\nordered observations\n\nYou also learned how to reshape data using .melt() to convert wide-format tables into long-format tables, making them easier for analysis and visualization."
      },
      {
        "title": "6. Key Skills Learned",
        "body": "By the end of the course, you can now:\n\nmerge tables in multiple ways\n\ncombine datasets vertically\n\nvalidate relationships between tables\n\nwork with time-series merges\n\nreshape datasets for analysis\n\nfilter data efficiently\n\nprepare cleaner datasets for machine learning and visualization\n\nThese are essential pandas skills used in:\n\ndata science\n\nanalytics\n\nmachine learning\n\nbusiness intelligence\n\nfinancial analysis"
      },
      {
        "title": "7. Final Note",
        "body": "This course covered many core pandas techniques for combining and reshaping data. Mastering these topics gives you a strong foundation for handling real-world datasets and more advanced data analysis tasks later on."
      }
    ],
    "quickReference": [
      {
        "goal": "Inspect first 5 rows",
        "syntax": "df.head(5)"
      },
      {
        "goal": "Inspect column metadata",
        "syntax": "df.info()"
      },
      {
        "goal": "Summary statistics",
        "syntax": "df.describe()"
      },
      {
        "goal": "Check dimensions",
        "syntax": "df.shape"
      }
    ],
    "commonMistake": {
      "wrongCode": "# Forgetting to reassign DataFrame operations:\ndf.drop_duplicates()  # df is still unchanged!",
      "correctCode": "# Assign result back or pass inplace=True:\ndf = df.drop_duplicates()",
      "explanation": "Most pandas transformations return a new DataFrame rather than modifying in-place. Always assign the returned object back to the variable."
    },
    "challenge": {
      "title": "Practice Drill: Course Wrap-up",
      "scenario": "Apply the concepts learned in Course Wrap-up to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Course Wrap-up.",
      "starterCode": "# Practice Challenge: Course Wrap-up\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
      "expectedCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(df.describe())\n",
      "validationScript": "assert 'df' in locals(), \"DataFrame df must be loaded\"\n",
      "hints": [
        "Inspect the DataFrame using .head() or .info().",
        "Follow the examples demonstrated in the lesson guide."
      ],
      "solutionExplanation": "Mastering this operation ensures consistent data pipeline quality when manipulating structured data."
    }
  }
];

export const PYTHON_EXERCISES: PythonExercise[] = [
  {
    "id": "py-ex-1-read-csv",
    "order": 1,
    "title": "1. Read a CSV File Using pandas",
    "difficulty": "Beginner",
    "category": "File Handling",
    "context": "Data engineers frequently ingest raw CSV files deposited into cloud storage buckets or local staging disks.",
    "goal": "1. Read `sales.csv` into a DataFrame named `df` using `pd.read_csv()`.\n2. Print the first `5` rows with `df.head(5)`.\n3. Inspect total dimensions with `df.shape`.\n4. Print column names using `list(df.columns)`.",
    "csvsUsed": [
      "sales.csv"
    ],
    "starterCode": "import pandas as pd\n\n# Exercise 1: Read 'sales.csv' and inspect structure\ndf = None\n\n# Print head and shape\n",
    "expectedCode": "import pandas as pd\n\ndf = pd.read_csv('sales.csv')\nprint(\"Shape:\", df.shape)\nprint(\"Columns:\", list(df.columns))\nprint(df.head(5))\n",
    "validationScript": "assert 'df' in locals(), \"You must assign the loaded dataset to a variable named 'df'\"\nassert len(df) == 14, \"Expected df to have 14 rows from sales.csv\"\nassert 'sale_amount' in df.columns, \"df must contain 'sale_amount' column\"\n",
    "hints": [
      "Use pd.read_csv('sales.csv') to load the file.",
      "Use df.shape to get the dimensions.",
      "Call df.head(5) to view the first 5 records."
    ],
    "walkthrough": "pd.read_csv() parses flat delimited text into memory, inferring column data types automatically."
  },
  {
    "id": "py-ex-2-remove-duplicates",
    "order": 2,
    "title": "2. Find and Remove Duplicate Records",
    "difficulty": "Beginner",
    "category": "Data Cleaning",
    "context": "Upstream CRM webhooks accidentally double-fire, creating duplicate customer records with identical names and emails.",
    "goal": "1. Read `customers.csv` into `customers`.\n2. Count duplicate records across `['first_name', 'last_name', 'email']` with `.duplicated().sum()` into `dup_count`.\n3. Drop duplicate records using `customers.drop_duplicates()` into `cleaned_customers`.\n4. Print `dup_count` and final customer count.",
    "csvsUsed": [
      "customers.csv"
    ],
    "starterCode": "import pandas as pd\n\ncustomers = pd.read_csv('customers.csv')\n\n# Step 1: Count duplicates\ndup_count = None\n\n# Step 2: Drop duplicates and assign to cleaned_customers\ncleaned_customers = None\n\nprint(f\"Duplicates removed: {dup_count}\")\nprint(f\"Final customer count: {len(cleaned_customers) if cleaned_customers is not None else 0}\")\n",
    "expectedCode": "import pandas as pd\n\ncustomers = pd.read_csv('customers.csv')\ndup_count = customers.duplicated(subset=['first_name', 'last_name', 'email']).sum()\ncleaned_customers = customers.drop_duplicates(subset=['first_name', 'last_name', 'email'], keep='first')\nprint(f\"Duplicates removed: {dup_count}\")\nprint(f\"Final customer count: {len(cleaned_customers)}\")\n",
    "validationScript": "assert 'cleaned_customers' in locals(), \"Variable 'cleaned_customers' must be created\"\nassert len(cleaned_customers) < len(customers), \"cleaned_customers should have fewer rows than the raw dataset\"\n",
    "hints": [
      "Use customers.duplicated().sum() to count duplicate entries.",
      "Use customers.drop_duplicates() to eliminate repeated rows.",
      "Assign the clean result to cleaned_customers."
    ],
    "walkthrough": "drop_duplicates() detects matching keys across specified columns and preserves only the first occurrence."
  },
  {
    "id": "py-ex-3-replace-missing-values",
    "order": 3,
    "title": "3. Replace Missing Values in Columns",
    "difficulty": "Beginner",
    "category": "Data Cleaning",
    "context": "Missing data causes arithmetic failures and incorrect downstream report generation. Identify and impute missing values.",
    "goal": "1. Read `customers.csv`.\n2. Count missing values in the `email` column using `.isna().sum()` into `missing_count`.\n3. Impute missing emails with `'unspecified@customer.internal'` using `.fillna()`.\n4. Assign to `filled_customers` and verify no nulls remain.",
    "csvsUsed": [
      "customers.csv"
    ],
    "starterCode": "import pandas as pd\n\ncustomers = pd.read_csv('customers.csv')\n\n# Count missing emails\nmissing_count = None\n\n# Impute missing values\nfilled_customers = customers.copy()\n# your code here\n\nprint(\"Missing count:\", missing_count)\nprint(\"Any nulls remaining?\", filled_customers['email'].isna().any())\n",
    "expectedCode": "import pandas as pd\n\ncustomers = pd.read_csv('customers.csv')\nmissing_count = customers['email'].isna().sum()\nfilled_customers = customers.copy()\nfilled_customers['email'] = filled_customers['email'].fillna('unspecified@customer.internal')\nprint(\"Missing count:\", missing_count)\nprint(\"Any nulls remaining?\", filled_customers['email'].isna().any())\n",
    "validationScript": "assert 'filled_customers' in locals(), \"Variable 'filled_customers' must be defined\"\nassert filled_customers['email'].isna().sum() == 0, \"No null values should remain in 'email' column\"\n",
    "hints": [
      "Count missing values with customers['email'].isna().sum().",
      "Fill missing values using filled_customers['email'].fillna('unspecified@customer.internal')."
    ],
    "walkthrough": "fillna() safely replaces NaN placeholders without altering existing valid records."
  },
  {
    "id": "py-ex-4-average-sales-per-region",
    "order": 4,
    "title": "4. Calculate Average Sales per Region",
    "difficulty": "Intermediate",
    "category": "Data Transformation",
    "context": "The executive team wants regional performance metrics to guide territory marketing budget allocations.",
    "goal": "1. Read `sales.csv`.\n2. Group by `region` and calculate both average (`mean`) and total (`sum`) `sale_amount`.\n3. Round results to `2` decimal places using `.round(2)`.\n4. Assign to `regional_metrics`.",
    "csvsUsed": [
      "sales.csv"
    ],
    "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\n\n# Group by region and aggregate sale_amount with mean and sum\nregional_metrics = None\n\nprint(regional_metrics)\n",
    "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\nregional_metrics = sales.groupby('region')['sale_amount'].agg(['mean', 'sum']).round(2)\nprint(regional_metrics)\n",
    "validationScript": "assert 'regional_metrics' in locals(), \"Variable 'regional_metrics' must be defined\"\nassert len(regional_metrics) == 4, \"Expected 4 regions\"\nassert 'mean' in regional_metrics.columns, \"Aggregations must include 'mean'\"\nassert 'sum' in regional_metrics.columns, \"Aggregations must include 'sum'\"\n",
    "hints": [
      "Use sales.groupby('region')['sale_amount'].agg(['mean', 'sum']).",
      "Call .round(2) on the resulting grouped dataframe."
    ],
    "walkthrough": "groupby() splits records into buckets, applies aggregate statistical functions, and recombines the results into a compact summary table."
  },
  {
    "id": "py-ex-5-merge-datasets",
    "order": 5,
    "title": "5. Merge Two Datasets Using a Common Column",
    "difficulty": "Intermediate",
    "category": "Data Merging",
    "context": "In data warehousing, transactional purchase orders must be enriched with customer demographic profiles.",
    "goal": "1. Read `sales.csv` and `customers.csv`.\n2. Merge on `customer_id` using an `inner` join with `pd.merge()`.\n3. Store in `sales_with_customers`.\n4. Verify merged DataFrame has customer `first_name` and `city`.",
    "csvsUsed": [
      "sales.csv",
      "customers.csv"
    ],
    "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\n\n# Inner merge sales and customers on customer_id\nsales_with_customers = None\n\nprint(sales_with_customers.head(3))\n",
    "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\nsales_with_customers = pd.merge(sales, customers, on='customer_id', how='inner')\nprint(sales_with_customers.head(3))\n",
    "validationScript": "assert 'sales_with_customers' in locals(), \"Variable 'sales_with_customers' must be created\"\nassert 'first_name' in sales_with_customers.columns, \"Merged dataset must contain 'first_name'\"\nassert len(sales_with_customers) > 0, \"Merged result should contain rows\"\n",
    "hints": [
      "Use pd.merge(sales, customers, on='customer_id', how='inner')."
    ],
    "walkthrough": "pd.merge() matches foreign keys across two DataFrames, producing an enriched relational table."
  },
  {
    "id": "py-ex-6-convert-dates",
    "order": 6,
    "title": "6. Convert Dates into a Consistent Format",
    "difficulty": "Intermediate",
    "category": "Data Validation",
    "context": "Transaction dates exported from legacy systems often arrive as raw strings, preventing time-series math.",
    "goal": "1. Read `sales.csv`.\n2. Convert `sale_date` column to datetime objects with `pd.to_datetime()`.\n3. Extract year and month into `year_month` formatted as `'YYYY-MM'` with `.dt.strftime('%Y-%m')`.\n4. Assign to `sales_dated` and print the top `5` records.",
    "csvsUsed": [
      "sales.csv"
    ],
    "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\nsales_dated = sales.copy()\n\n# Step 1: Convert sale_date to datetime\n# your code here\n\n# Step 2: Create 'year_month' column using dt.strftime('%Y-%m')\n# your code here\n\nprint(sales_dated[['sale_id', 'sale_date', 'year_month']].head(5))\n",
    "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\nsales_dated = sales.copy()\nsales_dated['sale_date'] = pd.to_datetime(sales_dated['sale_date'])\nsales_dated['year_month'] = sales_dated['sale_date'].dt.strftime('%Y-%m')\nprint(sales_dated[['sale_id', 'sale_date', 'year_month']].head(5))\n",
    "validationScript": "assert 'sales_dated' in locals(), \"sales_dated must be defined\"\nassert pd.api.types.is_datetime64_any_dtype(sales_dated['sale_date']), \"sale_date must be converted to datetime\"\nassert 'year_month' in sales_dated.columns, \"sales_dated must have 'year_month' column\"\n",
    "hints": [
      "Use sales_dated['sale_date'] = pd.to_datetime(sales_dated['sale_date']).",
      "Use sales_dated['sale_date'].dt.strftime('%Y-%m') to format."
    ],
    "walkthrough": "pd.to_datetime() parses string timestamps into POSIX datetimes, unlocking accessor methods like .dt.year, .dt.month, and time-based indexing."
  },
  {
    "id": "py-ex-7-export-cleaned-data",
    "order": 7,
    "title": "7. Export Cleaned Data to CSV",
    "difficulty": "Beginner",
    "category": "Automation",
    "context": "After completing data cleansing pipelines, data engineers export artifacts to S3 or downstream consumers without raw index noise.",
    "goal": "1. Filter `sales.csv` for transactions with `sale_amount >= 200` into `high_value`.\n2. Export to `'high_value_sales.csv'` using `.to_csv(index=False)`.\n3. Read the file back into `exported_df` to verify the export.",
    "csvsUsed": [
      "sales.csv"
    ],
    "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\n\n# Step 1: Filter sale_amount >= 200\nhigh_value = None\n\n# Step 2: Export to 'high_value_sales.csv' without index\n# your code here\n\n# Step 3: Read back into exported_df to verify\nexported_df = None\n\nprint(\"Exported rows:\", len(exported_df) if exported_df is not None else 0)\n",
    "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\nhigh_value = sales[sales['sale_amount'] >= 200]\nhigh_value.to_csv('high_value_sales.csv', index=False)\nexported_df = pd.read_csv('high_value_sales.csv')\nprint(\"Exported rows:\", len(exported_df))\n",
    "validationScript": "assert 'exported_df' in locals(), \"Variable 'exported_df' must be defined\"\nassert (exported_df['sale_amount'] >= 200).all(), \"All exported rows must have sale_amount >= 200\"\n",
    "hints": [
      "Filter with sales[sales['sale_amount'] >= 200].",
      "Export with high_value.to_csv('high_value_sales.csv', index=False).",
      "Verify by reading with pd.read_csv('high_value_sales.csv')."
    ],
    "walkthrough": "Always pass index=False to to_csv() unless your DataFrame explicitly relies on an index that needs persistence; this avoids generating redundant 'Unnamed: 0' columns."
  },
  {
    "id": "py-ex-8-generate-summary-report",
    "order": 8,
    "title": "8. Generate an Automated KPI Summary Report",
    "difficulty": "Advanced",
    "category": "Automation",
    "context": "Automated executive dashboards require batch jobs that aggregate multiple data sources into a single structured KPI summary payload.",
    "goal": "Ingest 'sales.csv' and 'employees.csv'. Calculate:\n1. `total_revenue`: sum of `sale_amount` in sales (rounded to 2 decimal places).\n2. `total_orders_count`: total number of sales records.\n3. `avg_order_value`: average sale amount (rounded to 2 decimal places).\n4. `total_payroll`: sum of `salary` in employees.\nStore these 4 metrics in a Python dictionary named `executive_report`. Print `executive_report`.",
    "csvsUsed": [
      "sales.csv",
      "employees.csv"
    ],
    "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\nemployees = pd.read_csv('employees.csv')\n\n# Compute KPIs\nexecutive_report = {\n    'total_revenue': None,\n    'total_orders_count': None,\n    'avg_order_value': None,\n    'total_payroll': None\n}\n\nprint(\"Executive KPI Summary:\")\nprint(executive_report)\n",
    "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\nemployees = pd.read_csv('employees.csv')\n\nexecutive_report = {\n    'total_revenue': round(float(sales['sale_amount'].sum()), 2),\n    'total_orders_count': int(len(sales)),\n    'avg_order_value': round(float(sales['sale_amount'].mean()), 2),\n    'total_payroll': round(float(employees['salary'].sum()), 2)\n}\n\nprint(\"Executive KPI Summary:\")\nprint(executive_report)\n",
    "validationScript": "assert 'executive_report' in locals(), \"Variable 'executive_report' must be defined\"\nassert 'total_revenue' in executive_report, \"Report must include 'total_revenue'\"\nassert 'total_payroll' in executive_report, \"Report must include 'total_payroll'\"\nassert executive_report['total_orders_count'] == 14, \"Expected total_orders_count to be 14\"\n",
    "hints": [
      "Use sales['sale_amount'].sum() for revenue.",
      "Use len(sales) for order count.",
      "Use employees['salary'].sum() for payroll."
    ],
    "walkthrough": "Aggregating KPIs into structured dictionaries enables easy serialization to JSON, webhook payloads, or automated email digests."
  }
];
