import React, { useState, useEffect, useRef } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Row, Col, Card, Container } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import {
  fetchDataFromFirebase,
  deleteDataFromFirebase,
} from "../../DatabaseFirebase/firebaseService";
import { diff_match_patch } from "diff-match-patch";

const LLMDataDisplayComponent = ({
  dataItem,
  copyToClipboard,
  selectedOptionFirstShow,
}) => {
  const [dataHistory, setDataHistory] = useState([]);
  const [dataHistory1, setDataHistory1] = useState([]);
  const alertShownRef = useRef(false);
  const [editedData, setEditedData] = useState(null);
  const [summary, setSummary] = useState("");
  // console.log("object", JSON.stringify(dataItem));

  //--------------------- Match Notification Data ---------------------//

  useEffect(() => {
    fetchDataFromFirebase((data) => {
      const arrayOfObjects = Object.entries(data).map(([key, value]) => ({
        key,
        ...value,
      }));
      setDataHistory1(arrayOfObjects);
    });
  }, []);

  //   useEffect(() => {
  //     if(selectedOptionFirstShow === "Monitoring" && dataItem != undefined){
  //       fetchDataFromFirebase((data) => {
  //         const arrayOfObjects = Object.entries(data).map(([key, value]) => ({
  //           key,
  //           ...value,
  //         }));

  //       const last10Items = arrayOfObjects.slice(-10);
  //       //  localStorage.setItem("last10data",last10Items)
  //       setDataHistory1(last10Items);
  //       });
  //     }
  // }, []);

  useEffect(() => {
    if (selectedOptionFirstShow === "Monitoring" && dataItem != undefined) {
      const test = [];
      const test1 = [];
      const test2 = [];
 
      console.log("sdsdsadasddasdas",dataItem.palm2_text);


      // dataItem.forEach((item, index) => {
      //   const data = JSON.parse(item.data);

      if (
        dataItem.palm2_text &&
        Array.isArray(dataItem.palm2_text) &&
        dataItem.palm2_text.length > 0
      ) {
        test.push(dataItem.palm2_text[0]);
      }

      if (
        dataItem.gpt_4_turbo &&
        Array.isArray(dataItem.gpt_4_turbo) &&
        dataItem.gpt_4_turbo.length > 0
      ) {
        test1.push(dataItem.gpt_4_turbo[0]);
      }

      if (
        dataItem.llama2_70b_chat &&
        Array.isArray(dataItem.llama2_70b_chat) &&
        dataItem.llama2_70b_chat.length > 0
      ) {
        test2.push(dataItem.llama2_70b_chat[0]);
      }

      //  });

      const allValues = test.concat(test1, test2).join("\n\n");

      const payloadData = {
        input_prompt:
          "Please make me a short summary of this data in which all the information of my data should be included in that summary. :- " +
          " " +
          allValues,
        selected_models: ["gpt_4_turbo"],
        avoid_repetition: false,
        num_outputs: 1,
        quality: 1,
        sampling_temperature: 0.7,
        variables: null,
      };

      fetch("https://api.gooey.ai/v2/CompareLLM/", {
        method: "POST",
        headers: {
          Authorization:
          "Bearer sk-kvVveaIyhhqXcHIML6D4bxDk94gQbIJ6oh5xQ0wqxsASIsHT",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadData),
      })
        .then((response) => response.json())
        .then((data) => {
          const sumarisedDataItem = data.output.output_text.gpt_4_turbo;
          console.log("summary1", sumarisedDataItem);
          setSummary(sumarisedDataItem);
        });
    }
  }, [dataItem]);

  useEffect(() => {
    if (
      dataHistory1.length > 1 &&
      selectedOptionFirstShow === "Monitoring" &&
      dataItem != undefined
    ) {
      const test = [];
      const test1 = [];
      const test2 = [];

      dataHistory1.forEach((item, index) => {
        const data = JSON.parse(item.data);

        if (
          data.palm2_text &&
          Array.isArray(data.palm2_text) &&
          data.palm2_text.length > 0
        ) {
          test.push(data.palm2_text[0]);
        }

        if (
          data.gpt_4_turbo &&
          Array.isArray(data.gpt_4_turbo) &&
          data.gpt_4_turbo.length > 0
        ) {
          test1.push(data.gpt_4_turbo[0]);
        }

        if (
          data.llama2_70b_chat &&
          Array.isArray(data.llama2_70b_chat) &&
          data.llama2_70b_chat.length > 0
        ) {
          test2.push(data.llama2_70b_chat[0]);
        }
      });

      const allValues = test.concat(test1, test2).join("\n\n");

      const payloadData = {
        input_prompt:
          "Please make me a short summary of this data in which all the information of my data should be included in that summary. :- " +
          " " +
          allValues,
        selected_models: ["gpt_4_turbo"],
        avoid_repetition: false,
        num_outputs: 1,
        quality: 1,
        sampling_temperature: 0.7,
        variables: null,
      };

      fetch("https://api.gooey.ai/v2/CompareLLM/", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer sk-kvVveaIyhhqXcHIML6D4bxDk94gQbIJ6oh5xQ0wqxsASIsHT",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadData),
      })
        .then((response) => response.json())
        .then((data) => {
          //------- Summarize Data Section--------//
          const sumarisedDataItem = data.output.output_text.gpt_4_turbo;
          console.log("summary2", sumarisedDataItem);
          const firstDataString =
            typeof sumarisedDataItem === "object"
              ? JSON.stringify(sumarisedDataItem)
              : sumarisedDataItem;
          const SecondDataString =
            typeof dataItem === "object" ? JSON.stringify(summary) : summary;
          
            const payloadData = {
              input_prompt:
                "Please take out a difference of both these data and Give me the response in the Paragraph. :- " +
                " " +
                firstDataString + " " + "vs" + " " + SecondDataString,
              selected_models: ["gpt_4_turbo"],
              avoid_repetition: false,
              num_outputs: 1,
              quality: 1,
              sampling_temperature: 0.7,
              variables: null,
            };
      
            fetch("https://api.gooey.ai/v2/CompareLLM/", {
              method: "POST",
              headers: {
                Authorization:
                  "Bearer sk-kvVveaIyhhqXcHIML6D4bxDk94gQbIJ6oh5xQ0wqxsASIsHT",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payloadData),
            })
              .then((response) => response.json())
              .then((data)=>{
                  const Differences = data.output.output_text.gpt_4_turbo;
                  if (Differences) {
                    alert(Differences);
                  }
                  console.log("Differences :- ",Differences);
              })

          
          //------- Summarize Data Section--------//
        });
    }
  }, [dataHistory1]);

  // useEffect(() => {
  //   const storedDataString = localStorage.getItem("last10data");
  //   if (storedDataString) {
  //     try {
  //       const storedData = JSON.parse(storedDataString);

  //       if (selectedOptionFirstShow === "Monitoring" && dataItem != null) {
  //         fetchDataFromFirebase((data) => {
  //           const arrayOfObjects = Object.entries(data).map(([key, value]) => ({
  //             key,
  //             ...value,
  //           }));

  //           const last10Items = arrayOfObjects.slice(-10);

  //           const isDataMatch = storedData.every((storedItem, index) => storedItem.key === last10Items[index].key);

  //           if (!isDataMatch) {
  //             setDifferences(true);
  //             const initialDataString = JSON.stringify(last10Items);
  //             localStorage.setItem("last10data", initialDataString);

  //             setDataHistory(last10Items);
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error parsing storedDataString:", error);
  //     }
  //   } else {
  //     if (selectedOptionFirstShow === "Monitoring" && dataItem != null) {
  //       fetchDataFromFirebase((data) => {
  //         const arrayOfObjects = Object.entries(data).map(([key, value]) => ({
  //           key,
  //           ...value,
  //         }));
  //         const last10Items = arrayOfObjects.slice(-10);

  //         const initialDataString = JSON.stringify(last10Items);
  //         localStorage.setItem("last10data", initialDataString);

  //         setDataHistory(last10Items);
  //       });
  //     }
  //   }
  // }, [selectedOptionFirstShow, dataItem]);

  //--- Cleanup alert show again ----//
  useEffect(() => {
    return () => {
      alertShownRef.current = false;
    };
  }, []);
  //--- Cleanup alert show again ----//

  //--------------------- Match Notification Data ---------------------//
  const handleEditData = (data) => {
    setEditedData(JSON.parse(data));
  };

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

  //---------------- Grouping data by date ----------------//
  const groupedDataByDate = groupDataByDate(dataHistory1);

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
      return "Previous";
    }
  };

  //-------------- Sorting dates in descending order ----------------//
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
      {/*----------------- Display Section --------------------*/}
      <Col md="8">
        <Card className="border border-secondary-subtle rounded-0">
          <Card.Header className="float-start p-3 bottom">LLMs</Card.Header>
          <Container className="mt-3">
            <Card.Body>
              {editedData ? (
                <>
                  {Object.keys(editedData).map((name) => (
                    <>
                      <div className="dboxcont" key={name}>
                        <nav className="card-header-actions">
                          <a
                            className="card-header-action"
                            aria-expanded="false"
                            aria-controls="card1"
                            title="Copy"
                            style={{ cursor: "pointer" }}
                            onClick={() => copyToClipboard(editedData[name][0])}
                          >
                            <i className="fas fa-clipboard"></i>
                          </a>
                        </nav>
                        <span className="brnd">
                          {name === "gpt_4_turbo"
                            ? "GPT4 Turbo"
                            : name === "palm2_text"
                            ? "Palm2"
                            : name === "llama2_70b_chat"
                            ? "Llama2"
                            : ""}
                        </span>
                        {/* <h4 className="card-title">{selectedOption} </h4>*/}
                        <Markdown className="markTable">
                          {editedData[name][0]}
                        </Markdown>
                      </div>
                      <hr />
                    </>
                  ))}
                </>
              ) : (
                <>
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
                          {name === "gpt_4_turbo"
                            ? "GPT4 Turbo"
                            : name === "palm2_text"
                            ? "Palm2"
                            : name === "llama2_70b_chat"
                            ? "Llama2"
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
                </>
              )}
            </Card.Body>
          </Container>
        </Card>
      </Col>
      {/*----------------- Display Section --------------------*/}

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
                      <span style={{ cursor: "pointer" }}>
                        {/*------------- Edit Name -------------*/}
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="icon-sm"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => handleEditData(data.data)}
                        >
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                        {/*------------- Edit Name -------------*/}
                        &nbsp; &nbsp;
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
                          onClick={() => handleDeleteData(data.key)}
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
      <NotificationContainer />
    </Row>
  );
};

export default LLMDataDisplayComponent;
