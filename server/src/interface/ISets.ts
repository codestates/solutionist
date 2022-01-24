export interface ICollection {
  creatorId: number;
  createdAt: string;
}

export interface ISets {
  id: number;
  collectionId: number;
  title: string;
  description: string;
  editorId: number;
  createdAt: string;
  problems: IProblems[];
}

export interface IProblems {
  index: number;
  question: string;
  answer: number;
  explanation: string;
  isOX: boolean;
  choices: IChoices[];
}

export interface IChoices {
  index: number;
  content: number;
}

export interface ISolve {
  solver: string;
  problemId: number;
  recordId: number;
  choice: number;
}

export interface IRate {
  recordId: number;
  answerRate: number;
  totalRate: number;
}

export interface ISelect {
  total: number;
  info: Object;
}
