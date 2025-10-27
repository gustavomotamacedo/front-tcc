// src/contexts/QuizContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  User,
  Module,
  QuizResult,
  UserProgress,
} from "@/types/quiz";
import { submitQuizAnswers } from "@/services/quizApi";
import { getQuizData } from "@/services/quizData";
import { MODULES } from "@/constants/modules";

interface QuizContextType {
  user: User | null;
  modules: Module[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getModuleQuestions: (moduleId: string) => ReturnType<typeof getQuizData>;
  saveQuizResult: (moduleId: string, answers: Record<string, string>) => Promise<QuizResult>;
  getModuleResult: (moduleId: string) => QuizResult | null;
  userProgress: UserProgress;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({});

  const login = async (email: string, password: string): Promise<boolean> => {
    // Substitua por chamada real à API de autenticação quando disponível
    if (email === "aluno@exemplo.com" && password === "senha123") {
      setUser({ id: "1", name: "Aluno Exemplo", email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setUserProgress({});
  };

  const getModuleQuestions = (moduleId: string) => {
    return getQuizData(moduleId);
  };

  const saveQuizResult = async (moduleId: string, answers: Record<string, string>) => {
    try {
      const result = await submitQuizAnswers(moduleId, answers);
      setUserProgress((prev) => ({
        ...prev,
        [moduleId]: {
          completed: true,
          result,
        },
      }));
      return result;
    } catch (error) {
      console.error("Erro ao salvar resultado do quiz:", error);
      throw error;
    }
  };

  const getModuleResult = (moduleId: string): QuizResult | null => {
    return userProgress[moduleId]?.result || null;
  };

  return (
    <QuizContext.Provider
      value={{
        user,
        modules: MODULES,
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