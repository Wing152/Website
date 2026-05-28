import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Message, ChatSession } from '@/types';

interface ChatState {
  sessions: Record<string, ChatSession>;
  activeMentorId: string | null;
  setActiveMentor: (mentorId: string) => void;
  addMessage: (mentorId: string, message: Message) => void;
  clearHistory: (mentorId: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      sessions: {},
      activeMentorId: null,
      setActiveMentor: (mentorId) => set({ activeMentorId: mentorId }),
      addMessage: (mentorId, message) => set((state) => {
        const session = state.sessions[mentorId] || { mentorId, messages: [], lastUpdated: Date.now() };
        return {
          sessions: {
            ...state.sessions,
            [mentorId]: {
              ...session,
              messages: [...session.messages, message],
              lastUpdated: Date.now(),
            }
          }
        };
      }),
      clearHistory: (mentorId) => set((state) => {
        const { [mentorId]: _, ...rest } = state.sessions;
        return { sessions: rest };
      }),
    }),
    {
      name: 'valen-chat-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
