import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Recipe } from "../Components/PopularRecipes";
import parse from "html-react-parser";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "../Components/global.css";

export interface Ingredients {
  id: number;
  original: string;
}

function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState<Recipe>({});
  const [activeSection, setActiveSection] = useState("ingredients");
  const [recipeIngredients, setRecipeIngredients] = useState<Ingredients[]>([]);
  let params = useParams();

  const getRecipeDetails = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&includeNutrition=false`
    );
    const recipeData = await response.json();
    setRecipeDetails(recipeData);
    setRecipeIngredients(recipeData.extendedIngredients);
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
          <Col className="bottomPartContainer col-md-9 pt-4 d-flex flex-md-row flex-column">
            <Col className="text-white">
              <Button>&#8678; Back</Button>
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RecipeDetails;
