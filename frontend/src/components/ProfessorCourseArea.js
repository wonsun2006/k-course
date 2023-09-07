import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AreaTopBar from "./AreaTopBar";
import CourseListArea from "./CourseListArea";
import SelectButtonGroup from "./SelectButtonGroup";
import { useRecoilState, useResetRecoilState } from "recoil";
import { studentCourseTab } from "../states/atom";
import { LIST_MODE } from "../constants/enums";

function ProfessorCourseArea() {
  return (
    <Col className="h-100">
      <AreaTopBar title="내 강의" />
      <CourseListArea title="강의목록" mode={LIST_MODE.PROFESSOR_COURSE} />
    </Col>
  );
}

export default ProfessorCourseArea;
