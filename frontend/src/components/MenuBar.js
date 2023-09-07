import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;

function MenuBar() {
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
              <h6 className="text-end mt-1">방원선 교수님</h6>
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
