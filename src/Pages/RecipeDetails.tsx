import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Recipe } from "../Components/PopularRecipes";
import { AuthContext } from "../Contexts/AuthContext";
import { FavoritesContext } from "../Contexts/FavoritesContext";
import parse from "html-react-parser";
import ScaleLoader from "react-spinners/ScaleLoader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "../Components/global.css";
import logo from "../Assets/Images/logo.svg";

export interface Ingredients {
  id: number;
  original: string;
}

function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState<Recipe>({});
  const [activeSection, setActiveSection] = useState("ingredients");
  const [recipeIngredients, setRecipeIngredients] = useState<Ingredients[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const currentUser = useContext(AuthContext);
  const favorites = useContext(FavoritesContext);
  let params = useParams();
  const navigate = useNavigate();
  let filteredIngredients: Ingredients[] = [];

  function checkIngredientsId(ingredients: Ingredients[]) {
    const ids = ingredients.map(({ id }) => id);
    filteredIngredients = ingredients.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );
    setRecipeIngredients(filteredIngredients);
  }

  function addToFavorites(currentRecipeTitle?: string) {
    const duplicateRecipe = favorites.some(
      (recipe) => recipe.title === currentRecipeTitle
    );
    if (!duplicateRecipe) {
      favorites.push(recipeDetails);
    }
  }

  const getRecipeDetails = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&includeNutrition=false`
      );
      if (!response.ok) {
        throw new Error(`Received a bad response: ${response.status}`, {
          cause: response.status,
        });
      }
      const recipeData = await response.json();
      setRecipeDetails(recipeData);
      checkIngredientsId(recipeData.extendedIngredients);
    } catch (error) {
      if (error instanceof Error) {
        switch (error.cause) {
          case 402:
            setError(
              "It looks like you have reached the daily limit for recipe searches. Please try again tomorrow. ⛔"
            );
            console.log(error.message);
            break;
          case 404:
            setError(
              "The recipe you were looking for was not found, please try again. ⛔"
            );
            console.log(error.message);
            break;
          case 500:
            setError(
              "The server encountered an error and could not display the recipe you were looking for, please try again. ⛔"
            );
            console.log(error.message);
            break;
          default:
            setError(
              "An error occurred while loading the selected recipe, please try again.⛔"
            );
            console.log(error.message);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getRecipeDetails();
  }, [params.id]);

  return (
    <>
      <Container
        className="mainContainer px-0 d-flex flex-column align-items-center"
        fluid
      >
        <Row className="minh-100 w-100 rounded justify-content-center">
          <Col className="logo h-100 d-flex justify-content-center align-items-center rounded-circle col-md-auto py-1 mt-4">
            <Link to={"/"} className="d-flex flex-md-column align-items-center">
              <Image src={logo} alt="Home page button" />
              <div className="text-white fw-bold mb-0">Yummy</div>
            </Link>
          </Col>
          <Col className="bottomPartContainer col-md-8 col-lg-9 pt-4 d-flex flex-md-row flex-column mx-xl-5 mx-md-3">
            {loading && (
              <Col className="d-flex flex-md-row flex-column justify-content-center align-items-center">
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
              <Col className="d-md-flex flex-column">
                <Button
                  className="col-xl-1 col-md-2 mb-4"
                  onClick={() => navigate(-1)}
                >
                  &#8678; Back
                </Button>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <Alert
                      variant="danger"
                      className="fw-bold fs-3 text-center text-danger col-xl-6 col-lg-8 col-md-10 col-12"
                    >
                      {error}
                    </Alert>
                  </Col>
                </Row>
              </Col>
            )}
            {recipeIngredients && error === "" && loading === false && (
              <Row className="flex-md-row flex-column mt-5 mt-md-0">
                <Col className="text-white">
                  <div className="text-sm-start text-center">
                    <Button onClick={() => navigate(-1)}>&#8678; Back</Button>
                    {currentUser && (
                      <Button
                        className="col-auto ms-4"
                        onClick={() => addToFavorites(recipeDetails.title)}
                      >
                        Add to ⭐
                      </Button>
                    )}
                  </div>
                  <div className="pt-md-5 pt-3 text-xl-start text-sm-start text-center">
                    <Button
                      className={
                        activeSection === "ingredients"
                          ? "btn-warning col-md-6 col-lg-auto px-md-1 px-lg-3"
                          : "btn-light col-md-6 col-lg-auto px-md-1 px-lg-3"
                      }
                      onClick={() => setActiveSection("ingredients")}
                    >
                      Ingredients
                    </Button>
                    <Button
                      className={
                        activeSection === "instructions"
                          ? "btn-warning ms-md-0 ms-lg-3 ms-2 col-md-6 col-lg-auto px-md-1 px-lg-3"
                          : "btn-light ms-md-0 ms-lg-3 ms-2 col-md-6 col-lg-auto px-md-1 px-lg-3"
                      }
                      onClick={() => setActiveSection("instructions")}
                    >
                      Instructions
                    </Button>
                    {activeSection === "instructions" && (
                      <div className="text-white mt-3 text-start">
                        {parse(`${recipeDetails.instructions}`)}
                      </div>
                    )}
                    {activeSection === "ingredients" && (
                      <div className="text-white mt-3 text-start">
                        <ul>
                          {recipeIngredients.map((ingredient) => {
                            return (
                              <li key={ingredient.id}>{ingredient.original}</li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </Col>
                <Col className="ps-md-3">
                  <h2 className="text-white text-center fw-bold">
                    {recipeDetails.title}
                  </h2>
                  <Image
                    src={recipeDetails.image}
                    alt={recipeDetails.title}
                    className="w-100"
                  />
                  <div className="text-white my-3 fs-17">
                    {parse(`${recipeDetails.summary}`)}
                  </div>
                </Col>
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

export default RecipeDetails;
