import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PostList from "./PostList";
import { useRecoilState } from "recoil";
import { postList } from "../states/atom";

function PostListArea({ title, end = null }) {
  const [posts, setPosts] = useRecoilState(postList);

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
        <PostList posts={posts} />
      </Row>
    </Container>
  );
}

export default PostListArea;
