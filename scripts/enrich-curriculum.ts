import fs from 'fs';
import path from 'path';
import initSqlJs from 'sql.js';
import { LESSONS, MODULES, ACTIVITIES, type TableSample } from '../src/data/curriculum';
import { SEED_SQL } from '../src/lib/sqliteEngine';

async function main() {
  console.log('Initializing SQL.js database with SEED_SQL...');
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  db.run(SEED_SQL);

  const TABLE_DESCRIPTIONS: Record<string, string> = {
    customers: 'Customer demographic and signup profiles',
    products: 'Complete retail inventory and pricing catalog',
    sales: 'Customer order transaction logs and revenue records',
    departments: 'Organizational divisions and corporate departments',
    employees: 'Staff directory with departmental salaries and hire dates',
    transactions: 'Financial payment transactions and timestamps',
    pages: 'Facebook business pages directory',
    page_likes: 'User engagement and likes history',
    candidates: 'Job applicant skills assessments'
  };

  const ALL_TABLES = Object.keys(TABLE_DESCRIPTIONS);

  function getTablesUsed(sql: string): string[] {
    const found: string[] = [];
    const lower = sql.toLowerCase();
    for (const tbl of ALL_TABLES) {
      const regex = new RegExp(`\\b${tbl}\\b`, 'i');
      if (regex.test(lower)) {
        found.push(tbl);
      }
    }
    return found;
  }

  function getTableSample(tableName: string): TableSample {
    const res = db.exec(`SELECT * FROM ${tableName} LIMIT 6;`);
    if (!res || res.length === 0) {
      return {
        tableName,
        description: TABLE_DESCRIPTIONS[tableName] || '',
        headers: [],
        rows: []
      };
    }
    return {
      tableName,
      description: TABLE_DESCRIPTIONS[tableName] || '',
      headers: res[0].columns,
      rows: res[0].values
    };
  }

  function getExpectedPreview(sql: string) {
    try {
      const res = db.exec(sql);
      if (!res || res.length === 0) {
        return {
          headers: [],
          sampleRows: [],
          totalExpectedRows: 0
        };
      }
      return {
        headers: res[0].columns,
        sampleRows: res[0].values.slice(0, 5),
        totalExpectedRows: res[0].values.length
      };
    } catch (err: any) {
      console.error('Failed to run expected query:', sql, err.message);
      return {
        headers: [],
        sampleRows: [],
        totalExpectedRows: 0
      };
    }
  }

  console.log(`Enriching ${LESSONS.length} lessons with studio preview data...`);

  const enrichedLessons = LESSONS.map((lesson) => {
    const tablesUsed = getTablesUsed(lesson.challenge.expectedQuery);
    const sampleInputs = tablesUsed.map((tbl) => getTableSample(tbl));
    const expectedOutputPreview = getExpectedPreview(lesson.challenge.expectedQuery);

    return {
      ...lesson,
      challenge: {
        ...lesson.challenge,
        tablesUsed,
        sampleInputs,
        expectedOutputPreview
      }
    };
  });

  console.log('Writing back enriched curriculum.ts...');

  const fileContent = `export interface LessonSection {
  title: string;
  body: string;
  exampleSql?: string;
}

export interface TableSample {
  tableName: string;
  description?: string;
  headers: string[];
  rows: (string | number | null)[][];
}

export interface LessonChallenge {
  title: string;
  scenario: string;
  instructions: string;
  starterCode: string;
  expectedQuery: string;
  hints: string[];
  solutionExplanation: string;
  tablesUsed: string[];
  sampleInputs: TableSample[];
  expectedOutputPreview: {
    headers: string[];
    sampleRows: (string | number | null)[][];
    totalExpectedRows: number;
  };
}

export interface Lesson {
  id: string;
  moduleTitle: string;
  moduleOrder: number;
  lessonOrder: number;
  title: string;
  description: string;
  sections: LessonSection[];
  quickReference?: { goal: string; syntax: string }[];
  commonMistake?: {
    wrongSql: string;
    correctSql: string;
    explanation: string;
  };
  challenge: LessonChallenge;
}

export interface Activity {
  id: string;
  order: number;
  moduleTag: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  context: string;
  goal: string;
  tablesUsed: string[];
  sampleInputs: TableSample[];
  expectedOutputPreview: {
    headers: string[];
    sampleRows: (string | number | null)[][];
    totalExpectedRows: number;
  };
  starterCode: string;
  expectedQuery: string;
  hints: string[];
  walkthrough: string;
}

export const MODULES = ${JSON.stringify(MODULES, null, 2)};

export const LESSONS: Lesson[] = ${JSON.stringify(enrichedLessons, null, 2)};

export const ACTIVITIES: Activity[] = ${JSON.stringify(ACTIVITIES, null, 2)};
`;

  const targetPath = path.resolve('src/data/curriculum.ts');
  fs.writeFileSync(targetPath, fileContent, 'utf8');
  console.log('Successfully updated src/data/curriculum.ts with full studio data for all 23 lessons!');
}

main().catch(err => {
  console.error('Error running enrichment:', err);
  process.exit(1);
});
