import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../api/axios";

function LoginPage() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const onIdChange = (event) => {
    setId(event.target.value);
  };
  const onPwdChange = (event) => {
    setPwd(event.target.value);
  };
  const onLogin = () => {
    axiosInstance
      .post("/auth/login", {
        user_id: id,
        user_password: pwd,
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.replace("/");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    console.log(id);
    console.log(pwd);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row>
        <Col>
          <Row>
            <h1 className="text-center text-primary">K-COURSE</h1>
          </Row>
          <Row className="mb-3">
            <h6 className="text-center text-secondary">
              고려대학교 온라인 교육 플랫폼
            </h6>
          </Row>
          <Row className="mb-1">
            <Col xs={8}>
              <Row>
                <InputGroup className="mb-1">
                  <Form.Control placeholder="아이디" onChange={onIdChange} />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup className="mb-1">
                  <Form.Control
                    type="password"
                    placeholder="비밀번호"
                    onChange={onPwdChange}
                  />
                </InputGroup>
              </Row>
            </Col>
            <Col>
              <Button
                style={{ height: "100%" }}
                variant="outline-primary"
                id="login-button"
                onClick={onLogin}
              >
                로그인
              </Button>
            </Col>
          </Row>
          <Row>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <p className="text-center text-muted">
                아이디가 없다면 <u className="text-secondary">회원가입</u>이
                가능합니다.
              </p>
            </Link>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
