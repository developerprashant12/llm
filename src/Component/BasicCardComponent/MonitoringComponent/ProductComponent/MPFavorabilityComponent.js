import React from "react";
import { Container, Card, Col } from "react-bootstrap";
import "../../../../App.css";


function MPFavorabilityComponent({ checkedItems, handleCheckBoxChange }) {
  return (
    <Container className="mb-3">
      <Card as={Col} md="12" className="border-0 whi">
        <Card.Body>
          <Card.Title>Product Favorability</Card.Title>
          <Card.Text className="mt-4">
            What dimensions do you want to focus on (choose all that apply)
          </Card.Text>
          <ul className="focus-on">
            {[
              "Top 5 Positive and Negative Attributes",
              "Competitor Comparison",
              "Sources",
            ].map((key) => (
              <li key={key}>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  checked={checkedItems.includes(key)}
                  onChange={() =>
                    handleCheckBoxChange("Product Favorability", key)
                  }
                />{" "}
                {key}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MPFavorabilityComponent;
