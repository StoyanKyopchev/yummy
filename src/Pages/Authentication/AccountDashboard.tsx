import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { AuthContext } from "../../Contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import "../../Components/global.css";
import logo from "../../Assets/Images/logo.svg";

function AccountDashboard() {
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();
  let username: string | undefined;

  function getUsername() {
    let index = currentUser?.email?.indexOf("@");
    username = currentUser?.email?.slice(0, index);
  }

  getUsername();

  async function handleSubmit() {
    try {
      setError("");
      setSuccessMessage("");
      setTimeout(async () => {
        await auth.signOut();
      }, 2500);
      setSuccessMessage("Sign out successful.");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch {
      setError("Failed to sign out.");
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
                  className="text-success fs-5 fw-bold text-nowrap text-center"
                >
                  {successMessage}
                </Alert>
              )}

              <h1 className="text-warning fw-bold mb-3">My Account</h1>
              <h5 className="text-white mb-3 text-center">
                Welcome back, <span className="text-warning">{username}</span>
              </h5>
              <Button
                type="submit"
                className="fw-bold fs-4 w-100 mb-3"
                variant="warning"
              >
                <Link to={"/account-update"} className="text-dark">
                  Update Account Information
                </Link>
              </Button>
              <Button
                type="submit"
                className="fw-bold fs-4 w-100"
                variant="warning"
                onClick={handleSubmit}
              >
                Sign Out
              </Button>
            </Col>
          </Col>
          <Col className="authenticationButton col-auto mt-4 px-0">
            <Button
              className="bg-warning border-0 text-dark fw-bold fs-xl-5 text-nowrap invisible"
              disabled
            >
              My Account
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AccountDashboard;
