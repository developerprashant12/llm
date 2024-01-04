import React from "react";
import { Form, Col } from "react-bootstrap";

function MProductRadioOptions({
  promptData,
  setPromptData,
  selectedOption,
  handleRadioSelection,
}) {
  return (
    <>

     <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Product Attributes")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Product Attributes"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Product Attributes"}
        />
      </Form.Group>

      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Campaign Messages")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Campaign Messages"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Campaign Messages"}
        />
      </Form.Group>

      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Category Dimensions")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Category Dimensions"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Category Dimensions"}
        />
      </Form.Group>

  

      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Frequency")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Frequency"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Frequency"}
        />
      </Form.Group>
      
    </>
  );
}

export default MProductRadioOptions;
