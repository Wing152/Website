export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
  whyRecommended?: string;
  systemPrompt: string;
  category: WisdomCategory;
  personality: {
    style: string;
    tone: string;
    worldview: string;
  };
}

export type WisdomCategory = 'Art' | 'Science' | 'Finance' | 'Philosophy' | 'Strategy';

export interface WisdomScores {
  Art: number;
  Science: number;
  Finance: number;
  Philosophy: number;
  Strategy: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  onboarded: boolean;
  goals: string[];
  interests: string[];
  wisdomScores: WisdomScores;
}

export interface ChatSession {
  mentorId: string;
  messages: Message[];
  lastUpdated: number;
}
