import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Recipe } from "../Components/PopularRecipes";
import SearchBar from "../Components/SearchBar";
import CuisinesList from "../Components/CuisinesList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import "../Components/global.css";
import logo from "../Assets/Images/logo.svg";

function SearchResults() {
  const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<null | string>(null);
  let params = useParams();

  const getSearchedRecipes = async (ingredients: string | undefined) => {
    try {
      setError("");
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&ingredients=${ingredients}&number=12`
      );
      if (!response.ok) {
        throw new Error(`Received a bad response: ${response.status}`, {
          cause: response.status,
        });
      }
      const recipeData = await response.json();
      setSearchedRecipes(recipeData);
    } catch (error) {
      if (error instanceof Error) {
        switch (error.cause) {
          case 400:
            setError(
              "It looks like you may have entered your ingredients wrong. Please enter your ingredients individually separated by a comma. ⛔"
            );
            console.log(error.message);
            break;
          case 402:
            setError(
              "It looks like you have reached the daily limit for recipe searches. Please try again tomorrow. ⛔"
            );
            console.log(error.message);
            break;
          case 404:
            setError(
              "The recipes you were looking for were not found, please try again. ⛔"
            );
            console.log(error.message);
            break;
          case 500:
            setError(
              "The server encountered an error and could not complete your request, please try again. ⛔"
            );
            break;
          default:
            setError(
              "An error occurred while searching for recipes, please try again.⛔"
            );
            console.log(error.message);
        }
      }
    }
  };

  useEffect(() => {
    getSearchedRecipes(params.searched);
  }, [params.searched]);

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
              src={require("../Assets/Images/spices.jpg")}
              alt="Picture of spices"
              className="w-100 mh-30"
            />
          </Col>
        </Row>
        <Row className="minh-70 w-100 rounded justify-content-center">
          <Col className="bottomPartContainer col-md-9 pt-4">
            <h1 className="text-center text-warning fw-bold">
              Find recipes with the ingredients that you have{" "}
            </h1>
            <SearchBar />
            <CuisinesList />
            <h3 className="text-center text-warning fw-bold">
              Recipes with{" "}
              <span
                style={{
                  color: "#517fa4",
                }}
              >
                {params.searched}
              </span>
            </h3>
            {error && (
              <Col className="d-flex justify-content-center mt-4">
                <Alert
                  variant="danger"
                  className="fw-bold fs-3 text-center text-danger col-6"
                >
                  {error}
                </Alert>
              </Col>
            )}
            {searchedRecipes && (
              <Row>
                {searchedRecipes.map((recipe) => {
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
                              className="text-white fw-bold fs-6 text-center z-2 position-absolute top-50 start-50"
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
        </Row>
      </Container>
    </>
  );
}

export default SearchResults;
