import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Recipe } from "./PopularRecipes";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import ScaleLoader from "react-spinners/ScaleLoader";
import "@splidejs/react-splide/css";
import "./global.css";

function PopularVeganRecipes() {
  const [veganRecipes, setVeganRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const getPopularVeganRecipes = async () => {
    try {
      setError("");
      const storedVeganRecipes = sessionStorage.getItem("veganRecipes");

      if (storedVeganRecipes) {
        setVeganRecipes(JSON.parse(storedVeganRecipes));
      } else {
        setLoading(true);
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=12&tags=vegan`
        );
        if (!response.ok) {
          throw new Error(`Received a bad response: ${response.status}`, {
            cause: response.status,
          });
        }
        const recipesData = await response.json();
        sessionStorage.setItem(
          "veganRecipes",
          JSON.stringify(recipesData.recipes)
        );
        setVeganRecipes(recipesData.recipes);
      }
    } catch (error) {
      if (error instanceof Error) {
        switch (error.cause) {
          case 402:
            setError(
              "Our popular vegan recipes couldn't be displayed as it looks like you have reached the daily limit for recipe searches. Please try again tomorrow. ⛔"
            );
            console.log(error.message);
            break;
          case 404:
            setError(
              "Popular vegan recipes were not found, please try reloading the page. ⛔"
            );
            console.log(error.message);
            break;
          case 500:
            setError(
              "The server encountered an error and could not display our popular vegan recipes, please try reloading the page. ⛔"
            );
            console.log(error.message);
            break;
          default:
            setError(
              "An error occurred while loading our popular vegan recipes, please try reloading the page.⛔"
            );
            console.log(error.message);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getPopularVeganRecipes();
  }, []);

  if (loading) {
    return (
      <>
        <Col className="d-flex justify-content-center mt-4">
          <ScaleLoader
            loading={loading}
            aria-label="Scale Loader Animation"
            color="orange"
            height={100}
            width={8}
            margin={5}
          />
        </Col>
      </>
    );
  }

  if (veganRecipes && error === "" && loading === false) {
    return (
      <>
        <Splide
          aria-label="Popular Recipes"
          className="px-3"
          options={{
            perPage: 4,
            breakpoints: {
              640: {
                perPage: 1,
                drag: true,
                arrows: true,
              },
              992: {
                perPage: 2,
              },
              1200: {
                perPage: 3,
              },
            },
            gap: "2rem",
            pagination: false,
            drag: "free",
            arrows: false,
          }}
        >
          {veganRecipes.map((recipe) => {
            return (
              <SplideSlide
                key={recipe.id}
                className="popularVeganRecipesCarouselContainer"
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
              </SplideSlide>
            );
          })}
        </Splide>
      </>
    );
  } else {
    return (
      <>
        <Col className="d-flex justify-content-center mt-4">
          <Alert
            variant="danger"
            className="fw-bold fs-3 text-center text-danger col-xl-6 col-lg-8 col-md-10 col-12"
          >
            {error}
          </Alert>
        </Col>
      </>
    );
  }
}

export default PopularVeganRecipes;
