import React from "react";
import { Container, Card, Col } from "react-bootstrap";
import "../../../../App.css";


function MCategoryDimensions({ checkedItems, handleCheckBoxChange }) {
  return (
    <Container className="mb-3">
      <Card as={Col} md="12" className="border-0 whi">
        <Card.Body>
          <Card.Title className="mb-4">Brand Category Dimensions</Card.Title>

          <ul className="focus-on">
            {["Category", "Dimensions"].map((key) => (
              <li key={key}>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  checked={checkedItems.includes(key)}
                  onChange={() =>
                    handleCheckBoxChange("Dashboard and Reporting", key)
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

export default MCategoryDimensions;
