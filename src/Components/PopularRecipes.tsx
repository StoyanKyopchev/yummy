import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import "@splidejs/react-splide/css";
import "./global.css";

export interface Recipe {
  id?: number;
  title?: string;
  image?: string;
  summary?: string;
  instructions?: string;
}

function PopularRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<null | string>(null);

  const getPopularRecipes = async () => {
    try {
      setError("");
      const storedRecipes = sessionStorage.getItem("recipes");

      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      } else {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=12`
        );
        if (!response.ok) {
          throw new Error(`Received a bad response: ${response.status}`, {
            cause: response.status,
          });
        }
        const recipesData = await response.json();
        sessionStorage.setItem("recipes", JSON.stringify(recipesData.recipes));
        setRecipes(recipesData.recipes);
      }
    } catch (error) {
      if (error instanceof Error) {
        switch (error.cause) {
          case 402:
            setError(
              "Our popular recipes couldn't be displayed as it looks like you have reached the daily limit for recipe searches. Please try again tomorrow. ⛔"
            );
            console.log(error.message);
            break;
          case 404:
            setError(
              "Popular recipes were not found, please try reloading the page. ⛔"
            );
            console.log(error.message);
            break;
          case 500:
            setError(
              "The server encountered an error and could not display our popular recipes, please try reloading the page. ⛔"
            );
            console.log(error.message);
            break;
          default:
            setError(
              "An error occurred while loading our popular recipes, please try reloading the page.⛔"
            );
            console.log(error.message);
        }
      }
    }
  };

  useEffect(() => {
    getPopularRecipes();
  }, []);

  if (recipes && error === "") {
    return (
      <>
        <Splide
          aria-label="Popular Recipes"
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
          {recipes.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
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

export default PopularRecipes;
