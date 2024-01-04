import React, { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  checkedItemStore
}) {
  const tableRef = useRef(null);
  const navigate = useNavigate();

  // console.log("checkedItemStore",checkedItemStore);
  // console.log("dataItem",dataItem);


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
    const baseRoute = key === "LLM Comparison Report" ? "/llmreportdata" : "/reportdata";
  
    if (key === "LLM Comparison Report" && showGetData === true) {
      const url = `${baseRoute}?data=${encodeURIComponent(JSON.stringify(dataItem))}&checkedItemStore=${encodeURIComponent(checkedItemStore)}`;
      window.open(url, "_blank");
    } else if (key === "LLM Comparison Report" && showGetData !== true) {
      toast.warning('LLM Comparison Report is not Available - First you launch and hit the API. Then wait, after the data arrives, your report will become available.');
    }
  
    if (key === "LLM Competitor Report" && showGetData === true) {
      const url = `${baseRoute}?data=${encodeURIComponent(JSON.stringify(dataItem))}`;
      window.open(url, "_blank");
    } else if (key === "LLM Competitor Report" && showGetData !== true) {
      toast.warning('LLM Competitor Report is not Available - First you launch and hit the API. Then wait, after the data arrives, your report will become available.');
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
      <ToastContainer  />
    </Container>
  );
}

export default ReportingComponent;
