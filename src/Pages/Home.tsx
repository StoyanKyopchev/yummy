import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./home.css";

export default function Home() {
  return (
    <>
      <Container
        className="mainContainer px-0 h-100 d-flex flex-column align-items-center"
        fluid
      >
        <Row className="justify-content-center h-30 w-100">
          <Col className="mh-100 col-lg-9 col-12 p-0">
            <Image
              src={require("../Assets/Images/spices.jpg")}
              alt="Picture of spices"
              className="w-100 h-100"
            />
          </Col>
        </Row>
        <Row className="mh-70 w-100 rounded justify-content-center">
          <Col className="searchBarSectionContainer col-lg-9 pt-4">
            <h1 className="text-center text-warning fw-bold">
              Find recipes with the ingredients that you have{" "}
            </h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}
