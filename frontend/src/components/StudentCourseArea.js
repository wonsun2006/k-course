import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AreaTopBar from "./AreaTopBar";
import CourseListArea from "./CourseListArea";
import SelectButtonGroup from "./SelectButtonGroup";
import { useRecoilState, useResetRecoilState } from "recoil";
import { courseMode, courseList } from "../states/atom";
import { LIST_MODE } from "../constants/enums";
import { axiosInstance } from "../api/axios";

function StudentCourseArea() {
  const [mode, setMode] = useRecoilState(courseMode);
  const [courses, setCourses] = useRecoilState(courseList);

  const toggleList = [
    {
      title: "내 강의",
      onclick: () => {
        setMode(LIST_MODE.STUDENT_COURSE);
        axiosInstance.get("/courses").then((res) => {
          setCourses(res.data);
        });
      },
    },
    {
      title: "수강신청",
      onclick: () => {
        setMode(LIST_MODE.ENROLL);
        axiosInstance.get("/courses?registration=false").then((res) => {
          setCourses(res.data);
        });
      },
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
