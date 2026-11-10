export interface PythonLessonSection {
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
    "description": "Introduction to Python for Data Science  The course is hosted by Hugo, a data scientist and educator at DataCamp. It is designed to teach Python for Data Scienc...",
    "sections": [
      {
        "title": "Introduction to Python for Data Science",
        "body": "Introduction to Python for Data Science\n\nThe course is hosted by Hugo, a data scientist and educator at DataCamp. It is designed to teach Python for Data Science through a combination of video lessons and interactive exercises. You will have access to your own Python session where you can experiment with code, try to solve exercises, and receive instant feedback. This “learning by doing” approach ensures that you build your coding skills gradually and effectively.\n\nAbout Python\n\nPython was created by Guido van Rossum and began as a hobby project that eventually evolved into a widely used general-purpose programming language. There are a few reasons why Python has become so popular:\n\nOpen Source: Python is free to use and share.\n\nPackage Ecosystem: Python allows developers to build and share packages—prewritten code that solves specific problems. Over time, many data science–specific packages have been created."
      },
      {
        "title": "For example, if you want to",
        "body": "Make visualizations of sales data, there’s a package for that.\n\nConnect to a database to analyze sensor measurements, there’s a package for that too.\n\nBecause of its flexibility, Python is often referred to as the Swiss Army knife of programming languages, capable of handling almost any programming task. In this course, you will gradually develop your data science coding skills to harness the power of Python.\n\nExperimenting with Python: IPython Shell\n\nThe course introduces the IPython Shell, an enhanced interactive Python environment. Unlike a standard Python shell, IPython provides additional features that make coding and testing snippets of Python easier.\n\nYou can type Python code and immediately see the result.\n\nFor example, typing 4 + 5 and pressing Enter outputs 9.\n\nIPython is part of the broader Jupyter ecosystem and was created by Fernando Pérez.\n\nUsing the IPython Shell is ideal for experimentation and testing ideas before turning them into structured scripts.\n\nPython Scripts\n\nA Python script is simply a text file with a .py extension that contains a series of Python commands. Scripts allow you to:\n\nOrganize code systematically.\n\nAvoid retyping commands repeatedly—just modify the script and rerun it.\n\nWhen executing scripts, output does not automatically appear unless you use print() statements. For example, wrapping the calculation 4 + 5 in a print() call will display the result in the output pane.\n\nUsing the DataCamp Interface\n\nIn the DataCamp environment, you have two main ways to work with Python:\n\nIPython Shell: Best for experimenting and testing code snippets.\n\nPython Script Editor: Use this to write structured code that will be executed and checked for correctness.\n\nBy combining both, you can explore Python interactively and then formalize your solutions in scripts for submission."
      }
    ],
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
    "description": "Variables and Types in Python  Python allows you to store values in variables, which is essential when performing more complex calculations. A variable is a nam...",
    "sections": [
      {
        "title": "Variables and Types in Python",
        "body": "Variables and Types in Python\n\nPython allows you to store values in variables, which is essential when performing more complex calculations. A variable is a named storage for a value, and Python variables are case-sensitive. Once you define a variable, you can retrieve its value simply by typing its name. For example, if your height is 1.79 meters and your weight is 68.7 kilograms, you can assign these values to variables height and weight using the equals sign. Typing height or weight later will print their respective values.\n\nCalculating BMI\n\nVariables make calculations reproducible. For instance, the Body Mass Index (BMI) can be calculated using the formula:\n\n`BMI=weight (kg)height (m)2\\text{BMI} = \\frac{\\text{weight (kg)}}{\\text{height (m)}^2}BMI=height (m)2weight (kg)​`\n\nYou can either input the numerical values directly or use the variables height and weight. Python will substitute the variable names with their stored values. By storing the result in a new variable, bmi, you create a reusable value. This approach ensures that your code is flexible and reproducible.\n\nReproducibility with Variables\n\nIf your BMI calculation is in a script, you can easily update it for a new weight by simply changing the weight variable and rerunning the script. The bmi will automatically reflect the new calculation. This demonstrates the power of using variables in Python—they make your code dynamic and adaptable without rewriting formulas.\n\nPython Data Types\n\nEvery value in Python has a specific type. You can check a value’s type using the type() function. For example:\n\nbmi is a float, which represents a real number with a fractional part.\n\nWhole numbers are of type int.\n\nIn addition to numbers, Python offers several other data types commonly used in data science:\n\nStrings (str): Represent text and can be enclosed in either single or double quotes.\u000bBooleans (bool): Represent truth values—either True or False—and are useful for conditional operations and data filtering.\n\nBehavior Depends on Type\n\nPython operators can behave differently depending on the type of data. For example:\n\nAdding two integers sums them mathematically.\n\nAdding two strings concatenates them, effectively pasting the text together.\n\nThis principle, known as type-dependent behavior, is fundamental in Python. Understanding and experimenting with data types will help you avoid unexpected results and make your code more robust.\n\nIn the exercises that follow, you will create your first variables and explore Python’s data types interactively, preparing you to work with more complex structures like lists in the next video.",
        "exampleCode": "BMI=weight (kg)height (m)2\\text{BMI} = \\frac{\\text{weight (kg)}}{\\text{height (m)}^2}BMI=height (m)2weight (kg)​"
      }
    ],
    "challenge": {
      "title": "Practice Drill: Variables and Types in Python",
      "scenario": "Apply the concepts learned in Variables and Types in Python to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Variables and Types in Python.",
      "starterCode": "# Practice Challenge: Variables and Types in Python\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
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
    "id": "py-lesson-t-5u8yp8e7fzom",
    "tabId": "t.5u8yp8e7fzom",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 3,
    "title": "Python Lists",
    "description": "Python Lists  After learning about Python’s basic data types—int, float, str, and bool—you’ve seen how individual variables can store single values. However, as...",
    "sections": [
      {
        "title": "Python Lists",
        "body": "Python Lists\n\nAfter learning about Python’s basic data types—int, float, str, and bool—you’ve seen how individual variables can store single values. However, as a data scientist, you will often need to handle many data points. For example, if you want to record the heights of everyone in your family, it would be inconvenient to create a separate variable for each person.\n\nThis is where Python lists come in. A list is a data structure that allows you to store multiple values under a single name. Lists are created using square brackets [ ], and can be assigned to a variable just like other data types. The elements inside a list can be of any type:\n\nNumbers (integers or floats)\n\nStrings (text)\n\nBooleans\n\nEven other lists\n\nFor instance, you could store the heights of your family members in a list called fam. If you want to keep track of both names and heights, you can create sublists for each family member, containing their name and height together. These sublists can then be collected into a larger list, such as fam2. Printing fam2 shows a list of lists, where the main list contains multiple sublists.\n\nLike other Python types, lists have their own behaviors and functionality. They are not just containers—they provide tools to access, subset, and modify elements. Understanding lists is crucial for organizing and manipulating collections of data efficiently."
      }
    ],
    "challenge": {
      "title": "Practice Drill: Python Lists",
      "scenario": "Apply the concepts learned in Python Lists to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Python Lists.",
      "starterCode": "# Practice Challenge: Python Lists\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
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
    "id": "py-lesson-t-46vxscplspgb",
    "tabId": "t.46vxscplspgb",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 4,
    "title": "Subsetting and Slicing Python Lists",
    "description": "Subsetting and Slicing Python Lists  Once you have created a Python list, the next step is learning how to access the information stored in it. Python uses inde...",
    "sections": [
      {
        "title": "Subsetting and Slicing Python Lists",
        "body": "Subsetting and Slicing Python Lists\n\nOnce you have created a Python list, the next step is learning how to access the information stored in it. Python uses indexes to locate elements in a list. Indexing starts at 0, so the first element has index 0, the second has index 1, and so on. For example, in a list fam, the fourth element (Emma’s height, 1.68) can be accessed using fam[3]. Similarly, to select the string \"dad\", which is the seventh element, you would use fam[6].\n\nPython also supports negative indexing, which is useful for accessing elements from the end of a list. The last element has index -1, the second-to-last has -2, and so on. This means that fam[6] and fam[-1] can return the same element when referencing the last item in a list.\n\nBeyond single-element indexing, Python allows slicing, which lets you select a range of elements and return them as a new list. The general syntax is list[start:end], where:\n\nstart is the index where the slice begins (included)\n\nend is the index where the slice stops (not included)\n\nFor example, fam[3:5] returns a list containing the elements at index 3 and 4. The element at index 5 is excluded. If you leave out the starting index, Python assumes you want to start from index 0. If you leave out the ending index, Python includes all elements through the last element in the list. This flexibility makes slicing a powerful tool to extract sublists efficiently without modifying the original list.\n\nOnce you’re comfortable with indexing and slicing, you can combine these techniques to navigate and manipulate lists for more advanced data operations in Python."
      }
    ],
    "challenge": {
      "title": "Practice Drill: Subsetting and Slicing Python Lists",
      "scenario": "Apply the concepts learned in Subsetting and Slicing Python Lists to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Subsetting and Slicing Python Lists.",
      "starterCode": "# Practice Challenge: Subsetting and Slicing Python Lists\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
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
    "id": "py-lesson-t-e8b4sj7oaf2z",
    "tabId": "t.e8b4sj7oaf2z",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 5,
    "title": "Manipulating Python Lists",
    "description": "Manipulating Python Lists  After learning how to create and subset lists, the next step is list manipulation, which includes changing elements, adding new eleme...",
    "sections": [
      {
        "title": "Manipulating Python Lists",
        "body": "Manipulating Python Lists\n\nAfter learning how to create and subset lists, the next step is list manipulation, which includes changing elements, adding new elements, and removing elements from a list.\n\nChanging List Elements\n\nUpdating an element in a list is straightforward. You use the index in square brackets to select the element, then assign a new value with the equals sign. For example, if your dad’s height in a list fam is outdated at 1.89 meters and should be 1.86, you can simply assign the new value to the correct index. You can also change multiple elements at once by using slices. For instance, to update the first two elements in a list, select the slice 0:2 and assign a new list to it.\n\nAdding and Removing Elements"
      },
      {
        "title": "Python makes it easy to expand or reduce lists",
        "body": "Adding elements: Use the plus operator + to combine lists. For example, you can add your own name and height to the fam list and store the result in a new variable, e.g., fam_ext.\n\nRemoving elements: Use the del statement with the element’s index. Removing an element shifts all subsequent elements one position earlier in the list. For example, del fam[2] removes the third element, and if repeated, removes what is now at that index.\n\nBehind the Scenes: List References\n\nUnderstanding how lists work in memory is important, especially when copying lists. When you create a list variable, Python stores a reference to the list in memory, not the actual elements.\n\n`If you assign a list x to a new variable y with y = x, both variables point to the same list. Changing an element in y also updates x.`\n\nTo create a new independent copy of the list, you can either:\n\nUse the list() function\n\n`Use slicing, e.g., y = x[:]`\n\nWith these methods, updates to y do not affect x, giving you two separate lists in memory. Understanding this behavior helps prevent unexpected changes when working with multiple lists in Python.",
        "exampleCode": "If you assign a list x to a new variable y with y = x, both variables point to the same list. Changing an element in y also updates x.\nUse slicing, e.g., y = x[:]"
      }
    ],
    "challenge": {
      "title": "Practice Drill: Manipulating Python Lists",
      "scenario": "Apply the concepts learned in Manipulating Python Lists to process sample tabular data.",
      "instructions": "Write Python code using pandas or standard Python to explore and verify data behavior for Manipulating Python Lists.",
      "starterCode": "# Practice Challenge: Manipulating Python Lists\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('sales.csv')\nprint(\"Loaded sales records:\", len(df))\nprint(df.head(3))\n",
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
    "id": "py-lesson-t-q5o6gvdjurex",
    "tabId": "t.q5o6gvdjurex",
    "moduleTitle": "Part 1: Python & NumPy Foundations",
    "moduleOrder": 1,
    "lessonOrder": 6,
    "title": "Functions in Python",
    "description": "Functions in Python  Functions are reusable pieces of code designed to perform a specific task. You’ve already used functions in Python without realizing it—for...",
    "sections": [
      {
        "title": "Functions in Python",
        "body": "Functions in Python\n\nFunctions are reusable pieces of code designed to perform a specific task. You’ve already used functions in Python without realizing it—for example, the type() function returns the type of a value. Instead of writing code manually every time you want to perform a task, functions allow you to call them with input values and get results automatically.\n\nUsing Functions: Examples\n\nConsider a list of family members’ heights stored in fam. To find the tallest height, instead of manually comparing each number, you can use Python’s built-in max() function:\n\nYou pass the list fam as an argument to max() inside parentheses.\n\nThe function then computes the maximum value and returns it.\n\n`You can assign the result to a new variable, e.g., tallest = max(fam), and use it like any other variable in further calculations.`\n\nThe max() function acts like a black box: you don’t need to know its internal implementation—just that it works.\n\nAnother commonly used function is round(), which rounds numbers:\n\nround(number, ndigits) takes two arguments:\n\nnumber – the value to round\n\nndigits – how many decimal places to keep\n\nFor example, round(1.68, 1) rounds 1.68 to one decimal place, giving 1.7. If you call round() with only one argument, Python automatically rounds to the nearest integer because ndigits is an optional argument. Internally, the function uses these arguments like variables to perform the calculation and return a result.\n\nFinding and Using Functions\n\nMany common tasks in Python already have functions built in, or available through packages. You don’t need to reinvent the wheel—just search online or use resources like DataCamp to discover functions that solve your problem. Using built-in or well-documented functions will save time, reduce errors, and make your code more readable.",
        "exampleCode": "You can assign the result to a new variable, e.g., tallest = max(fam), and use it like any other variable in further calculations."
      }
    ],
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
    "description": "Methods in Python  In Python, functions like max(), len(), and round() are just one part of the story. Sometimes, tasks such as finding the index of an element ...",
    "sections": [
      {
        "title": "Methods in Python",
        "body": "Methods in Python\n\nIn Python, functions like max(), len(), and round() are just one part of the story. Sometimes, tasks such as finding the index of an element in a list or reversing a list are not covered by built-in functions. This is where methods come into play.\n\nPython Objects and Methods\n\nEverything in Python is an object. Numbers, strings, lists, booleans—all of these are objects with a specific type, such as int, float, str, or list. In addition to representing values, Python objects come with methods, which are functions that “belong” to the object and are specific to its type."
      },
      {
        "title": "Examples of methods",
        "body": "Strings have methods like capitalize() and replace().\n\nLists have methods like index() and count().\n\nFloats, integers, and booleans also have their own specific methods.\n\nYou call a method using dot notation, for example, fam.index(\"mom\") returns the index of \"mom\" in the list fam. Similarly, fam.count(1.73) counts how many times 1.73 occurs in the list. For strings, sister.capitalize() returns the string with the first letter capitalized, and sister.replace(\"z\", \"sa\") replaces occurrences of \"z\" with \"sa\".\n\nKey Principles About Methods\n\nMethods depend on object type: The available methods vary depending on whether the object is a list, string, float, etc.\n\nSame method name, different behavior: Some methods exist on multiple types but behave differently. For instance, index() on a string returns the position of a character, while on a list it returns the position of an element.\n\nMethods can modify objects: Some methods, like append() on a list, modify the object in place. For example, fam.append(\"me\") adds \"me\" to the fam list. Others may return a new object without changing the original.\n\nSummary"
      },
      {
        "title": "In Python, you have",
        "body": "Functions: General-purpose reusable code, such as max(), type(), and round().\n\nMethods: Functions that are specific to objects. Methods behave differently depending on the object type and can sometimes modify the object directly. They are accessed using dot notation and allow you to work efficiently with Python objects.\n\nUnderstanding the difference between functions and methods, and how methods depend on object types, is key to working effectively with Python data structures."
      }
    ],
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
        "title": "Packages",
        "body": "Python Packages\n\nPython functions and methods are powerful, but including all available functions in the core Python distribution would be overwhelming and inefficient. Most of the code would never be used, and maintaining it would be a huge challenge. This is where packages come in.\n\nA package is essentially a directory of Python scripts, where each script is called a module. Modules contain functions, methods, and new Python types aimed at solving specific problems. There are thousands of Python packages available online, many tailored for data science:\n\nNumPy: Efficiently works with arrays.\n\nMatplotlib: Used for data visualization.\n\nscikit-learn: Used for machine learning.\n\nNot all packages are included with Python by default, so you often need to install them before use. On your own system, this is usually done with pip, Python’s package management tool. The general workflow is:\n\nDownload get-pip.py and run it using python3 get-pip.py.\n\nInstall a package, e.g., pip3 install numpy.\n\nOnce installed, you need to import packages in your script to use them. There are several ways to do this:\n\nImport the whole package:\u000b\u000b import numpy\u000b\u000b To use the array function, you call numpy.array(list).\n\nImport with an alias:\u000b\u000b import numpy as np\u000b\u000b This allows you to write np.array(list) instead of numpy.array(list), making code shorter.\n\nImport specific functions:\u000b\u000b from numpy import array\u000b\u000b This lets you call array(list) directly. While concise, it can make your code less clear for someone reading it later, because it’s not obvious that array comes from NumPy.\n\nFor clarity and readability, importing the full package is generally preferred, as numpy.array clearly shows that the function belongs to the NumPy package."
      }
    ],
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
    "description": "NumPy Overview  Python lists are powerful—they can hold different types, and you can change, add, or remove elements. However, when performing calculations over...",
    "sections": [
      {
        "title": "NumPy Overview",
        "body": "NumPy Overview\n\nPython lists are powerful—they can hold different types, and you can change, add, or remove elements. However, when performing calculations over entire collections of values, such as calculating BMIs for a family, lists become inefficient. Python cannot perform operations element-wise on lists, so trying to divide weights by squared heights directly results in an error. Doing it manually for each element is possible but tedious and slow.\n\nThe Solution: NumPy\n\nNumPy, short for Numeric Python, provides an elegant solution. It introduces NumPy arrays, which are similar to lists but come with a key advantage: you can perform operations across entire arrays element-wise. NumPy arrays are fast and efficient, making them ideal for data science tasks. To use NumPy, you install it via pip (pip3 install numpy) and then import it in your Python script:\n\n`import numpy as np`\n\nYou can then create arrays from regular Python lists:\n\n`np_height = np.array(height)`\n\n`np_weight = np.array(weight)`\n\nNow, calculating BMI for all family members can be done in a single, elegant line:\n\n`bmi = np_weight / np_height**2`\n\nWhy NumPy Works\n\nNumPy arrays are designed to contain values of a single type. If you try mixing types, NumPy will convert all elements to a compatible type, often to strings. They are a new kind of Python type, similar to float, str, or list, with their own methods and behavior. One key difference to note:\n\nPython lists: python_list + python_list → elements are concatenated.\n\nNumPy arrays: np_array + np_array → element-wise addition.\n\nThis difference can be subtle but is important when switching between types.\n\nSubsetting NumPy Arrays\n\nWorking with NumPy arrays is similar to lists, but there are additional features. You can subset arrays using square brackets, just like lists, e.g., bmi[1] retrieves the BMI of the second person. A more advanced feature is boolean subsetting:\n\nCreate a boolean array using a comparison, e.g., bmi > 23.\n\nUse this boolean array to select elements: bmi[bmi > 23].\n\nThis allows you to quickly filter data and extract meaningful insights, such as identifying family members with BMI above a certain threshold.",
        "exampleCode": "import numpy as np\nnp_height = np.array(height)\nnp_weight = np.array(weight)\nbmi = np_weight / np_height**2"
      }
    ],
    "challenge": {
      "title": "Vectorized Price Inflation Calculator",
      "scenario": "The pricing operations team wants to simulate a 10% inflation increase across product prices without using slow Python loops.",
      "instructions": "Given a NumPy array of product prices `prices = np.array([149.99, 499.99, 299.50, 199.00, 179.99])`, calculate `inflated_prices` by multiplying the array by 1.10 and round to 2 decimal places using `np.round()`. Print `inflated_prices`.",
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
        "title": "NumPy Arrays",
        "body": "2D NumPy Arrays\n\nIn the previous lesson, you worked with one-dimensional NumPy arrays. When you check their type using type(), Python tells you they are numpy.ndarray. The numpy. prefix means the type comes from the NumPy package, and ndarray stands for n-dimensional array.\n\nAlthough earlier examples used 1D arrays, NumPy can handle arrays with many dimensions — 2D, 3D, and even higher. In this lesson, the focus is on 2D arrays, which are extremely common in data science because they resemble tables of data (rows and columns).\n\nCreating a 2D NumPy Array\n\nA 2D NumPy array can be created from a list of lists in Python. Each inner list represents a row in the array. For example, if you combine height and weight data into one structure, each sublist becomes a row of the 2D array.\n\nWhen you print the array, you’ll see a rectangular structure. You can inspect its dimensions using the .shape attribute:\n\n.shape returns a tuple showing the number of rows and columns.\n\nFor example, (2, 5) means 2 rows and 5 columns.\n\nIt’s important to understand that .shape is an attribute, not a method. The difference is:\n\nAttributes do not use parentheses → array.shape\n\nMethods use parentheses → array.mean()\n\nLike 1D arrays, 2D NumPy arrays must contain elements of a single data type. If one element is changed to a string, NumPy will convert all elements to strings to maintain consistency.\n\nSubsetting 2D NumPy Arrays\n\nYou can think of a 2D NumPy array as an improved list of lists. However, NumPy offers more powerful and intuitive ways to subset data.\n\nIf you want to access a specific element, such as the first row and third column, there are two approaches."
      },
      {
        "title": "The first approach is step-by-step indexing",
        "body": "Select the row using square brackets.\n\nThen select the column from that row using another pair of brackets.\n\nThe second approach is more common and cleaner. You use a single pair of square brackets with a comma:\n\nThe value before the comma represents the row.\n\nThe value after the comma represents the column.\n\nThe result is the intersection of that row and column.\n\nThis second method is preferred because it is more readable and flexible.\n\nSlicing Rows and Columns\n\nNumPy slicing becomes especially powerful in 2D arrays.\n\nIf you want to select multiple rows or columns, you can use colons (:):\n\nA colon before the comma selects all rows.\n\nA colon after the comma selects all columns.\n\nYou can specify ranges using start:end, where the end index is not included."
      },
      {
        "title": "For example",
        "body": "Selecting both rows but only columns 1 and 2 returns a smaller 2D array.\n\nSelecting only row 1 but all columns returns that entire row.\n\nSelecting all rows but only column 1 returns a column of values.\n\nThe key idea is that slicing works as:\u000b array[row_selection, column_selection]\n\nElement-wise Calculations in 2D Arrays\n\nJust like with 1D arrays, 2D NumPy arrays support element-wise operations. This means you can perform calculations across entire arrays without loops."
      },
      {
        "title": "For example, you can",
        "body": "Multiply all elements by a number.\n\nAdd two arrays of the same shape together.\u000bApply mathematical operations across the entire dataset.\n\nThis is one of the biggest advantages of NumPy over regular Python lists. It makes mathematical computations cleaner, faster, and more efficient.\n\nKey Takeaways\n\nnumpy.ndarray means n-dimensional array.\n\n2D arrays are created from lists of lists.\n\nUse .shape to check dimensions.\n\nArrays must contain only one data type.\n\nSubsetting uses the format: array[row, column].\n\nSlicing with : allows selecting ranges.\n\nElement-wise calculations work across the entire array."
      }
    ],
    "challenge": {
      "title": "Vectorized Price Inflation Calculator",
      "scenario": "The pricing operations team wants to simulate a 10% inflation increase across product prices without using slow Python loops.",
      "instructions": "Given a NumPy array of product prices `prices = np.array([149.99, 499.99, 299.50, 199.00, 179.99])`, calculate `inflated_prices` by multiplying the array by 1.10 and round to 2 decimal places using `np.round()`. Print `inflated_prices`.",
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
        "title": "Data Analysis",
        "body": "Data Analysis with NumPy\n\nData analysis starts with understanding your data. When you’re working with small datasets, it’s easy to inspect values manually. However, in real-world data science, you often deal with thousands, millions, or even billions of numbers. In those cases, simply looking at raw data is not helpful. Instead, you rely on summary statistics to extract meaningful insights.\n\nExample: City-Wide Survey\n\nImagine conducting a survey of 5000 adults in a city, collecting their height and weight. The data is stored in a 2D NumPy array called np_city:\n\n5000 rows → each row represents one person\n\n2 columns → height and weight\n\nJust staring at this massive table of numbers won’t reveal patterns. To understand the dataset, you generate summarizing statistics.\n\nSummary Statistics with NumPy\n\nNumPy is not only efficient for storing numerical data, but it also provides powerful statistical functions.\n\nTo calculate the average (mean) height:\n\nnp.mean(np_city[:, 0])"
      },
      {
        "title": "Here",
        "body": "np_city[:, 0] selects all rows from the first column (height).\n\nnp.mean() calculates the average.\n\nIf the result is 1.75 meters, that gives a reasonable estimate of average height.\n\nTo calculate the median (the middle value when sorted):\n\nnp.median(np_city[:, 0])\n\nThis avoids writing complex sorting logic yourself.\n\nYou can perform the same operations on the weight column.\n\nThese summary statistics act as a sanity check. For example:\n\nIf the average weight turns out to be 2000 kg, something is clearly wrong with the data.\n\nOther Useful NumPy Functions\n\nNumPy provides many additional functions for analysis, including:\n\nnp.corrcoef() → checks correlation between variables (e.g., height and weight)\n\nnp.std() → calculates standard deviation\n\nnp.sum() → sums elements\n\nnp.sort() → sorts values\n\nSome of these functions also exist in basic Python. However, NumPy is much faster, because it enforces a single data type inside arrays, allowing optimized numerical computations.\n\nGenerating Data with NumPy\n\nIn the example, the height and weight data were simulated using NumPy itself. Random distributions were sampled 5000 times to create arrays, and then combined using:\n\nnp.column_stack() → combines separate arrays into columns of a 2D array\n\nThis shows that NumPy is not only useful for analyzing data but also for generating and manipulating datasets.\n\nFinal Insight\n\nSummary statistics help you understand and validate your data quickly. Another powerful way to explore data is through visualization, which builds intuition and reveals patterns that numbers alone might hide. That typically involves tools like Matplotlib, which comes next in the learning journey."
      }
    ],
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
    "description": "Basic Plots with Matplotlib  Data visualization is an essential part of data analysis. It allows you to explore your dataset to uncover patterns and insights, a...",
    "sections": [
      {
        "title": "Basic Plots with Matplotlib",
        "body": "Basic Plots with Matplotlib\n\nData visualization is an essential part of data analysis. It allows you to explore your dataset to uncover patterns and insights, and it also helps you communicate findings effectively to others. Beautiful visualizations can make your data tell a story by themselves. For example, Hans Rosling’s bubble charts illustrate global development in an intuitive way: each bubble represents a country, its size reflects population, the horizontal axis shows GDP per capita, and the vertical axis shows life expectancy. From such a plot, you can quickly see trends, like the correlation between higher GDP and longer life expectancy, and differences between countries with similar income levels.\n\nMatplotlib Overview\n\n`import matplotlib.pyplot as plt`\n\nPython has many visualization packages, but the most fundamental is Matplotlib, specifically its subpackage pyplot, which is conventionally imported as plt. To create a plot, you first prepare your data in lists or arrays. For example, you might have a list of years (year) and a list of corresponding world populations (pop) in billions.",
        "exampleCode": "import matplotlib.pyplot as plt"
      },
      {
        "title": "To visualize this as a line chart, you use",
        "body": "`plt.plot(year, pop)`\n\n`plt.show()`\n\n`plt.plot() tells Python what to plot and how, mapping the first argument to the horizontal axis and the second to the vertical axis.`\n\n`plt.show() actually displays the plot, allowing you to add customizations before rendering, like titles, labels, or colors.`\n\nLooking at the line chart, the horizontal axis shows years, the vertical axis shows population, and Python draws lines connecting the points. For example, in 1950 the population was around 2.5 billion, and in 2010 it was around 7 billion—nearly tripling in sixty years.\n\nScatter Plots\n\nAnother useful plot type is the scatter plot. Unlike a line chart, a scatter plot shows each data point individually without connecting them. You create it by replacing plot with scatter in your code:\n\n`plt.scatter(year, pop)`\n\n`plt.show()`\n\nScatter plots are often preferred when you want a more honest representation of your data, especially when there are few data points. They make it clear that the plot is based on individual observations rather than a continuous line.\n\nKey Takeaways\n\nVisualization helps both exploration and communication of data.\n\nMatplotlib is the fundamental Python package for plotting; pyplot is its most-used subpackage.\n\nLine plots connect points to show trends over time.\n\nScatter plots show individual points, offering a clear view of the raw data.\n\n`plt.plot() / plt.scatter() define the plot, and plt.show() displays it.`",
        "exampleCode": "plt.plot(year, pop)\nplt.show()\nplt.plot() tells Python what to plot and how, mapping the first argument to the horizontal axis and the second to the vertical axis.\nplt.show() actually displays the plot, allowing you to add customizations before rendering, like titles, labels, or colors.\nplt.scatter(year, pop)\nplt.show()\nplt.plot() / plt.scatter() define the plot, and plt.show() displays it."
      }
    ],
    "challenge": {
      "title": "Visualize Sales Distribution",
      "scenario": "The marketing analytics team needs a histogram visualization of order amounts to understand customer spending buckets.",
      "instructions": "Using pandas and matplotlib, read `sales.csv`. Plot a histogram of the `sale_amount` column with `bins=5`. Set the title to \"Sales Distribution\" and xlabel to \"Order Amount ($)\". Display the plot using `plt.show()`.",
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
        "title": "Histogram",
        "body": "Histograms\n\nA histogram is a type of visualization that is very useful for exploring data distributions. It helps you understand how values are spread across a range. To visualize this, imagine you have 12 values between 0 and 6 placed along a number line.\n\nTo create a histogram, you divide the number line into equal chunks called bins. For example, if you choose 3 bins, each with a width of 2, you then count how many data points fall into each bin:\n\nThe first bin contains 4 data points.\n\nThe second bin contains 6 data points.\n\nThe third bin contains 2 data points.\n\nNext, you draw a bar for each bin, where the height of the bar corresponds to the number of data points in that bin. The resulting histogram gives a clear visual overview of the distribution. In this example, most values are clustered in the middle, but there are more values below 2 than above 4.\n\nCreating Histograms with Matplotlib\n\nTo create histograms in Python, you can use Matplotlib. Start by importing the pyplot subpackage:\n\n`import matplotlib.pyplot as plt`\n\nThe main function to build histograms is hist. Its two most important arguments are:\n\nx – the list of values to create a histogram for.\n\nbins – the number of bins to divide your data into. If not specified, it defaults to 10.\n\nExample: Suppose you have a list of 12 values and you want to divide them into 3 bins:\n\n`values = [1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6]`\n\n`plt.hist(values, bins=3)`\n\n`plt.show()`\n\nThis generates a histogram with three bars corresponding to the bin counts. Histograms are powerful because they allow you to see patterns and trends in the data at a glance.\n\nExample: Population Pyramid\n\nA more advanced application of histograms is the population pyramid, which shows age distributions for males and females. In the European Union in 2010, the bins were horizontal, with the largest bins corresponding to ages 40–44, representing the baby boom generation. By 2050, the distribution becomes flatter, illustrating how the population ages over time. This demonstrates how histograms can quickly reveal demographic changes and trends.",
        "exampleCode": "import matplotlib.pyplot as plt\nvalues = [1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6]\nplt.hist(values, bins=3)\nplt.show()"
      }
    ],
    "challenge": {
      "title": "Visualize Sales Distribution",
      "scenario": "The marketing analytics team needs a histogram visualization of order amounts to understand customer spending buckets.",
      "instructions": "Using pandas and matplotlib, read `sales.csv`. Plot a histogram of the `sale_amount` column with `bins=5`. Set the title to \"Sales Distribution\" and xlabel to \"Order Amount ($)\". Display the plot using `plt.show()`.",
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
        "title": "Customization",
        "body": "Customizing Plots in Matplotlib\n\nCreating a plot is only the first step in data visualization. The real challenge is making a plot that clearly communicates the intended message. Every visualization offers many customization options, and the choices you make should depend on:\n\nThe data you are working with\n\nThe story you want to tell\n\nYou can modify colors, markers, labels, axes, titles, ticks, and much more. Because there are so many possibilities, the best way to understand customization is through practical examples.\n\nImproving a Basic Line Plot\n\nSuppose you already created a line plot showing world population growth, including projections up to the year 2100. The graph already shows an important trend: population growth is expected to slow down by the end of the century."
      },
      {
        "title": "However, two improvements are necessary",
        "body": "It should clearly explain what data is being shown.\n\nIt should better highlight the population explosion.\n\nCustomization helps achieve both goals.\n\nAdding Axis Labels\n\nThe first essential step in improving any plot is labeling the axes. Without labels, viewers cannot properly interpret the data."
      },
      {
        "title": "You can use",
        "body": "`plt.xlabel(\"Year\")`\n\n`plt.ylabel(\"Population\")`\n\nThese functions add descriptive text to the horizontal and vertical axes. They must be called before plt.show(); otherwise, the customizations will not appear.\n\nAxis labels immediately make the plot more understandable, especially for someone seeing it for the first time.\n\nAdding a Title",
        "exampleCode": "plt.xlabel(\"Year\")\nplt.ylabel(\"Population\")"
      },
      {
        "title": "To give even more context, you can add a title",
        "body": "`plt.title(\"World Population Projections\")`\n\nA title summarizes what the plot represents and strengthens the overall message. With axis labels and a title, the visualization becomes much more informative.\n\nCustomizing the Y-Axis (Ticks)\n\nTo better emphasize growth, you might want the y-axis to start from zero. You can adjust the tick marks using:\n\n`plt.yticks([0, 2, 4, 6, 8, 10])`\n\nThis makes it clearer that the world already had about 2.5 billion people in 1950. The visual perspective changes when the axis scale is adjusted properly.\n\nYou can also customize how tick labels appear. For example, to show that values represent billions:\n\n`plt.yticks([0, 2, 4, 6, 8, 10],`\n\n[\"0\", \"2B\", \"4B\", \"6B\", \"8B\", \"10B\"])",
        "exampleCode": "plt.title(\"World Population Projections\")\nplt.yticks([0, 2, 4, 6, 8, 10])\nplt.yticks([0, 2, 4, 6, 8, 10],"
      },
      {
        "title": "Here",
        "body": "The first list defines tick positions.\n\nThe second list defines how those ticks are displayed.\n\nThe “B” stands for billions, making the units explicit and avoiding confusion.\n\nAdding Historical Data\n\nTo better illustrate the population explosion, you can add earlier historical data points, such as population figures from 1800, 1850, and 1900. By extending your year and pop lists, the plot gains more context.\n\nAdding these extra data points shows that population growth dramatically accelerated in the last 60 years compared to previous centuries. This strengthens the narrative of the visualization.\n\nBefore vs After\n\nA simple line plot shows data.\u000b A customized line plot tells a story."
      },
      {
        "title": "By adding",
        "body": "Axis labels\n\nA descriptive title\n\nProperly formatted ticks\n\nAdditional historical context\n\nyou transform an average graph into a clear, compelling visualization."
      }
    ],
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
        "title": "Dictionaries - 1",
        "body": "Dictionaries (Part 1)\n\nA dictionary is a powerful Python data type that allows you to store data in a way that directly connects related pieces of information. It is especially useful in data science, where you often need to map one thing to another — for example, a country to its population.\n\nThe Problem with Lists\n\nImagine you work for the World Bank and want to store the population of different countries. One approach is to create a list of populations:\n\n`pop = [30.55, 2.77, 40.0]`\n\nThen, to know which population belongs to which country, you create a second list:\n\n`countries = [\"Afghanistan\", \"Albania\", \"Algeria\"]`\n\nThe idea is that both lists share the same order, so the index connects them. If you want the population of Albania, you would:\n\nUse countries.index(\"Albania\") to find its position.\n\nUse that index to retrieve the value from pop.",
        "exampleCode": "pop = [30.55, 2.77, 40.0]\ncountries = [\"Afghanistan\", \"Albania\", \"Algeria\"]"
      },
      {
        "title": "Although this works, it has major drawbacks",
        "body": "It’s not intuitive.\n\nIt requires extra steps.\n\nIt becomes messy and inefficient for large datasets.\n\nThere should be a more direct way to connect a country to its population. That’s where dictionaries come in.\n\nIntroducing Dictionaries\n\nA dictionary stores data using key–value pairs. Instead of relying on positions (like lists do), dictionaries allow you to directly associate a key with a value.\n\nYou create a dictionary using curly brackets {}. Inside, each key and value are separated by a colon :."
      },
      {
        "title": "Example",
        "body": "`world = {`\n\n\"Afghanistan\": 30.55,\n\n\"Albania\": 2.77,\n\n\"Algeria\": 40.0\n\n}",
        "exampleCode": "world = {"
      },
      {
        "title": "Here",
        "body": "The keys are country names.\n\nThe values are the corresponding populations (in millions)."
      },
      {
        "title": "Each key-value pair follows this format",
        "body": "key : value\n\nAccessing Values in a Dictionary\n\nTo retrieve a value, you use the key inside square brackets:\n\nworld[\"Albania\"]"
      },
      {
        "title": "This directly returns",
        "body": "2.77\n\nThere is no need to search for an index first. The key immediately gives access to its value."
      },
      {
        "title": "This approach is",
        "body": "More intuitive\n\nCleaner to read\n\nMore efficient\n\nPython is optimized to look up dictionary keys very quickly, even when the dictionary contains a huge amount of data.\n\nKey Insight\n\nLists connect elements by position (index).\u000b Dictionaries connect elements by meaning (key).\n\nThat difference makes dictionaries one of the most important data structures in Python, especially in data science."
      }
    ],
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
        "title": "Dictionaries - 2",
        "body": "Dictionaries (Part 2)\n\nIn the previous lesson, you created a dictionary called world, which stores country populations as key–value pairs. You accessed values by passing a key inside square brackets, such as:\n\nworld[\"Albania\"]\n\nThis works because dictionaries are designed for fast lookups based on unique keys.\n\nImportant Rules About Dictionary Keys\n\nFor dictionaries to function properly, their keys must follow two important rules:\n\nKeys must be unique.\n\nKeys must be immutable objects.\n\nIf you try to define the same key twice when creating a dictionary, Python will keep only the last value assigned to that key. There cannot be duplicate keys.\n\nKeys must also be immutable, meaning their contents cannot change after creation. Examples of immutable types include:\n\nStrings\n\nIntegers\n\nFloats\n\nBooleans\n\nLists, however, are mutable (their contents can change), so they cannot be used as dictionary keys. Attempting to use a list as a key will result in an error.\n\nAdding New Key–Value Pairs\n\nYou can add new data to an existing dictionary by assigning a value to a new key using square brackets.\n\nFor example, suppose you want to add “Sealand” with a population of 27 (in millions format):\n\n`world[\"Sealand\"] = 0.000027`\n\nIf you print world afterward, Sealand will appear in the dictionary.\n\nTo check whether a key exists in a dictionary, you can use the in keyword:\n\n\"Sealand\" in world\n\nThis returns True if the key exists.\n\nUpdating Values\n\nIf you assign a new value to an existing key, Python will update the value rather than create a new pair:\n\n`world[\"Sealand\"] = 0.000028`\n\nBecause dictionary keys are unique, Python knows you want to modify the existing entry.\n\nRemoving Key–Value Pairs\n\nTo delete a key–value pair, you use the del keyword:\n\ndel world[\"Sealand\"]\n\nAfter this operation, Sealand will no longer exist in the dictionary.\n\nLists vs Dictionaries\n\nLists and dictionaries may look similar because both allow you to:\n\nSelect elements\n\nUpdate elements\n\nRemove elements\u000b using square bracket notation.\n\nHowever, they are fundamentally different.",
        "exampleCode": "world[\"Sealand\"] = 0.000027\nworld[\"Sealand\"] = 0.000028"
      },
      {
        "title": "A list",
        "body": "Is an ordered sequence of values\n\nIs indexed by numbers (positions)\n\nIs best when order matters or when you need slicing and subsets"
      },
      {
        "title": "A dictionary",
        "body": "Is a collection of key–value pairs\n\nIs indexed by unique, immutable keys\n\nIs best when you need fast lookups (like a lookup table)\n\nWhen to Use Which"
      },
      {
        "title": "Use a list when",
        "body": "The order of elements matters\n\nYou frequently work with subsets or slices"
      },
      {
        "title": "Use a dictionary when",
        "body": "You need fast access to values\n\nYou want to map unique identifiers (keys) to data\n\nYou are building a lookup table"
      }
    ],
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
        "title": "Pandas - 1",
        "body": "Pandas (Part 1) – Working with Tabular Data\n\nAs a data scientist, you’ll often work with large amounts of data. Very frequently, this data can be structured in a tabular format — meaning rows and columns, like a spreadsheet. Each row represents an observation, and each column represents a variable describing that observation.\n\nFor example, imagine temperature measurements in a chemical plant. Each row could represent one measurement, and the columns might include temperature, date, time, and location. Another example is data about the BRICS countries (Brazil, Russia, India, China, and South Africa), where each row represents a country and columns include the capital, area, and population.\n\nWhy Not Just Use NumPy?\n\nYou already know that a 2D NumPy array can represent tabular data. However, NumPy arrays are not ideal when your dataset contains different data types."
      },
      {
        "title": "In the BRICS example",
        "body": "Country and capital are strings\n\nArea and population are floats\n\nNumPy prefers arrays with a single data type, so it’s not the best choice for mixed data. That’s where Pandas comes in.\n\nWhat is Pandas?\n\nPandas is a high-level data manipulation library built on top of NumPy. It was developed by Wes McKinney and is widely used in data science.\n\nThe main data structure in Pandas for tabular data is called a DataFrame."
      },
      {
        "title": "A DataFrame",
        "body": "Represents data in rows and columns\n\nAllows different data types in different columns\n\nHas labeled rows (index)\n\nHas labeled columns\n\nThis makes it much more powerful and flexible for real-world datasets.\n\nStructure of a DataFrame"
      },
      {
        "title": "In a Pandas DataFrame",
        "body": "Rows represent observations (e.g., countries)\n\nColumns represent variables (e.g., capital, area, population)\n\nEach row has a unique label (called the index)\n\nEach column has a name (column label)\n\nUnlike NumPy arrays, columns can contain different data types.\n\nCreating a DataFrame from a Dictionary\n\nOne way to create a DataFrame is by starting from a Python dictionary."
      },
      {
        "title": "In this approach",
        "body": "The dictionary keys become column names\n\nThe dictionary values (lists) become the column data\n\nAfter importing Pandas as pd, you create a DataFrame like this:\n\n`import pandas as pd`\n\n`data = {`\n\n\"country\": [\"Brazil\", \"Russia\", \"India\", \"China\", \"South Africa\"],\n\n\"capital\": [\"Brasilia\", \"Moscow\", \"New Delhi\", \"Beijing\", \"Pretoria\"],\n\n\"area\": [8.52, 17.10, 3.29, 9.60, 1.22],\n\n\"population\": [200.4, 143.5, 1252, 1357, 52.98]\n\n}\n\n`brics = pd.DataFrame(data)`\n\nBy default, Pandas assigns row labels 0, 1, 2, 3, 4.\u000b You can manually set row labels using the index attribute:\n\n`brics.index = [\"BR\", \"RU\", \"IN\", \"CH\", \"SA\"]`\n\nNow your DataFrame has proper row labels.\n\nCreating a DataFrame from a CSV File\n\nIn real-world data science, you usually won’t build DataFrames manually. Instead, you import data from external files — often CSV files (Comma Separated Values).",
        "exampleCode": "import pandas as pd\ndata = {\nbrics = pd.DataFrame(data)\nbrics.index = [\"BR\", \"RU\", \"IN\", \"CH\", \"SA\"]"
      },
      {
        "title": "To read a CSV file",
        "body": "`brics = pd.read_csv(\"brics.csv\")`\n\nHowever, sometimes the first column in the CSV file contains row labels. Pandas might interpret this as a normal column. To fix this, use the index_col argument:\n\n`brics = pd.read_csv(\"brics.csv\", index_col=0)`\n\nThis tells Pandas that the first column should be used as row labels.\n\nThe read_csv() function has many optional arguments that allow you to:\n\nHandle missing values\n\nSpecify separators\n\nRename columns\n\nSkip rows\n\nAnd much more\n\nIt’s one of the most important functions in Pandas.\n\nKey Takeaways\n\nPandas is designed for structured, tabular data and offers advantages over NumPy when:\n\nYour dataset contains mixed data types\n\nYou need labeled rows and columns\n\nYou want easier data manipulation",
        "exampleCode": "brics = pd.read_csv(\"brics.csv\")\nbrics = pd.read_csv(\"brics.csv\", index_col=0)"
      },
      {
        "title": "In short",
        "body": "NumPy is great for numerical computations\n\nPandas is great for real-world datasets and data analysis"
      }
    ],
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
        "title": "Pandas - 2",
        "body": "Pandas (Part 2) – Indexing and Selecting Data\n\nIn the previous video, we created the brics DataFrame, containing basic data on the BRICS countries. Proper row and column labels make it much easier to access specific columns, rows, or individual elements in the DataFrame. In this section, we’ll explore different ways to index and select data, starting with square brackets and then moving to the more advanced loc and iloc methods, which make Pandas extremely powerful.\n\nx\n\nTo select a single column, such as the country column, you can use square brackets:\n\nbrics[\"country\"]\n\nThis returns a Pandas Series, which you can think of as a 1-dimensional, labeled array. Series objects are the building blocks of DataFrames — if you combine multiple Series, you get a DataFrame.\n\nIf you want the result to stay as a DataFrame rather than a Series, you use double square brackets:\n\nbrics[[\"country\"]]\n\nYou can extend this approach to select multiple columns by passing a list of column labels:\n\nbrics[[\"country\", \"capital\"]]\n\nThe resulting DataFrame is a \"sub-DataFrame\" containing only the selected columns.\n\nAccessing Rows with Square Brackets\n\nTo select rows using basic square brackets, you use slicing. For example, to get the 2nd, 3rd, and 4th rows:\n\nbrics[1:4]\n\nRemember, Python uses zero-based indexing, and the end of the slice is exclusive. While this works, square brackets offer limited flexibility compared to NumPy-style subsetting.\n\nloc – Label-Based Indexing\n\nThe loc method allows you to select data by row and column labels, similar to how you would index a 2D NumPy array."
      },
      {
        "title": "To get a single row by label, for example Russia",
        "body": "brics.loc[\"RU\"]\n\nThis returns a Series. To keep the result as a DataFrame, wrap the label in double brackets:\n\nbrics.loc[[\"RU\"]]\n\nTo select multiple rows by labels, you pass a list of row labels:\n\nbrics.loc[[\"RU\", \"IN\", \"CH\"]]\n\nYou can also select specific columns at the same time using a comma:\n\nbrics.loc[[\"RU\", \"IN\", \"CH\"], [\"country\", \"capital\"]]\n\nTo select all rows but only certain columns, use a colon for the rows:\n\nbrics.loc[:, [\"country\", \"capital\"]]\n\nUsing loc makes Pandas subsetting very similar to NumPy arrays, with the main difference being that loc uses labels instead of positions.\n\niloc – Position-Based Indexing\n\nThe iloc method works almost identically to loc, but instead of labels, you use integer positions.\n\nTo select the row for Russia (which has index 1):\n\nbrics.iloc[[1]]\n\nFor multiple rows (Russia, India, China):\n\nbrics.iloc[1:4]"
      },
      {
        "title": "To select rows and specific columns by position",
        "body": "brics.iloc[[1, 2, 3], [0, 1]]\n\nTo select all rows and only the first two columns:\n\nbrics.iloc[:, [0, 1]]\n\nIn summary, loc and iloc provide flexible ways to select rows, columns, or both simultaneously:\n\nloc → label-based (row/column names)\n\niloc → position-based (integer indexes)\n\nBoth methods mirror the intuitive subsetting style of 2D NumPy arrays, making it easier to manipulate and explore DataFrames efficiently. Practicing with these techniques will help you master DataFrame indexing and selection."
      }
    ],
    "challenge": {
      "title": "Targeted Country Subsetting with loc",
      "scenario": "The trade strategy department needs to inspect the capital and population for Brazil (BR) and China (CH) from the BRICS dataset.",
      "instructions": "Load `brics.csv` with `index_col='country_code'`. Use `.loc` to select the rows for `['BR', 'CH']` and the columns `['capital', 'population']`. Assign to `subset_df` and print it.",
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
        "title": "Comparison Operators",
        "body": "Comparison Operators – Notes\n\nComparison operators allow you to compare two values and determine how they relate to each other. The result of any comparison is always a Boolean value: True or False. These operators are fundamental in decision-making, filtering data, and logical operations in Python.\n\nBasic Numeric Comparisons\n\nAt the simplest level, comparison operators work with numbers. For example, checking whether 2 < 3 returns True because 2 is indeed smaller than 3. If you check equality using 2 == 3, the result is False, since the values are not the same.\n\nYou can also combine comparison logic, such as checking if a number is smaller than or equal to another using <=. For example, both 2 <= 3 and 3 <= 3 return True. These comparisons work not only with direct values but also with variables that store numbers.\n\nComparison Operators Overview"
      },
      {
        "title": "Here are the main comparison operators in Python",
        "body": "< → less than\n\n> → greater than\n\n<= → less than or equal to\n\n>= → greater than or equal to\n\n== → equal to\n\n!= → not equal to (inequality)\n\nThe != operator is simply the opposite of ==. If two values are not equal, it returns True.\n\nComparing Strings\n\nComparison operators also work with strings. Python compares strings alphabetically (based on character order). For example, \"carl\" < \"chris\" returns True because “carl” comes before “chris” in alphabetical order.\n\nHowever, comparing values of different types usually results in an error. For example, trying to compare an integer like 3 with a string like \"chris\" will raise an error. Python typically cannot determine how objects of completely different types relate to each other.\n\nAn important exception is numeric types like integers and floats. Python allows comparisons between them (e.g., 3 < 3.5) without errors.\n\nAs a general rule, always try to compare objects of the same type to avoid unexpected errors.\n\nComparison with NumPy Arrays\n\nWhen working with NumPy arrays, comparisons become even more powerful. If you compare an entire NumPy array to a single number, NumPy performs the comparison element-wise.\n\nFor example, if you compare a bmi array to 23 using bmi > 23, NumPy checks each value in the array against 23 and returns a Boolean array of the same size. Behind the scenes, NumPy efficiently applies the comparison to every element.\n\nThis makes filtering data concise and efficient — which is especially useful in data science.\n\nKey Takeaways"
      },
      {
        "title": "Comparison operators",
        "body": "Return Boolean values (True or False)\n\nWork with numbers and strings (if types are compatible)\n\nRequire caution when comparing different data types\n\nBecome very powerful when used with NumPy arrays due to element-wise comparison\n\nMastering comparison operators is essential because they are the foundation of filtering data, conditional statements, and logical expressions in Python."
      }
    ],
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
        "title": "Boolean Operators",
        "body": "Boolean Operators – Notes\n\nNow that you know how to create Boolean values using comparison operators (like >, <, ==), the next step is learning how to combine these Boolean values. This is where Boolean operators come in.\n\nThe three most important Boolean operators in Python are:\n\nand\n\nor\n\nnot\n\nThese operators allow you to build more complex logical conditions.\n\nThe and Operator\n\nThe and operator returns True only if both conditions are True."
      },
      {
        "title": "For example",
        "body": "True and True → True\n\nTrue and False → False\n\nFalse and True → False\n\nFalse and False → False\n\nSo both sides must evaluate to True for the entire expression to be True."
      },
      {
        "title": "You’ll usually use and with comparisons. Suppose",
        "body": "`x = 12`\n\nIf you want to check whether x is greater than 5 and less than 15:\n\nx > 5 and x < 15\n\nBoth conditions evaluate to True, so the final result is True. This makes sense because 12 lies between 5 and 15.\n\nThe or Operator\n\nThe or operator is less strict. It returns True if at least one condition is True.",
        "exampleCode": "x = 12"
      },
      {
        "title": "For example",
        "body": "True or True → True\n\nTrue or False → True\n\nFalse or True → True\n\nFalse or False → False\n\nOnly when both conditions are False does the result become False."
      },
      {
        "title": "Suppose",
        "body": "`y = 5`",
        "exampleCode": "y = 5"
      },
      {
        "title": "If you check",
        "body": "y < 7 or y > 13\n\nThe first condition (5 < 7) is True, and the second (5 > 13) is False. Since at least one condition is True, the entire expression evaluates to True.\n\nThe not Operator"
      },
      {
        "title": "The not operator simply reverses a Boolean value",
        "body": "not True → False\n\nnot False → True\n\nIt is often used to negate the result of a condition, especially when combining multiple logical expressions."
      },
      {
        "title": "For example",
        "body": "not (x > 5 and x < 15)\n\nThis would return the opposite of the combined condition.\n\nBoolean Operators with NumPy Arrays\n\nWhen working with NumPy arrays, things change slightly. The standard Python operators and, or, and not do not work element-wise on arrays."
      },
      {
        "title": "For example, if you try",
        "body": "bmi > 21 and bmi < 22\n\nYou will get an error. This happens because and cannot handle arrays of multiple Boolean values."
      },
      {
        "title": "Instead, NumPy provides special functions",
        "body": "np.logical_and()\n\nnp.logical_or()\n\nnp.logical_not()\n\nThese functions perform element-wise logical operations.\n\nTo find which BMI values are greater than 21 and less than 22:\n\nnp.logical_and(bmi > 21, bmi < 22)\n\nNumPy evaluates the condition for each element individually. Wherever both conditions are True, the result is True; otherwise, it’s False.\n\nYou can then use this Boolean array to filter the original array:\n\nbmi[np.logical_and(bmi > 21, bmi < 22)]"
      },
      {
        "title": "This is a powerful pattern in data science",
        "body": "Create a Boolean condition.\n\nUse it to filter data.\n\nKey Takeaways\n\nBoolean operators allow you to combine logical conditions:\n\nand → both must be True\n\nor → at least one must be True\n\nnot → reverses a Boolean value\n\nWith regular Python values, you use and, or, and not.\u000b With NumPy arrays, you must use logical_and(), logical_or(), and logical_not() for element-wise operations.\n\nUnderstanding this distinction is very important when moving from basic Python logic to numerical and data analysis work."
      }
    ],
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
        "title": "if, elif, else",
        "body": "Conditional Statements: if, elif, else – Notes\n\nNow that you understand comparison operators (like <, >, ==) and Boolean operators (and, or, not), the next step is using them to control how your program behaves. This is where conditional statements come in. They allow your code to make decisions and execute different blocks depending on whether a condition is True or False.\n\nThe three main conditional keywords in Python are:\n\nif\n\nelif\n\nelse\n\nThe if Statement\n\nThe if statement is the foundation of conditional logic. It checks whether a condition is True. If it is, Python executes the indented block of code below it."
      },
      {
        "title": "For example",
        "body": "`z = 4`",
        "exampleCode": "z = 4"
      },
      {
        "title": "if z % 2 == 0",
        "body": "print(\"z is even\")\n\nHere, % is the modulo operator. z % 2 == 0 checks if z is divisible by 2 (which means it’s even).\n\nIf the condition evaluates to True, the indented code runs. If it’s False, nothing happens.\n\nThere are two very important syntax rules with if:\n\nA colon (:) must follow the condition.\n\nThe code block underneath must be indented (usually 4 spaces).\n\nIndentation tells Python which lines belong to the if statement. When the indentation stops, Python understands that the conditional block has ended.\n\nYou can include multiple lines inside an if block:"
      },
      {
        "title": "if z % 2 == 0",
        "body": "print(\"z is even\")\n\nprint(\"This was checked using modulo.\")\n\nIf the condition is False, none of the indented lines will execute.\n\nThe else Statement\n\nSometimes you want an alternative action if the condition is not met. That’s where else comes in."
      },
      {
        "title": "For example",
        "body": "`z = 5`",
        "exampleCode": "z = 5"
      },
      {
        "title": "if z % 2 == 0",
        "body": "print(\"z is even\")"
      },
      {
        "title": "else",
        "body": "print(\"z is odd\")\n\nIf the if condition is False, the else block runs automatically."
      },
      {
        "title": "Unlike if, the else statement",
        "body": "Does not require a condition.\n\nRuns only if the corresponding if condition is False.\n\nIt acts as a fallback option.\n\nThe elif Statement\n\nSometimes two possibilities are not enough. You may want to check multiple conditions. This is where elif (short for “else if”) is useful."
      },
      {
        "title": "For example",
        "body": "`z = 3`",
        "exampleCode": "z = 3"
      },
      {
        "title": "if z % 2 == 0",
        "body": "print(\"divisible by 2\")"
      },
      {
        "title": "elif z % 3 == 0",
        "body": "print(\"divisible by 3\")"
      },
      {
        "title": "Here’s how Python processes this",
        "body": "It checks the if condition.\n\nIf it’s False, it checks the elif condition.\n\nIf that condition is True, it executes the corresponding block.\n\nAfter executing one matching block, Python exits the entire structure."
      },
      {
        "title": "This is very important",
        "body": "Even if multiple conditions are technically True, Python stops at the first True condition it encounters."
      },
      {
        "title": "For example, if",
        "body": "`z = 6`\n\nBoth z % 2 == 0 and z % 3 == 0 are True. However, only \"divisible by 2\" will print, because Python executes the first matching condition and then leaves the control structure.\n\nGeneral Structure\n\nThe full structure of conditional logic looks like this:",
        "exampleCode": "z = 6"
      },
      {
        "title": "if condition1",
        "body": "expression1"
      },
      {
        "title": "elif condition2",
        "body": "expression2"
      },
      {
        "title": "elif condition3",
        "body": "expression3"
      },
      {
        "title": "else",
        "body": "expression4\n\nPython evaluates conditions from top to bottom and stops once a True condition is found.\n\nKey Takeaways\n\nConditional statements allow your program to make decisions.\n\nif → runs code if a condition is True\n\nelif → checks additional conditions if previous ones were False\n\nelse → runs code if none of the above conditions were True"
      },
      {
        "title": "Two crucial concepts to remember",
        "body": "Indentation defines code blocks.\n\nPython stops checking conditions once it finds the first True condition.\n\nMastering if, elif, and else is essential because they form the backbone of logic and decision-making in Python programs."
      }
    ],
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
        "title": "Filtering pandas DataFrames",
        "body": "Filtering Pandas DataFrames – Notes\n\nIn earlier lessons, you learned how NumPy allows element-wise comparisons that return Boolean arrays. The same idea applies to Pandas DataFrames, since Pandas is built on top of NumPy. This makes filtering data very powerful and intuitive.\n\nLet’s use the BRICS dataset as an example. Suppose we want to keep only the countries whose area is greater than 8 million square kilometers. Filtering a DataFrame like this typically follows three logical steps.\n\nThe 3-Step Filtering Process\n\nFiltering a DataFrame using conditions can be broken down into:\n\nSelect the column you want to evaluate\n\nPerform a comparison to create a Boolean Series\n\nUse that Boolean Series to subset the DataFrame\n\nLet’s walk through this clearly.\n\nStep 1: Select the Column\n\nFirst, we extract the area column. It’s best to retrieve it as a Pandas Series, not a DataFrame.\n\nbrics[\"area\"]\n\nYou could also use .loc or .iloc, but square brackets are perfectly fine here.\n\nStep 2: Perform the Comparison"
      },
      {
        "title": "Next, we compare the area values to 8",
        "body": "brics[\"area\"] > 8\n\nThis returns a Boolean Series — a list of True and False values corresponding to each row. Countries with area greater than 8 million square kilometers will have True; others will have False."
      },
      {
        "title": "You can store this result",
        "body": "`is_huge = brics[\"area\"] > 8`\n\nNow is_huge contains Boolean values aligned with the DataFrame’s rows.\n\nStep 3: Subset the DataFrame\n\nThe final step is to use the Boolean Series to filter the DataFrame:\n\nbrics[is_huge]\n\nThis keeps only the rows where is_huge is True. In this case, the result includes:\n\nBrazil\n\nRussia\n\nChina\n\nThis works because Pandas automatically keeps rows where the Boolean value is True.\n\nWriting It in One Line\n\nInstead of storing the Boolean Series in a separate variable, you can directly place the condition inside the square brackets:\n\nbrics[brics[\"area\"] > 8]\n\nThis is a very common and clean way to filter DataFrames.\n\nUsing Boolean Operators with Pandas\n\nYou can also combine conditions. Since Pandas is built on NumPy, you can use NumPy’s logical functions for element-wise Boolean operations.\n\nSuppose you want countries with area between 8 and 10 million square kilometers. You can use np.logical_and():\n\n`import numpy as np`\n\nbrics[np.logical_and(brics[\"area\"] > 8,\n\nbrics[\"area\"] < 10)]\n\nThis creates a Boolean Series where both conditions must be True. The result includes only:\n\nBrazil\n\nChina\n\nRussia is excluded because its area is much larger than 10.\n\nKey Idea Behind Filtering",
        "exampleCode": "is_huge = brics[\"area\"] > 8\nimport numpy as np"
      },
      {
        "title": "Filtering in Pandas works because",
        "body": "Comparisons on a column return a Boolean Series.\n\nA Boolean Series can be used inside square brackets to filter rows.\n\nOnly rows corresponding to True values are kept.\n\nThis pattern — select column → compare → filter — is one of the most important techniques in data analysis. It allows you to quickly extract meaningful subsets of data in a very readable and efficient way.\n\nOnce you master this, you unlock a huge part of Pandas’ real power."
      }
    ],
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
        "title": "while loop",
        "body": "The while Loop – Notes\n\nIn the previous chapter, you learned about the if-elif-else structure. An if statement checks a condition once, executes the corresponding block if the condition is True, and then continues with the rest of the script. The key idea is that the code inside an if statement runs only once when the condition is checked.\n\nA while loop is similar in that it also checks a condition. However, the major difference is this:\n\nA while loop keeps executing its code block over and over again as long as the condition remains True.\n\nBasic Idea of a While Loop"
      },
      {
        "title": "while condition",
        "body": "expression"
      },
      {
        "title": "Just like with if",
        "body": "There is a colon (:) after the condition.\n\nThe body of the loop must be indented.\n\nThe difference is that instead of running once, the code block repeats until the condition becomes False.\n\nWhen to Use a While Loop"
      },
      {
        "title": "A while loop is useful when you want to",
        "body": "Repeat an action\n\nContinue until a certain condition is met\n\nRun an algorithm until a stopping rule is satisfied\n\nFor example, in numerical modeling or optimization problems, you often repeat calculations until the error becomes small enough.\n\nExample: Reducing Error\n\nSuppose we start with an error value of 50. Our “algorithm” divides the error by 4 each time it runs. We want to keep running the algorithm until the error is no longer greater than 1.\n\n`error = 50`",
        "exampleCode": "error = 50"
      },
      {
        "title": "while error > 1",
        "body": "`error = error / 4`\n\nprint(error)",
        "exampleCode": "error = error / 4"
      },
      {
        "title": "Let’s walk through what happens",
        "body": "The initial error is 50. Since 50 > 1, the condition is True, so the loop runs.\n\nThe error becomes 12.5, and it gets printed.\n\nPython checks the condition again. 12.5 > 1 is still True, so the loop runs again.\n\nThe error becomes 3.125.\n\nThe process repeats until the error drops below 1.\n\nOnce the condition becomes False, the loop stops.\n\nThe loop automatically exits when the condition is no longer satisfied.\n\nThe Crucial Part: Updating the Condition\n\nInside a while loop, something must eventually make the condition False. In our example, the line:\n\n`error = error / 4`\n\nis essential. It updates the variable so that the condition will eventually fail.\n\nIf you remove that update, the value of error never changes. The condition error > 1 would always stay True, and the loop would run forever. This is called an infinite loop.",
        "exampleCode": "error = error / 4"
      },
      {
        "title": "An infinite loop",
        "body": "Never reaches a stopping condition\n\nKeeps running indefinitely\n\nMay freeze or crash your session\n\nIf this happens on your own computer, you can stop the program manually (for example, by pressing Ctrl + C).\n\nKey Takeaways"
      },
      {
        "title": "A while loop",
        "body": "Repeats code as long as a condition is True\n\nUses indentation and a colon, just like if\n\nRequires a change inside the loop so the condition eventually becomes False"
      },
      {
        "title": "The most important thing to remember is",
        "body": "Always make sure your loop has a clear stopping condition.\n\nWithout that, your program may run forever."
      }
    ],
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
        "title": "for loop",
        "body": "The for Loop – Notes\n\nNext to the while loop, Python also provides the for loop, which is ideal for iterating over sequences such as lists, strings, or other iterable objects. The general recipe of a for loop can be read as:\n\nFor each var in seq, execute the expressions.\n\nHere, var is a variable that temporarily holds each element of the sequence seq during each iteration.\n\nExample: Iterating over a List\n\nSuppose you have a list fam containing the heights of your family members:\n\n`fam = [1.73, 1.68, 1.71, 1.89]`\n\nInstead of writing separate print statements for each element, you can use a for loop:",
        "exampleCode": "fam = [1.73, 1.68, 1.71, 1.89]"
      },
      {
        "title": "for height in fam",
        "body": "print(height)"
      },
      {
        "title": "Here’s what happens step by step",
        "body": "Python first evaluates fam and sees that it contains 4 elements.\n\nOn the first iteration, height takes the value 1.73, and print(height) outputs 1.73.\n\nOn the second iteration, height becomes 1.68, which gets printed.\n\nThis process continues until all elements are printed, producing four separate outputs.\n\nThis approach avoids repetitive code, although you don’t have access to the index of the elements in this basic form.\n\nAccessing Indices with enumerate()\n\nIf you want to print both the index and the value, Python provides the enumerate() function. You can rewrite the loop like this:\n\nfor index, height in enumerate(fam):\n\nprint(str(index) + \": \" + str(height))\n\nenumerate(fam) produces two values on each iteration: the index and the value.\n\nindex stores the current position, while height stores the value itself.\n\nYou can then use a print statement to combine both, converting numbers to strings when necessary."
      },
      {
        "title": "This results in output like",
        "body": "0: 1.73\n\n1: 1.68\n\n2: 1.71\n\n3: 1.89\n\nLooping Over Strings\n\nfor loops are not limited to lists. You can also iterate over strings, character by character. For example:"
      },
      {
        "title": "for c in \"family\"",
        "body": "print(c.upper())\n\nEach iteration stores a single character in c.\n\nUsing .upper(), the character is capitalized and printed.\n\nSince \"family\" has 7 characters, the loop produces 7 printouts.\n\nKey Takeaways\n\nThe for loop iterates over sequences, executing the same code block for each element.\n\nUse enumerate() when you need access to the index during iteration.\n\nfor loops work on any iterable, including lists, strings, tuples, and more.\n\nThey are especially useful to replace repetitive code with concise, readable loops.\n\nThis makes for loops an essential tool for structured iteration in Python."
      }
    ],
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
        "title": "Loop Data Structures Part 1",
        "body": "Looping Over Other Data Structures – Notes\n\nSo far, we’ve seen how to loop over lists and strings using the for loop. But what about other common data structures, like dictionaries and NumPy arrays? The same for loop construct works in both cases, but the way you define the sequence to iterate over differs depending on the structure.\n\nLooping Over Dictionaries\n\nConsider a dictionary world that contains country names as keys and populations as values. If you want to print each key-value pair on a new line, you might try directly unpacking them in a loop, similar to how enumerate() works for lists. This approach, however, raises an error because Python doesn’t automatically know how to provide two values per iteration.\n\nThe solution is to call the items() method on the dictionary:\n\nfor key, value in world.items():\n\nprint(key + \": \" + str(value))\n\nitems() generates key-value pairs for each iteration.\n\nThe order of iteration is not fixed in standard Python dictionaries (pre-3.6), so the output may not match the order in which you added elements.\n\nThe variable names are arbitrary; for example, key, value could be k, v. What matters is the order: the first variable receives the key, the second receives the value.\n\nThis is a reliable way to iterate over all dictionary pairs and access both components in the loop.\n\nLooping Over NumPy Arrays\n\nNumPy arrays, the “data science equivalent” of Python lists, can also be iterated over with a basic for loop. For a 1D array, like bmi, a simple loop works perfectly:"
      },
      {
        "title": "for value in bmi",
        "body": "print(value)\n\nHowever, for 2D arrays, things get trickier. Consider a 2D array meas created by combining height and weight arrays:\n\n`meas = np.array([np_height, np_weight])`\n\nUsing a normal for loop on meas prints each row array as a whole, not individual elements. To iterate over each element in a 2D array, use NumPy’s nditer() function:\n\nfor element in np.nditer(meas):\n\nprint(element)\n\nnditer() allows you to iterate element-wise over any array, regardless of its dimensions.\n\nIn our example, it prints all height values first, followed by all weight values, one per line.\n\nKey Takeaways\n\nFor dictionaries, use the items() method to define the sequence of key-value pairs in a for loop.\n\nFor NumPy arrays, use the nditer() function when you need to iterate over each element individually, especially for 2D or higher-dimensional arrays.\n\nThe choice of sequence definition depends on the data structure: dictionaries require a method, while NumPy arrays require a function.\n\nThis approach ensures you can handle more complex data structures efficiently in Python while keeping your loops clean and readable.",
        "exampleCode": "meas = np.array([np_height, np_weight])"
      }
    ],
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
        "title": "Loop Data Structures Part 2",
        "body": "Looping Over Pandas DataFrames – Notes\n\nUp to this point, we’ve learned how to loop over lists, strings, dictionaries, and NumPy arrays. There’s one more “killer” data structure for data analysis that deserves attention: the Pandas DataFrame. Looping over a DataFrame is slightly different from looping over a 2D NumPy array.\n\nBasic For Loop with DataFrames\n\nIf you try a basic for loop on a DataFrame, expecting it to iterate over rows like a 2D array, you’ll quickly notice something unexpected: the loop iterates over column names, not rows. This is because DataFrames don’t automatically treat rows as the default sequence for iteration. To explicitly iterate over rows, you need a dedicated method.\n\nUsing iterrows()\n\nThe iterrows() method allows you to loop over DataFrame rows in a controlled way. Each iteration returns two pieces of data: the row label and the row itself as a Pandas Series. For example:\n\nfor lab, row in brics.iterrows():\n\nprint(lab)\n\nprint(row)\n\nlab contains the row index (label).\n\nrow contains the row data as a Series, allowing you to select specific columns using familiar subsetting techniques.\n\nThis is useful if you want to perform operations or print selective information. For instance, to print the label and the capital of each country:\n\nfor lab, row in brics.iterrows():\n\nprint(lab, row[\"capital\"])\n\nAdding a New Column via a Loop\n\nYou can also use iterrows() to calculate and add new columns to a DataFrame. For example, adding a column name_length to store the number of characters in each country’s name:\n\nIterate over rows with iterrows().\n\nCalculate the length of the country name using len(row[\"country\"]).\n\nAssign this value to a new column using loc[lab, \"name_length\"].\n\nfor lab, row in brics.iterrows():\n\n`brics.loc[lab, \"name_length\"] = len(row[\"country\"])`\n\nThis works fine for small DataFrames, but it’s inefficient because a new Series object is created on every iteration. For very large datasets, this can slow down performance.\n\nUsing apply() – The Vectorized Approach\n\nA more efficient and readable alternative to a for loop is the apply() function. It allows you to perform element-wise operations on a DataFrame column without explicit iteration. For example, to create the same name_length column:\n\n`brics[\"name_length\"] = brics[\"country\"].apply(len)`\n\nHere, len is applied to each element in the country column.\n\nThis produces a new array that can be stored directly in the DataFrame.\n\nThe code is cleaner, faster, and more \"Pythonic\" than using a for loop.\n\nKey Takeaways\n\nLooping over a DataFrame with a simple for loop iterates over columns, not rows.\n\nUse iterrows() to iterate over rows, getting both the label and row data as a Series.\n\nYou can perform selective operations or add new columns with iterrows(), but it’s not the most efficient method for large datasets.\n\nUse apply() for vectorized, element-wise operations on a column—cleaner, faster, and easier to read.\n\nMastering both iterrows() and apply() equips you with flexible tools for iterating, transforming, and manipulating DataFrames effectively.",
        "exampleCode": "brics.loc[lab, \"name_length\"] = len(row[\"country\"])\nbrics[\"name_length\"] = brics[\"country\"].apply(len)"
      }
    ],
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
        "title": "Random Numbers",
        "body": "Random Numbers – Notes\n\nIn this chapter, we move into a more applied scenario using everything we’ve learned so far. The focus is on simulating random processes in Python, which allows us to model complex, probabilistic events without relying solely on analytical solutions.\n\nExample Scenario\n\nImagine a game where you’re walking up the Empire State Building to DataCamp Headquarters. You throw a die 100 times, with these rules:\n\nIf the die shows 1 or 2, you move one step down.\n\nIf it shows 3, 4, or 5, you move one step up.\n\nIf it shows 6, you roll the die again and move up by that number of steps.\n\nAdditional rules: you cannot go below step 0, and there is a 0.1% chance of falling down the stairs with each move, sending you back to step 0. Your goal is to see the probability of reaching step 60.\n\nRather than solving this analytically, we can simulate the process thousands of times and calculate the fraction of simulations where we reach 60 steps. This is a practical application of “hacker statistics” — using computation to explore probability.\n\nRandom Number Generators\n\nTo simulate these random processes, we rely on NumPy’s random generators.\n\nImport NumPy and access its random package.\n\nThe rand() function generates a random number between 0 and 1.\n\nBehind the scenes, these numbers are pseudo-random, meaning they are generated by a mathematical formula starting from a seed. You can set the seed manually for reproducibility:\n\n`import numpy as np`\n\nnp.random.seed(123)\n\nnp.random.rand()\n\nnp.random.rand()\n\nSetting the seed to the same number will produce the same sequence of random numbers every time.\n\nThis reproducibility is crucial in data science, as it allows others to reproduce your experiments.\n\nSimulating a Coin Toss\n\nRandom numbers can simulate simple events like a coin toss:\n\nSet a seed for reproducibility.\n\nUse randint(0, 2) to randomly generate 0 or 1.\n\nCombine with an if-else statement to interpret the result:\n\nnp.random.seed(123)\n\n`coin = np.random.randint(0, 2)`",
        "exampleCode": "import numpy as np\ncoin = np.random.randint(0, 2)"
      },
      {
        "title": "if coin == 0",
        "body": "print(\"heads\")"
      },
      {
        "title": "else",
        "body": "print(\"tails\")\n\nHere, 0 represents “heads” and 1 represents “tails”.\n\nBecause the seed is fixed, the coin toss result is consistent between runs.\n\nThis demonstrates how random numbers can be used to simulate real-life chance events in Python, laying the foundation for more complex simulations, like the dice game described earlier.\n\nKey Points\n\nRandom numbers generated in Python are pseudo-random, controlled by a seed.\n\nReproducibility is achieved by setting the seed.\n\nNumPy functions like rand() and randint() allow for flexible simulations of probabilistic events.\n\nCombining randomness with control structures (e.g., if-else) lets us model complex scenarios and explore probabilities computationally.\n\nThis forms the backbone for simulation-based probability studies, Monte Carlo methods, and other stochastic modeling in Python."
      }
    ],
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
        "title": "Random Walk",
        "body": "Random Walk – Notes\n\nIn probability and simulation, a random step occurs when the next move in a process is determined by chance, such as rolling a die. If this random decision happens repeatedly, the sequence of movements is called a random walk. For example, if you roll a die 100 times and let each roll determine whether you move up or down a step, the resulting sequence of movements forms a random walk.\n\nRandom walks are widely used in science and modeling. They help describe processes where movement or change happens unpredictably over time. For instance, the path of a molecule moving through a liquid or gas can be modeled as a random walk. Another example is the financial status of a gambler, which can increase or decrease randomly depending on wins and losses. To simulate such processes in Python, we need a way to record each step over time, which can be done by gradually building a list inside a loop.\n\nRecording Random Outcomes with a Loop\n\nOne way to start understanding random processes is by simulating a simple heads-or-tails game several times. In Python, this can be done using NumPy’s random number generator."
      },
      {
        "title": "The basic idea is",
        "body": "Import NumPy and set a random seed for reproducibility.\n\nCreate an empty list to store outcomes.\n\nRun a for loop a certain number of times (for example, 10).\n\nIn each iteration, generate a random number (0 or 1).\n\nAppend either \"heads\" or \"tails\" to the list depending on the result.\n\nThe loop uses the range() function, which generates a sequence of numbers that the loop can iterate over. During each iteration, the outcome is added to the list using the append() method. After the loop finishes, the list contains all outcomes from the 10 simulated coin tosses.\n\nAlthough this produces random results, it does not yet form a random walk, because each outcome is independent and not influenced by previous outcomes.\n\nTurning Random Outcomes into a Random Walk\n\nTo create a true random walk, we must track how the result changes over time based on previous values. In the coin toss example, this can be done by tracking the total number of tails thrown so far.\n\nInstead of storing strings like \"heads\" or \"tails\", we store the cumulative count of tails. The process works like this:\n\nStart with a list called tails that contains a single value [0], since initially no tails have been thrown.\n\nRun a loop 10 times using range().\n\nGenerate a random number (0 for heads, 1 for tails).\n\nAdd the result (coin) to the previous number of tails.\n\nAppend this new value to the list.\n\nEach new value depends on the previous state, meaning the sequence evolves step by step. When the script finishes, the list contains 11 numbers (the starting value plus 10 steps).\n\nFrom Random Steps to Random Walk\n\nWhen comparing the simple outcomes list with the cumulative tails list, the difference becomes clear. In the second version:\n\nThe numbers increase by 1 whenever tails appears.\n\nThe sequence reflects the history of previous events.\n\nThis transformation—from independent random results to a cumulative process—is what turns random steps into a random walk. Random walks are an important concept in data science and statistics because they help model many real-world systems where change happens gradually and unpredictably over time."
      }
    ],
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
        "title": "Distribution of Random Walk",
        "body": "Distribution of Random Walks – Notes\n\nIn this final segment, we explore how to understand the distribution of outcomes in a random walk. Recall the scenario: you roll a die 100 times, and depending on the result, you move steps up or down. This sequence of steps forms a random walk. While simulating a single walk gives one possible outcome, the question we want to answer is: what is the chance of reaching a certain step, like step 60?\n\nThe key idea is that each simulation of the random walk may end at a different final step. If we repeat the walk thousands of times, we obtain a set of final steps. This set represents a distribution of outcomes, from which we can estimate probabilities.\n\nRandom Walk Example with Coin Toss\n\nWe can illustrate this concept with a simpler example: tracking the total number of tails in 10 coin tosses. Starting at zero, we generate a random number 10 times, either 0 (heads) or 1 (tails), and cumulatively track the number of tails. After 10 tosses, we record the final count of tails.\n\nTo examine the distribution of results across many trials:\n\nSet a random seed for reproducibility.\n\nCreate an empty list called final_tails to store the outcomes.\n\nRun a for loop a number of times (say, 100 iterations) to simulate repeated games.\n\nInside the loop, build the tails list as before.\n\nAfter each simulated game, append the last element of the tails list (the final number of tails) to final_tails.\n\nThe result is a list of integers between 0 and 10, each representing the outcome of a single 10-toss game.\n\nThese values form a distribution, which we can visualize using a histogram.\n\nVisualizing the Distribution"
      },
      {
        "title": "To create a histogram of the simulated outcomes",
        "body": "Import pyplot from Matplotlib.\n\nReplace the print statement with plt.hist(final_tails, bins=10).\n\nCall plt.show() to display the plot.\n\nAs you increase the number of simulations, the histogram becomes smoother:\n\n100 runs: Gives a rough idea of the distribution.\n\n1,000 runs: The histogram starts to show a clearer pattern.\n\n10,000 runs: The distribution starts to converge to a bell shape, resembling the theoretical binomial distribution.\n\nFrom such a curve, we can extract probabilities. For instance, in 10,000 games, about 2,500 games might result in exactly 5 tails.\n\nKey Takeaways\n\nRandom walks produce distributions: Repeating the simulation many times allows us to estimate probabilities.\n\nVisualization helps: Histograms reveal the shape and tendencies of the distribution.\n\nConvergence: Increasing the number of simulations brings the empirical distribution closer to the theoretical one.\n\nThis technique can be extended to more complex scenarios, such as the Empire State Building die-rolling game, allowing you to estimate the probability of reaching step 60 or any other outcome.\n\nSimulating random processes repeatedly and analyzing the distribution of results is a powerful method in data science for understanding chance and probability in complex systems."
      }
    ],
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
        "title": "Data Aggregation",
        "body": "Data Aggregation Fundamentals\n\nA data summary provides insights that would otherwise be difficult to recognize by examining raw data.\n\nData aggregation is the data manipulation operation used to summarize data by applying operations to specific columns to produce single values.\n\nDesign Framework\n\nTo effectively design a data aggregation operation, answer two key questions:\n\nWhich column do we wish to summarize? Select the column containing values relevant to your question.\n\nWhich summary operation do we wish to apply? Choose the appropriate operation based on the insight you need.\n\nMean vs. Median\n\nThe mean is the sum of all values divided by the number of values.\n\nThe median is the middle value when data is sorted.\n\nThe median is not affected by outliers because it only considers the middle value(s), while the mean is influenced by outliers because it takes into account all values.\n\nChoose median when you don't want outliers to affect your summary, and mean when there are no outliers or when you want to capture their effect.\n\nWorking with DataFrames\n\nIn Python, a table of data is called a DataFrame. We often create a new DataFrame by loading data into Python from CSV files.\n\n`orders_df = pd.read_csv('orders.csv')`\n\nTo extract a column from a DataFrame, use the bracket [] operator. The column is returned as a Series.\n\n`amounts = orders_df['amount']`\n\nSummarizing Data in Python\n\nTo summarize data in Python, we apply our aggregation method on the extracted columns:\n\namounts= orders_df['amount']\n\n`total_revenue = amounts.sum()`",
        "exampleCode": "orders_df = pd.read_csv('orders.csv')\namounts = orders_df['amount']\ntotal_revenue = amounts.sum()"
      },
      {
        "title": "The key summary methods",
        "body": "sum(): Calculates the total of all values\n\nmean(): Calculates the average value\n\nmedian(): Identifies the middle value when data is sorted\n\nmin() and max(): Finds the minimum or maximum value\n\ncount(): Counts the number of rows or values\n\nnunique(): Counts the number of unique values"
      }
    ],
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
        "title": "Introduction to DataFrames",
        "body": "Introducing DataFrames (Pandas Notes)\n\nWhat is pandas?\n\npandas is a powerful Python package mainly used for data manipulation and analysis. It is one of the most important tools in data science because real-world data is usually large, messy, and stored in tables. pandas helps organize and work with this data efficiently."
      },
      {
        "title": "The course introduces pandas step by step",
        "body": "Chapter 1 focuses on DataFrames\n\nChapter 2 covers aggregating and analyzing data\n\nChapter 3 teaches slicing and indexing"
      },
      {
        "title": "Chapter 4 discusses",
        "body": "visualization\n\nmissing data\n\nimporting data into DataFrames\n\npandas is built on NumPy and Matplotlib\n\npandas is built on top of two important Python libraries:\n\nNumPy — provides fast multidimensional arrays and numerical operations.\n\nMatplotlib — provides data visualization and plotting features.\n\nBecause pandas uses these libraries internally, it becomes both powerful and flexible for handling datasets.\n\nWhy pandas is popular\n\npandas is widely used in the data science community because it simplifies working with datasets. Millions of Python users rely on it for tasks such as:\n\ncleaning data\n\nfiltering information\n\nperforming calculations\n\nanalyzing trends\n\npreparing data for machine learning\n\nvisualizing results\n\nIt has become one of the standard tools for data analysis in Python.\n\nRectangular or Tabular Data\n\nMost datasets are stored in rectangular (tabular) form, similar to spreadsheets or database tables.\n\nExample: a dataset about dogs.\n\nEach row represents one observation (one dog)."
      },
      {
        "title": "Each column represents a variable or property",
        "body": "name\n\nbreed\n\nage\n\nweight\n\ncolor\n\nThis table-like structure is exactly what pandas is designed to handle.\n\nDataFrames\n\nThe main object in pandas is the DataFrame."
      },
      {
        "title": "A DataFrame is a table with",
        "body": "`rows = observations`\n\n`columns = variables/features`\n\nEach column contains values of the same data type, but different columns may contain different types.",
        "exampleCode": "rows = observations\ncolumns = variables/features"
      },
      {
        "title": "Example",
        "body": "age → integers\n\nweight → floats\n\nname → strings\n\nThis flexibility makes DataFrames better than regular NumPy arrays for mixed datasets.\n\nExploring a DataFrame\n\nWhen receiving a new dataset, the first step is usually to explore and understand it.\n\npandas provides several useful methods and attributes for this.\n\n.head()\n\nThe .head() method displays the first few rows of a DataFrame.\n\ndogs.head()\n\nThis is useful for quickly previewing the dataset structure and contents.\n\nBy default, it shows the first 5 rows.\n\n.info()\n\nThe .info() method gives technical information about the DataFrame.\n\ndogs.info()"
      },
      {
        "title": "It shows",
        "body": "column names\n\ndata types\n\nnumber of non-missing values\n\nmemory usage\n\nThis is especially useful for checking missing data and understanding the structure of the dataset.\n\n.shape\n\nThe .shape attribute returns the dimensions of the DataFrame.\n\ndogs.shape"
      },
      {
        "title": "Output example",
        "body": "(7, 4)"
      },
      {
        "title": "Meaning",
        "body": "7 rows\n\n4 columns\n\nUnlike methods, attributes do not use parentheses.\n\n.describe()\n\nThe .describe() method generates summary statistics for numerical columns.\n\ndogs.describe()"
      },
      {
        "title": "It usually includes",
        "body": "count\n\nmean\n\nstandard deviation\n\nminimum value\n\nquartiles\n\nmaximum value\n\nThis gives a quick statistical overview of numeric data.\n\nComponents of a DataFrame\n\nA DataFrame has three important parts.\n\n1. Data Values → .to_numpy()\n\nYou can convert the DataFrame values into a NumPy array.\n\ndogs.to_numpy()\n\nThis returns a 2D NumPy array containing only the raw data values.\n\n2. Column Labels → .columns\n\nThe .columns attribute contains the column names.\n\ndogs.columns"
      },
      {
        "title": "Example output",
        "body": "Index(['name', 'breed', 'age'])\n\n3. Row Labels → .index\n\nThe .index attribute stores row labels.\n\ndogs.index"
      },
      {
        "title": "These labels may be",
        "body": "row numbers\n\ncustom names\n\ndates\n\nIDs\n\nImportant note:\u000b Row labels are accessed using .index, not .rows.\n\npandas Philosophy\n\nPython generally follows the idea that there should be one obvious way to solve a problem. pandas is different."
      },
      {
        "title": "In pandas",
        "body": "there are often multiple ways to do the same task\n\nusers can choose whichever method they prefer"
      },
      {
        "title": "This makes pandas",
        "body": "very flexible\n\nextremely powerful\n\nslightly harder to learn at first\n\nA good way to think about pandas is like a Swiss Army knife:\u000b it provides many tools for handling data efficiently.\n\nKey Takeaways\n\npandas is a Python library for data analysis and manipulation.\n\nThe main pandas structure is the DataFrame.\n\nDataFrames store data in rows and columns.\n\npandas works especially well with tabular data."
      },
      {
        "title": "Important exploration tools include",
        "body": ".head()\n\n.info()\n\n.shape\n\n.describe()"
      },
      {
        "title": "DataFrames also contain",
        "body": "values\n\ncolumn labels\n\nrow labels\n\npandas is built on top of NumPy and Matplotlib."
      }
    ],
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
        "title": "Sorting and Subsetting",
        "body": "Sorting and Subsetting in pandas\n\nSorting and subsetting are two of the most important skills when working with pandas DataFrames. These techniques help you quickly focus on the most useful or interesting parts of your dataset.\n\nA DataFrame can contain thousands or even millions of rows, so instead of looking at everything at once, you usually:\n\nsort the data to organize it better\n\nsubset the data to focus only on specific rows or columns\n\nSorting Data\n\nSorting changes the order of the rows in a DataFrame.\n\nIn pandas, this is done using the .sort_values() method.\n\nSorting by One Column\n\nSuppose you have a dogs DataFrame and want to sort dogs by weight.\n\ndogs.sort_values(\"weight_kg\")\n\nThis sorts the rows from smallest weight to largest weight by default."
      },
      {
        "title": "Result",
        "body": "lightest dog appears first\n\nheaviest dog appears last\n\nSorting in Descending Order\n\nTo reverse the order, use the ascending=False argument.\n\ndogs.sort_values(\"weight_kg\", ascending=False)\n\nNow the heaviest dogs appear first.\n\nSorting by Multiple Columns\n\nYou can also sort using more than one column.\n\ndogs.sort_values([\"weight_kg\", \"height_cm\"])"
      },
      {
        "title": "This means",
        "body": "sort by weight first\n\nif weights are equal, sort by height\n\nThis is useful when several rows share the same values in one column.\n\nDifferent Sort Directions for Multiple Columns\n\nYou can control the direction for each column separately using a list in ascending.\n\ndogs.sort_values(\n\n[\"weight_kg\", \"height_cm\"],\n\nascending=[True, False]\n\n)"
      },
      {
        "title": "Meaning",
        "body": "weight → ascending\n\nheight → descending\n\nSo rows with equal weight are ordered from tallest to shortest.\n\nSubsetting Columns\n\nSubsetting means selecting only the data you need."
      },
      {
        "title": "To select one column",
        "body": "dogs[\"name\"]\n\nThis returns a pandas Series containing only the name column.\n\nSelecting Multiple Columns\n\nTo keep multiple columns, use double square brackets.\n\ndogs[[\"name\", \"height_cm\"]]\n\nWhy double brackets?\n\nouter brackets → subset the DataFrame\n\ninner brackets → create a list of column names\n\nThe result is a smaller DataFrame containing only those columns.\n\nSubsetting Rows\n\nRows are usually filtered using conditions that produce True or False.\n\nFiltering Numeric Data\n\nExample: dogs taller than 50 cm.\n\ndogs[\"height_cm\"] > 50"
      },
      {
        "title": "This produces a Boolean Series",
        "body": "True if condition matches\n\nFalse otherwise"
      },
      {
        "title": "To actually filter the DataFrame",
        "body": "dogs[dogs[\"height_cm\"] > 50]\n\nOnly rows where the condition is True are returned.\n\nFiltering Text Data\n\nYou can also filter categorical or text columns.\n\nExample: get only Labradors.\n\ndogs[dogs[\"breed\"] == \"Labrador\"]\n\nThe double equals == checks equality.\n\nFiltering Dates\n\nDates can also be compared.\n\nExample: dogs born before 2015.\n\ndogs[dogs[\"date_of_birth\"] < \"2015-01-01\"]"
      },
      {
        "title": "Date format used",
        "body": "YYYY-MM-DD\n\nThis is the international standard format.\n\nFiltering with Multiple Conditions\n\nSometimes one condition is not enough."
      },
      {
        "title": "Example",
        "body": "dogs taller than 50 cm\n\nAND weighing more than 20 kg\n\ndogs[\n\n(dogs[\"height_cm\"] > 50) &\n\n(dogs[\"weight_kg\"] > 20)\n\n]"
      },
      {
        "title": "Important",
        "body": "use parentheses around each condition"
      },
      {
        "title": "use",
        "body": "& for AND\n\n| for OR\n\nIn pandas, you do not use normal Python and and or for Series comparisons.\n\nFiltering with .isin()\n\nIf you want multiple possible values from a category, .isin() is easier.\n\nExample: dogs that are black or brown.\n\ndogs[dogs[\"color\"].isin([\"Black\", \"Brown\"])]\n\n.isin() checks whether each value exists inside the list provided.\n\nKey Takeaways"
      },
      {
        "title": "Sorting",
        "body": ".sort_values() sorts rows\n\nascending=False reverses order\n\nmultiple columns can be used for sorting"
      },
      {
        "title": "Subsetting Columns",
        "body": "single brackets → one column\n\ndouble brackets → multiple columns"
      },
      {
        "title": "Subsetting Rows",
        "body": "use logical conditions\n\nconditions return Boolean values\n\nplace conditions inside square brackets"
      },
      {
        "title": "Useful filtering techniques",
        "body": "numeric filtering\n\ntext filtering\n\ndate filtering\n\nmultiple conditions using & and |\n\n.isin() for multiple category values\n\nThese operations are essential because most real-world data analysis involves:\n\norganizing data\n\nfiltering relevant information\n\nnarrowing large datasets into useful insights"
      }
    ],
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
        "title": "New Columns",
        "body": "New Columns in pandas\n\nWhen working with pandas DataFrames, the data you receive is often not exactly in the format you need. Because of this, one of the most common tasks in pandas is creating new columns based on existing data."
      },
      {
        "title": "This process can also be called",
        "body": "transforming a DataFrame\n\nmutating a DataFrame\n\nfeature engineering\n\nFeature engineering is especially important in data science and machine learning because new variables can reveal better insights from the data.\n\nAdding a New Column\n\nCreating a new column is straightforward in pandas."
      },
      {
        "title": "The general format is",
        "body": "`df[\"new_column\"] = calculation`\n\nLeft side → name of the new column\n\nRight side → calculation or transformation\n\nExample: Converting Height to Meters\n\nSuppose the dogs DataFrame has a column called height_cm.",
        "exampleCode": "df[\"new_column\"] = calculation"
      },
      {
        "title": "To create a new column for height in meters",
        "body": "`dogs[\"height_m\"] = dogs[\"height_cm\"] / 100`",
        "exampleCode": "dogs[\"height_m\"] = dogs[\"height_cm\"] / 100"
      },
      {
        "title": "What happens here",
        "body": "pandas takes every value in height_cm\n\ndivides it by 100\n\nstores the result in a new column called height_m\n\nThe original DataFrame is updated automatically.\n\nCreating Columns Using Multiple Existing Columns\n\nNew columns can also be created using calculations involving several columns.\n\nExample: Doggy BMI\n\nBMI (Body Mass Index) is calculated as:\n\n`BMI = weight / (height²)`",
        "exampleCode": "BMI = weight / (height²)"
      },
      {
        "title": "For dogs",
        "body": "`dogs[\"bmi\"] = dogs[\"weight_kg\"] / dogs[\"height_m\"] ** 2`",
        "exampleCode": "dogs[\"bmi\"] = dogs[\"weight_kg\"] / dogs[\"height_m\"] ** 2"
      },
      {
        "title": "Explanation",
        "body": "dogs[\"height_m\"] ** 2\u000b → squares the height values\n\nweight is divided by squared height\n\nresults are stored in a new bmi column\n\nThis demonstrates how pandas performs calculations element-by-element across entire columns.\n\nCombining Multiple pandas Operations\n\nThe real strength of pandas comes from chaining operations together."
      },
      {
        "title": "You can",
        "body": "create new columns\n\nfilter rows\n\nsort data\n\nselect specific columns\n\nall in a logical workflow.\n\nExample: Finding Tall Skinny Dogs\n\nSuppose we define skinny dogs as dogs with BMI below 100."
      },
      {
        "title": "First, filter the DataFrame",
        "body": "`skinny_dogs = dogs[dogs[\"bmi\"] < 100]`",
        "exampleCode": "skinny_dogs = dogs[dogs[\"bmi\"] < 100]"
      },
      {
        "title": "Next, sort by height in descending order",
        "body": "`skinny_dogs = skinny_dogs.sort_values(`\n\n\"height_cm\",\n\nascending=False\n\n)",
        "exampleCode": "skinny_dogs = skinny_dogs.sort_values("
      },
      {
        "title": "Finally, select only the columns we want",
        "body": "skinny_dogs[[\"name\", \"height_cm\", \"bmi\"]]\n\nThis produces a cleaner DataFrame focused only on the relevant information.\n\nWhy New Columns Are Important"
      },
      {
        "title": "Creating derived columns allows you to",
        "body": "calculate statistics\n\nconvert units\n\nclassify observations\n\nprepare features for machine learning\n\nsimplify analysis\n\nInstead of manually calculating values one at a time, pandas automatically performs operations across entire columns efficiently.\n\nKey Takeaways"
      },
      {
        "title": "New columns are created using",
        "body": "`df[\"new_column\"] = calculation`",
        "exampleCode": "df[\"new_column\"] = calculation"
      },
      {
        "title": "Calculations can use",
        "body": "constants\n\none column\n\nmultiple columns\n\npandas performs operations element-wise across rows automatically."
      },
      {
        "title": "Creating new columns is commonly called",
        "body": "mutation\n\ntransformation\n\nfeature engineering\n\npandas becomes especially powerful when combining:\n\nfiltering\n\nsorting\n\ncolumn selection\n\nnew column creation\n\nThese transformations are a core part of real-world data analysis workflows."
      }
    ],
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
        "title": "Summary Statistics",
        "body": "Summary Statistics in pandas\n\nIn pandas, summary statistics are numerical values that help describe and summarize a dataset. Instead of manually checking every row, summary statistics give a quick overview of the data and help identify patterns, trends, or unusual values.\n\nThis chapter focuses on aggregating data, which means combining many values into meaningful summaries.\n\nSummarizing Numerical Data\n\nOne of the most common summary statistics is the mean (average). The mean gives an idea of the “center” of the data."
      },
      {
        "title": "To calculate the mean of a column",
        "body": "dogs[\"weight_kg\"].mean()\n\nThis computes the average weight of all dogs in the dataset.\n\nCommon Summary Statistics\n\npandas provides many built-in statistical methods."
      },
      {
        "title": "Some important ones are",
        "body": "Method\n\nDescription\n\n.mean()\n\nAverage value\n\n.median()\n\nMiddle value\n\n.mode()\n\nMost common value\n\n.min()\n\nSmallest value\n\n.max()\n\nLargest value\n\n.var()\n\nVariance\n\n.std()\n\nStandard deviation\n\n.sum()\n\nTotal sum\n\n.quantile()\n\nSpecific percentile"
      },
      {
        "title": "Example",
        "body": "dogs[\"height_cm\"].median()\n\nThis returns the median height.\n\nSummarizing Dates\n\nSummary statistics also work for date columns."
      },
      {
        "title": "For example",
        "body": "dogs[\"date_of_birth\"].min()\n\nThis gives the oldest dog's birth date because earlier dates are smaller."
      },
      {
        "title": "Similarly",
        "body": "dogs[\"date_of_birth\"].max()\n\nreturns the youngest dog's birth date.\n\nThe .agg() Method\n\nThe .agg() method (short for aggregate) allows you to compute custom or multiple summary statistics.\n\nYou can create your own function and apply it to a column.\n\nExample: 30th Percentile\n\ndef pct30(column):\n\nreturn column.quantile(0.3)\n\nThis function returns the 30th percentile of a column.\n\nUsing .agg():\n\ndogs[\"weight_kg\"].agg(pct30)\n\nThis computes the 30th percentile of dog weights.\n\nUsing .agg() on Multiple Columns\n\nYou can apply the same aggregation to several columns at once.\n\ndogs[[\"weight_kg\", \"height_cm\"]].agg(pct30)\n\nThis calculates the 30th percentile for both weight and height.\n\nMultiple Summary Statistics at Once\n\n.agg() can also calculate several statistics simultaneously."
      },
      {
        "title": "Example",
        "body": "def pct40(column):\n\nreturn column.quantile(0.4)"
      },
      {
        "title": "Now apply both functions",
        "body": "dogs[\"weight_kg\"].agg([pct30, pct40])"
      },
      {
        "title": "This returns",
        "body": "30th percentile\n\n40th percentile\n\nfor the same column.\n\nThis is useful when comparing different summaries together.\n\nCumulative Statistics\n\nUnlike normal summary statistics that return one value, cumulative statistics return a running total or running calculation across rows.\n\nCumulative Sum\n\nThe .cumsum() method computes a running total.\n\ndogs[\"weight_kg\"].cumsum()"
      },
      {
        "title": "How it works",
        "body": "first row → first value\n\nsecond row → first + second\n\nthird row → first + second + third\n\nand so on\n\nThe last value equals the total sum of the column.\n\nOther Cumulative Methods"
      },
      {
        "title": "pandas also provides other cumulative functions",
        "body": "Method\n\nDescription\n\n.cumsum()\n\nCumulative sum\n\n.cummax()\n\nRunning maximum\n\n.cummin()\n\nRunning minimum\n\n.cumprod()\n\nRunning product\n\nThese methods return an entire Series instead of one summary number.\n\nWalmart Dataset\n\nThe course introduces a Walmart dataset to practice aggregation and summary statistics."
      },
      {
        "title": "The dataset includes",
        "body": "weekly sales\n\nstore IDs\n\nstore types\n\ndepartment IDs\n\nholiday information\n\ntemperature\n\nfuel prices\n\nunemployment rates"
      },
      {
        "title": "This type of dataset is ideal for",
        "body": "calculating averages\n\ncomparing stores\n\nanalyzing trends\n\nsummarizing performance\n\nKey Takeaways\n\nSummary statistics help quickly understand datasets without examining every row."
      },
      {
        "title": "Important pandas methods include",
        "body": ".mean()\n\n.median()\n\n.min()\n\n.max()\n\n.std()\n\n.quantile()\n\nThe .agg() method:\n\napplies custom functions\n\nworks on one or multiple columns\n\ncan compute multiple statistics simultaneously"
      },
      {
        "title": "Cumulative methods like",
        "body": ".cumsum()\n\n.cummax()\n\n.cummin()\n\nreturn running calculations across rows.\n\nThese tools are essential in real-world data analysis because they help transform raw data into meaningful insights quickly and efficiently."
      }
    ],
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
        "title": "Counting",
        "body": "Counting and Summarizing Categorical Data in pandas\n\nIn pandas, summary statistics are not only useful for numbers. Sometimes, you also need to summarize categorical data such as:\n\ndog breeds\n\ncolors\n\nstore types\n\ndepartments\n\ncategories\n\nThe most common way to summarize categorical variables is through counting.\n\nThe Problem of Double Counting\n\nImagine a dataset containing vet visits.\n\nA dog may visit the vet multiple times, meaning the same dog can appear in several rows."
      },
      {
        "title": "Example",
        "body": "name\n\nbreed\n\nMax\n\nLabrador\n\nStella\n\nChihuahua\n\nMax\n\nLabrador\n\nIf we directly count breeds, the same dog could be counted multiple times, leading to inaccurate results.\n\nTo avoid this, we first remove duplicates.\n\nRemoving Duplicate Rows\n\nThe .drop_duplicates() method removes repeated rows.\n\nDropping Duplicates Based on One Column\n\nSuppose we only want one row per dog name.\n\nvet_visits.drop_duplicates(subset=\"name\")\n\nThis keeps only the first occurrence of each dog name.\n\nHowever, this can create problems if different dogs share the same name."
      },
      {
        "title": "Example",
        "body": "Max the Labrador\n\nMax the Chow Chow\n\nOne of them would disappear.\n\nDropping Duplicates Using Multiple Columns"
      },
      {
        "title": "To better identify unique dogs, we can use both",
        "body": "name\n\nBreed\n\nvet_visits.drop_duplicates(\n\nsubset=[\"name\", \"breed\"]\n\n)\n\nNow pandas only removes rows where both the name and breed are duplicates.\n\nThis preserves dogs that share the same name but are different breeds.\n\nCounting Categories with .value_counts()\n\nOnce duplicates are removed, we can count occurrences of each category."
      },
      {
        "title": "Example",
        "body": "unique_dogs[\"breed\"].value_counts()\n\nThis counts how many dogs belong to each breed."
      },
      {
        "title": "Output example",
        "body": "Labrador     4\n\nChihuahua    2\n\nPoodle       1\n\nBy default, results are sorted from highest count to lowest count.\n\nSorting Counts\n\nYou can control sorting using the sort argument.\n\nunique_dogs[\"breed\"].value_counts(sort=True)\n\nThis keeps the largest counts at the top.\n\nCalculating Proportions\n\nInstead of raw counts, you may want percentages or proportions.\n\nUse normalize=True.\n\nunique_dogs[\"breed\"].value_counts(\n\nnormalize=True\n\n)"
      },
      {
        "title": "Output example",
        "body": "Labrador     0.25\n\nChihuahua    0.15"
      },
      {
        "title": "Meaning",
        "body": "25% are Labradors\n\n15% are Chihuahuas\n\nThese are proportions of the total dataset.\n\nWhy Counting is Important\n\nCounting categorical data helps answer questions like:\n\nWhich category appears most often?\n\nWhat percentage belongs to each group?\n\nWhich values are rare?\n\nHow is the data distributed?"
      },
      {
        "title": "This is extremely common in",
        "body": "surveys\n\ncustomer analysis\n\nsales data\n\nmachine learning preprocessing\n\nKey Takeaways\n\nCategorical data is summarized mainly through counting.\n\n.drop_duplicates() removes repeated rows.\n\nsubset= specifies which columns determine duplicates.\n\nMultiple columns can be used for more accurate duplicate handling."
      },
      {
        "title": "Counting methods",
        "body": ".value_counts() → counts occurrences\n\nnormalize=True → converts counts into proportions\n\nThese tools are essential for understanding distributions in categorical datasets and avoiding misleading duplicate counts."
      }
    ],
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
        "title": "Grouped summary statistics",
        "body": "Grouped Summary Statistics in pandas\n\nGrouped summary statistics let you calculate statistics for different categories or groups inside your dataset instead of calculating everything for the whole DataFrame at once. This is useful because comparing groups often reveals patterns and insights that would otherwise stay hidden."
      },
      {
        "title": "For example, instead of asking",
        "body": "“What is the average weight of all dogs?”"
      },
      {
        "title": "you can ask",
        "body": "“What is the average weight for each dog color?”\u000b “Which breed is tallest on average?”\u000b “Do male dogs weigh more than female dogs?”\n\nThis is where the groupby() method becomes extremely powerful.\n\nWhy Use groupby()?\n\nWithout groupby(), you would have to manually create subsets for every category and calculate statistics one by one. That quickly becomes repetitive and messy.\n\nFor example, you could filter all black dogs, compute their mean weight, then repeat for brown dogs, white dogs, and so on. But that creates duplicate code and increases the chance of mistakes.\n\ngroupby() automates this process.\n\nBasic Grouped Summary\n\nSuppose we have a DataFrame called dogs with columns like:\n\ncolor\n\nbreed\n\nweight_kg\n\nheight_cm\n\nIf we want the average weight for each dog color, we can do:\n\ndogs.groupby(\"color\")[\"weight_kg\"].mean()\n\nWhat happens here?"
      },
      {
        "title": "Step by step",
        "body": "groupby(\"color\")\n\nSplits the dataset into groups based on dog color.\n\n[\"weight_kg\"]\n\nSelects the weight column.\n\n.mean()\n\nCalculates the average weight for each group."
      },
      {
        "title": "The result might look like",
        "body": "black    26.5\n\nbrown    21.3\n\nwhite    18.7\n\nThis means black dogs weigh 26.5 kg on average, brown dogs 21.3 kg, and so on.\n\nMultiple Summary Statistics with .agg()\n\nYou are not limited to just one statistic. Using .agg() allows you to calculate several statistics at once."
      },
      {
        "title": "Example",
        "body": "dogs.groupby(\"color\")[\"weight_kg\"].agg([min, max, sum])"
      },
      {
        "title": "This calculates",
        "body": "Minimum weight\n\nMaximum weight\n\nTotal weight\n\nfor each dog color.\n\nThe result becomes a small summary table.\n\nGrouping by Multiple Columns\n\nYou can also group by more than one category."
      },
      {
        "title": "Example",
        "body": "dogs.groupby([\"color\", \"breed\"])[\"weight_kg\"].mean()"
      },
      {
        "title": "Now pandas groups dogs by",
        "body": "color\n\nbreed\n\nThis creates more detailed summaries."
      },
      {
        "title": "Instead of",
        "body": "“Average weight of black dogs”"
      },
      {
        "title": "you now get",
        "body": "“Average weight of black Labradors”\u000b “Average weight of brown Poodles”\n\nand so on.\n\nThis is useful when one grouping category is not enough.\n\nMultiple Groups + Multiple Statistics"
      },
      {
        "title": "You can combine everything together",
        "body": "dogs.groupby([\"color\", \"breed\"])[\"weight_kg\"].agg([min, max, mean])\n\nThis gives grouped statistics for every breed-color combination.\n\nVery powerful for data analysis.\n\nKey Idea Behind groupby()"
      },
      {
        "title": "The overall process is",
        "body": "Split the data into groups\n\nApply a calculation\n\nCombine the results"
      },
      {
        "title": "This is often called",
        "body": "Split → Apply → Combine\n\nand it is one of the core ideas in pandas.\n\nImportant Notes\n\ngroupby() does NOT change the original DataFrame\n\nIt only creates grouped results.\n\nCommon summary methods after grouping"
      },
      {
        "title": "Some commonly used methods are",
        "body": ".mean()\n\n.sum()\n\n.min()\n\n.max()\n\n.count()\n\n.median()\n\n.std()\n\n.var()\n\n.agg() is flexible"
      },
      {
        "title": "You can pass",
        "body": "a single function\n\nmultiple functions\n\neven custom functions"
      },
      {
        "title": "Example",
        "body": "dogs.groupby(\"color\")[\"weight_kg\"].agg([mean, median, max])\n\nSimple Mental Model\n\nThink of groupby() like organizing students into classroom groups before calculating grades."
      },
      {
        "title": "Without grouping",
        "body": "One average for the whole school."
      },
      {
        "title": "With grouping",
        "body": "One average per classroom.\n\nThat’s exactly what pandas is doing with your data.\n\nQuick Summary\n\ngroupby() is used to calculate statistics separately for categories or groups in your dataset."
      },
      {
        "title": "Main patterns",
        "body": "`df.groupby(\"column\")[\"value\"].mean()`\n\n`df.groupby(\"column\")[\"value\"].agg([min, max, mean])`\n\n`df.groupby([\"col1\", \"col2\"])[\"value\"].mean()`\n\nIt is one of the most important tools in pandas because real-world data analysis almost always involves comparing groups.",
        "exampleCode": "df.groupby(\"column\")[\"value\"].mean()\ndf.groupby(\"column\")[\"value\"].agg([min, max, mean])\ndf.groupby([\"col1\", \"col2\"])[\"value\"].mean()"
      }
    ],
    "challenge": {
      "title": "Regional Revenue Aggregation",
      "scenario": "The CFO needs to review total revenue and order volume broken down by sales region.",
      "instructions": "Read `sales.csv`. Group by `region` and calculate total revenue `sum` and order count `count` on `sale_amount`. Assign the grouped result to `regional_summary` and print it.",
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
        "title": "Pivot Tables",
        "body": "Pivot Tables in pandas\n\nPivot tables are another powerful way to calculate grouped summary statistics in pandas. If you have ever used Excel or Google Sheets, you may already be familiar with pivot tables. In pandas, they work similarly, but with Python code.\n\nA pivot table helps you summarize and organize data by grouping values together and applying calculations such as averages, sums, or counts.\n\nBasic Idea of a Pivot Table\n\nSuppose you have a DataFrame of dogs with columns like:\n\ncolor\n\nbreed\n\nweight_kg\n\nIf you want the average weight for each dog color, you can use a pivot table.\n\ndogs.pivot_table(values=\"weight_kg\", index=\"color\")\n\nUnderstanding the arguments\n\nvalues\u000b → the column you want to summarize\n\nindex\u000b → the column you want to group by\n\nBy default, pivot_table() calculates the mean (average)."
      },
      {
        "title": "So this code means",
        "body": "“Group dogs by color and calculate the average weight.”\n\nChanging the Summary Statistic\n\nPivot tables use the mean by default, but you can change the calculation using aggfunc."
      },
      {
        "title": "Example",
        "body": "dogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\naggfunc=\"median\"\n\n)\n\nThis calculates the median weight instead of the mean."
      },
      {
        "title": "You can use many functions such as",
        "body": "\"mean\"\n\n\"median\"\n\n\"sum\"\n\n\"min\"\n\n\"max\"\n\n\"count\"\n\nMultiple Statistics at Once\n\nYou can calculate several statistics together by passing a list into aggfunc."
      },
      {
        "title": "Example",
        "body": "dogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\naggfunc=[\"mean\", \"median\"]\n\n)"
      },
      {
        "title": "This creates a table containing both",
        "body": "average weight\n\nmedian weight\n\nfor every dog color.\n\nGrouping by Two Variables\n\nPivot tables become more powerful when you summarize data across two categories."
      },
      {
        "title": "Example",
        "body": "dogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\ncolumns=\"breed\"\n\n)\n\nWhat happens here?\n\nRows represent dog colors\n\nColumns represent dog breeds\n\nValues inside the table are average weights\n\nThis creates a matrix-like summary table.\n\nMissing Values (NaN)\n\nSometimes certain combinations do not exist."
      },
      {
        "title": "For example",
        "body": "maybe there are no black Chihuahuas\n\nmaybe there are no gray Labradors"
      },
      {
        "title": "In these cases, pandas displays",
        "body": "NaN"
      },
      {
        "title": "which means",
        "body": "“No data available.”\n\nFilling Missing Values\n\nYou can replace missing values using fill_value."
      },
      {
        "title": "Example",
        "body": "dogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\ncolumns=\"breed\",\n\nfill_value=0\n\n)\n\nNow all missing values become 0.\n\nThis makes the table cleaner and easier to read.\n\nAdding Totals with margins=True\n\nPivot tables can also calculate overall summaries automatically."
      },
      {
        "title": "Example",
        "body": "dogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\ncolumns=\"breed\",\n\nfill_value=0,\n\nmargins=True\n\n)"
      },
      {
        "title": "This adds",
        "body": "a final row\n\na final column\n\ncalled \"All\"."
      },
      {
        "title": "These contain summary statistics for",
        "body": "all rows\n\nall columns\n\nthe entire dataset"
      },
      {
        "title": "So you can instantly see",
        "body": "average weight per color\n\naverage weight per breed\n\noverall average weight\n\nall in one table.\n\nDifference Between groupby() and pivot_table()\n\nBoth can calculate grouped statistics, but they are often used differently.\n\ngroupby()"
      },
      {
        "title": "Best for",
        "body": "flexible analysis\n\ntransformations\n\nchaining operations\n\npivot_table()"
      },
      {
        "title": "Best for",
        "body": "spreadsheet-style summaries\n\nclean table layouts\n\ncomparing categories visually\n\nYou can often solve the same problem with either one.\n\nMental Model\n\nThink of a pivot table like creating a report table."
      },
      {
        "title": "For example",
        "body": "Color\n\nLabrador\n\nPoodle\n\nChihuahua\n\nBlack\n\n30\n\n12\n\nNaN\n\nBrown\n\n28\n\n10\n\n5\n\nInstead of reading raw rows one by one, pivot tables organize data into a compact summary.\n\nImportant Parameters to Remember\n\nCore arguments\n\nvalues\u000b → what to summarize\n\nindex\u000b → row groups\n\ncolumns\u000b → column groups\n\naggfunc\u000b → summary calculation\n\nUseful optional arguments\n\nfill_value\u000b → replaces missing values\n\nmargins=True\u000b → adds totals/overall summaries\n\nQuick Examples\n\nAverage weight by color\n\ndogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\"\n\n)\n\nMedian weight by color\n\ndogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\naggfunc=\"median\"\n\n)\n\nMultiple statistics\n\ndogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\naggfunc=[\"mean\", \"max\"]\n\n)\n\nTwo-variable pivot table\n\ndogs.pivot_table(\n\nvalues=\"weight_kg\",\n\nindex=\"color\",\n\ncolumns=\"breed\"\n\n)\n\nKey Takeaway\n\nPivot tables are a compact and powerful way to summarize data in pandas. They allow you to:\n\ngroup data\n\ncalculate statistics\n\ncompare categories\n\ncreate spreadsheet-style summaries\n\nall with very little code."
      }
    ],
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
    "description": "Explicit Indexes in pandas  In pandas, a DataFrame is made up of three main parts:  the actual data  column labels  row labels (called the index)...",
    "sections": [
      {
        "title": "Explicit indexes",
        "body": "Explicit Indexes in pandas\n\nIn pandas, a DataFrame is made up of three main parts:\n\nthe actual data\n\ncolumn labels\n\nrow labels (called the index)"
      },
      {
        "title": "You already know that",
        "body": "`df.columns`",
        "exampleCode": "df.columns"
      },
      {
        "title": "shows the column names, while",
        "body": "`df.index`\n\nshows the row labels.\n\nBy default, pandas automatically uses numbers like 0, 1, 2, 3... as row indexes, but you can replace these with more meaningful values. This is called setting an index.\n\nSetting a Column as the Index\n\nSuppose you have a DataFrame of dogs with a name column.\n\nYou can make the dog names become the row labels using:\n\n`dogs = dogs.set_index(\"name\")`\n\nNow the name column is no longer part of the main table columns. Instead, it becomes the index.\n\nThis makes the DataFrame easier to read and sometimes easier to subset.\n\nOne visual clue is that index values are displayed on the far left side of the DataFrame.\n\nResetting the Index\n\nIf you want to bring the index back as a normal column again, use:\n\n`dogs = dogs.reset_index()`\n\nThis restores the default numbered index and moves the old index back into the DataFrame as a regular column.\n\nDropping the Index Completely",
        "exampleCode": "df.index\ndogs = dogs.set_index(\"name\")\ndogs = dogs.reset_index()"
      },
      {
        "title": "You can also remove the index entirely using",
        "body": "`dogs = dogs.reset_index(drop=True)`",
        "exampleCode": "dogs = dogs.reset_index(drop=True)"
      },
      {
        "title": "Here",
        "body": "drop=True\u000b means:\u000b\u000b\u000b “Do not keep the old index as a column.”\n\nSo the custom index disappears completely.\n\nWhy Use Indexes?\n\nIndexes make certain types of subsetting much cleaner and easier.\n\nWithout indexes, filtering rows can look more complicated."
      },
      {
        "title": "Example without index",
        "body": "dogs[dogs[\"name\"].isin([\"Bella\", \"Stella\"])]\n\nThis works, but it is somewhat long."
      },
      {
        "title": "If the name column is set as the index",
        "body": "dogs.loc[[\"Bella\", \"Stella\"]]\n\nThis is much simpler and easier to read.\n\nThe .loc[] method works directly with index labels.\n\nIndex Values Do NOT Need to Be Unique\n\nUnlike primary keys in databases, pandas indexes can contain duplicates."
      },
      {
        "title": "Example",
        "body": "`dogs = dogs.set_index(\"breed\")`\n\nIf there are multiple Labradors, the index can contain \"Labrador\" more than once.",
        "exampleCode": "dogs = dogs.set_index(\"breed\")"
      },
      {
        "title": "Then",
        "body": "dogs.loc[\"Labrador\"]\n\nreturns all Labrador rows.\n\nMulti-Level Indexes (Hierarchical Indexes)\n\nYou can also use more than one column as the index."
      },
      {
        "title": "Example",
        "body": "`dogs = dogs.set_index([\"breed\", \"color\"])`",
        "exampleCode": "dogs = dogs.set_index([\"breed\", \"color\"])"
      },
      {
        "title": "Now the DataFrame has two index levels",
        "body": "outer index → breed\n\ninner index → color"
      },
      {
        "title": "This is called",
        "body": "a multi-level index\n\nor a hierarchical index\n\nBoth terms mean the same thing.\n\nSubsetting Multi-Level Indexes\n\nSelecting outer-level indexes"
      },
      {
        "title": "Example",
        "body": "dogs.loc[[\"Labrador\", \"Chihuahua\"]]\n\nThis returns all Labradors and Chihuahuas.\n\nSelecting inner-level combinations\n\nFor deeper filtering, use tuples."
      },
      {
        "title": "Example",
        "body": "dogs.loc[[(\"Labrador\", \"Brown\")]]"
      },
      {
        "title": "Give rows where",
        "body": "`breed = Labrador`\n\n`color = Brown`\n\nEvery condition inside the tuple must match.\n\nSorting by Index",
        "exampleCode": "breed = Labrador\ncolor = Brown"
      },
      {
        "title": "Besides sorting by column values using",
        "body": "sort_values()"
      },
      {
        "title": "you can sort using index labels with",
        "body": "dogs.sort_index()\n\nThis sorts from outer index to inner index.\n\nControlling Index Sorting"
      },
      {
        "title": "You can customize sorting behavior using",
        "body": "level\n\nascending"
      },
      {
        "title": "Example",
        "body": "dogs.sort_index(level=[\"breed\", \"color\"], ascending=[True, False])\n\nThis allows different sorting directions for different levels.\n\nThe Downsides of Indexes\n\nIndexes are powerful, but they are somewhat controversial in pandas.\n\nWhy?\n\nBecause indexes are still data, but they are stored differently from normal columns."
      },
      {
        "title": "This creates some issues",
        "body": "1. More complicated syntax\n\nWorking with indexes uses different syntax (loc) compared to normal columns.\n\nThat means more things to remember.\n\n2. Violates “tidy data” principles"
      },
      {
        "title": "Tidy data says",
        "body": "`every row = one observation`\n\n`every column = one variable`\n\nIndexes are data that are not stored in columns, which breaks this structure somewhat.\n\n3. Can increase bugs",
        "exampleCode": "every row = one observation\nevery column = one variable"
      },
      {
        "title": "Since pandas has",
        "body": "column-based syntax\n\nindex-based syntax\n\nyou may accidentally mix them up.\n\nImportant Perspective\n\nYou do NOT always need indexes.\n\nMany pandas users prefer keeping everything as normal columns because it is simpler and easier to debug."
      },
      {
        "title": "However, indexes are still important because",
        "body": "many pandas operations rely on them\n\nmany real-world datasets use them\n\nyou will often encounter them in other people's code\n\nSo understanding indexes is essential.\n\nMental Model\n\nThink of indexes as labels for rows."
      },
      {
        "title": "Normally rows are labeled",
        "body": "0, 1, 2, 3\n\nBut you can replace them with meaningful identifiers like:\n\nBella, Max, Charlie"
      },
      {
        "title": "or even combinations like",
        "body": "(Labrador, Brown)\n\nThis helps organize and access data more efficiently.\n\nQuick Summary\n\nSetting an index\n\n`df.set_index(\"column\")`\n\nResetting the index\n\n`df.reset_index()`\n\nDropping the old index\n\n`df.reset_index(drop=True)`\n\nSelecting with .loc\n\n`df.loc[\"Bella\"]`\n\nMulti-level index\n\n`df.set_index([\"breed\", \"color\"])`\n\nSorting indexes\n\n`df.sort_index()`\n\nKey Takeaway\n\nIndexes in pandas are special row labels that make certain operations, especially subsetting, cleaner and more powerful. They can simplify data access, support hierarchical organization, and improve readability, but they also introduce additional complexity.",
        "exampleCode": "df.set_index(\"column\")\ndf.reset_index()\ndf.reset_index(drop=True)\ndf.loc[\"Bella\"]\ndf.set_index([\"breed\", \"color\"])\ndf.sort_index()"
      }
    ],
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
    "description": "Slicing and Subsetting with .loc and .iloc  Slicing is a way of selecting consecutive parts of a sequence or dataset. In Python, you first learn slicing with li...",
    "sections": [
      {
        "title": "Slicing and subsetting with .loc and .iloc",
        "body": "Slicing and Subsetting with .loc and .iloc\n\nSlicing is a way of selecting consecutive parts of a sequence or dataset. In Python, you first learn slicing with lists, then apply the same idea to pandas DataFrames. Understanding slicing is important because it allows you to quickly extract only the rows or columns you need from large datasets.\n\nWith Python lists, slicing uses positions (indexes). Remember that Python starts counting at 0. For example:\n\nbreeds[2:5]"
      },
      {
        "title": "This means",
        "body": "start at position 2\n\nstop before position 5\n\nSo elements at positions 2, 3, and 4 are included. The last position is not included in normal Python slicing."
      },
      {
        "title": "You can also simplify slices",
        "body": "breeds[:3]\n\nThis means “from the start up to position 3.”"
      },
      {
        "title": "And",
        "body": "breeds[:]\n\nmeans “take everything.”\n\nSlicing DataFrames with .loc\n\nFor pandas DataFrames, slicing is usually done using .loc or .iloc.\n\nBefore slicing rows using index labels, it is important to sort the index first:\n\n`dogs = dogs.sort_index()`\n\nThis prevents unexpected results.\n\n.loc Uses Labels (Names)\n\n.loc slices using row or column labels instead of numeric positions.",
        "exampleCode": "dogs = dogs.sort_index()"
      },
      {
        "title": "Example",
        "body": "dogs.loc[\"Chow Chow\":\"Poodle\"]\n\nThis selects all rows from \"Chow Chow\" to \"Poodle\".\n\nA very important difference from normal Python slicing:\n\nwith .loc, the ending value IS included\n\nSo \"Poodle\" will appear in the result.\n\nMulti-Level Index Slicing\n\nWhen using hierarchical or multi-level indexes, slicing becomes more advanced."
      },
      {
        "title": "Suppose the index has two levels",
        "body": "breed\n\ncolor"
      },
      {
        "title": "Trying to slice inner levels directly may fail",
        "body": "dogs.loc[\"Tan\":\"Grey\"]\n\nThis can return incorrect or empty results."
      },
      {
        "title": "The correct way is to use tuples",
        "body": "dogs.loc[\n\n(\"Labrador\", \"Brown\"):\n\n(\"Schnauzer\", \"Grey\")\n\n]\n\nEach tuple represents a complete index position.\n\nSlicing Columns\n\nBecause DataFrames are two-dimensional, you can slice columns too."
      },
      {
        "title": "Syntax",
        "body": "dogs.loc[:, \"name\":\"height_cm\"]"
      },
      {
        "title": "The colon : means",
        "body": "keep all rows\n\nThen the second argument slices the columns.\n\nThis selects all rows, but only columns from \"name\" to \"height_cm\".\n\nSlicing Rows and Columns Together"
      },
      {
        "title": "You can slice both dimensions at the same time",
        "body": "dogs.loc[\n\n\"Labrador\":\"Poodle\",\n\n\"name\":\"height_cm\"\n\n]"
      },
      {
        "title": "This filters",
        "body": "specific rows\n\nspecific columns\n\nall in one command.\n\nDate Slicing\n\nDates are extremely common in pandas datasets."
      },
      {
        "title": "If a date column becomes the index",
        "body": "`dogs = dogs.set_index(\"date_of_birth\").sort_index()`\n\nyou can slice using date strings.",
        "exampleCode": "dogs = dogs.set_index(\"date_of_birth\").sort_index()"
      },
      {
        "title": "Example",
        "body": "dogs.loc[\"2014\":\"2016\"]\n\nThis includes all rows between 2014 and 2016.\n\nOne useful pandas feature is partial date slicing. You do not always need full dates like \"2014-01-01\"."
      },
      {
        "title": "You can simply write",
        "body": "dogs.loc[\"2015\"]\n\nand pandas understands you mean the entire year.\n\n.iloc Uses Numeric Positions\n\nWhile .loc uses labels, .iloc uses integer positions."
      },
      {
        "title": "Example",
        "body": "dogs.iloc[2:5, 1:4]"
      },
      {
        "title": "This means",
        "body": "rows 2 to 4\n\ncolumns 1 to 3"
      },
      {
        "title": "Important difference",
        "body": ".iloc follows normal Python slicing rules\n\nthe ending position is NOT included\n\nSo position 5 and 4 are excluded.\n\nDifference Between .loc and .iloc"
      },
      {
        "title": "A good way to remember them",
        "body": ".loc → labels/names\n\n.iloc → integer positions"
      },
      {
        "title": "Example",
        "body": "dogs.loc[\"Bella\":\"Stella\"]\n\nuses names.\n\ndogs.iloc[0:3]\n\nuses row numbers.\n\nKey Things to Remember\n\n.loc\n\nUses labels/index names\n\nEnding value is included\n\nGood for readable filtering\n\n.iloc\n\nUses numeric positions\n\nEnding value is excluded\n\nSimilar to normal Python slicing\n\nSlicing Tips\n\nAlways sort indexes before slicing\n\nUse tuples for multi-level indexes\n\nUse : to mean “everything”\n\nDate slicing works very naturally in pandas\n\nExample Summary"
      },
      {
        "title": "Slice rows by labels",
        "body": "dogs.loc[\"A\":\"C\"]"
      },
      {
        "title": "Slice rows and columns",
        "body": "dogs.loc[\"A\":\"C\", \"name\":\"height_cm\"]"
      },
      {
        "title": "Slice by positions",
        "body": "dogs.iloc[0:3, 1:4]"
      },
      {
        "title": "Slice dates",
        "body": "dogs.loc[\"2014\":\"2016\"]\n\nThese slicing techniques are some of the most powerful tools in pandas because they allow you to quickly focus on the exact part of a dataset you want to analyze."
      }
    ],
    "challenge": {
      "title": "Targeted Country Subsetting with loc",
      "scenario": "The trade strategy department needs to inspect the capital and population for Brazil (BR) and China (CH) from the BRICS dataset.",
      "instructions": "Load `brics.csv` with `index_col='country_code'`. Use `.loc` to select the rows for `['BR', 'CH']` and the columns `['capital', 'population']`. Assign to `subset_df` and print it.",
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
    "description": "Working with Pivot Tables  Pivot tables are one of the most powerful tools in pandas for summarizing and analyzing grouped data. Earlier, you learned how to cre...",
    "sections": [
      {
        "title": "Working with pivot tables",
        "body": "Working with Pivot Tables\n\nPivot tables are one of the most powerful tools in pandas for summarizing and analyzing grouped data. Earlier, you learned how to create them using pivot_table(). In this lesson, the focus is on how to work with pivot tables after they are created — especially how to subset them and compute additional statistics.\n\nA pivot table in pandas is essentially just another DataFrame, but with grouped and summarized data. Because of this, all the DataFrame skills you already learned — especially .loc, slicing, and summary methods — can also be applied to pivot tables.\n\nCreating a Pivot Table\n\nA pivot table is created using .pivot_table()."
      },
      {
        "title": "Example",
        "body": "dogs.pivot_table(\n\nvalues=\"height_cm\",\n\nindex=\"breed\",\n\ncolumns=\"color\"\n\n)"
      },
      {
        "title": "This means",
        "body": "values → the column to summarize\n\nindex → the groups shown as rows\n\ncolumns → the groups shown as columns\n\nBy default, pandas calculates the mean."
      },
      {
        "title": "So this pivot table shows",
        "body": "the average height of each dog breed for each color.\n\nPivot Tables are DataFrames"
      },
      {
        "title": "A very important idea",
        "body": "Pivot tables are just DataFrames with organized indexes.\n\nBecause of this, you can use everything you already know about DataFrames:\n\n.loc[]\n\nslicing\n\nfiltering\n\nsummary statistics\n\nindexing\n\nThis makes pivot tables extremely flexible.\n\nUsing .loc[] with Pivot Tables\n\nSince pivot tables have indexes, .loc[] works perfectly for selecting specific rows or columns."
      },
      {
        "title": "Example",
        "body": "pt.loc[\"Chihuahua\":\"Poodle\"]\n\nThis slices breeds from \"Chihuahua\" to \"Poodle\"."
      },
      {
        "title": "You can also subset rows and columns together",
        "body": "pt.loc[\n\n\"Chihuahua\":\"Poodle\",\n\n\"Brown\":\"Gray\"\n\n]"
      },
      {
        "title": "This selects",
        "body": "specific breeds (rows)\n\nspecific colors (columns)\n\nat the same time.\n\nThis combination of .loc[] + slicing is one of the best ways to work with pivot tables.\n\nSummary Statistics on Pivot Tables\n\nBecause pivot tables usually contain only numeric values, you can easily calculate statistics on them."
      },
      {
        "title": "Example",
        "body": "pt.mean()\n\nThis calculates the mean of each column.\n\nUnderstanding the axis Argument\n\nMany pandas methods use an axis argument."
      },
      {
        "title": "The default is",
        "body": "axis=\"index\""
      },
      {
        "title": "or equivalently",
        "body": "axis=0"
      },
      {
        "title": "This means",
        "body": "calculate statistics down the rows (vertically)\n\nFor a pivot table, this calculates a result for each column.\n\nCalculating Across Rows"
      },
      {
        "title": "Example",
        "body": "pt.mean(axis=\"index\")\n\nThis computes the average for each color across all breeds.\n\nSo the calculation moves vertically down each column.\n\nCalculating Across Columns\n\nIf you want calculations horizontally across columns, use:\n\npt.mean(axis=\"columns\")\n\nThis computes the average for each breed across all colors.\n\nSo now the calculation moves horizontally across each row.\n\nWhy axis Matters More for Pivot Tables\n\nIn normal DataFrames, columns often contain different data types:\n\ntext\n\ndates\n\nnumbers\n\nBecause of that, calculations across columns often do not make sense."
      },
      {
        "title": "But pivot tables are special because",
        "body": "almost every value is numeric\n\nevery column usually represents the same type of measurement\n\nThat is why operations like .mean(axis=\"columns\") become very useful with pivot tables.\n\nQuick Comparison\n\naxis=\"index\" (default)\n\nCalculates vertically\n\nProduces one result per column"
      },
      {
        "title": "Example",
        "body": "pt.mean(axis=\"index\")\n\naxis=\"columns\"\n\nCalculates horizontally\n\nProduces one result per row"
      },
      {
        "title": "Example",
        "body": "pt.mean(axis=\"columns\")\n\nExample Workflow"
      },
      {
        "title": "Create pivot table",
        "body": "`pt = dogs.pivot_table(`\n\nvalues=\"height_cm\",\n\nindex=\"breed\",\n\ncolumns=\"color\"\n\n)",
        "exampleCode": "pt = dogs.pivot_table("
      },
      {
        "title": "Subset breeds",
        "body": "pt.loc[\"Chihuahua\":\"Poodle\"]"
      },
      {
        "title": "Mean for each color",
        "body": "pt.mean()"
      },
      {
        "title": "Mean for each breed",
        "body": "pt.mean(axis=\"columns\")\n\nKey Takeaways"
      },
      {
        "title": "Pivot tables are powerful because they combine",
        "body": "grouping\n\naggregation\n\nreshaping\n\ninto a single structure.\n\nOnce created, you can treat them like normal DataFrames and use:\n\n.loc[]\n\nslicing\n\n.mean()\n\n.sum()\n\n.max()\n\n.min()\n\nand many other pandas operations on them.\n\nThe axis argument is especially important because it controls the direction of calculations:\n\naxis=\"index\" → down columns\n\naxis=\"columns\" → across rows"
      }
    ],
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
    "description": "Visualizing Your Data  Data visualization is one of the most important parts of data analysis because it helps transform raw numbers into something easier to un...",
    "sections": [
      {
        "title": "Visualizing your data",
        "body": "Visualizing Your Data\n\nData visualization is one of the most important parts of data analysis because it helps transform raw numbers into something easier to understand. Instead of only reading tables of values, plots allow you to quickly notice patterns, trends, relationships, and outliers in your data.\n\nIn pandas, plotting is closely connected with the matplotlib library. Before creating visualizations, you usually import:\n\n`import matplotlib.pyplot as plt`\n\nJust like pd is the common alias for pandas, plt is the standard alias for matplotlib.pyplot.",
        "exampleCode": "import matplotlib.pyplot as plt"
      },
      {
        "title": "After creating a plot, you often need",
        "body": "`plt.show()`\n\nto actually display it.\n\nHistograms\n\nA histogram is used to visualize the distribution of a numeric variable. It groups values into ranges called bins and shows how many observations fall into each range.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "Example",
        "body": "dog_pack[\"height_cm\"].hist()\n\n`plt.show()`\n\nThis creates a histogram of dog heights.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "The",
        "body": "x-axis represents the height ranges\n\ny-axis represents how many dogs fall into each range"
      },
      {
        "title": "Histograms are useful for understanding",
        "body": "where most values are concentrated\n\nwhether data is spread out\n\nwhether the distribution is symmetric or skewed\n\nChanging the Number of Bins\n\nYou can control how detailed the histogram is using the bins argument."
      },
      {
        "title": "Example",
        "body": "dog_pack[\"height_cm\"].hist(bins=20)\n\n`plt.show()`\n\nfewer bins → simpler overview\n\nmore bins → more detailed distribution\n\nChoosing the right number of bins helps make patterns clearer.\n\nBar Plots\n\nBar plots are useful for comparing categories.\n\nFor example, if you want to compare the average weight of each dog breed:\n\n`avg_weight = dog_pack.groupby(\"breed\")[\"weight_kg\"].mean()`",
        "exampleCode": "plt.show()\navg_weight = dog_pack.groupby(\"breed\")[\"weight_kg\"].mean()"
      },
      {
        "title": "Then create a bar plot",
        "body": "avg_weight.plot(kind=\"bar\")\n\n`plt.show()`\n\nEach bar represents a breed, and the height of the bar represents the average weight.\n\nAdding a Title\n\nPlots become easier to understand when labeled properly.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "Example",
        "body": "avg_weight.plot(\n\nkind=\"bar\",\n\ntitle=\"Average Weight per Breed\"\n\n)\n\n`plt.show()`\n\nTitles help explain what the visualization is showing.\n\nLine Plots\n\nLine plots are excellent for showing how data changes over time.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "Example",
        "body": "sully.plot(\n\nx=\"date\",\n\ny=\"weight_kg\",\n\nkind=\"line\"\n\n)\n\n`plt.show()`\n\nThis visualizes Sully’s weight over time.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "Line plots are commonly used for",
        "body": "time series data\n\ntrends\n\ngrowth or decline\n\ntracking changes\n\nRotating Axis Labels\n\nSometimes date labels overlap and become hard to read."
      },
      {
        "title": "You can rotate labels using",
        "body": "sully.plot(\n\nx=\"date\",\n\ny=\"weight_kg\",\n\nkind=\"line\",\n\nrot=45\n\n)\n\n`plt.show()`\n\nrot=45 rotates labels by 45 degrees.\n\nScatter Plots\n\nScatter plots are used to examine relationships between two numeric variables.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "Example",
        "body": "dog_pack.plot(\n\nx=\"height_cm\",\n\ny=\"weight_kg\",\n\nkind=\"scatter\"\n\n)\n\n`plt.show()`\n\nEach point represents one dog.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "This helps identify",
        "body": "correlations\n\ntrends\n\nclusters\n\noutliers\n\nIn this example, taller dogs generally weigh more.\n\nLayering Plots\n\nYou can place multiple plots on top of each other to compare groups."
      },
      {
        "title": "Example",
        "body": "dog_pack[dog_pack[\"sex\"] == \"F\"][\"height_cm\"].hist()\n\ndog_pack[dog_pack[\"sex\"] == \"M\"][\"height_cm\"].hist()\n\n`plt.show()`\n\nThis overlays histograms for female and male dogs.\n\nAdding a Legend\n\nWhen multiple plots overlap, it may be unclear which is which.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "Use",
        "body": "`plt.legend([\"Female\", \"Male\"])`\n\nto label the plots.",
        "exampleCode": "plt.legend([\"Female\", \"Male\"])"
      },
      {
        "title": "Example",
        "body": "`plt.legend([\"Female\", \"Male\"])`\n\n`plt.show()`\n\nTransparency with alpha\n\nOverlapping plots can block each other visually. The alpha argument controls transparency.",
        "exampleCode": "plt.legend([\"Female\", \"Male\"])\nplt.show()"
      },
      {
        "title": "Values",
        "body": "0 → fully transparent\n\n1 → fully opaque"
      },
      {
        "title": "Example",
        "body": "dog_pack[dog_pack[\"sex\"] == \"F\"][\"height_cm\"].hist(alpha=0.5)\n\ndog_pack[dog_pack[\"sex\"] == \"M\"][\"height_cm\"].hist(alpha=0.5)\n\n`plt.legend([\"Female\", \"Male\"])`\n\n`plt.show()`\n\nThis makes both histograms easier to compare.\n\nChoosing the Right Plot\n\nDifferent plots are useful for different situations:\n\nHistogram → distribution of one numeric variable\n\nBar plot → compare categories\n\nLine plot → trends over time\n\nScatter plot → relationship between two numeric variables\n\nExample Summary",
        "exampleCode": "plt.legend([\"Female\", \"Male\"])\nplt.show()"
      },
      {
        "title": "Histogram",
        "body": "dog_pack[\"height_cm\"].hist()"
      },
      {
        "title": "Bar plot",
        "body": "avg_weight.plot(kind=\"bar\")"
      },
      {
        "title": "Line plot",
        "body": "dog_pack.plot(x=\"date\", y=\"weight_kg\", kind=\"line\")"
      },
      {
        "title": "Scatter plot",
        "body": "dog_pack.plot(\n\nx=\"height_cm\",\n\ny=\"weight_kg\",\n\nkind=\"scatter\"\n\n)\n\n`plt.show()`\n\nKey Takeaways",
        "exampleCode": "plt.show()"
      },
      {
        "title": "Data visualization helps you",
        "body": "understand data faster\n\ndiscover trends and patterns\n\ncommunicate findings clearly\n\npandas makes plotting easy because plots can be created directly from DataFrames and Series using methods like:\n\n.hist()\n\n.plot()"
      },
      {
        "title": "combined with matplotlib tools such as",
        "body": "`plt.show()`\n\n`plt.legend()`",
        "exampleCode": "plt.show()\nplt.legend()"
      },
      {
        "title": "and visualization settings like",
        "body": "bins\n\ntitle\n\nrot\n\nalpha"
      }
    ],
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
        "title": "Missing values",
        "body": "Missing Values in pandas\n\nIn real-world datasets, missing values are extremely common. Data is rarely perfect — sometimes information is not recorded, sensors fail, users skip inputs, or files become incomplete. Because of this, knowing how to detect and handle missing values is an essential skill in data analysis."
      },
      {
        "title": "In pandas, missing values are represented by",
        "body": "NaN"
      },
      {
        "title": "which stands for",
        "body": "“Not a Number”\n\nEven though the name sounds numeric, NaN is used for many types of missing data in pandas.\n\nWhy Missing Values Matter"
      },
      {
        "title": "Missing data can affect",
        "body": "calculations\n\naverages\n\nmachine learning models\n\nvisualizations\n\nfiltering and grouping\n\nFor example, if some dog weights are missing because the scale was broken, calculations involving weight may become inaccurate or incomplete.\n\nThat’s why one of the first things you should do when receiving a new dataset is check for missing values.\n\nDetecting Missing Values with .isna()\n\nThe .isna() method checks every value in a DataFrame and returns:\n\nTrue → value is missing\n\nFalse → value exists"
      },
      {
        "title": "Example",
        "body": "dogs.isna()\n\nThis creates a DataFrame of Booleans."
      },
      {
        "title": "Example result",
        "body": "name\n\nweight_kg\n\nFalse\n\nFalse\n\nFalse\n\nTrue\n\nHowever, for large datasets, this output can be difficult to read.\n\nChecking if Columns Contain Missing Values\n\nTo see whether a column contains any missing values, combine:\n\n.isna().any()"
      },
      {
        "title": "Example",
        "body": "dogs.isna().any()"
      },
      {
        "title": "Result",
        "body": "name         False\n\nweight_kg     True\n\nheight_cm    False"
      },
      {
        "title": "This means",
        "body": "weight_kg contains at least one missing value\n\nother columns do not\n\nCounting Missing Values\n\nSince True is treated as 1 in Python, summing Boolean values counts the number of missing entries."
      },
      {
        "title": "Example",
        "body": "dogs.isna().sum()\n\nThis returns the number of missing values per column."
      },
      {
        "title": "Example output",
        "body": "name         0\n\nweight_kg    2\n\nheight_cm    0"
      },
      {
        "title": "So there are",
        "body": "2 missing weights\n\nno missing names or heights\n\nVisualizing Missing Values\n\nYou can plot the number of missing values using a bar plot."
      },
      {
        "title": "Example",
        "body": "dogs.isna().sum().plot(kind=\"bar\")\n\n`plt.show()`\n\nThis helps quickly identify which columns have the most missing data.\n\nVisualization becomes especially useful in large datasets with many variables.\n\nRemoving Missing Values with .dropna()\n\nOne approach is to remove rows that contain missing values.",
        "exampleCode": "plt.show()"
      },
      {
        "title": "Example",
        "body": "dogs.dropna()\n\nThis removes all rows where at least one value is missing.\n\nImportant Consideration\n\nDropping rows is simple, but it can be risky."
      },
      {
        "title": "If many rows contain missing data",
        "body": "you may lose a large part of your dataset\n\nyour analysis may become biased\n\nSo use .dropna() carefully.\n\nReplacing Missing Values with .fillna()\n\nInstead of deleting rows, you can replace missing values."
      },
      {
        "title": "Example",
        "body": "dogs.fillna(0)\n\nThis replaces all NaN values with 0.\n\nFilling with Other Values"
      },
      {
        "title": "You can also fill missing values using",
        "body": "averages\n\nmedians\n\ntext labels\n\ncalculated values"
      },
      {
        "title": "Example",
        "body": "dogs[\"weight_kg\"].fillna(\n\ndogs[\"weight_kg\"].mean()\n\n)\n\nThis replaces missing weights with the average weight.\n\nThis is often better than removing data entirely.\n\nCommon Missing Value Workflow"
      },
      {
        "title": "A typical workflow looks like this",
        "body": "1. Detect missing values\n\ndogs.isna()\n\n2. Count them\n\ndogs.isna().sum()\n\n3. Decide what to do\n\nremove rows → .dropna()\n\nreplace values → .fillna()\n\nExample Summary"
      },
      {
        "title": "Detect missing values",
        "body": "dogs.isna()"
      },
      {
        "title": "Check columns with missing data",
        "body": "dogs.isna().any()"
      },
      {
        "title": "Count missing values",
        "body": "dogs.isna().sum()"
      },
      {
        "title": "Remove rows with missing values",
        "body": "dogs.dropna()"
      },
      {
        "title": "Replace missing values",
        "body": "dogs.fillna(0)\n\nKey Takeaways\n\nMissing values are a normal part of data analysis, and pandas provides powerful tools to handle them."
      },
      {
        "title": "Important methods include",
        "body": ".isna() → detect missing values\n\n.any() → check if missing values exist\n\n.sum() → count missing values\n\n.dropna() → remove missing data\n\n.fillna() → replace missing data"
      },
      {
        "title": "The best method depends on the situation",
        "body": "small amount of missing data → dropping may be fine\n\nlarge amount of missing data → filling is often better\n\nHandling missing values properly helps ensure your analysis remains accurate and reliable."
      }
    ],
    "challenge": {
      "title": "Clean Incomplete Customer Emails",
      "scenario": "The CRM sync job fails when customer emails are null or missing. Impute missing emails with a placeholder.",
      "instructions": "Read `customers.csv`. Count missing emails with `.isna().sum()`. Replace all missing values in the `email` column with `'support@company.com'`. Assign to `clean_customers`.",
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
        "title": "Creating DataFrames",
        "body": "Creating DataFrames in pandas\n\nAfter learning how to manipulate and analyze DataFrames, the next important skill is learning how to create them. In pandas, a DataFrame is the main structure used to store tabular or rectangular data, similar to a spreadsheet or SQL table.\n\nBefore creating DataFrames, it’s important to understand dictionaries, because pandas heavily uses them when building DataFrames.\n\nA dictionary in Python stores data as key-value pairs. The key acts like a label, while the value is the actual data connected to that label."
      },
      {
        "title": "Example",
        "body": "`book = {`\n\n\"title\": \"Charlotte's Web\",\n\n\"author\": \"E.B. White\"\n\n}",
        "exampleCode": "book = {"
      },
      {
        "title": "Here",
        "body": "\"title\" and \"author\" are keys\n\n\"Charlotte's Web\" and \"E.B. White\" are values"
      },
      {
        "title": "You can access values using square brackets",
        "body": "book[\"title\"]"
      },
      {
        "title": "This returns",
        "body": "Charlotte's Web\n\nTwo Main Ways to Create DataFrames\n\nThere are many ways to create DataFrames, but this lesson focuses on two common methods:\n\nList of dictionaries → build DataFrame row by row\n\nDictionary of lists → build DataFrame column by column\n\n1. Creating a DataFrame from a List of Dictionaries (Row-Based)\n\nIn this method, each dictionary represents one row of data.\n\nYou first create a list, then place dictionaries inside it."
      },
      {
        "title": "Example",
        "body": "`import pandas as pd`\n\n`list_of_dicts = [`\n\n{\n\n\"name\": \"Ginger\",\n\n\"breed\": \"Dachshund\",\n\n\"height_cm\": 22,\n\n\"weight_kg\": 10\n\n},\n\n{\n\n\"name\": \"Scout\",\n\n\"breed\": \"Dalmatian\",\n\n\"height_cm\": 59,\n\n\"weight_kg\": 25\n\n}\n\n]\n\n`dogs = pd.DataFrame(list_of_dicts)`\n\nprint(dogs)",
        "exampleCode": "import pandas as pd\nlist_of_dicts = [\ndogs = pd.DataFrame(list_of_dicts)"
      },
      {
        "title": "Output",
        "body": "name       breed  height_cm  weight_kg\n\n0  Ginger   Dachshund         22         10\n\n1   Scout  Dalmatian         59         25\n\nHow it works"
      },
      {
        "title": "Each dictionary becomes",
        "body": "one row in the DataFrame"
      },
      {
        "title": "Each key becomes",
        "body": "a column name"
      },
      {
        "title": "Each value becomes",
        "body": "the data inside that row and column\n\nThis approach is useful when your data naturally comes row-by-row, such as:\n\nAPI responses\n\nJSON objects\n\nmanually entered records\n\n2. Creating a DataFrame from a Dictionary of Lists (Column-Based)\n\nIn this method, each key is a column name, and each value is a list containing all values for that column."
      },
      {
        "title": "Example",
        "body": "`import pandas as pd`\n\n`dict_of_lists = {`\n\n\"name\": [\"Ginger\", \"Scout\"],\n\n\"breed\": [\"Dachshund\", \"Dalmatian\"],\n\n\"height_cm\": [22, 59],\n\n\"weight_kg\": [10, 25]\n\n}\n\n`dogs = pd.DataFrame(dict_of_lists)`\n\nprint(dogs)",
        "exampleCode": "import pandas as pd\ndict_of_lists = {\ndogs = pd.DataFrame(dict_of_lists)"
      },
      {
        "title": "Output",
        "body": "name       breed  height_cm  weight_kg\n\n0  Ginger   Dachshund         22         10\n\n1   Scout  Dalmatian         59         25\n\nHow it works\n\nKeys become column names\n\nLists become column values\n\nEach list must usually have the same length\n\nThis method is often cleaner and easier when working with structured data.\n\nComparing the Two Methods\n\nList of Dictionaries\n\nBuilt row by row\n\nGood for record-style data\n\nFlexible for irregular data"
      },
      {
        "title": "Example mindset",
        "body": "“Here is one dog's information.”\n\nDictionary of Lists\n\nBuilt column by column\n\nCleaner for organized datasets\n\nCommon in data analysis"
      },
      {
        "title": "Example mindset",
        "body": "“Here are all the dog names, all the breeds, all the heights…”\n\nBig Picture"
      },
      {
        "title": "A pandas DataFrame is basically",
        "body": "`rows = observations/items`\n\n`columns = variables/features`\n\nThese creation methods simply provide different ways to organize the same data before converting it into a DataFrame.",
        "exampleCode": "rows = observations/items\ncolumns = variables/features"
      },
      {
        "title": "You can think of it like this",
        "body": "Method\n\nThink About\n\nList of dictionaries\n\nRows\n\nDictionary of lists\n\nColumns\n\nImportant pandas Function"
      },
      {
        "title": "The key function used is",
        "body": "pd.DataFrame()\n\nThis converts Python data structures into a DataFrame.\n\nKey Takeaways\n\nDataFrames store tabular data in pandas.\n\nDictionaries use key-value pairs."
      },
      {
        "title": "You can create DataFrames",
        "body": "row-by-row using a list of dictionaries\n\ncolumn-by-column using a dictionary of lists\n\npd.DataFrame() converts Python structures into DataFrames.\n\nColumn names usually come from dictionary keys."
      }
    ],
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
        "title": "Reading and writing CSVs",
        "body": "Reading and Writing CSV Files in pandas\n\nSo far, you've learned how to manually create DataFrames, but in real-world data analysis, datasets are usually already stored in files. One of the most common file formats used for storing tabular data is the CSV file.\n\nCSV stands for Comma-Separated Values. It is a simple text file format where:\n\neach row of data is placed on a new line\n\neach value is separated by commas\n\nBecause CSV files are simple and universal, almost every programming language, spreadsheet software, and database system can read and write them. This makes CSV one of the most widely used formats for sharing data.\n\nWhat a CSV File Looks Like"
      },
      {
        "title": "Example CSV file",
        "body": "name,breed,height_cm,weight_kg\n\nGinger,Dachshund,22,10\n\nScout,Dalmatian,59,25\n\nThis is basically the same structure as a DataFrame:\n\ncolumns at the top\n\nrows underneath\n\nReading a CSV File into pandas\n\nTo load a CSV file into a pandas DataFrame, pandas provides the function:\n\npd.read_csv()"
      },
      {
        "title": "Example",
        "body": "`import pandas as pd`\n\n`dogs = pd.read_csv(\"new_dogs.csv\")`\n\nprint(dogs)\n\nWhat happens here?\n\npd.read_csv() reads the CSV file\n\npandas converts the file into a DataFrame automatically\n\nthe variable dogs now stores the DataFrame\n\nThis is much faster and more practical than manually typing data into Python.\n\nManipulating the DataFrame\n\nOnce the CSV is loaded into a DataFrame, you can use all the pandas operations you've learned.",
        "exampleCode": "import pandas as pd\ndogs = pd.read_csv(\"new_dogs.csv\")"
      },
      {
        "title": "For example, creating a BMI column",
        "body": "`dogs[\"height_m\"] = dogs[\"height_cm\"] / 100`\n\n`dogs[\"bmi\"] = dogs[\"weight_kg\"] / dogs[\"height_m\"] ** 2`\n\nThis adds new columns directly into the DataFrame.\n\nWriting a DataFrame Back to CSV\n\nAfter modifying the DataFrame, you may want to save the updated data.\n\nYou can convert a DataFrame back into a CSV file using:\n\nDataFrame.to_csv()",
        "exampleCode": "dogs[\"height_m\"] = dogs[\"height_cm\"] / 100\ndogs[\"bmi\"] = dogs[\"weight_kg\"] / dogs[\"height_m\"] ** 2"
      },
      {
        "title": "Example",
        "body": "dogs.to_csv(\"new_dogs_with_bmi.csv\")\n\nWhat this does\n\ntakes the DataFrame\n\nconverts it into CSV format\n\nsaves it as a new file\n\nThe new CSV file now contains the updated BMI column.\n\nComplete Example\n\n`import pandas as pd`",
        "exampleCode": "import pandas as pd"
      },
      {
        "title": "Read CSV file",
        "body": "`dogs = pd.read_csv(\"new_dogs.csv\")`",
        "exampleCode": "dogs = pd.read_csv(\"new_dogs.csv\")"
      },
      {
        "title": "Create height in meters",
        "body": "`dogs[\"height_m\"] = dogs[\"height_cm\"] / 100`",
        "exampleCode": "dogs[\"height_m\"] = dogs[\"height_cm\"] / 100"
      },
      {
        "title": "Create BMI column",
        "body": "`dogs[\"bmi\"] = dogs[\"weight_kg\"] / dogs[\"height_m\"] ** 2`",
        "exampleCode": "dogs[\"bmi\"] = dogs[\"weight_kg\"] / dogs[\"height_m\"] ** 2"
      },
      {
        "title": "Save updated DataFrame",
        "body": "dogs.to_csv(\"new_dogs_with_bmi.csv\")\n\nImportant pandas Functions\n\nReading CSV files\n\npd.read_csv(\"file_name.csv\")"
      },
      {
        "title": "Used to",
        "body": "load CSV data into a DataFrame\n\nWriting CSV files\n\nDataFrame.to_csv(\"file_name.csv\")"
      },
      {
        "title": "Used to",
        "body": "save DataFrames as CSV files\n\nBig Picture"
      },
      {
        "title": "The usual pandas workflow is",
        "body": "Read data from a file\n\nStore it in a DataFrame\n\nAnalyze or manipulate the data\n\nSave the updated data"
      },
      {
        "title": "Example workflow",
        "body": "CSV File → pandas DataFrame → Data Analysis → Updated CSV File\n\nThis is one of the core workflows in data science and data analysis.\n\nKey Takeaways\n\nCSV files store tabular data using commas.\n\npd.read_csv() loads CSV files into pandas DataFrames.\n\nOnce loaded, DataFrames can be analyzed and modified.\n\nto_csv() saves DataFrames back into CSV files.\n\nCSV is widely used because it is simple and compatible with many tools."
      }
    ],
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
        "title": "Wrap up",
        "body": "pandas Wrap-Up Notes\n\nCongratulations — this marks the end of the introduction to pandas. Throughout the course, you learned the core foundations of working with data in Python using one of the most important libraries in data science."
      },
      {
        "title": "pandas is mainly used for",
        "body": "organizing data\n\ncleaning data\n\nanalyzing data\n\ntransforming data\n\nvisualizing tabular datasets\n\nThe central structure in pandas is the DataFrame, which works like a spreadsheet or table with rows and columns.\n\nChapter Recap\n\nChapter 1 — DataFrames Basics"
      },
      {
        "title": "You first learned how to work with DataFrames by",
        "body": "exploring datasets\n\nsorting rows\n\nsubsetting rows and columns\n\nfiltering data using conditions\n\ncreating new columns"
      },
      {
        "title": "Some important skills included",
        "body": "sort_values()\n\nfiltering with conditions\n\nselecting columns with brackets\n\nadding calculated columns\n\nThis chapter focused on understanding and manipulating tabular data.\n\nChapter 2 — Summary Statistics and Aggregation\n\nNext, you learned how to summarize and analyze datasets."
      },
      {
        "title": "You explored",
        "body": "mean\n\nmedian\n\nmin/max\n\ncumulative statistics\n\ngrouped statistics\n\ncounting categorical data"
      },
      {
        "title": "You also learned",
        "body": "groupby()\n\nagg()\n\nvalue_counts()\n\npivot_table()\n\nThese tools help turn raw data into useful insights."
      },
      {
        "title": "The main idea of this chapter was",
        "body": "analyzing patterns and relationships inside datasets.\n\nChapter 3 — Indexing and Slicing\n\nThis chapter focused on selecting data more efficiently."
      },
      {
        "title": "You learned",
        "body": "how indexes work\n\nhow to set and reset indexes\n\nslicing rows and columns\n\nusing .loc[]\n\nusing .iloc[]"
      },
      {
        "title": "Important distinction",
        "body": "Method\n\nUses\n\n.loc[]\n\nlabels/names\n\n.iloc[]\n\npositions/numbers"
      },
      {
        "title": "You also learned about",
        "body": "hierarchical indexes\n\ndate slicing\n\nrow/column slicing"
      },
      {
        "title": "This chapter was mainly about",
        "body": "accessing exactly the data you want.\n\nChapter 4 — Visualization and File Handling"
      },
      {
        "title": "Finally, you learned how to",
        "body": "create plots\n\nhandle missing values\n\nread data from CSV files\n\nwrite data back to CSV files"
      },
      {
        "title": "Visualization methods included",
        "body": "histograms\n\nbar plots\n\nline plots\n\nscatter plots"
      },
      {
        "title": "You also learned",
        "body": "isna()\n\ndropna()\n\nfillna()\n\npd.read_csv()\n\nto_csv()\n\nThis chapter connected pandas to real-world workflows.\n\nThe Bigger Picture"
      },
      {
        "title": "The full pandas workflow usually looks like this",
        "body": "Read Data → Clean Data → Analyze Data → Visualize Data → Save Results"
      },
      {
        "title": "Or more specifically",
        "body": "CSV File → DataFrame → Manipulation & Analysis → Charts/Insights → New CSV\n\nThis is the foundation of many real data science, machine learning, and analytics projects.\n\nImportant Realization About pandas\n\nOne of the biggest lessons from the course is that pandas is extremely powerful and flexible."
      },
      {
        "title": "Unlike regular Python, pandas often gives",
        "body": "multiple ways to solve the same problem\n\nmany functions that overlap\n\ndifferent approaches depending on preference"
      },
      {
        "title": "This makes pandas",
        "body": "powerful\n\npractical\n\nsometimes harder to master"
      },
      {
        "title": "You can think of pandas like a toolbox",
        "body": "there are many tools available, and part of learning pandas is learning which tool is best for a situation.\n\nTopics Beyond the Course\n\nThe course only covered the fundamentals. pandas can do much more, including:\n\nmerging/joining multiple DataFrames\n\nworking with Excel files\n\nSQL integration\n\ntime series analysis\n\nadvanced missing data handling\n\nadvanced visualization\n\nlarge dataset optimization\n\nexploratory data analysis (EDA)\n\nThere is still a lot more to explore after the basics.\n\nCore pandas Skills You Learned"
      },
      {
        "title": "By the end of the course, you now know how to",
        "body": "create DataFrames\n\nread CSV files\n\nexplore datasets\n\nfilter and sort data\n\nslice rows and columns\n\ngroup and summarize data\n\ncreate pivot tables\n\nadd new columns\n\nhandle missing values\n\nvisualize data\n\nexport results\n\nThese are the essential beginner-to-intermediate pandas skills used in real projects.\n\nFinal Takeaway\n\npandas is one of the most important Python libraries for data analysis because it makes working with tabular data:\n\nfaster\n\ncleaner\n\nmore efficient\n\neasier to analyze\n\nA lot of modern data science workflows begin with pandas.\n\nThis course gave you the foundation needed to continue into:\n\ndata analytics\n\nmachine learning\n\nAI/data preprocessing\n\nbusiness intelligence\n\nscientific computing"
      },
      {
        "title": "And most importantly",
        "body": "you now understand the general workflow of working with data in Python."
      }
    ],
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
    "description": "Inner Join in pandas  In real-world data analysis, information is often split across multiple tables or DataFrames. Instead of storing everything in one huge ta...",
    "sections": [
      {
        "title": "Inner Join in pandas",
        "body": "Inner Join in pandas\n\nIn real-world data analysis, information is often split across multiple tables or DataFrames. Instead of storing everything in one huge table, datasets are usually organized separately based on topic. Because of this, an important skill in pandas is learning how to combine tables together."
      },
      {
        "title": "In pandas, combining tables is commonly called",
        "body": "merging\n\nor sometimes joining\n\nIn this course, both terms mean essentially the same thing.\n\nBig Picture of Merging"
      },
      {
        "title": "Imagine you have two tables",
        "body": "Table 1 — Ward Government Data\n\nward\n\nalderman\n\naddress\n\n1\n\nPerson A\n\nAddress A\n\n2\n\nPerson B\n\nAddress B\n\nTable 2 — Census Data\n\nward\n\npopulation\n\n1\n\n50000\n\n2\n\n54000"
      },
      {
        "title": "Both tables contain a common column",
        "body": "ward\n\nThis shared column allows pandas to connect related rows together.\n\nWhat is an Inner Join?\n\nAn inner join returns only the rows where matching values exist in BOTH tables."
      },
      {
        "title": "Think of it like",
        "body": "“Keep only the rows that successfully match.”"
      },
      {
        "title": "If ward 2 exists in both tables",
        "body": "they get combined"
      },
      {
        "title": "If a ward exists in only one table",
        "body": "it gets excluded\n\nUsing merge()\n\nThe main pandas function used for joining tables is:\n\nmerge()"
      },
      {
        "title": "Basic syntax",
        "body": "`merged_df = left_table.merge(right_table, on=\"common_column\")`",
        "exampleCode": "merged_df = left_table.merge(right_table, on=\"common_column\")"
      },
      {
        "title": "Example",
        "body": "`wards_census = wards.merge(census, on=\"ward\")`\n\nWhat this means\n\nStart with wards\n\nMerge with census\n\nMatch rows using the ward column\n\nHow merge() Works",
        "exampleCode": "wards_census = wards.merge(census, on=\"ward\")"
      },
      {
        "title": "Suppose",
        "body": "wards table\n\nward\n\nalderman\n\n1\n\nSmith\n\n2\n\nHopkins\n\ncensus table\n\nward\n\npopulation\n\n2\n\n54361\n\n3\n\n60000"
      },
      {
        "title": "After inner join",
        "body": "ward\n\nalderman\n\npopulation\n\n2\n\nHopkins\n\n54361"
      },
      {
        "title": "Only ward 2 remains because",
        "body": "it exists in both tables"
      },
      {
        "title": "Ward 1 is removed because",
        "body": "no matching census data"
      },
      {
        "title": "Ward 3 is removed because",
        "body": "no matching ward data\n\nImportant merge() Arguments\n\non=\n\nSpecifies the column used to match rows."
      },
      {
        "title": "Example",
        "body": "on=\"ward\"\n\nColumn Order in Result\n\nThe table written first becomes the “left” table."
      },
      {
        "title": "Example",
        "body": "wards.merge(census, on=\"ward\")"
      },
      {
        "title": "Result",
        "body": "columns from wards\n\nthen columns from census\n\nOverlapping Column Names\n\nSometimes both tables contain columns with the same name."
      },
      {
        "title": "Example",
        "body": "address\n\nzip\n\npandas automatically avoids duplicate names by adding suffixes:\n\naddress_x\n\naddress_y"
      },
      {
        "title": "Where",
        "body": "_x → left table\n\n_y → right table\n\nUsing Custom Suffixes"
      },
      {
        "title": "You can make suffixes more readable using",
        "body": "suffixes="
      },
      {
        "title": "Example",
        "body": "wards.merge(\n\ncensus,\n\non=\"ward\",\n\nsuffixes=(\"_ward\", \"_cen\")\n\n)"
      },
      {
        "title": "Result",
        "body": "address_ward\n\naddress_cen\n\nThis makes it easier to understand which table each column came from.\n\nGeneral Structure of an Inner Join\n\n`merged_df = left_df.merge(`\n\nright_df,\n\non=\"column_name\"\n\n)",
        "exampleCode": "merged_df = left_df.merge("
      },
      {
        "title": "With suffixes",
        "body": "`merged_df = left_df.merge(`\n\nright_df,\n\non=\"column_name\",\n\nsuffixes=(\"_left\", \"_right\")\n\n)\n\nBig Concept to Remember",
        "exampleCode": "merged_df = left_df.merge("
      },
      {
        "title": "Merging is basically",
        "body": "matching related rows from different tables using a common column."
      },
      {
        "title": "The common column is often called",
        "body": "key\n\njoin key\n\nmerge key"
      },
      {
        "title": "Examples",
        "body": "id\n\ncustomer_id\n\nward\n\nemployee_number\n\nWhy Merging is Important\n\nReal datasets are usually separated into multiple tables because:\n\ndata is cleaner\n\neasier to maintain\n\navoids repetition"
      },
      {
        "title": "For example",
        "body": "customer info in one table\n\norders in another\n\npayments in another\n\nMerging allows you to combine them for analysis."
      },
      {
        "title": "This is one of the most important skills in",
        "body": "pandas\n\nSQL\n\ndata analytics\n\ndata science\n\nKey Takeaways\n\nmerge() combines DataFrames together.\n\nAn inner join keeps only matching rows from both tables.\n\non= specifies the matching column.\n\nOverlapping column names get suffixes automatically.\n\nsuffixes= lets you customize overlapping column names.\n\nMerging is essential for real-world data analysis."
      }
    ],
    "challenge": {
      "title": "Enrich Sales with Customer Profiles",
      "scenario": "The analytics team needs customer demographic information attached to every order transaction.",
      "instructions": "Read `sales.csv` and `customers.csv`. Perform an inner join on `customer_id` using `pd.merge()`. Return the merged DataFrame with `sale_id`, `customer_id`, `first_name`, and `sale_amount` as `enriched_sales`.",
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
        "title": "One-to-Many Relationships",
        "body": "One-to-Many Relationships in pandas\n\nIn the previous lesson, you learned how to merge two DataFrames using the merge() method. In this lesson, the focus is on understanding relationships between tables, especially the one-to-many relationship.\n\nBefore learning one-to-many, it helps to quickly review one-to-one relationships.\n\nA one-to-one relationship means that each row in one table matches exactly one row in another table. For example, the wards table and the census table both contain one row per ward. Ward 3 in the first table matches only ward 3 in the second table. Since there is only one population record for each ward, the relationship is naturally one-to-one."
      },
      {
        "title": "Example idea",
        "body": "One ward → one census record\n\nOne row in the left table → one row in the right table\n\nA one-to-many relationship is different. In this case, one row in the left table can match multiple rows in the right table."
      },
      {
        "title": "The example used is the relationship between",
        "body": "the wards table\n\nthe licenses table\n\nThe wards table contains information about each ward, while the licenses table contains many business licenses. Since many businesses can exist inside one ward, a single ward can appear multiple times in the licenses table."
      },
      {
        "title": "So the relationship becomes",
        "body": "One ward → many businesses\n\nBoth tables are connected using the ward column."
      },
      {
        "title": "When using",
        "body": "wards.merge(licenses, on=\"ward\")\n\npandas automatically handles the one-to-many relationship.\n\nIf ward 1 has many businesses, the row for ward 1 from the wards table will be repeated for every matching business in the licenses table.\n\nThis is important because it explains why merged tables can suddenly become much larger."
      },
      {
        "title": "For example",
        "body": "Original wards table: 50 rows\n\nAfter merging with licenses: 10,000 rows\n\nThe number of rows increases because each ward may match many business records.\n\nKey Idea"
      },
      {
        "title": "In a one-to-many relationship",
        "body": "The left table usually contains unique values.\n\nThe right table can contain repeated values for the matching column.\n\nMerging repeats rows from the left table whenever multiple matches exist.\n\nImportant Notes\n\nOne-to-One Relationship\n\nOne row matches exactly one row.\n\nExample: wards ↔ census\n\nOne-to-Many Relationship\n\nOne row matches several rows.\n\nExample: wards ↔ licenses\n\npandas Behavior\n\nThe same merge() syntax is used.\n\npandas automatically duplicates matching rows when needed.\n\nRow counts often increase after merging.\n\nExample Structure\n\nwards table\n\nward\n\nalderman\n\n1\n\nJoe\n\n2\n\nBrian\n\nlicenses table\n\nbusiness\n\nward\n\nStore A\n\n1\n\nCafe B\n\n1\n\nShop C\n\n2\n\nmerged result\n\nward\n\nalderman\n\nbusiness\n\n1\n\nJoe\n\nStore A\n\n1\n\nJoe\n\nCafe B\n\n2\n\nBrian\n\nShop C\n\nNotice how ward 1 and Joe appear twice because there are two businesses in ward 1.\n\nMain Takeaway\n\nA one-to-many merge is extremely common in real-world datasets. One category, customer, location, or ID often connects to many records in another table. pandas handles this automatically during merges, but you should always expect the resulting DataFrame to potentially have many more rows than the original table."
      }
    ],
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
    "description": "Merging Multiple DataFrames  In the previous lesson, you learned how to merge two tables together using merge(). In real-world data analysis, though, informatio...",
    "sections": [
      {
        "title": "Merging Multiple DataFrames",
        "body": "Merging Multiple DataFrames\n\nIn the previous lesson, you learned how to merge two tables together using merge(). In real-world data analysis, though, information is often spread across several different tables, not just two. Because of this, it’s very common to merge multiple DataFrames together step by step.\n\nThe lesson continues using datasets from the city of Chicago. Previously, there were two tables:\n\nlicenses → contains business license information\n\nwards → contains information about Chicago wards and government offices"
      },
      {
        "title": "Now, a third table is introduced",
        "body": "grants → contains information about businesses that received small business grant money\n\nThe goal is to combine all this information together so we can analyze things like:\n\nwhich businesses received grants\n\nwhere those businesses are located\n\nwhich wards received the most grant money\n\nConnecting Multiple Tables\n\nTo combine all the information, the process is done in stages."
      },
      {
        "title": "First",
        "body": "grants.merge(licenses, on=[\"address\", \"zip\"])"
      },
      {
        "title": "Then",
        "body": "merged_table.merge(wards, on=\"ward\")"
      },
      {
        "title": "This creates one final DataFrame containing",
        "body": "business information\n\ngrant information\n\nward information\n\nWhy Merge on Multiple Columns?\n\nA very important concept introduced here is merging using more than one column.\n\nAt first glance, merging on only zip might seem enough, but it creates incorrect matches because many businesses can share the same zip code.\n\nSimilarly, merging only on address could also cause problems because addresses might repeat in different places."
      },
      {
        "title": "The safer solution is to merge using BOTH",
        "body": "address\n\nzip\n\nThis ensures that a row only matches when BOTH values are the same."
      },
      {
        "title": "Example",
        "body": "grants.merge(licenses, on=[\"address\", \"zip\"])\n\nNotice that the on argument now receives a list instead of a single column name.\n\nKey Idea About Multi-Column Merges"
      },
      {
        "title": "When merging on multiple columns",
        "body": "on=[\"address\", \"zip\"]\n\npandas requires ALL listed columns to match before rows are combined.\n\nThis helps avoid incorrect duplicates or mismatched data.\n\nChaining Multiple Merges\n\nYou can continue merging more tables one after another."
      },
      {
        "title": "Example structure",
        "body": "grants.merge(licenses, on=[\"address\", \"zip\"]) \\\n\n.merge(wards, on=\"ward\")\n\nThe backslash \\ is used for line continuation so Python treats it as one statement spread across multiple lines.\n\nThis technique keeps long merge operations cleaner and easier to read.\n\nResult of Multiple Merges\n\nAfter combining the tables, you now have a richer dataset containing:\n\ngrant amounts\n\nbusiness details\n\nward details\n\nOnce all the data is connected, you can perform analysis more easily."
      },
      {
        "title": "For example",
        "body": "calculate total grant money per ward\n\ncompare wards\n\nvisualize which wards received more funding\n\nThis is one of the biggest reasons merging is important in data analysis: it allows information from different sources to work together.\n\nImportant Concepts\n\nMerging on Multiple Columns\n\nUse a list inside on.\n\non=[\"address\", \"zip\"]\n\nBoth columns must match.\n\nChaining Merges\n\nYou can merge several DataFrames in sequence.\n\ndf1.merge(df2).merge(df3)\n\nWhy This Matters\n\nReal datasets are often separated across multiple tables."
      },
      {
        "title": "You may need to combine",
        "body": "customer data\n\ntransaction data\n\nproduct data\n\nlocation data\n\nbefore meaningful analysis can happen.\n\nMain Takeaway\n\nMerging multiple DataFrames is a core skill in pandas because real-world data is rarely stored in one perfect table. pandas allows you to combine many datasets together step by step, and you can even merge using multiple matching columns to make the joins more accurate and reliable."
      }
    ],
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
    "description": "Left Join in pandas  In the earlier lessons, you learned how to merge tables using the merge() method. By default, pandas performs an inner join, which only kee...",
    "sections": [
      {
        "title": "Left Join in pandas",
        "body": "Left Join in pandas\n\nIn the earlier lessons, you learned how to merge tables using the merge() method. By default, pandas performs an inner join, which only keeps rows where matching values exist in both tables.\n\nThis lesson introduces another type of merge called the left join."
      },
      {
        "title": "A left join keeps",
        "body": "all rows from the left table\n\nonly the matching rows from the right table\n\nIf no match is found in the right table, pandas fills the missing values with NaN.\n\nQuick Review of Inner Join\n\nAn inner join only returns rows where the key column exists in BOTH tables."
      },
      {
        "title": "Example idea",
        "body": "Left Table\n\nRight Table\n\nResult\n\nMatch exists\n\nMatch exists\n\nRow kept\n\nNo match\n\n—\n\nRow removed\n\nSo unmatched rows disappear completely.\n\nWhat Makes Left Join Different?\n\nA left join preserves every row from the left table even if no match exists in the right table."
      },
      {
        "title": "Example idea",
        "body": "Left Table\n\nRight Table\n\nResult\n\nMatch exists\n\nMatch exists\n\nCombined row\n\nNo match\n\n—\n\nLeft row kept, right side becomes NaN\n\nThis is useful when the left table contains the main dataset you want to preserve.\n\nExample Using Movies Dataset\n\nThe lesson uses data from The Movie Database."
      },
      {
        "title": "There are two tables",
        "body": "movies"
      },
      {
        "title": "Contains",
        "body": "movie ID\n\ntitle\n\npopularity\n\nThis table has around 4,803 rows.\n\ntaglines"
      },
      {
        "title": "Contains",
        "body": "movie ID\n\nmovie tagline\n\nThis table has fewer rows, meaning not every movie has a tagline.\n\nPerforming a Left Join\n\nmovies.merge(taglines, on=\"id\", how=\"left\")\n\nBreaking Down the Code\n\nmovies\n\nThis is the left table.\n\nAll rows from this table will remain in the result.\n\ntaglines\n\nThis is the right table.\n\nOnly matching rows will be added.\n\non=\"id\"\n\nThe id column is the key used to connect the tables.\n\nhow=\"left\"\n\nSpecifies that the merge should be a left join.\n\nWithout this argument, pandas uses an inner join by default.\n\nWhat Happens After the Merge?"
      },
      {
        "title": "If a movie has a matching tagline",
        "body": "the tagline appears in the merged result"
      },
      {
        "title": "If a movie does NOT have a tagline",
        "body": "the movie row is still kept\n\nthe tagline column becomes NaN"
      },
      {
        "title": "Example",
        "body": "id\n\ntitle\n\ntagline\n\n1\n\nMovie A\n\n\"Epic adventure\"\n\n2\n\nMovie B\n\nNaN\n\nMovie B stays because it came from the left table.\n\nImportant Observation About Row Counts"
      },
      {
        "title": "Since",
        "body": "the left table (movies) has 4,803 rows\n\nthe relationship is one-to-one\n\nthe merged table keeps essentially the same number of rows."
      },
      {
        "title": "That’s one important property of left joins",
        "body": "In a one-to-one relationship, a left join usually returns the same number of rows as the left table.\n\nKey Concepts\n\nInner Join\n\nKeeps only matching rows\n\nUnmatched rows are removed\n\nLeft Join\n\nKeeps ALL rows from the left table\n\nMissing matches from the right become NaN\n\nSyntax\n\ndf1.merge(df2, on=\"column\", how=\"left\")\n\nWhen Left Joins Are Useful"
      },
      {
        "title": "Left joins are extremely useful when",
        "body": "one table is your “main” dataset\n\nyou do not want to lose rows\n\nextra information from another table is optional"
      },
      {
        "title": "Examples",
        "body": "customers + optional purchases\n\nmovies + optional taglines\n\nstudents + optional scholarship info\n\nMain Takeaway\n\nA left join keeps every row from the left table, even when no matching data exists in the right table. Missing matches are filled with NaN, making left joins very useful when you want to preserve the full original dataset while adding extra information from another table."
      }
    ],
    "challenge": {
      "title": "Enrich Sales with Customer Profiles",
      "scenario": "The analytics team needs customer demographic information attached to every order transaction.",
      "instructions": "Read `sales.csv` and `customers.csv`. Perform an inner join on `customer_id` using `pd.merge()`. Return the merged DataFrame with `sale_id`, `customer_id`, `first_name`, and `sale_amount` as `enriched_sales`.",
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
    "id": "py-lesson-t-cbtvxfsdf1pg",
    "tabId": "t.cbtvxfsdf1pg",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 50,
    "title": "Other Types of Joins in pandas",
    "description": "Other Types of Joins in pandas...",
    "sections": [
      {
        "title": "Other Types of Joins in pandas",
        "body": "Other Types of Joins in pandas"
      },
      {
        "title": "Previously, you learned about",
        "body": "inner joins\n\nleft joins\n\nThis lesson introduces two more join types supported by pandas:\n\nright join\n\nouter join\n\nThese joins control which rows are kept after merging tables.\n\nRight Join\n\nA right join is basically the opposite of a left join."
      },
      {
        "title": "It",
        "body": "keeps all rows from the right table\n\nonly keeps matching rows from the left table\n\nIf no match exists in the left table, pandas fills the missing columns with NaN.\n\nVisual Idea of a Right Join\n\nLeft Table\n\nC\n\nA\n\n1\n\nX\n\n2\n\nY\n\nRight Table\n\nC\n\nB\n\n1\n\nP\n\n3\n\nQ\n\nResult of Right Join\n\nC\n\nA\n\nB\n\n1\n\nX\n\nP\n\n3\n\nNaN\n\nQ"
      },
      {
        "title": "Notice",
        "body": "all rows from the right table remain\n\nunmatched left-side values become NaN\n\nExample Using Movie Data\n\nThe lesson introduces another dataset called movie_to_genres.\n\nA movie can belong to multiple genres, so this table stores movie IDs along with genre names."
      },
      {
        "title": "The goal is to compare",
        "body": "the movies table\n\nthe tv_genre subset\n\nto check whether any movie information is missing.\n\nUsing Different Column Names\n\nAn important new concept appears here.\n\nThe matching columns do NOT always have the same name."
      },
      {
        "title": "Example",
        "body": "in movies → column is id\n\nin tv_genre → column is movie_id"
      },
      {
        "title": "To handle this, pandas provides",
        "body": "left_on\n\nright_on\n\nRight Join Syntax\n\nmovies.merge(\n\ntv_genre,\n\nhow=\"right\",\n\nleft_on=\"id\",\n\nright_on=\"movie_id\"\n\n)\n\nBreaking Down the Code\n\nhow=\"right\"\n\nPerforms a right join.\n\nleft_on=\"id\"\n\nUses the id column from the left table.\n\nright_on=\"movie_id\"\n\nUses the movie_id column from the right table.\n\nWhy This Is Useful\n\nSometimes datasets use different column names even though they represent the same thing."
      },
      {
        "title": "Example",
        "body": "customer_id\n\ncust_id\n\nid\n\nleft_on and right_on allow pandas to connect them correctly.\n\nOuter Join\n\nThe last join type introduced is the outer join."
      },
      {
        "title": "An outer join keeps",
        "body": "ALL rows from the left table\n\nAND ALL rows from the right table\n\nEven if no matches exist.\n\nMissing matches become NaN.\n\nVisual Idea of an Outer Join\n\nLeft Table\n\nC\n\nA\n\n1\n\nX\n\n2\n\nY\n\nRight Table\n\nC\n\nB\n\n1\n\nP\n\n3\n\nQ\n\nOuter Join Result\n\nC\n\nA\n\nB\n\n1\n\nX\n\nP\n\n2\n\nY\n\nNaN\n\n3\n\nNaN\n\nQ\n\nEverything from BOTH tables is preserved.\n\nOuter Join Example\n\nThe lesson filters movie genres into two tiny tables:\n\nFamily movies\n\nComedy movies\n\nThen merges them using an outer join.\n\nfamily.merge(\n\ncomedy,\n\non=\"movie_id\",\n\nhow=\"outer\",\n\nsuffixes=(\"_fam\", \"_com\")\n\n)\n\nNew Concept: suffixes\n\nIf both tables contain columns with the same names, pandas automatically adds suffixes."
      },
      {
        "title": "You can customize them using",
        "body": "suffixes=(\"_fam\", \"_com\")\n\nThis makes it easier to know which column came from which table.\n\nKey Differences Between Join Types\n\nJoin Type\n\nKeeps\n\nInner Join\n\nOnly matching rows\n\nLeft Join\n\nAll left rows + matching right rows\n\nRight Join\n\nAll right rows + matching left rows\n\nOuter Join\n\nAll rows from both tables\n\nImportant Concepts\n\nleft_on and right_on\n\nUsed when key column names are different.\n\nleft_on=\"id\"\n\nright_on=\"movie_id\"\n\nsuffixes\n\nUsed when tables contain overlapping column names.\n\nsuffixes=(\"_left\", \"_right\")\n\nMain Takeaway\n\nRight joins and outer joins give you more control over which rows are preserved during merges. A right join keeps all rows from the right table, while an outer join keeps everything from both tables. pandas also allows merging on columns with different names using left_on and right_on, making joins much more flexible in real-world datasets."
      }
    ],
    "challenge": {
      "title": "Enrich Sales with Customer Profiles",
      "scenario": "The analytics team needs customer demographic information attached to every order transaction.",
      "instructions": "Read `sales.csv` and `customers.csv`. Perform an inner join on `customer_id` using `pd.merge()`. Return the merged DataFrame with `sale_id`, `customer_id`, `first_name`, and `sale_amount` as `enriched_sales`.",
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
    "id": "py-lesson-t-3ciu9p3rjw6a",
    "tabId": "t.3ciu9p3rjw6a",
    "moduleTitle": "Part 4: Relational Data & Joining with pandas",
    "moduleOrder": 4,
    "lessonOrder": 51,
    "title": "Merging a Table to Itself (Self Join)",
    "description": "Merging a Table to Itself (Self Join)  A self join happens when you merge a table with itself. This sounds strange at first, but it’s very useful when rows insi...",
    "sections": [
      {
        "title": "Merging a Table to Itself (Self Join)",
        "body": "Merging a Table to Itself (Self Join)\n\nA self join happens when you merge a table with itself. This sounds strange at first, but it’s very useful when rows inside the same table are related to other rows in that same table.\n\nThe example in the lesson uses movie sequels."
      },
      {
        "title": "Imagine a table like this",
        "body": "id\n\ntitle\n\nsequel\n\n862\n\nToy Story\n\n863\n\n863\n\nToy Story 2\n\n10193\n\n10193\n\nToy Story 3\n\nNaN\n\nThe sequel column stores the ID of another movie inside the same table.\n\nToy Story (862) → sequel is movie 863\n\nToy Story 2 (863) → sequel is movie 10193\n\nThe problem is:\u000b the sequel’s title is not directly stored in the row — only its ID is."
      },
      {
        "title": "So we merge the table with itself to connect",
        "body": "original movie\n\nsequel movie\n\ninto one row.\n\nBasic Self Join\n\nsequels.merge(\n\nsequels,\n\nleft_on=\"sequel\",\n\nright_on=\"id\",\n\nsuffixes=(\"_org\", \"_seq\")\n\n)\n\nWhat Each Part Means\n\nsequels.merge(sequels, ...)\n\nYou are merging the table with another copy of itself."
      },
      {
        "title": "Think of it like",
        "body": "`left table  = original movies`\n\n`right table = sequel movies`\n\nEven though they are the same DataFrame.\n\nleft_on=\"sequel\"\n\nUse the sequel column from the left table.",
        "exampleCode": "left table  = original movies\nright table = sequel movies"
      },
      {
        "title": "Example",
        "body": "title\n\nsequel\n\nToy Story\n\n863\n\nright_on=\"id\"\n\nMatch it to the id column in the right table."
      },
      {
        "title": "Example",
        "body": "id\n\ntitle\n\n863\n\nToy Story 2"
      },
      {
        "title": "Since",
        "body": "863 == 863\n\nthey get connected.\n\nResult\n\ntitle_org\n\ntitle_seq\n\nToy Story\n\nToy Story 2\n\nToy Story 2\n\nToy Story 3\n\nNow each movie is linked to its sequel.\n\nWhy suffixes is Needed"
      },
      {
        "title": "Both tables have columns like",
        "body": "id\n\ntitle\n\nWithout suffixes, pandas wouldn’t know which is which."
      },
      {
        "title": "So",
        "body": "suffixes=(\"_org\", \"_seq\")"
      },
      {
        "title": "renames them internally to",
        "body": "title_org\n\ntitle_seq"
      },
      {
        "title": "meaning",
        "body": "original movie\n\nsequel movie\n\nInner Join vs Left Join\n\nBy default, merge uses an inner join."
      },
      {
        "title": "That means",
        "body": "only rows with matches are returned.\n\nSo movies without sequels disappear."
      },
      {
        "title": "Example",
        "body": "title\n\nsequel\n\nTitanic\n\nNaN\n\nTitanic gets removed because it has no matching sequel.\n\nUsing a Left Join\n\nsequels.merge(\n\nsequels,\n\nleft_on=\"sequel\",\n\nright_on=\"id\",\n\nhow=\"left\",\n\nsuffixes=(\"_org\", \"_seq\")\n\n)\n\nNow ALL original movies stay."
      },
      {
        "title": "Movies without sequels will have",
        "body": "NaN\n\nfor sequel columns.\n\nReal-World Uses of Self Joins\n\nSelf joins are common in hierarchical or connected data.\n\nEmployee ↔ Manager\n\nemployee_id\n\nmanager_id\n\n1\n\n5\n\nYou can merge employees with employees again to get manager names.\n\nSocial Networks\n\nuser\n\nfriend_id\n\nAlice\n\n3\n\nMerge users with users again to get friend information.\n\nLogistics / Routes\n\ncity\n\nnext_city\n\nManila\n\nBatangas\n\nSelf joins can connect travel paths.\n\nBig Picture"
      },
      {
        "title": "A self join is basically",
        "body": "“Use one row to look up another row in the same table.”\n\nYou are treating one DataFrame as if it were two related tables."
      }
    ],
    "challenge": {
      "title": "Enrich Sales with Customer Profiles",
      "scenario": "The analytics team needs customer demographic information attached to every order transaction.",
      "instructions": "Read `sales.csv` and `customers.csv`. Perform an inner join on `customer_id` using `pd.merge()`. Return the merged DataFrame with `sale_id`, `customer_id`, `first_name`, and `sale_amount` as `enriched_sales`.",
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
    "description": "Merging on Indexes...",
    "sections": [
      {
        "title": "Merging on indexes",
        "body": "Merging on Indexes"
      },
      {
        "title": "So far, merges used columns like",
        "body": "movies.merge(taglines, on=\"id\")\n\nBut pandas can also merge using the index of a DataFrame.\n\nThis is useful because indexes often contain unique IDs.\n\nWhat is an Index Again?"
      },
      {
        "title": "Normally a DataFrame looks like this",
        "body": "index\n\nid\n\ntitle\n\n0\n\n101\n\nAvatar\n\n1\n\n102\n\nTitanic\n\nThe leftmost numbers (0,1,2) are the default index."
      },
      {
        "title": "But sometimes we make another column the index",
        "body": "`movies = movies.set_index(\"id\")`",
        "exampleCode": "movies = movies.set_index(\"id\")"
      },
      {
        "title": "Now",
        "body": "id (index)\n\ntitle\n\n101\n\nAvatar\n\n102\n\nTitanic\n\nThe id column became the index.\n\nWhy Merge on an Index?"
      },
      {
        "title": "Indexes are often",
        "body": "unique\n\noptimized for lookup\n\nused as identifiers\n\nSo merging on indexes is clean and efficient.\n\nSimple Index Merge"
      },
      {
        "title": "If both tables use the same index name",
        "body": "movies.merge(taglines, on=\"id\", how=\"left\")\n\nEven though id is now an index, pandas automatically understands it.\n\nBig Picture"
      },
      {
        "title": "This works because",
        "body": "on=\"id\""
      },
      {
        "title": "can refer to",
        "body": "a column\u000b OR\n\nan index name\n\npandas detects it automatically.\n\nMultiIndex Merge\n\nA MultiIndex means multiple index levels."
      },
      {
        "title": "Example",
        "body": "movie_id\n\ncast_id\n\nactor\n\n1\n\n10\n\nSamuel Jackson"
      },
      {
        "title": "If both movie_id and cast_id are indexes",
        "body": "samuel.merge(cast, on=[\"movie_id\", \"cast_id\"])\n\nThis works exactly like merging on multiple columns.\n\nBoth values must match.\n\nWhen Index Names are Different\n\nSometimes the indexes have different names."
      },
      {
        "title": "Left table index",
        "body": "id"
      },
      {
        "title": "Right table index",
        "body": "movie_id"
      },
      {
        "title": "Then you use",
        "body": "movies.merge(\n\nmovie_to_genres,\n\nleft_on=\"id\",\n\nright_on=\"movie_id\",\n\nleft_index=True,\n\nright_index=True\n\n)\n\nImportant Part"
      },
      {
        "title": "When using",
        "body": "left_on\n\nright_on"
      },
      {
        "title": "with indexes, you MUST specify",
        "body": "left_index=True\n\nright_index=True"
      },
      {
        "title": "This tells pandas",
        "body": "“The keys are indexes, not regular columns.”\n\nQuick Rule\n\nSame index names"
      },
      {
        "title": "Use",
        "body": "on=\"id\"\n\nDifferent index names"
      },
      {
        "title": "Use",
        "body": "left_on=\n\nright_on=\n\nleft_index=True\n\nright_index=True\n\nConceptual Understanding"
      },
      {
        "title": "Think of indexes as",
        "body": "hidden columns used to identify rows.\n\nNormally merges use visible columns.\n\nIndex merges use those hidden identifiers instead.\n\nComparing Column Merge vs Index Merge\n\nColumn Merge\n\nmovies.merge(taglines, on=\"id\")\n\nUses normal columns.\n\nIndex Merge\n\nmovies.set_index(\"id\")\n\ntaglines.set_index(\"id\")\n\nmovies.merge(taglines, on=\"id\")\n\nUses indexes instead.\n\nImportant Insight"
      },
      {
        "title": "Indexes are mostly about",
        "body": "faster lookup\n\ncleaner subsetting\n\nstructured data relationships\n\nAnd pandas lets merges work with them almost the same way as columns.\n\nThat’s why merging on indexes feels very similar to normal merging."
      }
    ],
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
    "description": "Filtering Joins  Up to this point, the joins you learned were mostly mutating joins....",
    "sections": [
      {
        "title": "Filtering Joins",
        "body": "Filtering Joins\n\nUp to this point, the joins you learned were mostly mutating joins."
      },
      {
        "title": "A mutating join",
        "body": "combines columns from two tables."
      },
      {
        "title": "Example",
        "body": "movies.merge(taglines)\n\nThis adds new columns from another table.\n\nFiltering Joins\n\nFiltering joins are different."
      },
      {
        "title": "Instead of adding columns, they",
        "body": "filter rows based on whether matches exist in another table."
      },
      {
        "title": "There are two main filtering joins",
        "body": "Semi Join\n\nAnti Join"
      },
      {
        "title": "pandas doesn’t have built-in methods named",
        "body": "semi_join()\n\nanti_join()"
      },
      {
        "title": "So we recreate them manually using",
        "body": "merge()\n\nisin()\n\nfiltering\n\nSemi Join"
      },
      {
        "title": "A semi join returns",
        "body": "rows from the LEFT table that HAVE matches in the RIGHT table."
      },
      {
        "title": "Important",
        "body": "only columns from the left table are returned\n\nduplicates are not added\n\nit behaves like a filter\n\nExample"
      },
      {
        "title": "Suppose",
        "body": "genres table\n\ngid\n\ngenre\n\n1\n\nRock\n\n2\n\nJazz\n\n3\n\nPop\n\ntop_tracks table\n\ntrack\n\ngid\n\nSong A\n\n1\n\nSong B\n\n3"
      },
      {
        "title": "We want",
        "body": "genres that appear in top tracks."
      },
      {
        "title": "Result",
        "body": "gid\n\ngenre\n\n1\n\nRock\n\n3\n\nPop\n\nJazz is removed because it doesn’t appear.\n\nSemi Join Process\n\nStep 1 — Inner Merge\n\n`genres_tracks = genres.merge(top_tracks, on=\"gid\")`\n\nThis keeps only matching gids.\n\nStep 2 — Use isin()\n\ngenres[\"gid\"].isin(genres_tracks[\"gid\"])",
        "exampleCode": "genres_tracks = genres.merge(top_tracks, on=\"gid\")"
      },
      {
        "title": "This checks",
        "body": "“Does this gid exist in the merged table?”"
      },
      {
        "title": "Result",
        "body": "True\n\nFalse\n\nTrue\n\nStep 3 — Filter\n\n`top_genres = genres[genres[\"gid\"].isin(genres_tracks[\"gid\"])]`\n\nNow only matching genres remain.\n\nBig Picture of Semi Join",
        "exampleCode": "top_genres = genres[genres[\"gid\"].isin(genres_tracks[\"gid\"])]"
      },
      {
        "title": "Think of it as",
        "body": "“Keep rows from the left table IF they exist in the right table.”\n\nYou are not interested in adding columns.\n\nYou only care whether a match exists.\n\nAnti Join\n\nAn anti join is the opposite."
      },
      {
        "title": "It returns",
        "body": "rows from the LEFT table that DO NOT have matches in the RIGHT table.\n\nExample"
      },
      {
        "title": "Using the same data",
        "body": "genres\n\ngid\n\ngenre\n\n1\n\nRock\n\n2\n\nJazz\n\n3\n\nPop\n\ntop_tracks\n\ntrack\n\ngid\n\nSong A\n\n1\n\nSong B\n\n3"
      },
      {
        "title": "Result of anti join",
        "body": "gid\n\ngenre\n\n2\n\nJazz\n\nBecause Jazz never appeared in top tracks.\n\nAnti Join Process\n\nStep 1 — Left Merge with Indicator\n\n`genres_tracks = genres.merge(`\n\ntop_tracks,\n\non=\"gid\",\n\nhow=\"left\",\n\nindicator=True\n\n)",
        "exampleCode": "genres_tracks = genres.merge("
      },
      {
        "title": "The important part",
        "body": "indicator=True"
      },
      {
        "title": "adds a special column",
        "body": "_merge\n\n_merge Values\n\nThe _merge column tells where the row came from."
      },
      {
        "title": "Possible values",
        "body": "value\n\nmeaning\n\nboth\n\nexists in both tables\n\nleft_only\n\nexists only in left\n\nright_only\n\nexists only in right\n\nStep 2 — Get Unmatched Rows\n\n`gid_list = genres_tracks.loc[`\n\ngenres_tracks[\"_merge\"] == \"left_only\",\n\n\"gid\"\n\n]\n\nThis extracts gids that were NOT matched.\n\nStep 3 — Filter Original Table\n\ngenres[genres[\"gid\"].isin(gid_list)]\n\nNow you get only genres absent from top_tracks.\n\nBig Picture\n\nSemi Join\n\nKEEP matching rows\n\nAnti Join\n\nKEEP non-matching rows\n\nMental Model\n\nImagine two circles.\n\nInner Join\n\nReturns the overlap AND combines columns.\n\nSemi Join\n\nReturns only the left-side rows that overlap.\n\nAnti Join\n\nReturns only the left-side rows outside the overlap.\n\nQuick Comparison\n\nJoin Type\n\nPurpose\n\nInner Join\n\ncombine matching rows\n\nLeft Join\n\nkeep all left rows\n\nSemi Join\n\nkeep left rows WITH matches\n\nAnti Join\n\nkeep left rows WITHOUT matches\n\nImportant Insight",
        "exampleCode": "gid_list = genres_tracks.loc["
      },
      {
        "title": "Filtering joins are mostly used for",
        "body": "existence checks\n\nremoving unmatched data\n\nvalidating datasets\n\nfinding missing relationships\n\nThey are very common in data cleaning and analytics."
      }
    ],
    "challenge": {
      "title": "Enrich Sales with Customer Profiles",
      "scenario": "The analytics team needs customer demographic information attached to every order transaction.",
      "instructions": "Read `sales.csv` and `customers.csv`. Perform an inner join on `customer_id` using `pd.merge()`. Return the merged DataFrame with `sale_id`, `customer_id`, `first_name`, and `sale_amount` as `enriched_sales`.",
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
    "description": "Concatenating DataFrames Vertically...",
    "sections": [
      {
        "title": "Concatenating DataFrames Vertically",
        "body": "Concatenating DataFrames Vertically"
      },
      {
        "title": "Up to now, most operations used",
        "body": "merge()\n\nA merge usually combines tables side-by-side (horizontally)."
      },
      {
        "title": "Example",
        "body": "id\n\nname\n\nage\n\nid\n\nsalary\n\n↓\n\nid\n\nname\n\nage\n\nsalary\n\nThat’s horizontal growth.\n\nConcatenation is Different\n\nconcat() usually stacks tables:\n\ntop-to-bottom (vertically)\n\ninstead of side-by-side."
      },
      {
        "title": "Think",
        "body": "January data\n\nFebruary data\n\nMarch data\n\nbecoming one large table.\n\nBasic Vertical Concatenation"
      },
      {
        "title": "Suppose",
        "body": "inv_jan\n\ninv_feb\n\ninv_mar\n\nall have the same columns."
      },
      {
        "title": "You combine them with",
        "body": "pd.concat([inv_jan, inv_feb, inv_mar])\n\nMental Model"
      },
      {
        "title": "Imagine stacking papers",
        "body": "January\n\n--------\n\nFebruary\n\n--------\n\nMarch\n\nThat’s vertical concatenation.\n\nExample\n\nJanuary\n\ncustomer\n\namount\n\nAlice\n\n10\n\nFebruary\n\ncustomer\n\namount\n\nBob\n\n20\n\nResult\n\ncustomer\n\namount\n\nAlice\n\n10\n\nBob\n\n20\n\nThe Index Problem"
      },
      {
        "title": "By default",
        "body": "concat()\n\nkeeps original indexes."
      },
      {
        "title": "So if each table starts at index 0",
        "body": "0\n\n1\n\n0\n\n1\n\n0\n\n1\n\nyou get duplicate indexes.\n\nResetting the Index"
      },
      {
        "title": "Use",
        "body": "pd.concat([...], ignore_index=True)"
      },
      {
        "title": "Now pandas creates a fresh index",
        "body": "0\n\n1\n\n2\n\n3\n\n4\n\n5\n\nImportant Idea\n\nmerge()\n\nconnects related data using keys.\n\nconcat()\n\nsimply stacks data.\n\nNo matching keys required.\n\nUsing keys\n\nYou can label where each row came from.\n\npd.concat(\n\n[inv_jan, inv_feb, inv_mar],\n\nkeys=[\"jan\", \"feb\", \"mar\"]\n\n)\n\nThis creates a MultiIndex.\n\nResult Conceptually\n\nmonth\n\nindex\n\ncustomer\n\njan\n\n0\n\nAlice\n\nfeb\n\n0\n\nBob\n\nNow you know the source table.\n\nImportant Rule"
      },
      {
        "title": "You cannot use",
        "body": "keys="
      },
      {
        "title": "together with",
        "body": "ignore_index=True\n\nbecause keys depend on the original index structure.\n\nDifferent Column Names"
      },
      {
        "title": "Suppose February has an extra column",
        "body": "customer\n\namount\n\ncountry\n\nwhile January does not.\n\nDefault Behavior (outer join)\n\npd.concat([inv_jan, inv_feb])\n\npandas keeps ALL columns.\n\nMissing values become NaN.\n\nResult\n\ncustomer\n\namount\n\ncountry\n\nAlice\n\n10\n\nNaN\n\nBob\n\n20\n\nUSA\n\nWhy?"
      },
      {
        "title": "Because concat defaults to",
        "body": "join=\"outer\""
      },
      {
        "title": "Meaning",
        "body": "keep every column from every table.\n\nKeeping Only Shared Columns"
      },
      {
        "title": "Use",
        "body": "pd.concat([inv_jan, inv_feb], join=\"inner\")\n\nNow only common columns remain.\n\nResult\n\ncustomer\n\namount\n\nAlice\n\n10\n\nBob\n\n20\n\nThe country column disappears.\n\nsort=True"
      },
      {
        "title": "When tables have different columns",
        "body": "sort=True\n\nalphabetically sorts columns.\n\nUsually not very important, but useful for organization.\n\nBig Picture\n\nmerge()"
      },
      {
        "title": "Used when",
        "body": "tables are related\n\nmatching keys exist\n\ncombining columns"
      },
      {
        "title": "Example",
        "body": "customer_id\n\nmovie_id\n\nward\n\nconcat()"
      },
      {
        "title": "Used when",
        "body": "tables have same structure\n\ndifferent time periods\n\nappend more rows"
      },
      {
        "title": "Example",
        "body": "January sales\n\nFebruary sales\n\nMarch sales\n\nQuick Comparison\n\nOperation\n\nDirection\n\nPurpose\n\nmerge()\n\nhorizontal\n\ncombine related columns\n\nconcat()\n\nvertical\n\nstack rows\n\nVery Important Intuition\n\nconcat() is basically:\n\n“Take these separate DataFrames and glue them together.”\n\nwhile merge() is:\n\n“Match rows based on relationships.”"
      }
    ],
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
    "description": "Verifying Integrity  When working with data, it is important to verify that the structure of the data is correct before performing analysis. The merge() and con...",
    "sections": [
      {
        "title": "Verifying Integrity",
        "body": "Verifying Integrity\n\nWhen working with data, it is important to verify that the structure of the data is correct before performing analysis. The merge() and concat() methods in pandas both have built-in features that help check data integrity. These features help detect problems such as unexpected duplicate rows or incorrect table relationships.\n\nWhen merging tables, we may expect the relationship between two tables to be:\n\none-to-one\n\none-to-many\n\nmany-to-one\n\nmany-to-many\n\nHowever, duplicated values in the merge columns can accidentally change the relationship type. Similarly, when concatenating tables vertically, duplicate records may appear if the same row exists in multiple tables. To help prevent these issues, pandas provides:\n\nvalidate for merge()\n\nverify_integrity for concat()\n\nValidating Merges\n\nThe validate argument in merge() checks whether the relationship between two tables matches what we expect. If the relationship is incorrect, pandas raises a MergeError."
      },
      {
        "title": "Example",
        "body": "tracks.merge(specs, on=\"tid\", validate=\"one_to_one\")\n\nIn this example, each track should only have one specification record, so the relationship should be one-to-one. However, if the specs table contains duplicate tid values, the merge becomes one-to-many instead. pandas detects this and raises an error.\n\nThe error helps identify problems before continuing the analysis."
      },
      {
        "title": "Common validation options include",
        "body": "\"one_to_one\"\n\n\"one_to_many\"\n\n\"many_to_one\"\n\n\"many_to_many\""
      },
      {
        "title": "Example of a valid one-to-many merge",
        "body": "albums.merge(tracks, on=\"album_id\", validate=\"one_to_many\")\n\nThis works because one album can contain multiple tracks.\n\nVerifying Concatenations\n\nThe concat() method has a parameter called verify_integrity."
      },
      {
        "title": "By default",
        "body": "verify_integrity=False\n\nIf set to True, pandas checks whether duplicate index values exist after concatenation."
      },
      {
        "title": "Example",
        "body": "pd.concat([inv_feb, inv_mar], verify_integrity=True)\n\nIf both tables contain the same index value, pandas raises a ValueError.\n\nFor example, if invoice ID 9 exists in both February and March tables, concatenation with integrity checking enabled will fail because the indexes overlap.\n\nIf verify_integrity=False, pandas allows the duplicate indexes and concatenates the tables normally.\n\nWhy Verifying Integrity Matters\n\nReal-world data is often messy and may not always follow the structure we expect. Duplicate rows or incorrect relationships can lead to:\n\nincorrect calculations\n\nmisleading averages\n\ninaccurate visualizations\n\nduplicated records\n\nUsing validate and verify_integrity helps catch these issues early."
      },
      {
        "title": "If pandas raises a",
        "body": "MergeError\n\nValueError\n\nthe data should usually be cleaned or corrected before continuing. Duplicate rows may need to be removed or fixed to ensure accurate analysis."
      }
    ],
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
    "description": "Using merge_ordered()  merge_ordered() is a pandas function used for merging ordered or time-series data. It works similarly to a regular merge(), but the resul...",
    "sections": [
      {
        "title": "Using merge_ordered()",
        "body": "Using merge_ordered()\n\nmerge_ordered() is a pandas function used for merging ordered or time-series data. It works similarly to a regular merge(), but the results are automatically sorted, making it especially useful when working with dates, financial data, or any data that follows a sequence.\n\nUnlike the normal merge() method which defaults to an \"inner\" join, merge_ordered() defaults to an \"outer\" join. This means all rows from both tables are kept, even if there is no match.\n\nBasic Syntax\n\npd.merge_ordered(left_table, right_table, on=\"column_name\")\n\nThe method is called from pandas directly using pd.merge_ordered() instead of using .merge() on a DataFrame.\n\nExample: Merging Stock Data"
      },
      {
        "title": "Suppose we have two stock price tables",
        "body": "Apple stock prices from February to June 2007\n\nMcDonald's stock prices from January to May 2007\n\nWe can merge them using the date column.\n\n`stocks = pd.merge_ordered(`\n\napple,\n\nmcd,\n\non=\"date\",\n\nsuffixes=(\"_apple\", \"_mcd\")\n\n)\n\nThe result will contain all dates from both tables in sorted order.\n\nIf a company has no stock value for a certain date, the value becomes NaN.",
        "exampleCode": "stocks = pd.merge_ordered("
      },
      {
        "title": "Example",
        "body": "Apple has no value for January\n\nMcDonald's has no value for June\n\nComparison with merge()\n\nmerge_ordered() and merge() share many similarities:\n\nBoth can merge on one or multiple columns\n\nBoth support different join types\n\nBoth support suffixes for duplicate column names"
      },
      {
        "title": "However, there are important differences",
        "body": "Feature\n\nmerge()\n\nmerge_ordered()\n\nDefault Join\n\nInner Join\n\nOuter Join\n\nResult Sorting\n\nNot guaranteed\n\nAutomatically sorted\n\nBest For\n\nGeneral merging\n\nOrdered/time-series data\n\nForward Filling (ffill)\n\nWhen merging ordered data, missing values are common. merge_ordered() supports forward filling using the fill_method argument.\n\nForward filling copies the previous available value into missing rows."
      },
      {
        "title": "Example",
        "body": "`stocks = pd.merge_ordered(`\n\napple,\n\nmcd,\n\non=\"date\",\n\nfill_method=\"ffill\",\n\nsuffixes=(\"_apple\", \"_mcd\")\n\n)\n\nIf McDonald's has no value for June, pandas fills it using the previous month's value.\n\nHowever, the very first missing value cannot be filled because there is no previous value available.\n\nWhy Use merge_ordered()?\n\nmerge_ordered() is useful when:\n\nWorking with time-series data\n\nHandling ordered datasets\n\nCombining financial or stock market data\n\nYou need automatically sorted results\n\nYou want to forward fill missing values\n\nIt is especially helpful because many machine learning and analysis tasks require complete datasets without missing values.",
        "exampleCode": "stocks = pd.merge_ordered("
      }
    ],
    "challenge": {
      "title": "Enrich Sales with Customer Profiles",
      "scenario": "The analytics team needs customer demographic information attached to every order transaction.",
      "instructions": "Read `sales.csv` and `customers.csv`. Perform an inner join on `customer_id` using `pd.merge()`. Return the merged DataFrame with `sale_id`, `customer_id`, `first_name`, and `sale_amount` as `enriched_sales`.",
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
    "description": "Using merge_asof()  merge_asof() is another pandas method used for working with ordered or time-series data. It behaves similarly to a left join, but instead of...",
    "sections": [
      {
        "title": "Using merge_asof()",
        "body": "Using merge_asof()\n\nmerge_asof() is another pandas method used for working with ordered or time-series data. It behaves similarly to a left join, but instead of matching exact values, it matches the nearest value.\n\nThis method is especially useful when timestamps or ordered values between two tables do not perfectly align.\n\nOne important requirement is that the columns used for merging must already be sorted.\n\nHow merge_asof() Works\n\nUnlike a normal merge where values must be equal, merge_asof() looks for the closest matching value."
      },
      {
        "title": "By default, it selects",
        "body": "the last row in the right table whose key value is less than or equal to the left table’s value.\n\nThis default behavior is called \"backward\" matching."
      },
      {
        "title": "For example",
        "body": "Left Value\n\nRight Match\n\n5\n\n3\n\nThe value 3 is chosen because it is the closest value that is still less than or equal to 5.\n\nBasic Syntax\n\npd.merge_asof(\n\nleft_table,\n\nright_table,\n\non=\"column_name\"\n\n)\n\nThe method is called directly from pandas using pd.merge_asof().\n\nExample: Stock Price Data"
      },
      {
        "title": "Suppose we have",
        "body": "Visa stock prices recorded every hour\n\nIBM stock prices recorded every 5 minutes\n\nThe timestamps do not perfectly match, so a normal merge would fail to align many rows properly.\n\n`stocks = pd.merge_asof(`\n\nvisa,\n\nibm,\n\non=\"date_time\",\n\nsuffixes=(\"_visa\", \"_ibm\")\n\n)\n\nThe result keeps all rows from the Visa table and finds the closest matching IBM timestamp that is less than or equal to each Visa timestamp.\n\nThe direction Argument\n\nThe direction argument controls how pandas searches for matches.\n\n1. \"backward\" (default)\n\nSelects the closest value from the right table that is:\n\nless than or equal to the left value.\n\npd.merge_asof(\n\nvisa,\n\nibm,\n\non=\"date_time\",\n\ndirection=\"backward\"\n\n)\n\n2. \"forward\"\n\nSelects the first value from the right table that is:\n\ngreater than or equal to the left value.\n\npd.merge_asof(\n\nvisa,\n\nibm,\n\non=\"date_time\",\n\ndirection=\"forward\"\n\n)\n\nThis changes the matching behavior to future values instead of past values.\n\n3. \"nearest\"\n\nSelects the absolutely closest value regardless of whether it is before or after.\n\npd.merge_asof(\n\nvisa,\n\nibm,\n\non=\"date_time\",\n\ndirection=\"nearest\"\n\n)\n\nWhen to Use merge_asof()\n\nmerge_asof() is useful when:\n\nWorking with time-series data\n\nTimestamps do not perfectly align\n\nData is sampled at different intervals\n\nMatching nearest observations is more useful than exact matches\n\nBuilding time-series training datasets\n\nAvoiding future data leakage in machine learning",
        "exampleCode": "stocks = pd.merge_asof("
      },
      {
        "title": "It is commonly used in",
        "body": "financial datasets\n\nstock market analysis\n\nsensor data\n\nevent tracking systems\n\nreal-time monitoring systems"
      }
    ],
    "challenge": {
      "title": "Enrich Sales with Customer Profiles",
      "scenario": "The analytics team needs customer demographic information attached to every order transaction.",
      "instructions": "Read `sales.csv` and `customers.csv`. Perform an inner join on `customer_id` using `pd.merge()`. Return the merged DataFrame with `sale_id`, `customer_id`, `first_name`, and `sale_amount` as `enriched_sales`.",
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
        "title": "Selecting Data with",
        "body": "Selecting Data with .query()\n\nThe .query() method in pandas is used to filter rows from a DataFrame using a string expression. It provides a cleaner and more readable way to subset data compared to long Boolean indexing statements.\n\nThe syntax is similar to the WHERE clause in SQL, but prior SQL knowledge is not required.\n\nBasic Syntax\n\ndataframe.query(\"condition\")\n\nThe condition is written as a string.\n\nQuerying with a Single Condition\n\nSuppose we have a DataFrame called stocks containing stock prices for companies like Nike and Disney.\n\nIf we want to select rows where Nike stock prices are greater than or equal to 90:\n\nstocks.query(\"nike >= 90\")\n\nThis returns all rows where the value in the nike column is at least 90.\n\nQuerying with Multiple Conditions"
      },
      {
        "title": "You can combine conditions using",
        "body": "and\n\nor\n\nUsing and"
      },
      {
        "title": "To select rows where",
        "body": "Nike is greater than 90\n\nAND Disney is less than 140\n\nstocks.query(\"nike > 90 and disney < 140\")\n\nBoth conditions must be true.\n\nUsing or"
      },
      {
        "title": "To select rows where",
        "body": "Nike is greater than 96\n\nOR Disney is less than 98\n\nstocks.query(\"nike > 96 or disney < 98\")\n\nAt least one condition must be true.\n\nQuerying Text Values\n\nThe .query() method can also filter rows based on text/string values."
      },
      {
        "title": "Example",
        "body": "stocks.query('stock == \"nike\"')"
      },
      {
        "title": "Important notes",
        "body": "Use == when comparing values\n\nText values should be inside quotation marks\n\nIf the outer query string uses single quotes, the inner text usually uses double quotes\n\nCombining Text and Numeric Conditions"
      },
      {
        "title": "Suppose we want",
        "body": "all Disney rows\n\nOR Nike rows where close price is below 90\n\nstocks.query('stock == \"disney\" or (stock == \"nike\" and close < 90)')\n\nThe parentheses help group conditions properly."
      },
      {
        "title": "This query returns",
        "body": "every row where stock is Disney\n\nplus Nike rows with close prices below 90\n\nWhy Use .query()?\n\n.query() is useful because it:\n\nmakes filtering code cleaner\n\nimproves readability\n\nworks well with multiple conditions\n\nis convenient for selecting rows using column names directly\n\nIt is especially helpful when filtering large DataFrames with many conditions."
      }
    ],
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
        "title": "Reshaping Data with",
        "body": "Reshaping Data with .melt()\n\nThe .melt() method in pandas is used to reshape data from wide format into long format. This process is also called unpivoting.\n\nLong format is often easier for computers, data analysis tools, and visualization libraries to work with, while wide format is usually easier for humans to read.\n\nWide vs Long Format\n\nWide Format"
      },
      {
        "title": "In wide format",
        "body": "one row usually represents one subject\n\nmultiple columns store different attributes"
      },
      {
        "title": "Example",
        "body": "company\n\n2018\n\n2019\n\nFacebook\n\n55\n\n70\n\nTwitter\n\n12\n\n14\n\nThe years are spread horizontally across columns.\n\nLong Format"
      },
      {
        "title": "In long format",
        "body": "information is spread vertically across rows\n\neach row represents one observation"
      },
      {
        "title": "Example",
        "body": "company\n\nyear\n\nvalue\n\nFacebook\n\n2018\n\n55\n\nFacebook\n\n2019\n\n70\n\nTwitter\n\n2018\n\n12\n\nThis format is usually more computer-friendly.\n\nBasic .melt() Syntax\n\ndataframe.melt(id_vars=[\"column_name\"])\n\nThe id_vars argument specifies the columns that should remain unchanged.\n\nExample of .melt()"
      },
      {
        "title": "Suppose we have a DataFrame called social_fin",
        "body": "company\n\n2016\n\n2017\n\n2018\n\nFacebook\n\n27\n\n40\n\n55\n\nTwitter\n\n2\n\n3\n\n4"
      },
      {
        "title": "We can convert the years into rows",
        "body": "social_fin.melt(id_vars=[\"company\"])"
      },
      {
        "title": "Result",
        "body": "company\n\nvariable\n\nvalue\n\nFacebook\n\n2016\n\n27\n\nFacebook\n\n2017\n\n40\n\nFacebook\n\n2018\n\n55\n\nThe year columns are unpivoted into a single column called variable, while the numbers are placed into a column called value.\n\nUsing value_vars\n\nThe value_vars argument lets you choose which columns to unpivot."
      },
      {
        "title": "Example",
        "body": "social_fin.melt(\n\nid_vars=[\"company\"],\n\nvalue_vars=[\"2018\", \"2017\"]\n\n)\n\nOnly the selected columns are melted.\n\nThe order in value_vars is preserved in the output.\n\nRenaming Output Columns"
      },
      {
        "title": "By default",
        "body": "the melted column names become variable\n\nthe values become value"
      },
      {
        "title": "You can rename them using",
        "body": "var_name\n\nvalue_name"
      },
      {
        "title": "Example",
        "body": "social_fin.melt(\n\nid_vars=[\"company\"],\n\nvalue_vars=[\"2018\", \"2017\"],\n\nvar_name=\"year\",\n\nvalue_name=\"dollars\"\n\n)"
      },
      {
        "title": "Result",
        "body": "company\n\nyear\n\ndollars\n\nFacebook\n\n2018\n\n55\n\nFacebook\n\n2017\n\n40\n\nThis makes the output cleaner and easier to understand.\n\nImportant Arguments in .melt()\n\nid_vars\n\ncolumns to keep unchanged\n\nvalue_vars\n\ncolumns to unpivot\n\nvar_name\n\nnew name for the variable column\n\nvalue_name\n\nnew name for the values column\n\nWhy Use .melt()?\n\n.melt() is useful when:\n\nconverting wide data into long format\n\npreparing data for visualization\n\npreparing datasets for machine learning\n\nsimplifying grouped analysis\n\ncleaning merged datasets with many columns"
      },
      {
        "title": "It is especially common in",
        "body": "time-series analysis\n\nfinancial datasets\n\nsurvey data\n\nstatistical analysis\n\nplotting libraries like matplotlib or seaborn"
      }
    ],
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
    "description": "Course Wrap-up  Congratulations! You have completed the course on combining and reshaping data with pandas. Throughout the lessons, you learned many important t...",
    "sections": [
      {
        "title": "Course Wrap-up",
        "body": "Course Wrap-up\n\nCongratulations! You have completed the course on combining and reshaping data with pandas. Throughout the lessons, you learned many important techniques used in real-world data analysis and data science workflows.\n\nChapter 1 – Data Merging Basics\n\nThe course started with the fundamentals of combining tables using the merge() method."
      },
      {
        "title": "You learned",
        "body": "how to perform an inner join\n\nhow tables relate to one another\n\none-to-one and one-to-many relationships\n\nhow to merge multiple tables together\n\nThese concepts form the foundation of working with relational data in pandas.\n\nChapter 2 – Different Join Types\n\nIn the second chapter, you explored several types of joins beyond the default inner join."
      },
      {
        "title": "You learned",
        "body": "left joins\n\nright joins\n\nouter joins\n\nself joins (merging a table with itself)\n\nmerging using indexes and multi-indexes\n\nThese techniques are useful when working with more complex datasets and relationships.\n\nChapter 3 – Advanced Merging and Concatenation\n\nThe third chapter focused on more advanced data combination techniques."
      },
      {
        "title": "You learned about",
        "body": "semi joins\n\nanti joins\n\nvertical concatenation using concat()\n\nverifying data integrity\n\nYou also learned why validating merges and checking duplicate indexes is important to avoid inaccurate analysis."
      },
      {
        "title": "Important methods and arguments included",
        "body": "validate\n\nverify_integrity\n\nconcat()\n\nfiltering joins using isin()\n\nChapter 4 – Ordered and Time-Series Data\n\nIn the final chapter, you worked with ordered and time-series datasets."
      },
      {
        "title": "You learned how to use",
        "body": "merge_ordered()\n\nmerge_asof()"
      },
      {
        "title": "These methods are especially useful for",
        "body": "financial data\n\nstock prices\n\ntimestamped datasets\n\nordered observations\n\nYou also learned how to reshape data using .melt() to convert wide-format tables into long-format tables, making them easier for analysis and visualization.\n\nKey Skills Learned"
      },
      {
        "title": "By the end of the course, you can now",
        "body": "merge tables in multiple ways\n\ncombine datasets vertically\n\nvalidate relationships between tables\n\nwork with time-series merges\n\nreshape datasets for analysis\n\nfilter data efficiently\n\nprepare cleaner datasets for machine learning and visualization"
      },
      {
        "title": "These are essential pandas skills used in",
        "body": "data science\n\nanalytics\n\nmachine learning\n\nbusiness intelligence\n\nfinancial analysis\n\nFinal Note\n\nThis course covered many core pandas techniques for combining and reshaping data. Mastering these topics gives you a strong foundation for handling real-world datasets and more advanced data analysis tasks later on."
      }
    ],
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
    "goal": "Read 'sales.csv' into a DataFrame named `df`. Print the first 5 rows with `.head()`, the total shape (rows and columns), and the column data types.",
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
    "goal": "Read 'customers.csv'. Identify how many duplicate rows exist using `df.duplicated().sum()`. Drop duplicate records using `df.drop_duplicates()`. Save the deduplicated dataset to `cleaned_customers`.",
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
    "title": "3. Replace Missing Values (Imputation)",
    "difficulty": "Beginner",
    "category": "Data Cleaning",
    "context": "Data pipelines often encounter null values from optional form fields. Missing values must be imputed cleanly before loading into downstream analytics marts.",
    "goal": "Read 'customers.csv'. Count missing values per column with `.isna().sum()`. Fill missing email entries with `'no_email_provided@domain.com'`. Assign the result to `imputed_customers`.",
    "csvsUsed": [
      "customers.csv"
    ],
    "starterCode": "import pandas as pd\n\ncustomers = pd.read_csv('customers.csv')\n\n# Step 1: Count missing values per column\nmissing_counts = None\n\n# Step 2: Fill null emails with 'no_email_provided@domain.com'\nimputed_customers = customers.copy()\n# your code here\n\nprint(imputed_customers[['customer_id', 'first_name', 'email']])\n",
    "expectedCode": "import pandas as pd\n\ncustomers = pd.read_csv('customers.csv')\nmissing_counts = customers.isna().sum()\nimputed_customers = customers.copy()\nimputed_customers['email'] = imputed_customers['email'].fillna('no_email_provided@domain.com')\nprint(imputed_customers[['customer_id', 'first_name', 'email']])\n",
    "validationScript": "assert 'imputed_customers' in locals(), \"Variable 'imputed_customers' must be created\"\nassert imputed_customers['email'].isna().sum() == 0, \"All null emails must be filled\"\n",
    "hints": [
      "Use customers.isna().sum() to count nulls.",
      "Use imputed_customers['email'].fillna('no_email_provided@domain.com') to impute missing text values."
    ],
    "walkthrough": "fillna replaces NaN values with a domain-appropriate constant, preventing runtime errors in downstream transformations."
  },
  {
    "id": "py-ex-4-average-sales-region",
    "order": 4,
    "title": "4. Calculate the Average Sales per Region",
    "difficulty": "Intermediate",
    "category": "Data Transformation",
    "context": "The sales performance team needs regional benchmark metrics to set quarterly quotas.",
    "goal": "Read 'sales.csv'. Group by `region` and compute the average `sale_amount` rounded to 2 decimal places. Sort regions by average sale amount descending. Save the result to `regional_avg`.",
    "csvsUsed": [
      "sales.csv"
    ],
    "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\n\n# Group by region, calculate mean of sale_amount, round to 2 decimals, sort descending\nregional_avg = None\n\nprint(regional_avg)\n",
    "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\nregional_avg = sales.groupby('region')['sale_amount'].mean().round(2).sort_values(ascending=False)\nprint(regional_avg)\n",
    "validationScript": "assert 'regional_avg' in locals(), \"Variable 'regional_avg' must be defined\"\nassert len(regional_avg) == 4, \"Should have 4 regions in the summary\"\nassert regional_avg.iloc[0] >= regional_avg.iloc[-1], \"Result must be sorted in descending order\"\n",
    "hints": [
      "Use sales.groupby('region')['sale_amount'].mean().",
      "Round using .round(2).",
      "Sort using .sort_values(ascending=False)."
    ],
    "walkthrough": "groupby isolates records into buckets, calculates the mean on numeric sale amounts, and orders values."
  },
  {
    "id": "py-ex-5-merge-datasets",
    "order": 5,
    "title": "5. Merge Two Datasets Using a Common Column",
    "difficulty": "Intermediate",
    "category": "Data Merging",
    "context": "Order transactions only store customer IDs. To produce customer-facing invoice reports, sales data must be merged with customer demographic profiles.",
    "goal": "Read 'sales.csv' and 'customers.csv'. Merge them on `customer_id` using an `inner` join. Keep `sale_id`, `customer_id`, `first_name`, `last_name`, `sale_amount`, and `sale_date`. Assign to `merged_sales`.",
    "csvsUsed": [
      "sales.csv",
      "customers.csv"
    ],
    "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\n\n# Merge sales and customers on 'customer_id'\nmerged_sales = None\n\nprint(merged_sales.head())\n",
    "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\ncustomers = pd.read_csv('customers.csv')\nmerged_sales = pd.merge(sales, customers, on='customer_id', how='inner')[\n    ['sale_id', 'customer_id', 'first_name', 'last_name', 'sale_amount', 'sale_date']\n]\nprint(merged_sales.head())\n",
    "validationScript": "assert 'merged_sales' in locals(), \"Variable 'merged_sales' must be defined\"\nassert 'first_name' in merged_sales.columns, \"Merged DataFrame must contain customer first_name\"\nassert 'sale_amount' in merged_sales.columns, \"Merged DataFrame must contain sale_amount\"\n",
    "hints": [
      "Use pd.merge(sales, customers, on='customer_id', how='inner').",
      "Filter the required columns by passing a list of column names."
    ],
    "walkthrough": "pd.merge aligns rows from both tables on matching customer_id keys, creating a unified denormalized record."
  },
  {
    "id": "py-ex-6-consistent-dates",
    "order": 6,
    "title": "6. Convert Dates into a Consistent Format",
    "difficulty": "Intermediate",
    "category": "Data Transformation",
    "context": "Date strings from disparate sources often contain inconsistent time formats or strings that break time-series partitioning.",
    "goal": "Read 'sales.csv'. Convert `sale_date` into a proper pandas datetime using `pd.to_datetime()`. Extract the year-month string formatted as `YYYY-MM` into a new column called `sale_year_month`. Print the first 5 records of `sales[['sale_date', 'sale_year_month']]`.",
    "csvsUsed": [
      "sales.csv"
    ],
    "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\n\n# Step 1: Convert sale_date to datetime\n# Step 2: Create 'sale_year_month' formatted as '%Y-%m'\n\nprint(sales[['sale_date', 'sale_year_month']].head())\n",
    "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\nsales['sale_date'] = pd.to_datetime(sales['sale_date'])\nsales['sale_year_month'] = sales['sale_date'].dt.strftime('%Y-%m')\nprint(sales[['sale_date', 'sale_year_month']].head())\n",
    "validationScript": "assert 'sale_year_month' in sales.columns, \"Column 'sale_year_month' must be created\"\nassert pd.api.types.is_datetime64_any_dtype(sales['sale_date']), \"sale_date must be converted to datetime\"\n",
    "hints": [
      "Use sales['sale_date'] = pd.to_datetime(sales['sale_date']).",
      "Use the .dt accessor: sales['sale_date'].dt.strftime('%Y-%m')."
    ],
    "walkthrough": "Converting raw text to pandas datetime unlocks the .dt accessor for effortless date formatting, truncation, and cohort grouping."
  },
  {
    "id": "py-ex-7-export-cleaned-csv",
    "order": 7,
    "title": "7. Export Cleaned Data into Another CSV File",
    "difficulty": "Intermediate",
    "category": "File Handling & Pipeline",
    "context": "After completing data cleansing and enrichment in memory, pipelines must persist production-ready files for downstream consumers.",
    "goal": "Read 'products.csv'. Filter out any products priced under $100. Sort by price descending. Export the resulting DataFrame to `'premium_products.csv'` with `index=False`. Verify by reading the exported file back into `exported_df`.",
    "csvsUsed": [
      "products.csv"
    ],
    "starterCode": "import pandas as pd\n\nproducts = pd.read_csv('products.csv')\n\n# Step 1: Filter products with price >= 100\n# Step 2: Sort by price descending\n# Step 3: Export to 'premium_products.csv' without index\n# Step 4: Verify by reading 'premium_products.csv' into exported_df\n\nexported_df = None\nprint(exported_df)\n",
    "expectedCode": "import pandas as pd\n\nproducts = pd.read_csv('products.csv')\npremium = products[products['price'] >= 100].sort_values(by='price', ascending=False)\npremium.to_csv('premium_products.csv', index=False)\nexported_df = pd.read_csv('premium_products.csv')\nprint(exported_df)\n",
    "validationScript": "assert 'exported_df' in locals(), \"Variable 'exported_df' must be loaded from 'premium_products.csv'\"\nassert (exported_df['price'] >= 100).all(), \"All products in exported_df must have price >= 100\"\nassert os.path.exists('premium_products.csv') or len(exported_df) > 0, \"File 'premium_products.csv' must exist\"\n",
    "hints": [
      "Filter with products[products['price'] >= 100].",
      "Export with premium.to_csv('premium_products.csv', index=False).",
      "Read back with pd.read_csv('premium_products.csv')."
    ],
    "walkthrough": "to_csv(index=False) generates clean flat files without arbitrary sequential integer index columns."
  },
  {
    "id": "py-ex-8-generate-summary-report",
    "order": 8,
    "title": "8. Generate an Automated Summary Report",
    "difficulty": "Advanced",
    "category": "Automation & Reporting",
    "context": "Data engineering jobs often conclude by computing executive KPIs and emitting summary stats for leadership dashboards.",
    "goal": "Read 'sales.csv' and 'employees.csv'. Compute overall metrics:\n1. `total_sales_revenue` (sum of sale_amount)\n2. `total_orders_count` (total number of sales)\n3. `avg_order_value` (mean of sale_amount, rounded to 2 decimals)\n4. `total_payroll` (sum of employee salaries)\nStore these metrics in a dictionary called `executive_report` and print it.",
    "csvsUsed": [
      "sales.csv",
      "employees.csv"
    ],
    "starterCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\nemployees = pd.read_csv('employees.csv')\n\n# Build the executive_report dictionary with total_sales_revenue, total_orders_count, avg_order_value, and total_payroll\nexecutive_report = {}\n\nprint(\"Executive Summary Report:\")\nprint(executive_report)\n",
    "expectedCode": "import pandas as pd\n\nsales = pd.read_csv('sales.csv')\nemployees = pd.read_csv('employees.csv')\n\nexecutive_report = {\n    'total_sales_revenue': round(float(sales['sale_amount'].sum()), 2),\n    'total_orders_count': int(len(sales)),\n    'avg_order_value': round(float(sales['sale_amount'].mean()), 2),\n    'total_payroll': round(float(employees['salary'].sum()), 2)\n}\nprint(executive_report)\n",
    "validationScript": "assert 'executive_report' in locals(), \"executive_report dictionary must be defined\"\nassert 'total_sales_revenue' in executive_report, \"Report must include 'total_sales_revenue'\"\nassert 'total_payroll' in executive_report, \"Report must include 'total_payroll'\"\nassert executive_report['total_orders_count'] == 14, \"Expected total_orders_count to be 14\"\n",
    "hints": [
      "Use sales['sale_amount'].sum() for revenue.",
      "Use len(sales) for order count.",
      "Use employees['salary'].sum() for payroll."
    ],
    "walkthrough": "Aggregating KPIs into structured dictionaries enables easy serialization to JSON, webhook payloads, or automated email digests."
  }
];
