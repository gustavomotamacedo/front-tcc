export interface QuestionData {
  text: string;
  options: string[];
}

export interface QuizData {
  moduleId: string;
  title: string;
  questions: Record<string, QuestionData>;
}

export interface Module {
  id: string;
  title: string;
}

export interface QuizResult {
  acertos: number;
  erros: number;
  feedback: {
    [key: string]: {
      correto: boolean;
      mensagem: string;
    };
  };
  revisoes: {
    [key: string]: string;
  };
  mensagem_final: string;
}

export interface UserProgress {
  [moduleId: string]: {
    completed: boolean;
    result: QuizResult;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
}