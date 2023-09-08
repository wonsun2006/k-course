import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { LIST_MODE } from "../constants/enums";
import axios from "axios";
import { axiosInstance } from "../api/axios";

function CourseList({ courses, mode = LIST_MODE.STUDENT_COURSE }) {
  var endButton = null;

  switch (mode) {
    case LIST_MODE.STUDENT_COURSE:
      endButton = (course_id) => (
        <Button
          variant="outline-primary"
          id="end-button"
          onClick={() => {
            axiosInstance
              .delete("/registration", { data: { course_id: course_id } })
              .then((res) => {
                alert(res.data);
                window.location.replace("/");
              })
              .catch((err) => alert(err));
          }}
          size="sm"
        >
          수강 취소
        </Button>
      );
      break;
    case LIST_MODE.ENROLL:
      endButton = (course_id) => (
        <Button
          variant="outline-primary"
          id="end-button"
          onClick={() => {
            axiosInstance
              .post("/registration", { course_id: course_id })
              .then((res) => {
                alert(res.data);
                window.location.replace("/");
              })
              .catch((err) => alert(err));
          }}
          size="sm"
        >
          수강 신청
        </Button>
      );
      break;
    case LIST_MODE.PROFESSOR_COURSE:
      endButton = (course_id) => (
        <Button
          variant="outline-primary"
          id="end-button"
          onClick={() => {
            axiosInstance
              .delete("/courses/" + course_id)
              .then((res) => {
                alert(res.data);
                window.location.replace("/");
              })
              .catch((err) => alert(err));
          }}
          size="sm"
        >
          강의 삭제
        </Button>
      );
      break;
  }

  return (
    <Container className="d-flex justify-content-center">
      <ListGroup className="w-100">
        {courses &&
          courses.map((val, idx) => (
            <ListGroup.Item>
              <Row
                onClick={(event) => {
                  if (event.target.id === "end-button") {
                    event.preventDefault();
                  } else if (mode !== LIST_MODE.ENROLL) {
                    // console.log(val.course_id);
                    alert("open course");
                  }
                }}
              >
                <Col className="mt-2">
                  <Row>
                    <h5>{val.course_name ?? "제목없음"}</h5>
                  </Row>
                  <Row>
                    <h6>
                      {val.professor_id ? val.professor_id + " 교수님" : ""}
                    </h6>
                  </Row>
                </Col>
                <Col className="d-flex align-items-center justify-content-end">
                  {endButton(val.course_id)}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  );
}

export default CourseList;
