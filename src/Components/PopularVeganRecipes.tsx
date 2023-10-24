import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Recipe } from "./PopularRecipes";
import Card from "react-bootstrap/Card";
import "@splidejs/react-splide/css";

function PopularVeganRecipes() {
  const [veganRecipes, setVeganRecipes] = useState<Recipe[]>([]);

  const getPopularVeganRecipes = async () => {
    const storedVeganRecipes = sessionStorage.getItem("veganRecipes");

    if (storedVeganRecipes) {
      setVeganRecipes(JSON.parse(storedVeganRecipes));
    } else {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=12&tags=vegan`
      );
      const recipesData = await response.json();
      sessionStorage.setItem(
        "veganRecipes",
        JSON.stringify(recipesData.recipes)
      );
      setVeganRecipes(recipesData.recipes);
    }
  };

  useEffect(() => {
    getPopularVeganRecipes();
  }, []);

  return (
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
        },
        gap: "3rem",
        pagination: false,
        drag: "free",
        arrows: false,
      }}
    >
      {veganRecipes.map((recipe) => {
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
          </SplideSlide>
        );
      })}
    </Splide>
  );
}

export default PopularVeganRecipes;
