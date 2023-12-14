import React from "react";
import { Container, Card, Col, Form } from "react-bootstrap";
import "../../../../App.css";


function PReachComponent({
  promptBrandReach,
  checkedItems,
  handlePromptBrandReachChange,
  handleCheckBoxChange,
}) {
  return (
    <Container className="mb-3">
      <Card as={Col} md="12" className="border-0 whi">
        <Card.Body>
          <Card.Title className="">Product Reach</Card.Title>
          <Card.Text>
            <ul className="focus-on mt-4">
              <li>
                <Form.Group as={Col} md="5">
                  <Form.Control
                    as="textarea"
                    rows={1}
                    cols={2}
                    placeholder="Enter Product Category"
                    name="promptBrandReach"
                    value={promptBrandReach}
                    onChange={handlePromptBrandReachChange}
                    className="big1"
                  />
                </Form.Group>
              </li>
            </ul>
          </Card.Text>
          <ul className="focus-on">
            {[
              "Top 5 Products in category",
              "Best Products in category",
              "Sources"
            ].map((key) => (
              <li key={key}>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  checked={checkedItems.includes(key)}
                  onChange={() => handleCheckBoxChange("Product Reach", key)}
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

export default PReachComponent;
