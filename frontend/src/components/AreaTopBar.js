import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function AreaTopBar({ title = null, center = null, end = null }) {
  return (
    <Container className="d-flex mt-2 mb-2">
      <Col>
        <h2>{title}</h2>
      </Col>
      <Col className="d-flex justify-content-center">{center}</Col>
      <Col>{end}</Col>
    </Container>
  );
}

export default AreaTopBar;
