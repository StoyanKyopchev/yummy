import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { AuthContext } from "../../Contexts/AuthContext";
import { FavoritesContext } from "../../Contexts/FavoritesContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import "../../Components/global.css";
import logo from "../../Assets/Images/logo.svg";

function AccountDashboard() {
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const currentUser = useContext(AuthContext);
  const favorites = useContext(FavoritesContext);
  const navigate = useNavigate();
  let username: string | undefined;
  const [length, setLength] = useState(favorites.length);

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

  function removeFromFavorites(index: number) {
    favorites.splice(index, 1);
    setLength(favorites.length);
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
            <Row className="px-3 mt-4">
              <h3 className="text-center text-white fw-bold mb-2">
                My Favorite Recipes ⭐
              </h3>
              {favorites.map((recipe, index) => {
                return (
                  <Col
                    key={recipe.id}
                    className="col-xl-3 col-lg-4 col-md-6 col-12 py-2 position-relative"
                  >
                    <Button
                      onClick={() => removeFromFavorites(index)}
                      className="bg-transparent border-0 position-absolute z-2 top-0 end-0"
                    >
                      ❌
                    </Button>
                    <Link to={"/recipe/" + recipe.id}>
                      <Card className="border-0">
                        <Card.Img
                          variant="top"
                          src={recipe.image}
                          alt={recipe.title}
                          className="rounded"
                        />
                        <Card.ImgOverlay>
                          <Card.Title
                            className="text-white fw-bold fs-12 text-center z-2 position-absolute top-50 start-50"
                            style={{ transform: "translate(-50%, 0)" }}
                          >
                            {recipe.title}
                          </Card.Title>
                        </Card.ImgOverlay>
                        <div
                          className="position-absolute w-100 h-100 z-1 overflow-hidden"
                          style={{
                            background:
                              "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7))",
                          }}
                        ></div>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
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
