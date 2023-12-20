import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import SearchBar from "../Components/SearchBar";
import PopularRecipes from "../Components/PopularRecipes";
import PopularVeganRecipes from "../Components/PopularVeganRecipes";
import CuisinesList from "../Components/CuisinesList";
import "../Components/global.css";
import logo from "../Assets/Images/logo.svg";

export default function Home() {
  const currentUser = useContext(AuthContext);

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
            <h3 className="fw-bold text-warning mb-2 ps-3">Popular Choices</h3>
            <PopularRecipes />
            <h3 className="fw-bold text-warning mt-3 mb-2 ps-3">
              Popular Vegan Choices
            </h3>
            <PopularVeganRecipes />
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
