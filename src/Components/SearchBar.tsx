import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SearchBar() {
  const [ingredients, setIngredients] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (ingredients === "") return;
    navigate("/search-results/" + ingredients);
  }

  return (
    <Form onSubmit={handleSubmit} className="px-3">
      <Row className="justify-content-center my-3 flex-column flex-md-row">
        <Col className="col-md-5 col-lg-4 col-xl-3 px-md-0">
          <Form.Control
            type="text"
            placeholder="Enter your ingredients"
            className=" mr-sm-2"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </Col>
        <Col className="col-md-2 col-xl-1 col-12 px-md-0 mt-md-0 mt-2">
          <Button type="submit" className="w-100">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;
