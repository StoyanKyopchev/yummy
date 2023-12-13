import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import "../../Components/global.css";
import logo from "../../Assets/Images/logo.svg";

function PasswordReset() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  async function handleSubmit() {
    try {
      setError("");
      setSuccessMessage("");
      await auth.sendPasswordResetEmail(emailRef.current!.value);
      setSuccessMessage("Please check your email for further instructions.");
    } catch {
      setError("Failed to reset password.");
    }
  }

  return (
    <>
      <Container
        className="mainContainer px-0 d-flex flex-column align-items-center"
        fluid
      >
        <Row className="minh-100 w-100 justify-content-center">
          <Col className="logo h-100 d-flex justify-content-center align-items-center rounded-circle col-md-auto py-1 mt-4">
            <Link to={"/"} className="d-flex flex-md-column align-items-center">
              <Image src={logo} alt="Home page button" />
              <div className="text-white fw-bold mb-0">Yummy</div>
            </Link>
          </Col>
          <Col className="bottomPartContainer col-md-8 col-lg-9 mx-xl-5 mx-md-3 p-0 d-flex flex-column align-items-center">
            <Col className="col-12 p-0">
              <Image
                src={require("../../Assets/Images/spices.jpg")}
                alt="Picture of spices"
                className="w-100 mh-30"
              />
            </Col>
            <Col className="d-flex flex-column align-items-center col-xl-4 col-lg-6 col-md-9 col-12 mt-4 px-3">
              {error && (
                <Alert
                  variant={"danger"}
                  className="text-danger fs-5 fw-bold text-nowrap text-center"
                >
                  {error}
                </Alert>
              )}

              {successMessage && (
                <Alert
                  variant={"success"}
                  className="text-success fs-5 fw-bold text-center"
                >
                  {successMessage}
                </Alert>
              )}

              <h1 className="text-warning fw-bold mb-4">Password Reset</h1>
              <FloatingLabel
                controlId="floatingInput"
                label="📧 Email address"
                className="mb-3 w-100"
              >
                <Form.Control
                  type="email"
                  placeholder="example@example.com"
                  ref={emailRef}
                />
              </FloatingLabel>
              <Button
                type="submit"
                className="fw-bold fs-4 w-100 mb-3"
                variant="warning"
                onClick={handleSubmit}
              >
                Reset password
              </Button>
              <Link to={"/sign-in"} className="text-white">
                Know your password?{" "}
                <span className="text-warning">Sign in</span>
              </Link>
              <Link to={"/sign-up"} className="text-white mb-1">
                Don't have an account?{" "}
                <span className="text-warning">Sign up</span>
              </Link>
            </Col>
          </Col>
          <Col className="authenticationButton col-auto mt-4 px-0">
            <Button
              className="bg-warning border-0 text-dark fw-bold fs-xl-5 text-nowrap invisible"
              disabled
            >
              Sign In
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PasswordReset;
