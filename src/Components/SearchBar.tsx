import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SearchBar() {
  return (
    <Form>
      <Row className="justify-content-center my-3 flex-column flex-md-row">
        <Col className="col-md-4 col-xl-3 px-md-0">
          <Form.Control
            type="text"
            placeholder="Enter your ingredients"
            className=" mr-sm-2"
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
