import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Member {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  tier: "free" | "supporter" | "patron" | "legend";
  worksRead: number;
  wordsWritten: number;
  streak: number;
}

interface MemberState {
  member: Member | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (member: Member, token: string) => void;
  logout: () => void;
  updateMember: (data: Partial<Member>) => void;
  incrementWorksRead: () => void;
  incrementWordsWritten: (count: number) => void;
}

export const useMemberStore = create<MemberState>()(
  persist(
    (set, get) => ({
      member: null,
      token: null,
      isAuthenticated: false,
      
      login: (member, token) =>
        set({
          member,
          token,
          isAuthenticated: true,
        }),
        
      logout: () =>
        set({
          member: null,
          token: null,
          isAuthenticated: false,
        }),
        
      updateMember: (data) =>
        set((state) => ({
          member: state.member ? { ...state.member, ...data } : null,
        })),
        
      incrementWorksRead: () =>
        set((state) => ({
          member: state.member
            ? { ...state.member, worksRead: state.member.worksRead + 1 }
            : null,
        })),
        
      incrementWordsWritten: (count) =>
        set((state) => ({
          member: state.member
            ? { ...state.member, wordsWritten: state.member.wordsWritten + count }
            : null,
        })),
    }),
    {
      name: "member-auth",
    }
  )
);
