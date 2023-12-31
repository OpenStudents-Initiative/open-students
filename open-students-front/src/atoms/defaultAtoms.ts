import { Session } from "@supabase/supabase-js";
import { atom } from "recoil";

// Make recoil atoms for current professorId
export const currentProfessorIdState = atom({
  key: "currentProfessorIdState",
  default: "",
});

export const sessionState = atom<Session | null>({
  key: "sessionState",
  default: null,
});
