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

function PostList({ posts }) {
  const [postMode, setPostMode] = useRecoilState(postModeAtom);
  const [selectedCourse, setSelectedCourse] =
    useRecoilState(selectedCourseAtom);

  var endButton = (val) => {};

  switch (postMode) {
    case POST_MODE.PROFESSOR:
      endButton = (post_id) => (
        <Button
          variant="outline-primary"
          id="end-button"
          onClick={() => {
            axiosInstance
              .delete(
                "/courses/" + selectedCourse.course_id + "/posts/" + post_id
              )
              .then((res) => {
                alert(res.data);
              });
          }}
          size="sm"
        >
          삭제
        </Button>
      );
      break;
    case POST_MODE.STUDENT:
      break;
  }

  return (
    <Container className="d-flex justify-content-center">
      <ListGroup className="w-100">
        {posts &&
          posts.map((val, idx) => (
            <ListGroup.Item>
              <Row>
                <Col xs={10} className="mt-2">
                  <Row>
                    <h5>{val.title ?? "제목없음"}</h5>
                  </Row>
                  <Row>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: val.content ? val.content : "",
                      }}
                    ></div>
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

                    <div>{endButton(val.post_id)}</div>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  );
}

export default PostList;
