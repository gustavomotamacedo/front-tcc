// src/constants/modules.ts
import { Module } from '@/types/quiz';

export const MODULES: Module[] = [
  { id: 'fluxo', title: 'Regras de Fluxo' },
  { id: 'operacoes_aritimeticas', title: 'Operacoes Aritimeticas' },
  { id: 'operacoes_logicas', title: 'Operacoes Logicas' },
  { id: 'processamento', title: 'Regras de Processamento' },
  { id: 'regras_saida', title: 'Regras de saida' },
  { id: 'variaveis', title: 'Variáveis' },
];

export type ModuleId = typeof MODULES[number]['id'];