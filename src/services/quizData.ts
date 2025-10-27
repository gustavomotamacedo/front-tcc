// src/services/quizData.ts
import fluxo from '@/data/quizzes/fluxo.json';
import operacoes_aritimeticas from '@/data/quizzes/operacoes_aritimeticas.json';
import operacoes_logicas from '@/data/quizzes/operacoes_logicas.json';
import processamento from '@/data/quizzes/processamento.json';
import regras_saida from '@/data/quizzes/regras_saida.json';
import variaveis from '@/data/quizzes/variaveis.json';

const QUIZZES = {
  fluxo,
  operacoes_aritimeticas,
  operacoes_logicas,
  processamento,
  regras_saida,
  variaveis,
};

export const getQuizData = (moduleId: string) => {
  const data = QUIZZES[moduleId as keyof typeof QUIZZES];
  if (!data) {
    throw new Error(`Quiz "${moduleId}" não encontrado.`);
  }
  return data;
};