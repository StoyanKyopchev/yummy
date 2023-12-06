import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "../../Components/global.css";
import logo from "../../Assets/Images/logo.svg";

function SignUp() {
  return (
    <>
      <Container
        className="mainContainer px-0 d-flex flex-column align-items-center"
        fluid
      >
        <Row className="justify-content-center w-100">
          <Col className="logo position-absolute d-flex justify-content-center align-items-center rounded-circle col-md-auto py-1">
            <Link to={"/"} className="d-flex flex-md-column align-items-center">
              <Image src={logo} alt="Home page button" />
              <div className="text-white fw-bold mb-0 fs-5">Yummy</div>
            </Link>
          </Col>
          <Col className="col-md-9 col-12 p-0">
            <Image
              src={require("../../Assets/Images/spices.jpg")}
              alt="Picture of spices"
              className="w-100 mh-30"
            />
          </Col>
        </Row>
        <Row className="minh-75 w-100 justify-content-center">
          <Col className="bottomPartContainer col-md-9 pt-4 d-flex flex-md-row flex-column justify-content-center">
            <Col className="d-flex flex-column align-items-center col-xl-4 col-lg-6 col-md-8">
              <h1 className="text-warning fw-bold mb-4">Sign Up</h1>
              <FloatingLabel
                controlId="floatingInput"
                label="📧 Email address"
                className="mb-3 w-100"
              >
                <Form.Control type="email" placeholder="example@example.com" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="🔑 Password"
                className="mb-3 w-100"
              >
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPasswordConfirmation"
                label="🔑 Confirm password"
                className="mb-3 w-100"
              >
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
              <Button
                type="submit"
                className="fw-bold fs-4 w-100 mb-3"
                variant="warning"
              >
                Sign Up
              </Button>
              <Link to={"/sign-in"} className="text-white">
                Already have an account?{" "}
                <span className="text-warning">Sign in</span>
              </Link>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SignUp;
