import React from "react";
import { Form, Col } from "react-bootstrap";

function BrandRadioOptions({ selectedOption, handleRadioSelection }) {
  return (
    <>
      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Brand Overview")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Brand Overview"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Brand Overview"}
        />
      </Form.Group>

      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Brand Favorability")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Brand Favorability"
          className="height1 custom-checkbox mb-3"
          checked={selectedOption === "Brand Favorability"}
        />
      </Form.Group>
      <Form.Group
        as={Col}
        md="4"
        className="cursor-pointer"
        onClick={() => handleRadioSelection("Brand Category Dimensions")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Brand Category Dimensions"
          className="height3 custom-checkbox mb-3"
          checked={selectedOption === "Brand Category Dimensions"}
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
        onClick={() => handleRadioSelection("Dashboard and Reporting")}
      >
        <Form.Check
          type="radio"
          name="firstName"
          label="Dashboard and Reporting"
          className="height3 custom-checkbox mb-3"
          checked={selectedOption === "Dashboard and Reporting"}
        />
      </Form.Group>
    </>
  );
}

export default BrandRadioOptions;
