import React,{useRef} from "react";
import { Container, Card, Col, Table,Button } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../../../App.css";

function ReportingComponent({
  checkedItemsReport,
  handleCheckBoxChangeReport,
  showGetData,
  dataItem,
}) {
   const tableRef = useRef(null);


   const downloadPDF = () => {
     const input = tableRef.current;

     html2canvas(input).then((canvas) => {
       const pdf = new jsPDF("p", "mm", "a4");
       pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
       pdf.save("LLM Report.pdf");
     });
   };

   const tableStyle = {
     border: "1px solid #ccc",
     width: "100%",
     textAlign: "left",
   };

   const thStyle = {
     backgroundColor: "#f2f2f2",
     padding: "8px",
   };

   

   const mark = {
     border: "1px solid rgb(225 225 225 / 88%)",
   };

   const buttonData = {
     padding: "5px 15px",
     textAlign: "center",
     margin: "auto",
     backgroundColor: "#eceff0",
   };


  return (
    <Container className="mb-3">
      <Card as={Col} md="12" className="border-0 whi">
        <Card.Body>
          <Card.Title className="mb-4">Dashboard and Reporting</Card.Title>
          <ul className="focus-on">
            {["LLM Comparison Report", "LLM Competitor Report"].map((key) => (
              <li key={key}>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  checked={checkedItemsReport.includes(key)}
                  onChange={() =>
                    handleCheckBoxChangeReport("Dashboard and Reporting", key)
                  }
                />{" "}
                {key}
                <br />
                {/*----------------- First Section Comparison Data ---------------------*/}
                {checkedItemsReport.includes("LLM Comparison Report") &&
                  key === "LLM Comparison Report" && (
                    <>
                      {showGetData ? (
                        <div className="p-4" ref={tableRef}>
                          <Table
                            bordered
                            responsive
                            style={tableStyle}
                            className="mt-3"
                          >
                            <thead>
                              <h4 className="p-3">LLM Comparison Report</h4>
                              <tr>
                                {/* <th style={thStyle}>Heading</th> */}
                                {Object.keys(dataItem).map((name) => (
                                  <th
                                    className="text-center"
                                    key={name}
                                    style={thStyle}
                                  >
                                    {" "}
                                    {name === "gpt_4"
                                      ? "GPT4"
                                      : name === "palm2_text"
                                      ? "Palm2"
                                      : name === "llama2_70b_chat"
                                      ? "LLama2"
                                      : ""}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {/* <td
                                  style={{
                                    padding: "8px",
                                    backgroundColor: "white",
                                  }}
                                >
                                  <div style={mark} className="p-3">
                                    Brand Description
                                  </div>
                                </td> */}
                                {Object.keys(dataItem).map((name) => (
                                  <td
                                    key={name}
                                    style={{
                                      padding: "8px",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <Markdown
                                      className="markTable p-3"
                                      style={mark}
                                    >
                                      {dataItem[name][0]}
                                    </Markdown>
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          </Table>
                          <Button
                            variant="primary"
                            className="mt-3 mb-3 d-flex justify-content-center"
                            onClick={downloadPDF}
                            style={buttonData}
                          >
                            Download PDF
                          </Button>
                        </div>
                      ) : (
                        <div className="p-3">Report is not Available</div>
                      )}
                    </>
                  )}
                {/*----------------- First Section Comparison Data ---------------------*/}
                {/*----------------- Second Section Competitor Data ---------------------*/}
                {checkedItemsReport.includes("LLM Competitor Report") &&
                  key === "LLM Competitor Report" && (
                    <>
                      {showGetData ? (
                        <div className="p-4" ref={tableRef}>
                          <Table
                            bordered
                            responsive
                            style={tableStyle}
                            className="mt-3"
                          >
                            <thead>
                              <h4 className="p-3">LLM Competition Report</h4>
                              <tr>
                                {Object.keys(dataItem).map((name) => (
                                  <th
                                    className="text-center"
                                    key={name}
                                    style={thStyle}
                                  >
                                    {" "}
                                    {name === "gpt_4"
                                      ? "GPT4"
                                      : name === "palm2_text"
                                      ? "Palm2"
                                      : name === "llama2_70b_chat"
                                      ? "LLama2"
                                      : ""}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {Object.keys(dataItem).map((name) => (
                                  <td
                                    key={name}
                                    style={{
                                      padding: "8px",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <Markdown
                                      className="markTable p-3"
                                      style={mark}
                                    >
                                      {dataItem[name][0]}
                                    </Markdown>
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          </Table>
                          <Button
                            variant="primary"
                            className="mt-3 mb-3 d-flex justify-content-center"
                            onClick={downloadPDF}
                            style={buttonData}
                          >
                            Download PDF
                          </Button>
                        </div>
                      ) : (
                        <div className="p-3">Report is not Available</div>
                      )}
                    </>
                  )}
                {/*----------------- Second Section Comparison Data ---------------------*/}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ReportingComponent;
