import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useRecoilState, useResetRecoilState } from "recoil";
import { LIST_MODE, POST_MODE } from "../constants/enums";
import { postModeAtom } from "../states/atom";
import axios from "axios";
import { axiosInstance } from "../api/axios";

function PostList({ posts }) {
  const [postMode, setPostMode] = useRecoilState(postModeAtom);

  var endButton = (val) => {};

  switch (postMode) {
    case POST_MODE.PROFESSOR:
      endButton = (post_id) => (
        <Row>
          <Col>
            <Button
              variant="outline-primary"
              id="end-button"
              onClick={() => {
                console.log(post_id);
              }}
              size="sm"
            >
              수정
            </Button>
          </Col>

          <Col>
            <Button
              variant="outline-primary"
              id="end-button"
              onClick={() => {}}
              size="sm"
            >
              삭제
            </Button>
          </Col>
        </Row>
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
                  <Row>{val.content ? val.content : ""}</Row>
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
