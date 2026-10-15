export type CompanyName = 
  | 'Google'
  | 'Amazon'
  | 'Sun King'
  | 'GlobalLogic'
  | 'Nagarro'
  | 'Microsoft'
  | 'Meta'
  | 'Netflix'
  | 'Apple'
  | 'Uber'
  | 'Flipkart'
  | 'Cognizant'
  | 'TCS';

export type CompanyCategory = 'FAANG & Big Tech' | 'Tech Consultancy Giant' | 'Enterprise & GreenTech' | 'Fintech & Mobility';

export type QACategory = 
  | 'ETL & Source-to-Target Reconciliation'
  | 'Data Deduplication & Integrity'
  | 'Nullability & Boundary Testing'
  | 'Defect & Test Execution Analytics'
  | 'Financial & Ledger Verification'
  | 'Temporal & Window Function QA'
  | 'Complex Multi-Table Joins & Orphans'
  | 'Schema Drift & CDC Validation';

export type DifficultyLevel = 'Junior QA' | 'Mid SDET' | 'Senior QA Lead' | 'Principal Data QA';

export type QuestionType = 'interactive_sql' | 'multiple_choice';

export interface TableSchema {
  tableName: string;
  columns: { name: string; type: string; isPrimaryKey?: boolean; isForeignKey?: boolean }[];
  sampleData: Record<string, any>[];
}

export interface Question {
  id: string;
  questionNumber: number;
  title: string;
  company: CompanyName;
  companyCategory: CompanyCategory;
  interviewRole: 'SDET' | 'QA Engineer' | 'Data QA Analyst' | 'Automation Test Lead' | 'ETL Tester';
  difficulty: DifficultyLevel;
  category: QACategory;
  type: QuestionType;
  glassdoorContext: string;
  frequency: 'Very High' | 'High' | 'Medium';
  description: string;
  tags: string[];
  
  // For interactive SQL
  dbSetupSql?: string;
  tables?: TableSchema[];
  initialQuery?: string;
  solutionQuery?: string;
  expectedResultExplanation?: string;
  qaInsight: string;

  // For multiple choice
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface UserSubmission {
  questionId: string;
  isSolved: boolean;
  userQuery?: string;
  selectedOptionId?: string;
  lastAttemptAt: string;
  timeSpentSeconds: number;
}

export interface SqlExecutionResult {
  success: boolean;
  rows?: any[];
  columns?: string[];
  rowCount?: number;
  executionTimeMs?: number;
  errorMessage?: string;
}

export interface ValidationResult {
  isCorrect: boolean;
  feedback: string;
  userResult?: SqlExecutionResult;
  expectedResult?: SqlExecutionResult;
  differences?: string[];
}
