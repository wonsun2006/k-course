import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import MenuBar from "../components/MenuBar";
import ToggleButton from "react-bootstrap/ToggleButton";
import axios from "axios";

const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;
const ROLE = {
  STUDENT: 0,
  PROFESSOR: 1,
};

function RegisterPage() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [name, setName] = useState("");
  const [idNum, setIdNum] = useState("");
  const [role, setRole] = useState(ROLE.STUDENT);

  const onIdChange = (event) => {
    setId(event.target.value);
  };
  const onPwdChange = (event) => {
    setPwd(event.target.value);
  };
  const onPwdConfirmChange = (event) => {
    setPwdConfirm(event.target.value);
  };
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onIdNumChange = (event) => {
    setIdNum(event.target.value);
  };
  const onRoleChange = (value) => {
    if (value !== role) setRole(value);
  };

  const checkInput = () => {
    if (pwd !== pwdConfirm) return false;

    return true;
  };

  const onConfirm = () => {
    if (!checkInput()) {
      alert("정보 입력이 잘못되었습니다.");
      return;
    }
    const body = {
      user_id: id,
      user_password: pwd,
      user_name: name,
      id_num: idNum,
      user_role: role,
    };

    axios
      .post(REACT_APP_API_HOST + "/users", body)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data);
          window.location.replace("/");
          return;
        } else {
          alert("에러가 발생했습니다: ", res.data);
          return;
        }
      })
      .catch((err) => {
        alert(err.response.data);
        return;
      });
  };

  return (
    <Col>
      <MenuBar />
      <Container
        className="d-flex justify-content-start align-items-start"
        // style={{ height: "100vh" }}
      >
        <Col xs={6}>
          <Row>
            <h4 className="text-start text-primary">회원가입</h4>
          </Row>
          <Row className="mb-3">
            <h6 className="text-start text-secondary">
              회원가입을 위해 아래 정보들을 입력해주세요
            </h6>
          </Row>
          <Row>
            <InputGroup className="mb-2">
              <Form.Control placeholder="아이디" onChange={onIdChange} />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup className="mb-2">
              <Form.Control
                type="password"
                placeholder="비밀번호"
                onChange={onPwdChange}
              />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup className="mb-2">
              <Form.Control
                type="password"
                placeholder="비밀번호 확인"
                onChange={onPwdConfirmChange}
              />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup className="mb-2">
              <Form.Control placeholder="이름" onChange={onNameChange} />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup className="mb-2">
              <Form.Control placeholder="학번" onChange={onIdNumChange} />
            </InputGroup>
          </Row>
          <Row className="mb-2">
            <Col className="d-flex justify-content-center align-items-center">
              <ToggleButton
                className="w-75"
                variant="outline-primary"
                type="checkbox"
                value={ROLE.STUDENT}
                checked={role === ROLE.STUDENT}
                onClick={() => onRoleChange(ROLE.STUDENT)}
              >
                학생
              </ToggleButton>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <ToggleButton
                className="w-75"
                variant="outline-primary"
                type="checkbox"
                value={ROLE.PROFESSOR}
                checked={role === ROLE.PROFESSOR}
                onClick={() => onRoleChange(ROLE.PROFESSOR)}
              >
                교수자
              </ToggleButton>
            </Col>
          </Row>
          <Row>
            <Button
              variant="outline-primary"
              id="login-button"
              onClick={onConfirm}
              active
            >
              완료
            </Button>
          </Row>
        </Col>
      </Container>
    </Col>
  );
}

export default RegisterPage;
