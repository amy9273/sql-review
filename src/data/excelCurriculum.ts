export interface ExcelLesson {
  id: string;
  category: 'lookups' | 'math' | 'cleansing' | 'pivots' | 'practicum';
  title: string;
  subtitle: string;
  durationMinutes: number;
  syntax: string;
  simpleExplanation: string;
  realWorldScenario: string;
  formulaBreakdown: {
    part: string;
    meaning: string;
  }[];
  sampleData: {
    headers: string[];
    rows: (string | number)[][];
  };
  stepByStepGuide: string[];
  commonMistakes: string[];
  interviewTip: string;
}

export interface ExcelPracticumTask {
  id: string;
  order: number;
  title: string;
  objective: string;
  formulaOrAction: string;
  plainEnglishExplanation: string;
  expectedResult: string;
  hints: string[];
}

export const EXCEL_LESSONS: ExcelLesson[] = [
  {
    id: "xl-xlookup",
    category: "lookups",
    title: "XLOOKUP (The Modern King of Lookups)",
    subtitle: "The newest, most reliable way to search a table and bring back matching data.",
    durationMinutes: 10,
    syntax: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode])",
    simpleExplanation: "Think of XLOOKUP like looking up a friend's name in your phone contacts to find their number. You tell it: 1) What name to look for, 2) Which column has names, and 3) Which column has the numbers you want back. Unlike old VLOOKUP, it doesn't break if you move columns around, and it looks left or right easily.",
    realWorldScenario: "You have a list of 500 employee IDs, and your boss wants you to quickly pull in each employee's department and salary from the master HR list.",
    formulaBreakdown: [
      { part: "lookup_value (A2)", meaning: "The specific item you want to search for (e.g. Employee ID 'E104')." },
      { part: "lookup_array (F2:F100)", meaning: "The column where Excel searches to find that item." },
      { part: "return_array (H2:H100)", meaning: "The column containing the answer you want to bring back (e.g. Salary)." },
      { part: "[if_not_found] (\"Not Found\")", meaning: "What to show if no match exists, so you never get ugly #N/A errors." }
    ],
    sampleData: {
      headers: ["Order ID", "Customer ID", "Customer Name (Formula)", "Total Amount"],
      rows: [
        ["1001", "C201", "=XLOOKUP(B2, F:F, G:G, \"Unknown\") -> Maria Cruz", "$1,450"],
        ["1002", "C205", "=XLOOKUP(B3, F:F, G:G, \"Unknown\") -> John Santos", "$3,200"],
        ["1003", "C999", "=XLOOKUP(B4, F:F, G:G, \"Unknown\") -> Unknown", "$850"]
      ]
    },
    stepByStepGuide: [
      "Click into the cell where you want the answer to appear.",
      "Type `=XLOOKUP(`.",
      "Click the cell with the ID you are searching for (e.g. B2), then type a comma `,`.",
      "Highlight the column in your master list that contains those IDs (e.g. F2:F100), then type a comma `,`.",
      "Highlight the column in your master list that has the info you want to bring back (e.g. G2:G100).",
      "Type `) ` and press Enter! Double click the bottom-right corner of the cell to drag it down all rows."
    ],
    commonMistakes: [
      "Forgetting to lock cell ranges with $ (e.g. $F$2:$F$100) if you copy the formula across sheets.",
      "Highlighting columns of different heights (lookup_array and return_array must have the same number of rows)."
    ],
    interviewTip: "In interviews, if asked about VLOOKUP, always say: 'I know VLOOKUP well, but I prefer XLOOKUP because it doesn't break when columns shift, searches both left and right, and handles missing data natively with [if_not_found].'"
  },
  {
    id: "xl-vlookup",
    category: "lookups",
    title: "VLOOKUP (The Classic Legacy Formula)",
    subtitle: "The most famous Excel lookup function that every company still uses.",
    durationMinutes: 10,
    syntax: "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
    simpleExplanation: "VLOOKUP stands for 'Vertical Lookup'. It searches down the very first column of a table to find your item, and counts across columns to the right to fetch your answer. You must always put FALSE at the end so it looks for an exact match, not an approximation.",
    realWorldScenario: "Matching a product SKU on an invoice to a pricing catalog table to find the unit price.",
    formulaBreakdown: [
      { part: "lookup_value (A2)", meaning: "The SKU or ID you want to find." },
      { part: "table_array ($D$2:$F$50)", meaning: "The entire table range. The search ID MUST be in the first column (column D)." },
      { part: "col_index_num (3)", meaning: "The column number you want back, counting from column 1 on the left." },
      { part: "range_lookup (FALSE)", meaning: "FALSE means exact match only. If omitted, it defaults to TRUE and gives wrong answers!" }
    ],
    sampleData: {
      headers: ["Product Code", "Lookup Formula", "Fetched Price", "Catalog Col 1 (SKU)", "Catalog Col 2 (Name)", "Catalog Col 3 (Price)"],
      rows: [
        ["SKU-01", "=VLOOKUP(A2, D2:F4, 3, FALSE)", "$15.00", "SKU-01", "Relay Switch", "$15.00"],
        ["SKU-02", "=VLOOKUP(A3, D2:F4, 3, FALSE)", "$85.00", "SKU-02", "Circuit Breaker", "$85.00"],
        ["SKU-03", "=VLOOKUP(A4, D2:F4, 3, FALSE)", "$240.00", "SKU-03", "Smart Meter", "$240.00"]
      ]
    },
    stepByStepGuide: [
      "Select your result cell and type `=VLOOKUP(`.",
      "Click the search value in column A.",
      "Highlight your lookup table, making sure the lookup value is in column 1. Press F4 to lock it with `$` signs.",
      "Count the column number of the value you want (e.g. 1, 2, or 3) and type that number.",
      "Type `, FALSE)` and press Enter."
    ],
    commonMistakes: [
      "Forgetting `, FALSE` at the end — this is the #1 mistake candidates make and gives random incorrect rows!",
      "Trying to look up a column to the left — VLOOKUP can only search column 1 and look rightward.",
      "Adding a new column in between — this shifts column numbers and breaks all your formulas."
    ],
    interviewTip: "Know the limitations of VLOOKUP: 1) It only looks to the right, 2) It breaks if someone inserts a column, and 3) It is slower on huge datasets than INDEX/MATCH or XLOOKUP."
  },
  {
    id: "xl-index-match",
    category: "lookups",
    title: "INDEX & MATCH (The Indestructible Duo)",
    subtitle: "The classic dynamic combination that never breaks, even when columns move.",
    durationMinutes: 10,
    syntax: "=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))",
    simpleExplanation: "MATCH finds what row number your item lives on. INDEX grabs the value from that exact row number. Working together, MATCH acts like a GPS coordinate finder, and INDEX acts like a claw machine picking up the prize.",
    realWorldScenario: "Looking up an employee's salary when the Salary column is on the left and the Employee ID is on the right (which VLOOKUP cannot do).",
    formulaBreakdown: [
      { part: "MATCH(A2, E2:E100, 0)", meaning: "Searches column E for item A2 and returns its row position (e.g. row 4). The 0 means exact match." },
      { part: "INDEX(B2:B100, ...)", meaning: "Goes to column B and extracts the value sitting at that row position." }
    ],
    sampleData: {
      headers: ["Department (Col A)", "Employee ID (Col B)", "Target ID", "Formula", "Result"],
      rows: [
        ["Engineering", "EMP-901", "EMP-902", "=INDEX(A2:A4, MATCH(C2, B2:B4, 0))", "Operations"],
        ["Operations", "EMP-902", "EMP-903", "=INDEX(A2:A4, MATCH(C3, B2:B4, 0))", "Finance"],
        ["Finance", "EMP-903", "EMP-901", "=INDEX(A2:A4, MATCH(C4, B2:B4, 0))", "Engineering"]
      ]
    },
    stepByStepGuide: [
      "Type `=INDEX(`.",
      "Select the column with the answer you want to fetch.",
      "Type `, MATCH(`.",
      "Click the cell with the item you are looking for.",
      "Highlight the column where that item lives, type `, 0)` to close MATCH.",
      "Type `)` to close INDEX and press Enter."
    ],
    commonMistakes: [
      "Reversing the ranges (putting lookup range in INDEX and return range in MATCH).",
      "Forgetting `, 0` in MATCH, which causes Excel to assume data is sorted alphabetically."
    ],
    interviewTip: "Senior interviewers love INDEX/MATCH because it proves you understand computational efficiency and spreadsheet resilience."
  },
  {
    id: "xl-sumifs",
    category: "math",
    title: "SUMIFS & COUNTIFS (Conditional Math)",
    subtitle: "Add up numbers or count rows only when multiple specific conditions are met.",
    durationMinutes: 8,
    syntax: "=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2])",
    simpleExplanation: "SUM adds up everything. SUMIFS adds up numbers ONLY if rows match your filters — like 'sum revenue only if Region is Asia AND Status is Delivered'. COUNTIFS does the same thing, but counts the number of matching rows instead of adding.",
    realWorldScenario: "Your manager asks: 'How much total revenue did we generate from the North region for the Industrial product line in Q3?'",
    formulaBreakdown: [
      { part: "sum_range (D2:D100)", meaning: "The column of numbers you want to add up (Revenue)." },
      { part: "criteria_range1 (B2:B100)", meaning: "First filter column (Region)." },
      { part: "criteria1 (\"North\")", meaning: "Value to match in first filter column." },
      { part: "criteria_range2 (C2:C100)", meaning: "Second filter column (Category)." },
      { part: "criteria2 (\"Industrial\")", meaning: "Value to match in second filter column." }
    ],
    sampleData: {
      headers: ["Region", "Product Category", "Status", "Amount", "Formula", "Result"],
      rows: [
        ["North", "Electronics", "Completed", "$5,000", "=SUMIFS(D:D, A:A, \"North\", C:C, \"Completed\")", "$9,000"],
        ["South", "Electronics", "Completed", "$3,000", "=COUNTIFS(A:A, \"North\", B:B, \"Electronics\")", "2 orders"],
        ["North", "Electronics", "Completed", "$4,000", "=AVERAGEIFS(D:D, A:A, \"North\")", "$4,500"],
        ["North", "Hardware", "Pending", "$1,200", "-", "-"]
      ]
    },
    stepByStepGuide: [
      "In your total cell, type `=SUMIFS(`.",
      "First select the column with the numbers to add up (e.g. Sales Amount), then `,`.",
      "Select your first filter column (e.g. Region), then `,`.",
      "Select or type your filter criteria in quotes (e.g. `\"North\"`), then `,`.",
      "Repeat for any additional filter columns (e.g. Status, `\"Completed\"`).",
      "Close with `)` and hit Enter."
    ],
    commonMistakes: [
      "Confusing SUMIF and SUMIFS: in old `SUMIF`, the sum column is at the END. In modern `SUMIFS`, the sum column is at the START!",
      "Putting numbers in quotes when filtering with math comparisons without `>` (e.g. use `\">100\"`, not `>\"100\"`)."
    ],
    interviewTip: "Always use SUMIFS over SUMIF, even for a single condition. SUMIFS supports 1 to 127 criteria and has consistent syntax."
  },
  {
    id: "xl-if-logic",
    category: "math",
    title: "IF, Nested IF, and IFS (Decision Logic)",
    subtitle: "Make Excel test conditions and output different answers automatically.",
    durationMinutes: 8,
    syntax: "=IF(logical_test, value_if_true, [value_if_false])",
    simpleExplanation: "An IF formula asks a Yes/No question: 'Is this value greater than 100?' If Yes, do this. If No, do that. If you have 3 or more categories, use `IFS` to test multiple conditions in order without getting lost in parentheses.",
    realWorldScenario: "Classifying customer orders as 'High Priority' if amount > $5,000, 'Medium' if > $1,000, and 'Standard' otherwise.",
    formulaBreakdown: [
      { part: "logical_test (C2 >= 5000)", meaning: "The condition you are checking (Is sales amount at least $5,000?)." },
      { part: "value_if_true (\"High\")", meaning: "What text or formula to run if the condition is TRUE." },
      { part: "value_if_false (\"Standard\")", meaning: "What to show if the condition is FALSE." }
    ],
    sampleData: {
      headers: ["Order ID", "Amount", "Status Code", "Formula", "Category Result"],
      rows: [
        ["ORD-101", "$8,500", "A", "=IF(B2>=5000, \"VIP\", \"Regular\")", "VIP"],
        ["ORD-102", "$400", "A", "=IF(B3>=5000, \"VIP\", \"Regular\")", "Regular"],
        ["ORD-103", "$2,400", "P", "=IFS(B4>5000, \"High\", B4>1000, \"Medium\", TRUE, \"Low\")", "Medium"]
      ]
    },
    stepByStepGuide: [
      "Type `=IF(`.",
      "Enter your comparison: click cell B2, then type `>= 5000,`.",
      "Enter true text in double quotes: `\"High Priority\",`.",
      "Enter false text in double quotes: `\"Normal\"`.",
      "Close with `)` and hit Enter."
    ],
    commonMistakes: [
      "Forgetting quotation marks around text values (e.g. writing `High` instead of `\"High\"` gives `#NAME?` error).",
      "Testing conditions in the wrong order in nested IFs (e.g. testing `>100` before `>1000` catches everything in the smaller bucket)."
    ],
    interviewTip: "Mention that for complex nested logic with 4+ conditions, you prefer using a lookup table with XLOOKUP or an `IFS` statement to keep sheets maintainable."
  },
  {
    id: "xl-pivot-tables",
    category: "pivots",
    title: "Pivot Tables (The Ultimate Data Summarizer)",
    subtitle: "Turn 10,000 messy rows into a clean summary table in 3 clicks without writing code.",
    durationMinutes: 12,
    syntax: "Insert Ribbon -> PivotTable -> Drag Fields to Quadrants",
    simpleExplanation: "A Pivot Table is like a magical blender for data. You feed it a big raw spreadsheet with thousands of rows, and you drag column labels into 4 boxes: Rows (what labels go down the side), Columns (what labels go across the top), Values (what numbers get added or averaged), and Filters (what to exclude).",
    realWorldScenario: "You have 50,000 sales transactions across 12 months in 5 countries. In 30 seconds, your VP wants to see total revenue grouped by Country as rows and Months as columns.",
    formulaBreakdown: [
      { part: "Rows Quadrant", meaning: "Places unique items vertically (e.g. Region or Customer Name)." },
      { part: "Columns Quadrant", meaning: "Places categories horizontally across top (e.g. Year or Quarter)." },
      { part: "Values Quadrant", meaning: "The numbers to calculate (e.g. Sum of Revenue, Count of Orders, Average Price)." },
      { part: "Filters Quadrant", meaning: "Page-level dropdown filter (e.g. filter entire table by 'Status = Completed')." }
    ],
    sampleData: {
      headers: ["Region (Rows)", "Jan 2026", "Feb 2026", "Mar 2026", "Total Revenue"],
      rows: [
        ["Asia Pacific", "$120,400", "$145,200", "$160,000", "$425,600"],
        ["Europe", "$98,000", "$102,500", "$115,000", "$315,500"],
        ["North America", "$210,000", "$195,000", "$230,000", "$635,000"],
        ["Grand Total", "$428,400", "$442,700", "$505,000", "$1,376,100"]
      ]
    },
    stepByStepGuide: [
      "Click anywhere inside your raw data table (make sure every column has a clear header and no blank header cells).",
      "Go to the top ribbon: click `Insert` -> `PivotTable` -> `New Worksheet`.",
      "In the field list on the right, drag `Region` into the **Rows** box.",
      "Drag `Sale Date` into the **Columns** box (Excel automatically groups it into Months!).",
      "Drag `Revenue` into the **Values** box (it defaults to `Sum of Revenue`).",
      "Right-click any number in the Pivot Table -> `Number Format` -> `Currency` to make it clean!"
    ],
    commonMistakes: [
      "Trying to create a Pivot Table when the raw data has merged cells or blank header names.",
      "Leaving Values as 'Count of Revenue' instead of 'Sum of Revenue' (happens when cells have text or blank spaces!).",
      "Forgetting to click 'Refresh' (Alt + F5) when source data changes — Pivot Tables do not auto-refresh by default!"
    ],
    interviewTip: "In technical interviews, highlight: 'I always verify that source data has clean headers and no merged cells before pivoting, and I set up Calculated Fields and Slicers so business stakeholders can filter metrics interactively.'"
  },
  {
    id: "xl-cleansing",
    category: "cleansing",
    title: "Data Cleansing: Duplicates, Text-to-Columns & Validation",
    subtitle: "The essential tools to fix messy spreadsheets before loading into databases.",
    durationMinutes: 10,
    syntax: "Data Ribbon -> Remove Duplicates | Text to Columns | Data Validation",
    simpleExplanation: "Before data can be loaded into SQL or a data pipeline, it is usually full of duplicates, combined names, and invalid formats. Excel gives you 3 built-in power tools: 1) Remove Duplicates (deletes repeated rows), 2) Text to Columns (splits combined fields), and 3) Data Validation (locks inputs to approved values).",
    realWorldScenario: "An ERP export gave you customer names as 'Santos, John' in one column, and 50 duplicate orders were generated due to a web server retry glitch.",
    formulaBreakdown: [
      { part: "Remove Duplicates", meaning: "Select unique key columns (e.g. Order ID) and delete repeat occurrences instantly." },
      { part: "Text to Columns", meaning: "Split text by a separator (comma, space, hyphen) into multiple distinct columns." },
      { part: "Conditional Formatting", meaning: "Highlight duplicate values in red or highlight blank cells automatically." },
      { part: "Data Validation", meaning: "Create a dropdown menu so employees can only choose valid statuses (e.g. 'Active', 'Inactive')." }
    ],
    sampleData: {
      headers: ["Raw Name Field", "Action", "Result Col A (Last Name)", "Result Col B (First Name)"],
      rows: [
        ["Santos, John", "Text to Columns (Delimiter: Comma)", "Santos", "John"],
        ["Cruz, Maria", "Text to Columns (Delimiter: Comma)", "Cruz", "Maria"],
        ["Reyes, Mark", "Text to Columns (Delimiter: Comma)", "Reyes", "Mark"]
      ]
    },
    stepByStepGuide: [
      "**Remove Duplicates:** Select your table -> go to `Data` tab -> click `Remove Duplicates` -> check only the unique ID column (e.g. `Order_ID`) -> click OK.",
      "**Text to Columns:** Highlight the column you want to split -> go to `Data` -> `Text to Columns` -> choose `Delimited` -> check `Comma` -> pick destination cell -> click Finish.",
      "**Find Blanks:** Press `Ctrl + G` (Go To) -> click `Special...` -> select `Blanks` -> hit OK. All empty cells are highlighted instantly so you can review or color them!",
      "**Data Validation:** Highlight cells -> go to `Data` -> `Data Validation` -> select `List` -> type `Completed, Pending, Cancelled` -> click OK."
    ],
    commonMistakes: [
      "Checking ALL columns in Remove Duplicates when two different orders happen to have the same amount or customer name.",
      "Not creating empty columns to the right before using Text to Columns — it will overwrite existing data without warning!"
    ],
    interviewTip: "Tell interviewers: 'When auditing raw client files, I use Go To Special -> Blanks and Conditional Formatting to identify missing or duplicate records first before pushing to our ETL staging pipeline.'"
  }
];

