// src/services/quizApi.ts
import api from '@/services/api'; // seu axios com baseURL configurado
import { QuizResult } from '@/types/quiz';

export const submitQuizAnswers = async (
  moduleId: string,
  answers: Record<string, string>
): Promise<QuizResult> => {
  // Rota: /<moduleId>/v1/quiz
  const response = await api.post(`/${moduleId}/v1/quiz/`, answers);
  return response.data;
};