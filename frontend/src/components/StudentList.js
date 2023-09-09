import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { useRecoilState, useResetRecoilState } from "recoil";
import { POST_MODE } from "../constants/enums";
import { postModeAtom, selectedCourseAtom } from "../states/atom";
import { axiosInstance } from "../api/axios";

function StudentList({ students }) {
  const [postMode, setPostMode] = useRecoilState(postModeAtom);
  const [selectedCourse, setSelectedCourse] =
    useRecoilState(selectedCourseAtom);

  const endButton = (student_id) => (
    <Button
      variant="outline-primary"
      id="end-button"
      onClick={() => {
        axiosInstance
          .delete("/registration", {
            data: {
              student_id: student_id,
              course_id: selectedCourse.course_id,
            },
          })
          .then((res) => {
            alert(res.data);
          });
      }}
      size="sm"
    >
      삭제
    </Button>
  );
  return (
    <Container className="d-flex justify-content-center">
      <ListGroup className="w-100">
        {students &&
          students.map((val, idx) => (
            <ListGroup.Item>
              <Row>
                <Col xs={10} className="mt-2">
                  <Row>
                    <div className="d-flex flex-row gap-2 align-items-center">
                      <h5>{val.user_name ?? "제목없음"}</h5>
                    </div>
                  </Row>
                </Col>
                <Col xs={2}>
                  <div className="d-flex flex-column justify-content-end align-items-end">
                    <div>
                      <h6
                        style={{
                          textAlign: "end",
                          fontSize: "14px",
                        }}
                      >
                        {val.edited_time
                          ? moment(new Date(val.edited_time)).format(
                              "YYYY/MM/DD HH:mm:ss"
                            )
                          : ""}
                      </h6>
                    </div>
                    <div>{endButton(val.student_id)}</div>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  );
}

export default StudentList;
