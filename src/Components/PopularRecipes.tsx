import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Card from "react-bootstrap/Card";
import "@splidejs/react-splide/css";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

function PopularRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getPopularRecipes = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=12`
    );
    const recipesData = await response.json();
    setRecipes(recipesData.recipes);
  };

  useEffect(() => {
    getPopularRecipes();
  }, []);

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
          },
          gap: "3rem",
          pagination: false,
          drag: "free",
          arrows: false,
        }}
      >
        {recipes.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
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
                      "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
                  }}
                ></div>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </>
  );
}

export default PopularRecipes;
