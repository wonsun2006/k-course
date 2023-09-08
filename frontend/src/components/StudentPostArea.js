import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AreaTopBar from "./AreaTopBar";
import PostListArea from "./PostListArea";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { selectedCourseAtom, postModeAtom } from "../states/atom";
import { POST_MODE } from "../constants/enums";
import { textEditorformats, textEditorModules } from "../constants/config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function StudentPostArea() {
  const [selectedCourse, setSelectedCourse] =
    useRecoilState(selectedCourseAtom);
  const [postMode, setPostMode] = useRecoilState(postModeAtom);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onTitleChange = (val) => setTitle(val);
  const onContentChange = (val) => setContent(val);

  const onCreatePost = () => {
    if (title !== "" && content !== "") {
      // axiosInstance
      //   .post("/posts", {
      //     course_name: newCourseName,
      //   })
      //   .then((res) => {
      //     if (res.status === 200) {
      //       alert('게시글이 성공적으로 추가되었습니다.');
      //       setTitle('');
      //       setContent('');
      //       handleClose();
      //       window.location.replace("/");
      //     }
      //   })
      //   .catch((err) => {
      //     if (err) alert(err);
      //   });
    }
  };

  return (
    <Col className="h-100">
      <AreaTopBar
        title={selectedCourse.course_name ?? ""}
        end={
          postMode === POST_MODE.PROFESSOR ? (
            <Button
              variant="outline-primary bg-gray100"
              id="end-button"
              onClick={handleShow}
              size="sm"
            >
              새 게시글 작성
            </Button>
          ) : null
        }
      />
      <PostListArea title="게시글 목록" />
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom-end"
        style={{
          width: "80%",
          maxWidth: "600px",
          marginRight: "40px",
          height: "70%",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>게시글 작성</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row className="mb-4">
            <InputGroup>
              <Form.Control
                placeholder="게시글 제목"
                onChange={onTitleChange}
              />
            </InputGroup>
          </Row>
          <Row style={{ height: "70%" }}>
            <ReactQuill
              style={{ height: "75%" }}
              value={content}
              onChange={onContentChange}
              modules={textEditorModules}
              formats={textEditorformats}
            />
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Button
              style={{
                width: "95%",
              }}
              variant="outline-primary"
              id="create-button"
              onClick={onCreatePost}
              active
            >
              추가
            </Button>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </Col>
  );
}

export default StudentPostArea;
