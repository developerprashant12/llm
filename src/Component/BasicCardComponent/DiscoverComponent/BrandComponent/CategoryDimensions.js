import React from "react";
import { Container, Card, Col,Form } from "react-bootstrap";
import "../../../../App.css";


function CategoryDimensions({
  checkedItems,
  handleCheckBoxChange,
  handlePromptBrandReachChange1,
  promptBrandReach1,
}) {


  
  return (
    <Container className="mb-3">
      <Card as={Col} md="12" className="border-0 whi">
        <Card.Body>
          <Card.Title className="mb-4">Brand Category Dimensions</Card.Title>
          <Card.Text>
            <ul className="focus-on mt-4">
              <li>
                <Form.Group as={Col} md="5">
                  <Form.Control
                    as="textarea"
                    rows={1}
                    cols={2}
                    placeholder="Enter Brand Category vs. Enter Brand Category Dimensions"
                    name="promptBrandReach"
                    value={promptBrandReach1}
                    onChange={handlePromptBrandReachChange1}
                    className="big1"
                    style={{ height: "70px", width: "28rem" }}
                  />
                </Form.Group>
              </li>
            </ul>
          </Card.Text>
          <ul className="focus-on">
            {[
              "Frequently recommended buying criteria/considerations",
              "Sources",
            ].map((key) => (
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

export default CategoryDimensions;
