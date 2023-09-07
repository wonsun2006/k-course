import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CourseList from "./CourseList";
import { useRecoilState, useResetRecoilState } from "recoil";
import { courseMode } from "../states/atom";
import { LIST_MODE } from "../constants/enums";

function CourseListArea({ title, end = null }) {
  const [mode, setMode] = useRecoilState(courseMode);
  const courses1 = [0, 1, 2, 3];
  const courses2 = [4, 5, 6];
  return (
    <Container
      className="rounded border border-danger"
      style={{
        height: "70vh",
        backgroundColor: "#e9ecef",
      }}
    >
      <Row>
        <Col className="d-flex align-items-center mt-2">
          <h5>{title}</h5>
        </Col>
        <Col>{end}</Col>
      </Row>
      <Row>
        <CourseList courses={mode === 0 ? courses1 : courses2} mode={mode} />
      </Row>
    </Container>
  );
}

export default CourseListArea;
