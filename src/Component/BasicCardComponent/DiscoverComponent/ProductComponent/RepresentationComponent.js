import React from "react";
import { Container, Card, Col } from "react-bootstrap";
import "../../../../App.css";


function RepresentationComponent({ checkedItems, handleCheckBoxChange }) {
  return (
    <Container className="mb-3">
      <Card as={Col} md="12" className="border-0 whi">
        <Card.Body>
          <Card.Title className="">Product Representation</Card.Title>
          <Card.Text className="mt-4">
            What dimensions do you want to focus on (choose all that apply)
          </Card.Text>
          <ul className="focus-on">
            {["Product Description", "Product Attributes", "Sources"].map(
              (key) => (
                <li key={key}>
                  <input
                    type="checkbox"
                    name=""
                    value=""
                    checked={checkedItems.includes(key)}
                    onChange={() =>
                      handleCheckBoxChange("Product Representation", key)
                    }
                  />{" "}
                  {key}
                </li>
              )
            )}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RepresentationComponent;
