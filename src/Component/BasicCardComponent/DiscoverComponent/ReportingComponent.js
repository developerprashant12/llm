import React, { useRef } from "react";
import { Container, Card, Col, Table, Button } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../../../App.css";
import { useNavigate } from "react-router";

function ReportingComponent({
  checkedItemsReport,
  handleCheckBoxChangeReport,
  showGetData,
  dataItem,
}) {
  const tableRef = useRef(null);
  const navigate = useNavigate();

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

  const redirect = (key) => {
    if (key === "LLM Comparison Report" && showGetData === true) {
      navigate("/llmreportdata", { state: { data: dataItem } });
    } else if (key === "LLM Comparison Report" && showGetData !== true) {
      alert("LLM Comparison Report is not Available");
    }

    if (key === "LLM Competitor Report" && showGetData === true) {
      navigate("/reportdata", { state: { data: dataItem } });
    } else if (key === "LLM Competitor Report" && showGetData !== true) {
      alert("LLM Competitor Report is not Available");
    }
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
                  onChange={() =>{
                    handleCheckBoxChangeReport("Dashboard and Reporting", key)
                    redirect(key);
                  }}
                  
                />{" "}
                {key}
                <br />
               
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ReportingComponent;
