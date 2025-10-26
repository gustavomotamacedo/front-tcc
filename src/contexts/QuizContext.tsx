import React, { createContext, useContext, useState, ReactNode } from "react";
import { mockUser, mockModules, mockQuestions, User, Module, UserProgress } from "@/data/mockData";

interface QuizContextType {
  user: User | null;
  modules: Module[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  getModuleQuestions: (moduleId: string) => any[];
  saveQuizResult: (moduleId: string, answers: number[]) => void;
  getModuleResult: (moduleId: string) => any;
  userProgress: UserProgress;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({});

  const login = (email: string, password: string): boolean => {
    if (email === mockUser.email && password === mockUser.password) {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const getModuleQuestions = (moduleId: string) => {
    return mockQuestions[moduleId] || [];
  };

  const saveQuizResult = (moduleId: string, answers: number[]) => {
    const questions = getModuleQuestions(moduleId);
    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    setUserProgress((prev) => ({
      ...prev,
      [moduleId]: {
        completed: true,
        score,
        answers,
      },
    }));
  };

  const getModuleResult = (moduleId: string) => {
    return userProgress[moduleId];
  };

  return (
    <QuizContext.Provider
      value={{
        user,
        modules: mockModules,
        login,
        logout,
        getModuleQuestions,
        saveQuizResult,
        getModuleResult,
        userProgress,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
