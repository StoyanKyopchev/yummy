import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import SearchBar from "../Components/SearchBar";
import PopularRecipes from "../Components/PopularRecipes";
import PopularVeganRecipes from "../Components/PopularVeganRecipes";
import CuisinesList from "../Components/CuisinesList";
import "../Components/global.css";
import logo from "../Assets/Images/logo.svg";

export default function Home() {
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
        <Row className="minh-75 w-100 rounded justify-content-center">
          <Col className="bottomPartContainer col-md-9 pt-4">
            <h1 className="text-center text-warning fw-bold">
              Find recipes with the ingredients that you have{" "}
            </h1>
            <SearchBar />
            <CuisinesList />
            <h3 className="fw-bold text-warning mb-2">Popular Choices</h3>
            <PopularRecipes />
            <h3 className="fw-bold text-warning mt-3 mb-2">
              Popular Vegan Choices
            </h3>
            <PopularVeganRecipes />
          </Col>
        </Row>
      </Container>
    </>
  );
}
