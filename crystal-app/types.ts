export type Language = 'zh' | 'en';

export interface UserProfile {
  name: string;
  birthDate: string;
  birthTime: string;
  gender: 'male' | 'female';
}

export enum ElementType {
  Metal = '金',
  Wood = '木',
  Water = '水',
  Fire = '火',
  Earth = '土'
}

export interface CrystalRecommendation {
  name: string;
  englishName: string; // Added for image generation prompts
  color: string;
  element: string;
  description: string;
  benefits: string;
}

export interface CrystalKnowledge {
  title: string;
  content: string;
}

export interface BaziResult {
  pillars: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  elementDistribution: {
    metal: number;
    wood: number;
    water: number;
    fire: number;
    earth: number;
  };
  dominantElement: string;
  missingElement: string; // or weakest
  luckyElement: string; // Yong Shen
  analysis: string;
  recommendations: CrystalRecommendation[];
  crystalKnowledge: CrystalKnowledge;
}

export interface AppState {
  step: 'input' | 'loading' | 'results';
  profile: UserProfile | null;
  result: BaziResult | null;
  error: string | null;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}