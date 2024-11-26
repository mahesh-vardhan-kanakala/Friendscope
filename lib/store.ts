import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, isAfter, isBefore, startOfDay } from 'date-fns';

interface Assessment {
  id: string;
  date: string;
  scores: {
    trust: number;
    communication: number;
    support: number;
    respect: number;
    boundaries: number;
  };
  insights: string[];
}

interface UserState {
  assessments: Assessment[];
  streak: number;
  lastAssessmentDate: string | null;
  badges: string[];
  addAssessment: (assessment: Assessment) => void;
  updateStreak: () => void;
  addBadge: (badge: string) => void;
}

export const useStore = create<UserState>()(
  persist(
    (set, get) => ({
      assessments: [],
      streak: 0,
      lastAssessmentDate: null,
      badges: [],
      addAssessment: (assessment) =>
        set((state) => ({
          assessments: [...state.assessments, assessment],
          lastAssessmentDate: new Date().toISOString(),
        })),
      updateStreak: () => {
        const { lastAssessmentDate, streak } = get();
        if (!lastAssessmentDate) return;

        const lastDate = new Date(lastAssessmentDate);
        const today = startOfDay(new Date());
        const yesterday = addDays(today, -1);

        if (isAfter(lastDate, yesterday) && isBefore(lastDate, today)) {
          set({ streak: streak + 1 });
        } else if (isAfter(lastDate, addDays(today, -2))) {
          // Maintain streak
        } else {
          set({ streak: 0 });
        }
      },
      addBadge: (badge) =>
        set((state) => ({
          badges: [...state.badges, badge],
        })),
    }),
    {
      name: 'friendscope-storage',
    }
  )
);