import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MenuBar() {
  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-primary">K-COURSE</h1>
        </Col>
        <Col>
          <h6 className="text-end">방원선 교수님</h6>
        </Col>
      </Row>
    </Container>
  );
}

export default MenuBar;
