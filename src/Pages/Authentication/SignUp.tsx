import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  async function handleSubmit() {
    if (passwordRef.current!.value !== passwordConfRef.current!.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setSuccessMessage("");
      await auth.createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
      setSuccessMessage("Account created successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch {
      setError("Failed to create an account, please try again.");
    }
  }

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
              {error && (
                <Alert
                  variant={"danger"}
                  className="text-danger fs-5 fw-bold text-center"
                >
                  {error}
                </Alert>
              )}

              {successMessage && (
                <Alert
                  variant={"success"}
                  className="text-success fs-5 fw-bold text-nowrap text-center"
                >
                  {successMessage}
                </Alert>
              )}

              <h1 className="text-warning fw-bold mb-4">Sign Up</h1>
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
              <FloatingLabel
                controlId="floatingPassword"
                label="🔑 Password"
                className="mb-3 w-100"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPasswordConfirmation"
                label="🔑 Confirm password"
                className="mb-3 w-100"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordConfRef}
                />
              </FloatingLabel>
              <Button
                type="submit"
                className="fw-bold fs-4 w-100 mb-3"
                variant="warning"
                onClick={handleSubmit}
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
