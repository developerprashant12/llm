import React, { useRef } from "react";
import { Table, Button } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";

function ComparisonReportingComponent() {
  const tableRef = useRef(null);
  const location = useLocation();
  // console.log(location);
  const urlSearchParams = new URLSearchParams(location.search);
  const dataParam = urlSearchParams.get("data");
  const dataItem = dataParam ? JSON.parse(dataParam) : null;
  const checkedItemStoreParam = urlSearchParams.get("checkedItemStore");

  const checkedItemStore = checkedItemStoreParam
    ? checkedItemStoreParam.split(",")
    : [];

  // console.log(checkedItemStore);

  const downloadPDF = () => {
    const input = tableRef.current;

    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
      pdf.save("LLM Report.pdf");
    });
  };

  const tableStyle = {
    border: "1px solid rgb(133 111 111)",
    width: "100%",
    textAlign: "left",
  };
  const thStyle = {
    backgroundColor: "#f2f2f2",
    padding: "16px",
  };
  const tdStyle = {
    border: "1px solid rgb(133, 111, 111) !import",
  };
  const mark = {
    border: "1px solid rgb(120 111 111 / 88%)",
  };
  const buttonData = {
    padding: "5px 15px",
    textAlign: "center",
    margin: "auto",
    backgroundColor: "rgb(97 107 108)",
    color: "white",
  };
  const borderData = {
    borderBottom: "1px solid #8f8080",
    borderTop: "0px",
    borderLeft: "0px",
    borderRight: "0px",
    marginBottom: "40px",
  };
  const reportHeading = {
    paddingLeft: "0px",
    paddingBottom: "0px",
    paddingTop: "16px",
    marginBottom: "0",
  };
  const reportMainHeading = {
    borderBottom: "2px solid #000",
  };
  const extractSections = (content) => {
    const regexPattern = new RegExp(
      `(?<=${checkedItemStore.join("|")}:)(.*?)(?=${checkedItemStore
        .slice(1)
        .join("|")}:|$)`,
      "gs"
    );

    const matches = content.matchAll(regexPattern);

    const sectionsData = checkedItemStore.map(() => {
      const match = matches.next().value;
      const data = match && match[1] ? match[1].trim() : "";
      return data;
    });
    return sectionsData;
  };

  return (
    <div>
      <h1 className="text-center pt-3">
        <span style={reportMainHeading}>LLM Report Data</span>
      </h1>
      <div className="p-4" ref={tableRef}>
        <h4 className="" style={reportHeading}>
          LLM Comparison Report
        </h4>
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr
              style={{
                marginBottom: "10px",
                border: "1px solid rgb(133 111 111)",
              }}
            >
              <th className="text-center" style={thStyle}>
                Title
              </th>

              {Object.keys(dataItem).map((name) => (
                <th className="text-center" key={name} style={thStyle}>
                  {" "}
                  {name === "gpt_4_turbo"
                    ? "GPT4 Turbo"
                    : name === "palm2_text"
                    ? "Palm2"
                    : name === "llama2_70b_chat"
                    ? "Llama2"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {checkedItemStore.map((dataType, index) => (
              <tr key={index}>
                <td style={tdStyle}>{dataType}</td>
                {Object.keys(dataItem).map((source) => {
                  const sectionsData = extractSections(dataItem[source][0]);
                  {
                    /* console.log("sectionsData", sectionsData); */
                  }
                  const data = sectionsData[index] || "";
                  return (
                    <td key={source} style={tdStyle}>
                      {data}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button
        variant="primary"
        className="mt-3 mb-3 d-flex justify-content-center"
        onClick={downloadPDF}
        style={buttonData}
      >
        Download PDF
      </Button>
    </div>
  );
}

export default ComparisonReportingComponent;