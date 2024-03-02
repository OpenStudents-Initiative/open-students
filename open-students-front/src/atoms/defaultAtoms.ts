import { atom } from "recoil";

// Make recoil atoms for current professorId
export const currentProfessorIdState = atom({
  key: "currentProfessorIdState",
  default: "",
});

export const currentNavbarFocus = atom({
  key: "currentNavbarFocus",
  default: false,
});
