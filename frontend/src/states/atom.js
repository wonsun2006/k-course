import { atom } from "recoil";
import { LIST_MODE } from "../constants/enums";

export const courseMode = atom({
  key: "courseMode",
  default: LIST_MODE.STUDENT_COURSE,
});