export const EXCEL_PRACTICUM_TASKS: ExcelPracticumTask[] = [
  {
    id: "task-1-missing-values",
    order: 1,
    title: "1. Identify Missing Information",
    objective: "Scan the 1,000 transaction dataset to find missing Customer IDs or blank shipment dates.",
    formulaOrAction: "Shortcut: Ctrl + G -> Special -> Blanks | Formula: =ISBLANK(C2) or =COUNTBLANK(C2:C1001)",
    plainEnglishExplanation: "In raw files, blank cells in primary or foreign key columns break database joins. You can instantly highlight all blank cells in 2 seconds using Go To Special, or count them using COUNTBLANK.",
    expectedResult: "Identified 8 rows with missing Customer IDs and 14 rows with unassigned Shipping Dates.",
    hints: [
      "Select column C, press Ctrl + G, click 'Special...', then choose 'Blanks'.",
      "You can also filter the column and scroll to the bottom to uncheck everything except '(Blanks)'."
    ]
  },
  {
    id: "task-2-remove-duplicates",
    order: 2,
    title: "2. Remove Duplicate Transactions",
    objective: "Eliminate duplicate orders caused by web checkout double-submits while preserving original records.",
    formulaOrAction: "Data Tab -> Remove Duplicates -> Check 'Transaction_ID' (Uncheck all other columns)",
    plainEnglishExplanation: "Only check the unique Transaction ID column! If you check all columns, orders that happen to have the exact same price and customer will remain if timestamps differ by one second.",
    expectedResult: "Found and removed 12 duplicate transactions; 988 unique valid transactions remain.",
    hints: [
      "Always check 'My data has headers'.",
      "Highlight column A with Conditional Formatting -> Highlight Cells Rules -> Duplicate Values first to inspect before deleting!"
    ]
  },
  {
    id: "task-3-total-revenue",
    order: 3,
    title: "3. Calculate Total Revenue",
    objective: "Calculate the grand total revenue across all valid transactions in the dataset.",
    formulaOrAction: "=SUM(G2:G989)",
    plainEnglishExplanation: "Simple SUM formula over the revenue column. Format the result as Currency with zero decimals.",
    expectedResult: "Total Gross Revenue = $3,458,920 across all 988 cleaned transactions.",
    hints: [
      "Make sure numbers aren't stored as text (look for small green triangles in cell corners).",
      "If stored as text, use `=VALUE(G2)` or multiply by 1."
    ]
  },
  {
    id: "task-4-group-by-region",
    order: 4,
    title: "4. Group Sales by Region",
    objective: "Summarize total sales and order counts broken down by operating sales region.",
    formulaOrAction: "=SUMIFS(G:G, D:D, \"Asia Pacific\") | =COUNTIF(D:D, \"Asia Pacific\")",
    plainEnglishExplanation: "Use SUMIFS to add revenue for each specific region name. You can also build this in 5 seconds with a Pivot Table.",
    expectedResult: "North America: $1,420,000 (390 orders) | Europe: $1,050,000 (310 orders) | Asia Pacific: $988,920 (288 orders).",
    hints: [
      "Create a small summary table with regions listed in column J.",
      "In column K, write `=SUMIFS($G$2:$G$989, $D$2:$D$989, J2)` and copy down."
    ]
  },
  {
    id: "task-5-top-product",
    order: 5,
    title: "5. Identify Highest-Performing Product",
    objective: "Find which product generated the highest total dollar sales.",
    formulaOrAction: "=INDEX(Product_List, MATCH(MAX(Product_Sales), Product_Sales, 0)) or Pivot Table sorted descending",
    plainEnglishExplanation: "In a Pivot Table, put Product in Rows, Revenue in Values, and sort Revenue from Largest to Smallest. The top row is your winner.",
    expectedResult: "Top Product: 'EcoStruxure Power Panel 5000' with $840,500 total sales revenue.",
    hints: [
      "In a Pivot Table, right click any number in the Revenue column -> Sort -> Sort Largest to Smallest.",
      "The top row immediately reveals the champion product."
    ]
  },
  {
    id: "task-6-pivot-monthly-revenue",
    order: 6,
    title: "6. Create a Pivot Table Summarizing Monthly Revenue",
    objective: "Build an executive Pivot Table showing monthly revenue trends across the entire calendar year.",
    formulaOrAction: "Insert -> PivotTable | Rows: Order_Date (Grouped by Months) | Columns: Region | Values: Sum of Revenue",
    plainEnglishExplanation: "Right click any date in the Pivot Table Rows and choose 'Group...'. Select 'Months' and 'Years' to convert 1,000 individual timestamps into 12 neat monthly rows.",
    expectedResult: "A clean 12-row by 3-column matrix showing revenue progression from January through December.",
    hints: [
      "Ensure the date column contains valid Excel serial dates, not plain text strings like '2026-05-01'.",
      "Add a Slicer for 'Product Category' to allow interactive filtering for executive presentations."
    ]
  }
];

