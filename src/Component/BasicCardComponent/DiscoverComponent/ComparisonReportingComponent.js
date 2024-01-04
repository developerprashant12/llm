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
    width: "500px",
  };
  const tdStyle1 = {
    border: "1px solid rgb(133, 111, 111) !import",
    width: "230px",
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
    // Escape special characters in checkedItemStore
    const escapedCheckedItemStore = checkedItemStore.map((item) =>
      item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
  

    console.log("escapedCheckedItemStore",escapedCheckedItemStore)
    // Adjusted regex pattern to include special characters within lookbehind and lookahead
    const regexPattern = new RegExp(
      `(?<=${escapedCheckedItemStore.join("|")}:)(.*?)(?=${escapedCheckedItemStore
        .slice(1)
        .join("|")}:|$)`,
      "gs"
    );

    console.log("regexPattern",regexPattern)
  
    const matches = content.matchAll(regexPattern);

    console.log("matches",matches)

  
    const sectionsData = checkedItemStore.map(() => {
      const match = matches.next().value;
      const data = match && match[1] ? match[1].trim().replace(/:/g, '') : "";
      return data;
    });
    return sectionsData;
  };
  
  console.log(dataItem)

  return (
    <div>
      <h1 className="text-center pt-3">
        <span style={reportMainHeading}>LLM Report Data</span>
      </h1>
      <div className="p-4" ref={tableRef}>
        <h4 className="" style={reportHeading}>
          LLM Comparison Report
        </h4>
        <Table striped bordered hover responsive className="mt-1">
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
                <td style={tdStyle1}>{dataType}</td>
                {Object.keys(dataItem).map((source) => {
                  const sectionsData = extractSections(dataItem[source][0]);
                  const data = sectionsData[index] || "";
                  return (
                    <td key={source} style={tdStyle}>
                     <Markdown className="markTable">
                    {data}
                    </Markdown>
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
