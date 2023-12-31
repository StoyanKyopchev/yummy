import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Recipe } from "../Components/PopularRecipes";
import { AuthContext } from "../Contexts/AuthContext";
import SearchBar from "../Components/SearchBar";
import CuisinesList from "../Components/CuisinesList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ScaleLoader from "react-spinners/ScaleLoader";
import "../Components/global.css";
import logo from "../Assets/Images/logo.svg";

function Cuisine() {
  const [selectedCuisineRecipes, setSelectedCuisineRecipes] = useState<
    Recipe[]
  >([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const currentUser = useContext(AuthContext);
  let params = useParams();

  const getSelectedCuisineRecipes = async (cuisineName: string | undefined) => {
    try {
      setError("");
      const storedCuisineRecipes = sessionStorage.getItem(
        `${cuisineName}Cuisine`
      );

      if (storedCuisineRecipes) {
        setSelectedCuisineRecipes(JSON.parse(storedCuisineRecipes));
      } else {
        setLoading(true);
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&cuisine=${cuisineName}&number=12`
        );
        if (!response.ok) {
          throw new Error(`Received a bad response: ${response.status}`, {
            cause: response.status,
          });
        }
        const recipeData = await response.json();
        sessionStorage.setItem(
          `${cuisineName}Cuisine`,
          JSON.stringify(recipeData.results)
        );
        setSelectedCuisineRecipes(recipeData.results);
      }
    } catch (error) {
      if (error instanceof Error) {
        switch (error.cause) {
          case 402:
            setError(
              "The recipes from the selected cuisine type couldn't be displayed as it looks like you have reached the daily limit for recipe searches. Please try again tomorrow. ⛔"
            );
            console.log(error.message);
            break;
          case 404:
            setError(
              "The recipes from the selected cuisine type were not found, please try again. ⛔"
            );
            console.log(error.message);
            break;
          case 500:
            setError(
              "The server encountered an error and could not display the recipes from the selected cuisine type, please try again. ⛔"
            );
            console.log(error.message);
            break;
          default:
            setError(
              "An error occurred while loading the recipes from the selected cuisine type, please try again. ⛔"
            );
            console.log(error.message);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getSelectedCuisineRecipes(params.name);
  }, [params.name]);

  return (
    <>
      <Container
        className="mainContainer px-0 d-flex flex-column align-items-center"
        fluid
      >
        <Row className="minh-75 w-100 justify-content-center">
          <Col className="logo h-100 d-flex justify-content-center align-items-center rounded-circle col-md-auto py-1 mt-4">
            <Link to={"/"} className="d-flex flex-md-column align-items-center">
              <Image src={logo} alt="Home page button" />
              <div className="text-dark fw-bold mb-0">Yummy</div>
            </Link>
          </Col>
          <Col className="bottomPartContainer col-md-8 col-lg-9 mx-xl-5 mx-md-3 p-0">
            <Col className="col-12 p-0">
              <Image
                src={require("../Assets/Images/spices.jpg")}
                alt="Picture of spices"
                className="w-100 mh-30"
              />
            </Col>
            <h1 className="text-center text-warning fw-bold pt-3">
              Find recipes with the ingredients that you have{" "}
            </h1>
            <SearchBar />
            <CuisinesList />
            <h3
              className="text-center fw-bold"
              style={{
                color: "#517fa4",
              }}
            >
              {params.name} Recipes
            </h3>
            {loading && (
              <Col className="d-flex flex-md-row flex-column justify-content-center align-items-center mt-5">
                <ScaleLoader
                  loading={loading}
                  aria-label="Scale Loader Animation"
                  color="orange"
                  height={100}
                  width={8}
                  margin={5}
                />
              </Col>
            )}
            {error !== "" && (
              <Col className="d-flex justify-content-center mt-4">
                <Alert
                  variant="danger"
                  className="fw-bold fs-3 text-center text-danger col-xl-6 col-lg-8 col-md-10 col-12"
                >
                  {error}
                </Alert>
              </Col>
            )}
            {selectedCuisineRecipes && error === "" && loading === false && (
              <Row className="px-3">
                {selectedCuisineRecipes.map((recipe) => {
                  return (
                    <Col
                      key={recipe.id}
                      className="col-xl-3 col-lg-4 col-md-6 col-12 py-2"
                    >
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
                              className="text-white fw-bold fs-12 text-center z-2 position-absolute top-50 start-50 w-100"
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
            )}
          </Col>
          <Col className="authenticationButton col-auto mt-4 px-0">
            <Link to={currentUser ? "/account-dashboard" : "/sign-in"}>
              <Button className="bg-warning border-0 text-dark fw-bold fs-xl-5 text-nowrap">
                {currentUser ? "My Account" : "Sign In"}
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cuisine;
