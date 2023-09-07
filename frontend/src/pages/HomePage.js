import { useEffect } from "react";
import MenuBar from "../components/MenuBar";
import { axiosInstance } from "../api/axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentCourseArea from "../components/StudentCourseArea";
import ProfessorCourseArea from "../components/ProfessorCourseArea";
import { useRecoilState, useResetRecoilState } from "recoil";
import { courseMode } from "../states/atom";
import { LIST_MODE, USER_ROLE } from "../constants/enums";

function HomePage() {
  const [mode, setMode] = useRecoilState(courseMode);

  useEffect(() => {
    axiosInstance
      .get("/auth/login-check")
      .then((res) => {
        if (res.status === 200) {
          if (!res.data) {
            // 로그인 상태 아닐 시 로그인 페이지로 이동
            // return;
            window.location.replace("/login");
          } else {
            axiosInstance
              .get("/auth/info")
              .then((res) => {
                if (res.data.user_role === USER_ROLE.PROFESSOR)
                  setMode(LIST_MODE.PROFESSOR_COURSE);
              })
              .catch((err) => {
                alert(err);
              });
          }
        } else {
          window.location.replace("/login");
        }
      })
      .catch((err) => {
        window.location.replace("/login");
      });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <MenuBar />
      <Container
        className="mt-4"
        style={{
          height: "80vh",
        }}
      >
        <Row className="h-100 gap-1">
          <Col>
            <Container
              fluid
              className="bg-light rounded border border-3 border-danger h-100"
            >
              {mode !== LIST_MODE.PROFESSOR_COURSE ? (
                <StudentCourseArea />
              ) : (
                <ProfessorCourseArea />
              )}
            </Container>
          </Col>
          <Col>
            <Container
              fluid
              className="bg-light rounded border border-3 border-danger h-100"
            ></Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
