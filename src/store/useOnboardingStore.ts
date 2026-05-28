import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface OnboardingState {
  currentStep: number;
  responses: {
    goals: string[];
    mindset: string;
    interests: string[];
    struggles: string;
    ambitions: string;
  };
  setResponse: (key: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentStep: 0,
      responses: {
        goals: [],
        mindset: '',
        interests: [],
        struggles: '',
        ambitions: '',
      },
      setResponse: (key, value) => set((state) => ({
        responses: { ...state.responses, [key]: value }
      })),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
      reset: () => set({ currentStep: 0, responses: { goals: [], mindset: '', interests: [], struggles: '', ambitions: '' } }),
    }),
    {
      name: 'valen-onboarding-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
