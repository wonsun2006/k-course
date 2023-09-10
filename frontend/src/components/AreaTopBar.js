import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function AreaTopBar({ title = null, center = null, end = null }) {
  return (
    <Container className="d-flex mt-2 mb-2" style={{ height: "40px" }}>
      <Col className="d-flex flex-fill">
        <h2>{title}</h2>
      </Col>
      <Col className="d-flex flex-fill justify-content-center align-items-center">
        {center}
      </Col>
      <Col className="d-flex flex-fill justify-content-end align-items-center">
        {end}
      </Col>
    </Container>
  );
}

export default AreaTopBar;
