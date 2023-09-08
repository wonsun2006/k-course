import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CourseList from "./CourseList";
import { useRecoilState, useResetRecoilState } from "recoil";
import { courseList, courseMode } from "../states/atom";
import { LIST_MODE } from "../constants/enums";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

function CourseListArea({ title, end = null }) {
  const [mode, setMode] = useRecoilState(courseMode);
  const [courses, setCourses] = useRecoilState(courseList);

  useEffect(() => {
    axiosInstance.get("/courses").then((res) => {
      setCourses(res.data);
    });
  }, []);

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
        <CourseList courses={courses} mode={mode} />
      </Row>
    </Container>
  );
}

export default CourseListArea;
