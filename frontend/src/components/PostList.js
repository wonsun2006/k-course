import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
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
                <Col className="mt-2">
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
                <Col className="d-flex align-items-center justify-content-end">
                  {endButton(val.post_id)}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  );
}

export default PostList;
