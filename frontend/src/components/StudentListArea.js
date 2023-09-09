import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import StudentList from "./StudentList";
import { useRecoilState } from "recoil";
import { studentList } from "../states/atom";

function StudentListArea({ title, end = null }) {
  const [students, setStudents] = useRecoilState(studentList);

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
        <Col className="d-flex justify-content-end align-items-center">
          {end}
        </Col>
      </Row>
      <Row>
        <StudentList students={students} />
      </Row>
    </Container>
  );
}

export default StudentListArea;