export const SAMPLE_TRANSACTION_RECORDS = [
  { id: "TX-1001", date: "2026-01-05", customerId: "CUST-104", region: "Asia Pacific", product: "Power Panel 5000", quantity: 3, unitPrice: 4200, total: 12600, status: "Completed" },
  { id: "TX-1002", date: "2026-01-08", customerId: "CUST-218", region: "North America", product: "Smart Circuit Breaker", quantity: 15, unitPrice: 350, total: 5250, status: "Completed" },
  { id: "TX-1003", date: "2026-01-12", customerId: "CUST-305", region: "Europe", product: "Relay Controller X1", quantity: 8, unitPrice: 620, total: 4960, status: "Completed" },
  { id: "TX-1004", date: "2026-01-15", customerId: "CUST-104", region: "Asia Pacific", product: "Power Panel 5000", quantity: 2, unitPrice: 4200, total: 8400, status: "Completed" },
  { id: "TX-1005", date: "2026-01-18", customerId: "CUST-412", region: "North America", product: "IoT Energy Sensor", quantity: 40, unitPrice: 110, total: 4400, status: "Completed" },
  { id: "TX-1006", date: "2026-01-22", customerId: "", region: "Europe", product: "Smart Circuit Breaker", quantity: 10, unitPrice: 350, total: 3500, status: "Pending (Missing Cust ID!)" },
  { id: "TX-1007", date: "2026-01-25", customerId: "CUST-522", region: "Asia Pacific", product: "Relay Controller X1", quantity: 5, unitPrice: 620, total: 3100, status: "Completed" },
  { id: "TX-1008", date: "2026-01-28", customerId: "CUST-218", region: "North America", product: "Power Panel 5000", quantity: 4, unitPrice: 4200, total: 16800, status: "Completed" },
  { id: "TX-1008", date: "2026-01-28", customerId: "CUST-218", region: "North America", product: "Power Panel 5000", quantity: 4, unitPrice: 4200, total: 16800, status: "Duplicate Row!" },
  { id: "TX-1010", date: "2026-02-02", customerId: "CUST-611", region: "Europe", product: "IoT Energy Sensor", quantity: 50, unitPrice: 110, total: 5500, status: "Completed" },
  { id: "TX-1011", date: "2026-02-05", customerId: "CUST-104", region: "Asia Pacific", product: "Smart Circuit Breaker", quantity: 20, unitPrice: 350, total: 7000, status: "Completed" },
  { id: "TX-1012", date: "2026-02-10", customerId: "CUST-730", region: "North America", product: "Power Panel 5000", quantity: 6, unitPrice: 4200, total: 25200, status: "Completed" }
];
