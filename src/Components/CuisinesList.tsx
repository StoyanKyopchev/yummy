import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import "../Components/global.css";

function CuisinesList() {
  return (
    <Col className="d-flex justify-content-center my-3">
      <ListGroup
        as="ul"
        className="flex-row justify-content-center align-items-center col-lg-6 col-12"
      >
        <ListGroup.Item
          as="li"
          className="text-white fw-bold border-0 col-md-2 col-lg-3 col-xl-2 col-3 rounded-circle me-2 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "#0f172a" }}
        >
          <Image
            src={require("../Assets/Images/cuisineImages/french-cuisine.png")}
            alt="Image of a croissant"
            className="w-50"
          />
          French
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="text-white fw-bold border-0 col-md-2 col-lg-3 col-xl-2 col-3 rounded-circle me-2 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "#0f172a" }}
        >
          <Image
            src={require("../Assets/Images/cuisineImages/italian-cuisine.png")}
            alt="Image of a slice of pizza"
            className="w-50"
          />
          Italian
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="text-white fw-bold border-0 col-md-2 col-lg-3 col-xl-2 col-3 rounded-circle me-2 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "#0f172a" }}
        >
          <Image
            src={require("../Assets/Images/cuisineImages/mexican-cuisine.png")}
            alt="Image of a burrito"
            className="w-50"
          />
          Mexican
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="text-white fw-bold border-0 col-md-2 col-lg-3 col-xl-2 col-3 rounded-circle d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "#0f172a" }}
        >
          <Image
            src={require("../Assets/Images/cuisineImages/chinese-cuisine.png")}
            alt="Image of a sushi with chopsticks"
            className="w-50"
          />
          Chinese
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}

export default CuisinesList;
