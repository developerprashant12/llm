import React from "react";
import { Form, Col } from "react-bootstrap";

function ProductRadioOptions({
  promptData,
  setPromptData,
  selectedOption,
  handleRadioSelection,
}) {
  return (
    <>
      <Form.Group as={Col} md="4">
        <Form.Control
          type="text"
          name="firstName"
          placeholder="Product (input)"
          className="height0 custom-placeholder mb-3"
          value={promptData}
          onChange={(e) => setPromptData(e.target.value)}
        />
      </Form.Group>

      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Product Representation")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Product Representation"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Product Representation"}
        />
      </Form.Group>

      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Dashboard and Reporting")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Dashboard and Reporting"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Dashboard and Reporting"}
        />
      </Form.Group>

      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Product Reach")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Product Reach"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Product Reach"}
        />
      </Form.Group>
      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Competition")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Competition"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Competition"}
        />
      </Form.Group>

      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Product Favorability")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Product Favorability"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Product Favorability"}
        />
      </Form.Group>
    </>
  );
}

export default ProductRadioOptions;
