import React from "react";
import { Form, Col } from "react-bootstrap";

function MBrandRadioOptions({ selectedOption, handleRadioSelection }) {
  return (
    <>
      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Brand Overview and Favorability")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Brand Overview and Favorability"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Brand Overview and Favorability"}
        />
      </Form.Group>

      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Category Leadership")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Category Leadership"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Category Leadership"}
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
        onClick={() => handleRadioSelection("Brand Index Score")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Brand Index Score"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Brand Index Score"}
        />
      </Form.Group>
      
      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Hallucinations")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Hallucinations"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Hallucinations"}
        />
      </Form.Group>

      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Sources")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Sources"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Sources"}
        />
      </Form.Group>
    </>
  );
}

export default MBrandRadioOptions;
