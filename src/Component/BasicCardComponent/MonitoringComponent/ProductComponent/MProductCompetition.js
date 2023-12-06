import React from "react";
import { Container, Card, Col } from "react-bootstrap";
import "../../../../App.css";


function MProductCompetition({
  showCheckBoxData,
  competitors,
  checkedItems,
  handleCheckBoxData,
  handleCompetitorChange,
  handleCheckBoxChange,
}) {
  return (
    <Container className="mb-4">
      <Card as={Col} md="12" className="border-0 whi">
        <Card.Body>
          <Card.Title className="">Competition</Card.Title>
          <ul className="focus-on mt-4">
            <li className="mb-3">
              <input
                type="checkbox"
                name=""
                value=""
                onChange={handleCheckBoxData}
              />{" "}
              Input Competitors (up to 3)
            </li>

            {showCheckBoxData ? (
              <div className="compitorsbox productcompit">
                {[0, 1, 2].map((index) => (
                  <span className="d-flex" key={index}>
                    <input
                      type="text"
                      name="coupon_field"
                      placeholder={`Competitor ${index + 1}`}
                      value={competitors[index]}
                      onChange={(e) => handleCompetitorChange(index, e)}
                    />
                  </span>
                ))}
              </div>
            ) : (
              ""
            )}

            <li>What Dimensions Would You Like to Focus On?</li>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: "18px",
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  padding: "0 20px",
                }}
              >
                {[
                  "Product Description",
                  "Top 5 Positive and Negative Attributes",
                  "Top Positive and Negative Facts",
                ].map((key) => (
                  <li key={key}>
                    <input
                      type="checkbox"
                      name=""
                      value=""
                      checked={checkedItems.includes(key)}
                      onChange={() =>
                        handleCheckBoxChange(
                          "Product Representation Competition",
                          key
                        )
                      }
                    />{" "}
                    {key}
                  </li>
                ))}
              </ul>
            </ul>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MProductCompetition;
