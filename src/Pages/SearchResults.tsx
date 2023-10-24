import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Recipe } from "../Components/PopularRecipes";
import SearchBar from "../Components/SearchBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import "../Components/global.css";

function SearchResults() {
  const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>([]);
  let params = useParams();

  const getSearchedRecipes = async (ingredients: string | undefined) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&ingredients=${ingredients}&number=12`
    );
    const recipeData = await response.json();
    setSearchedRecipes(recipeData);
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SearchResults;
