import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AreaTopBar from "./AreaTopBar";
import CourseListArea from "./CourseListArea";
import SelectButtonGroup from "./SelectButtonGroup";
import { useRecoilState, useResetRecoilState } from "recoil";
import { courseMode } from "../states/atom";
import { LIST_MODE } from "../constants/enums";

function StudentCourseArea() {
  const [mode, setMode] = useRecoilState(courseMode);
  // const resetstudentCourseTab = useResetRecoilState(studentCourseTab);
  const toggleList = [
    {
      title: "내 강의",
      onclick: () => setMode(LIST_MODE.STUDENT_COURSE),
    },
    {
      title: "수강신청",
      onclick: () => setMode(LIST_MODE.ENROLL),
    },
  ];
  return (
    <Col className="h-100">
      <AreaTopBar
        title=""
        center={<SelectButtonGroup toggleList={toggleList} />}
      />
      <CourseListArea title="강의목록" />
    </Col>
  );
}

export default StudentCourseArea;
