import React from "react";
import { Container, Card, Col } from "react-bootstrap";
import "../../../../App.css";


function DashboardReportingData({ checkedItems, handleCheckBoxChange }) {
  return (
    <Container className="mb-3">
      <Card as={Col} md="12" className="border-0 whi">
        <Card.Body>
          <Card.Title className="mb-4">Dashboard and Reporting</Card.Title>
          <ul className="focus-on">
            {[
              "Brand Overview",
              "Brand Favorability",
              "Brand Category Dimensions",
              "Brand Reach",
              "Competition",
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

export default DashboardReportingData;
