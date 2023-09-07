import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;

function MenuBar() {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(0);

  useEffect(() => {
    axios
      .get(REACT_APP_API_HOST + "/auth/info", { withCredentials: true })
      .then((res) => {
        if (res.data.user_name) setUserName(res.data.user_name);
        if (res.data.user_role) setUserRole(res.data.user_role);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          window.location.replace("/login");
        }
      });
  }, []);

  const onLogout = (e) => {
    axios
      .post(REACT_APP_API_HOST + "/auth/logout", null, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.replace("/");
      })
      .catch((err) => {
        alert("서버 에러 발생: " + err);
      });
  };

  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 className="text-primary">K-COURSE</h1>
          </Link>
        </Col>
        <Col>
          <Row>
            <Col>
              <h6 className="text-end mt-1">
                {userName} {userRole === 0 ? "학생" : "교수님"}
              </h6>
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                id="logout-button"
                onClick={onLogout}
                size="sm"
              >
                로그아웃
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MenuBar;
