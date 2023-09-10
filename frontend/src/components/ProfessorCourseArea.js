import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AreaTopBar from "./AreaTopBar";
import CourseListArea from "./CourseListArea";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import { LIST_MODE } from "../constants/enums";
import { axiosInstance } from "../api/axios";

function ProfessorCourseArea() {
  const [show, setShow] = useState(false);
  const [newCourseName, setNewCourseName] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onCourseNameChange = (event) => {
    setNewCourseName(event.target.value);
  };
  const onCreateCourse = () => {
    if (newCourseName) {
      axiosInstance
        .post("/courses", {
          course_name: newCourseName,
        })
        .then((res) => {
          if (res.status === 200) {
            alert('"' + newCourseName + '" 강의가 성공적으로 추가되었습니다.');
            handleClose();
            setNewCourseName(null);
            window.location.replace("/");
          }
        })
        .catch((err) => {
          if (err) alert(err);
        });
    }
  };

  return (
    <Col className="h-100">
      <AreaTopBar
        title="내 강의"
        end={
          <Button
            variant="outline-primary bg-gray100"
            id="end-button"
            onClick={handleShow}
            size="sm"
          >
            강의 개설
          </Button>
        }
      />
      <CourseListArea title="강의목록" />
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        style={{
          width: "80%",
          maxWidth: "350px",
          marginLeft: "40px",
          height: "220px",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>강의 개설</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Row className="mb-4">
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="강의 제목"
                  onChange={onCourseNameChange}
                />
              </InputGroup>
            </Row>
            <Row className="d-flex justify-content-center">
              <Button
                variant="outline-primary"
                id="create-button"
                onClick={onCreateCourse}
                active
              >
                추가
              </Button>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </Col>
  );
}

export default ProfessorCourseArea;
