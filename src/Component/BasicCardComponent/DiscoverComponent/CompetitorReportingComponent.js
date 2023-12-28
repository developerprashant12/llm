import React, { useRef } from "react";
import { Table, Button } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";

function CompetitorReportingComponent() {
  const location = useLocation();
  const dataItem = location.state && location.state.data;
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
    <div>
      <div className="p-4" ref={tableRef}>
        <Table bordered responsive style={tableStyle} className="mt-3">
          <thead>
            <h4 className="p-3">LLM Competitor Report</h4>
            <tr>
              {/* <th style={thStyle}>Heading</th> */}
              {Object.keys(dataItem).map((name) => (
                <th className="text-center" key={name} style={thStyle}>
                  {" "}
                  {name === "gpt_4_turbo"
                    ? "GPT4 Turbo"
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
                  <Markdown className="markTable p-3" style={mark}>
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
    </div>
  );
}

export default CompetitorReportingComponent;
