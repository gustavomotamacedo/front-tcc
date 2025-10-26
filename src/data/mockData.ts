export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Module {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "not-started";
  icon: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ModuleQuestions {
  [key: string]: Question[];
}

export interface UserProgress {
  [moduleId: string]: {
    completed: boolean;
    score: number;
    answers: number[];
  };
}

// Mock user data
export const mockUser: User = {
  id: "1",
  name: "João",
  email: "usuario@exemplo.com",
  password: "senha123",
};

// Mock modules
export const mockModules: Module[] = [
  {
    id: "variaveis",
    title: "Variáveis",
    status: "completed",
    icon: "📦",
  },
  {
    id: "operacoes-aritmeticas",
    title: "Operações Aritméticas",
    status: "in-progress",
    icon: "➕",
  },
  {
    id: "operadores-logicos",
    title: "Operadores Lógicos",
    status: "not-started",
    icon: "🔀",
  },
  {
    id: "processamento",
    title: "Processamento",
    status: "in-progress",
    icon: "⚙️",
  },
  {
    id: "regras-de-saida",
    title: "Regras de Saída",
    status: "not-started",
    icon: "📤",
  },
];

// Mock questions for each module
export const mockQuestions: ModuleQuestions = {
  variaveis: [
    {
      id: "v1",
      question: "Qual é o valor de x se x = 5?",
      options: ["5", "10", "15", "0"],
      correctAnswer: 0,
      explanation: "x é igual a 5 porque foi atribuído o valor 5 a ele.",
    },
    {
      id: "v2",
      question: "Qual é o valor de y se y = 10?",
      options: ["5", "10", "15", "0"],
      correctAnswer: 1,
      explanation: "y é igual a 10 conforme a atribuição.",
    },
  ],
  "operacoes-aritmeticas": [
    {
      id: "oa1",
      question: "Quanto é 5 + 3?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "5 + 3 = 8",
    },
    {
      id: "oa2",
      question: "Quanto é 10 - 4?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 2,
      explanation: "10 - 4 = 6",
    },
    {
      id: "oa3",
      question: "Quanto é 3 × 4?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      explanation: "3 × 4 = 12",
    },
  ],
  "operadores-logicos": [
    {
      id: "ol1",
      question: "Qual o resultado de true AND false?",
      options: ["true", "false", "null", "undefined"],
      correctAnswer: 1,
      explanation: "AND retorna true apenas quando ambos os operandos são true.",
    },
    {
      id: "ol2",
      question: "Qual o resultado de true OR false?",
      options: ["true", "false", "null", "undefined"],
      correctAnswer: 0,
      explanation: "OR retorna true quando pelo menos um operando é true.",
    },
  ],
  processamento: [
    {
      id: "p1",
      question: "Qual é a ordem de execução de um algoritmo?",
      options: [
        "Aleatória",
        "De cima para baixo",
        "De baixo para cima",
        "Não há ordem",
      ],
      correctAnswer: 1,
      explanation: "Algoritmos são executados de cima para baixo, linha por linha.",
    },
    {
      id: "p2",
      question: "O que é um loop?",
      options: [
        "Uma variável",
        "Uma repetição de instruções",
        "Um tipo de dado",
        "Uma função",
      ],
      correctAnswer: 1,
      explanation: "Loop é uma estrutura que permite repetir instruções múltiplas vezes.",
    },
  ],
  "regras-de-saida": [
    {
      id: "rs1",
      question: "Qual comando é usado para exibir dados na tela?",
      options: ["input", "output", "print", "scan"],
      correctAnswer: 2,
      explanation: "O comando print é comumente usado para exibir dados na tela.",
    },
    {
      id: "rs2",
      question: "O que significa 'retornar um valor'?",
      options: [
        "Apagar o valor",
        "Enviar o valor de volta",
        "Duplicar o valor",
        "Ignorar o valor",
      ],
      correctAnswer: 1,
      explanation: "Retornar um valor significa enviá-lo de volta para quem chamou a função.",
    },
  ],
};
