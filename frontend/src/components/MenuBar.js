import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function MenuBar() {
  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 className="text-primary">K-COURSE</h1>
          </Link>
        </Col>
        <Col>
          <h6 className="text-end">방원선 교수님</h6>
        </Col>
      </Row>
    </Container>
  );
}

export default MenuBar;
