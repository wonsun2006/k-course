import { atom } from "recoil";
import { LIST_MODE, POST_MODE } from "../constants/enums";

export const courseModeAtom = atom({
  key: "courseModeAtom",
  default: LIST_MODE.STUDENT_COURSE,
});

export const postModeAtom = atom({
  key: "postModeAtom",
  default: POST_MODE.STUDENT,
});

export const courseList = atom({
  key: "courseList",
  default: [],
});

export const postList = atom({
  key: "postList",
  default: [],
});

export const selectedCourseAtom = atom({
  key: "selectedCourseAtom",
  default: {
    course_id: null,
    course_name: null,
  },
});
