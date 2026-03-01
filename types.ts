export interface SoulQuestion {
  id: string;
  question: string;
  placeholder?: string;
}

export interface SoulState {
  step: 'IDEA' | 'REFINEMENT' | 'GENERATING' | 'RESULT';
  coreIdea: string;
  questions: SoulQuestion[];
  answers: Record<string, string>;
  generatedSoul: string;
  error: string | null;
}

export enum GeminiModel {
  FLASH = 'gemini-3-flash-preview',
  PRO = 'gemini-3-pro-preview',
}
