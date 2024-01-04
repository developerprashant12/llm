import React from "react";
import { Form, Col, Row, Dropdown, Button, Spinner } from "react-bootstrap";

const LLMSelectionComponent = ({
  selectedCount,
  selectedItems,
  selectAll,
  options,
  showData,
  handleSelectAllChange,
  handleCheckChange,
  handleClickShow,
  handleClickReset,
  selectedOption,
  selectedOptionFirstShow
}) => (
  <Form.Group as={Col} md="12">
    <Row>
      <Col md="4">
        <Dropdown className="dropdownllms">
          <Dropdown.Toggle variant="default" id="dropdown-basic">
            <span className="dropdown-text lucnhbtn">
              {selectedCount ? (
                <>
                  {" "}
                  ({selectedCount})<span>Selected </span>{" "}
                </>
              ) : (
                <>
                  Select LLM<span>s</span>
                </>
              )}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{
              width: "103%",
              marginTop: "0px",
              marginLeft: "-13px",
              borderRadius: "4px",
            }}
          >
            <Form.Check
              type="checkbox"
              label="Select All"
              className="mb-2 text-xxl data"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
            <Dropdown.Divider />

            {options.map((option, index) => (
              <Form.Check
                key={option.name}
                type="checkbox"
                label={option.name}
                className={`mb-2 ${
                  index >= options.length - 3 ? "gray-checkbox" : ""
                } customData`}
                checked={selectedItems[option.value] || false}
                onChange={(event) =>
                  index < options.length - 3 &&
                  handleCheckChange(option.value, event.target.checked)
                }
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col md="2">
        <Button
          type="button"
          name="firstName"
          placeholder="Your Brand/Product"
          className="height2 mb-3"
          style={{
            width: "-webkit-fill-available",
            backgroundColor: "#3dc863",
            color: "white",
          }}
          onClick={handleClickShow}
          disabled={showData || selectedOption === "Dashboard and Reporting"}
        >
          {showData ? (
            <div style={{ fontSize: "19px" }}>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Please Wait...
            </div>
          ) : (
            <div>LAUNCH</div>
          )}
        </Button>
      </Col>

      <Col md="2">
        <Button
          type="button"
          name="firstName"
          placeholder="Your Brand/Product"
          className="height2 mb-3"
          style={{
            width: "-webkit-fill-available",
            backgroundColor: "#3dc863",
            color: "white",
          }}
          onClick={handleClickReset}
          disabled={showData || selectedOption === "Dashboard and Reporting"}
        >
          RESET
        </Button>
      </Col>
    </Row>

  </Form.Group>
);

export default LLMSelectionComponent;
