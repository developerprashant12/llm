import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import {
  fetchDataFromFirebase,
  deleteDataFromFirebase,
} from "../../DatabaseFirebase/firebaseService";

const LLMDataDisplayComponent = ({ dataItem, copyToClipboard }) => {
  const [dataHistory, setDataHistory] = useState([]);
  const alertShownRef = useRef(false);

  useEffect(() => {
    fetchDataFromFirebase((data) => {
      const arrayOfObjects = Object.entries(data).map(([key, value]) => ({
        key,
        ...value,
      }));
      setDataHistory(arrayOfObjects);
    });
  }, []);

  //--------------------- Match Notification Data ---------------------//
  useEffect(() => {
    if (dataHistory.length > 1) {
      const previousData = dataHistory[dataHistory.length - 2];
      const newData = dataHistory[dataHistory.length - 1];

      const match =
        previousData.item &&
        newData.item &&
        previousData.data &&
        newData.data &&
        previousData.item.item === newData.item.item &&
        previousData.data === newData.data;

      if (!match && !alertShownRef.current) {
        alertShownRef.current = true;

        setTimeout(() => {
          alert("New LLM Data Item Does Not Match Previous LLM Data Item");
        }, 4000);
      }
    }
  }, [dataHistory]);

  //--- Cleanup alert show again ----//
  useEffect(() => {
    return () => {
      alertShownRef.current = false;
    };
  }, []);
  //--- Cleanup alert show again ----//

  //--------------------- Match Notification Data ---------------------//

  // Function to group data by date
  const groupDataByDate = (data) => {
    return data.reduce((acc, entry) => {
      const date = entry.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {});
  };

  // Grouping data by date
  const groupedDataByDate = groupDataByDate(dataHistory);

  const isToday = (date) => {
    const todayDate = new Date();
    const entryDate = new Date(date);
    return (
      entryDate.getDate() === todayDate.getDate() &&
      entryDate.getMonth() === todayDate.getMonth() &&
      entryDate.getFullYear() === todayDate.getFullYear()
    );
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const entryDate = new Date(date);
    return (
      entryDate.getDate() === yesterday.getDate() &&
      entryDate.getMonth() === yesterday.getMonth() &&
      entryDate.getFullYear() === yesterday.getFullYear()
    );
  };

  const getDateDisplay = (date) => {
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return date;
    }
  };

  // Sorting dates in descending order
  const sortedDates = Object.keys(groupedDataByDate).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB - dateA;
  });

  const handleDeleteData = (itemKey) => {
    deleteDataFromFirebase(itemKey, () => {
      setDataHistory((prevData) =>
        prevData.filter((item) => item.key !== itemKey)
      );
    });
  };

  return (
    <Row className="mt-5 mb-4">
      <Col md="8">
        <Card className="border border-secondary-subtle rounded-0">
          <Card.Header className="float-start p-3 bottom">LLMs</Card.Header>
          <Container className="mt-3">
            <Card.Body>
              {Object.keys(dataItem).map((name) => (
                <>
                  <div className="dboxcont" key={name}>
                    <nav className="card-header-actions">
                      <a
                        className="card-header-action"
                        aria-expanded="false"
                        aria-controls="card1"
                        title="Copy"
                        style={{ cursor: "pointer" }}
                        onClick={() => copyToClipboard(dataItem[name][0])}
                      >
                        <i className="fas fa-clipboard"></i>
                      </a>
                    </nav>
                    <span className="brnd">
                      {name === "gpt_4"
                        ? "GPT4"
                        : name === "palm2_text"
                        ? "Palm2"
                        : name === "llama2_70b_chat"
                        ? "LLama2"
                        : ""}
                    </span>
                    {/* <h4 className="card-title">{selectedOption} </h4>*/}
                    <Markdown className="markTable">
                      {dataItem[name][0]}
                    </Markdown>
                  </div>
                  <hr />
                </>
              ))}
            </Card.Body>
          </Container>
        </Card>
      </Col>

      <Col md="4">
        <Card className="border border-secondary-subtle mb-2 rounded-0">
          <Card.Header className="float-start  p-3 bottom">
            LLMs History
          </Card.Header>
          <Container className="mt-3">
            <Card.Body>
              {sortedDates.map((date, dateIndex) => (
                <div key={dateIndex}>
                  <span className="d-block">
                    {getDateDisplay(date)} - {date}
                  </span>
                  {groupedDataByDate[date].map((data, dataIndex) => (
                    <div className="histoblck" key={dataIndex}>
                      <h4 className="card-title2 mt-1">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon-sm"
                          height="15px"
                          width="15px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>{" "}
                        {data.item ? data.item : "Key Prompt Data"}
                      </h4>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteData(data.key)}
                      >
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon-sm"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </span>
                    </div>
                  ))}
                  <hr className="mt-4" />
                </div>
              ))}
            </Card.Body>
          </Container>
        </Card>
      </Col>
    </Row>
  );
};

export default LLMDataDisplayComponent;
