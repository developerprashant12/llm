import React, { useState, useEffect } from "react";
import OverviewComponent from "../BasicCardComponent/DiscoverComponent/BrandComponent/OverviewComponent";
import FavorabilityComponent from "../BasicCardComponent/DiscoverComponent/BrandComponent/FavorabilityComponent";
import CategoryDimensions from "../BasicCardComponent/DiscoverComponent/BrandComponent/CategoryDimensions";
import ReachComponent from "../BasicCardComponent/DiscoverComponent/BrandComponent/ReachComponent";
import RepresentationComponent from "../BasicCardComponent/DiscoverComponent/ProductComponent/RepresentationComponent";
import PFavorabilityComponent from "../BasicCardComponent/DiscoverComponent/ProductComponent/PFavorabilityComponent";
import PReachComponent from "../BasicCardComponent/DiscoverComponent/ProductComponent/PReachComponent";
import BrandCompetition from "../BasicCardComponent/DiscoverComponent/BrandComponent/BrandCompetition";
import ProductCompetition from "../BasicCardComponent/DiscoverComponent/ProductComponent/ProductCompetition";
import ReportingComponent from "../BasicCardComponent/DiscoverComponent/ReportingComponent";
import DashboardReportingData from "../BasicCardComponent/MonitoringComponent/BrandComponent/DashboardReportingData";
import MOverviewComponent from "../BasicCardComponent/MonitoringComponent/BrandComponent/MOverviewComponent";
import MFavorabilityComponent from "../BasicCardComponent/MonitoringComponent/BrandComponent/MFavorabilityComponent";
import MCategoryDimensions from "../BasicCardComponent/MonitoringComponent/BrandComponent/MCategoryDimensions";
import MReachComponent from "../BasicCardComponent/MonitoringComponent/BrandComponent/MReachComponent";
import MRepresentationComponent from "../BasicCardComponent/MonitoringComponent/ProductComponent/MRepresentationComponent";
import MPFavorabilityComponent from "../BasicCardComponent/MonitoringComponent/ProductComponent/MPFavorabilityComponent";
import MPReachComponent from "../BasicCardComponent/MonitoringComponent/ProductComponent/MPReachComponent";
import MBrandCompetition from "../BasicCardComponent/MonitoringComponent/BrandComponent/MBrandCompetition";
import MProductCompetition from "../BasicCardComponent/MonitoringComponent/ProductComponent/MProductCompetition";
import LLMDataDisplayComponent from "./LLMDataDisplayComponent";
import LLMSelectionComponent from "./LLMSelectionComponent ";
import "../../App.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import ChatComponent from "./ChatComponent";
import CustomNavbar from "./Navbar";
import BrandRadioOptions from "./BrandRadioOptions";
import ProductRadioOptions from "./ProductRadioOptions";
import firebaseApp from "../../DatabaseFirebase/Firebase";
import { getDatabase, ref, push } from "firebase/database";

function MainPage() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionShow, setSelectedOptionShow] = useState("Company/Brand");
  const [selectedOptionFirstShow, setSelectedOptionFirstShow] =
    useState("Discover");
  const [selectedOptionSecondShow, setSelectedOptionSecondShow] = useState("");
  const [selectedDotShow, setSelectedDotShow] = useState("Input key Prompt :");
  const [showData, setShowData] = useState(false);
  const [showGetData, setShowGetData] = useState(false);
  const [showCheckBoxData, setShowCheckBoxData] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [competitors, setCompetitors] = useState([]);
  const [promptBrandReach, setPromptBrandReach] = useState("");
  //----------------------------------Dynamic  Data for API-------------------------------//
  const [promptData, setPromptData] = useState("");
  const [promptBrand, setPromptBrand] = useState("");
  const [promptBrandKey, setPromptBrandKey] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedItemsReport, setCheckedItemsReport] = useState([]);
  //----------------------------------Dynamic  Data for API-------------------------------//
  //--------------------------------------Select Data-------------------------------------//
  const options = [
    { name: "GPT-4 Turbo (OpenAI)", value: "gpt_4_turbo" },
    { name: "Palm2 (Google/Bard)", value: "palm2_text" },
    { name: "Llama2 (Meta)", value: "llama2_70b_chat" },
    { name: "Claude (Anthropic)", value: "Claude" },
    { name: "SGE (Google)", value: "SGE" },
    { name: "Bing Chat (Microsoft)", value: "GPT4/Bing" },
  ];

  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const [againSelectedItems, setAgainSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dataHistory, setDataHistory] = useState([]);
  const [checkedItemStore, setCheckedItemStore] = useState([]);

  console.log("checkedItems", checkedItems);
  console.log("checkedItemStore", checkedItemStore);


  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleCheckChange = (label, isChecked) => {
    const updatedSelectedItems = { ...selectedItems, [label]: isChecked };
    setSelectedItems(updatedSelectedItems);
    const newSelectedCount =
      Object.values(updatedSelectedItems).filter(Boolean).length;
    setSelectedCount(newSelectedCount);

    // array form Data
    const selectedKeysArray = Object.keys(updatedSelectedItems).filter(
      (key) => updatedSelectedItems[key]
    );
    setAgainSelectedItems(selectedKeysArray);
  };

  const handleSelectAllChange = (event) => {
    if (!event) {
      const isChecked = event.target.checked;
      setSelectAll(isChecked);

      const updatedSelectedItems = [];
      options.forEach((option) => {
        updatedSelectedItems[option.value] = isChecked;
      });
      setSelectedItems(updatedSelectedItems);
      const selectedKeysArray = Object.keys(updatedSelectedItems).filter(
        (key) => updatedSelectedItems[key]
      );
      setAgainSelectedItems(selectedKeysArray);

      setSelectedCount(isChecked ? options.length : 0);
    }
  };

  //--------------------------------------Select Data-------------------------------------//

  //----------------------------------Dynamic  Data for API-------------------------------//
  const handleCheckBoxChange = (section, key) => {
    if (checkedItems.includes(key)) {
      setCheckedItems(checkedItems.filter((item) => item !== key));
    } else {
      setCheckedItems([...checkedItems, key]);
    }
  };

  const handleCheckBoxChangeReport = (section, key) => {
    if (checkedItemsReport.includes(key)) {
      setCheckedItemsReport(checkedItemsReport.filter((item) => item !== key));
    } else {
      setCheckedItemsReport([...checkedItemsReport, key]);
    }
  };
  //---------------------------------Dynamic  Data for API--------------------------------//

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen) {
        const dropdownNode = document.getElementById("profileDropdown");
        const imageNode = document.getElementById("profileImage");

        if (
          dropdownNode &&
          !dropdownNode.contains(event.target) &&
          imageNode &&
          !imageNode.contains(event.target)
        ) {
          setDropdownOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleChat = () => {
    setIsChatVisible(true);
  };

  const closeChat = () => {
    setIsChatVisible(false);
  };

  const handleRadioSelection = (option) => {
    setSelectedOption(option);
    setCheckedItems([]);
    setShowCheckBoxData(false);
    setCompetitors("");
    setPromptBrandReach("");
  };

  const handleRadioSectionShow = (option) => {
    setSelectedOptionShow(option);
    setSelectedOption(null);
    setPromptData("");
    setShowCheckBoxData(false);
    setCompetitors("");
    setPromptBrandReach("");
    setAgainSelectedItems([]);
    setSelectedItems({});
    setSelectedOption(null);
    setSelectAll(false);
    setSelectedCount(0);
    setPromptBrandKey("");
  };

  const handleRadioSectionFirstShow = (option) => {
    setSelectedOptionFirstShow(option);
    setSelectedOption(null);
    setPromptData("");
    setShowCheckBoxData(false);
    setCompetitors("");
    setPromptBrandReach("");
    setAgainSelectedItems([]);
    setSelectedItems({});
    setSelectedOption(null);
    setSelectAll(false);
    setSelectedCount(0);
    setPromptBrandKey("");
    setSelectedOptionSecondShow("");
  };

  const handleRadioSectionSecondShow = (option) => {
    setSelectedOptionSecondShow(option);
  };

  const handleDotShow = (option) => {
    setCheckedItems([]);
    setSelectedDotShow(option);
  };

  const handleClickShow = () => {
    if (
      (promptData.length != 0 &&
        checkedItems.length != 0 &&
        againSelectedItems != 0) ||
      (promptBrandKey.length != 0 && againSelectedItems != 0)
    ) {
      setShowData(true);
      setShowGetData(false);

      const inputPrompt = `${
        promptBrandKey.length !== 0
          ? `${promptBrandKey}. Please Don't send me incomplete data and Please don't give me any wrong information in response.`
          : `Please provide me specific data related to ${promptData}. In this order, provide ${checkedItems}  ${
              competitors.length !== 0
                ? "like" + " " + competitors + " " + "competitor"
                : ""
            } ${
              promptBrandReach.length !== 0
                ? "Prompt:" + "" + promptBrandReach
                : ""
            }. Format the data in a bulleted list. Do not send me data related to words like 'Sure and I hope'. I don't want any unnecessary response to this or Don't send me incomplete data and Please don't give me any wrong information in response. 
            ${
              selectedOption != "Competition"
                ? `I don't want any data in the table in the response.`
                : ""
            } ${
              checkedItems.includes("Brand Attributes")
                ? `If Brand Attributes data is provided, format the data in an unordered list with bullets.`
                : ""
            }
            ${
              (selectedOption === "Brand Favorability" &&
                checkedItems.includes(
                  "Top 5 Positive and Negative Attributes"
                )) ||
              checkedItems.includes("Competitor Comparison")
                ? `Still would like a table for competitor with rows as brand and competitors, and columns as Top 5 positive and negative attributes.`
                : ""
            }
            ${
              (selectedOption === "Competition" &&
                checkedItems.includes(
                  "Top 5 Positive and Negative Attributes"
                )) ||
              checkedItems.includes("Competitor Comparison")
                ? `Still would like a table for competitor with rows as brand and competitors, and columns as Top 5 positive and negative attributes.`
                : ""
            }
            ${
              selectedOption === "Competition"
                ? `Create a table that has the following. Company Name as the first column with the companies of ${
                    (promptData, competitors)
                  } at the rows, and company description as the second column. The top 5 positive attributes as the third column in that table, and the Top 5 negative attributes as the 4th column in the table. Please list all attributes as concise bullet points within each table cell.`
                : ""
            }
            ${
              checkedItems.includes("Competitor Comparison")
                ? `I don't want the response of competitor comparison in percentage.`
                : ""
            }
            ${
              checkedItems.includes("Sources")
                ? `Provide a comprehensive list of the sources (at least 10) utilized in your response in a bulleted list separate from your main response`
                : ""
            }
            ${
              checkedItems.includes("Competitive Set")
                ? `If Competitive Set data is provided, format the data in an unordered list with bullets.`
                : ""
            }    ${
              checkedItems.includes("Product Attributes")
                ? `If Product Attributes data is provided, format the data in an unordered list with bullets.`
                : ""
            }`
      }`.replace(/\s+/g, " ");

      const payload = {
        input_prompt: inputPrompt,
        selected_models: againSelectedItems,
        avoid_repetition: false,
        num_outputs: 1,
        quality: 1,
        max_tokens: 500,
        sampling_temperature: 0.7,
        variables: null,
      };

      console.log("DataInput", payload);
      
      fetch("https://api.gooey.ai/v2/CompareLLM/", {
        method: "POST",
        headers: {
          Authorization:
          "Bearer sk-MTe772KK8YFMAPFxZCCaYUybg49he6WA8mgLFntIGgLjQRrX",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.output && data.output.output_text != undefined) {
            NotificationManager.success("Launch Successfully", "", 3000);
            setCheckedItemStore(checkedItems);
            setShowData(false);
            setShowGetData(true);
            setDataItem(data.output.output_text);
            //-------------- Set Data LocalStorage -------------//
            const currentDate = new Date();
            const options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const formattedDate = currentDate.toLocaleDateString(
              "en-US",
              options
            );
            const newDataHistory = [
              ...dataHistory,
              { item: selectedOption, date: formattedDate },
            ];
            localStorage.setItem("DataHistory", JSON.stringify(newDataHistory));
            setDataHistory(newDataHistory);
            //-------------- Set Data LocalStorage -------------//

            //--------------- Firebase Data Setup ---------------//
            const database = getDatabase(firebaseApp);
            const dataRef = ref(database, "FirebaseData");
            const stringifiedDataItem = JSON.stringify(data.output.output_text);
            push(dataRef, {
              item: selectedOption,
              date: formattedDate,
              data: stringifiedDataItem,
            });
            //--------------- Firebase Data Setup ---------------//
          } else if (data.detail && data.detail.error) {
            NotificationManager.error(
              "Doh! You need to purchase additional credits to run more Gooey.AI recipes: https://gooey.ai/account",
              "",
              3000
            );
            setShowData(false);
          }
        })
        .catch((error) => {
          console.log(error);
          // NotificationManager.error(error, "", 3000);
          setShowData(false);
        });
    } else {
      NotificationManager.error(
        "Please Completely filled prompt, Modal and select Brand/Product",
        "",
        3000
      );
    }
  };

  const handleClickReset = () => {
    setShowGetData(false);
    setPromptData("");
    setCheckedItems([]);
    setSelectedItems({});
    setAgainSelectedItems([]);
    setSelectedOption(null);
    setSelectAll(false);
    setSelectedCount(0);
    setShowCheckBoxData(false);
    setCompetitors("");
    setPromptBrandKey("");
  };

  const dataStyle = {
    paddingLeft: "0px",
    fontSize: "17px",
    backgroundImage: "none",
  };

  const handleCheckBoxData = (event) => {
    setShowCheckBoxData(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = inputValue.trim();

    if (newMessage) {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setInputValue("");

      setTimeout(() => {
        setMessages([...messages, { text: "Sample response", sender: "bot" }]);
      }, 1000);
    }
  };

  const messageList = messages.map((message, index) => (
    <div key={index} className={`Message ${message.sender}`}>
      {message.text}
    </div>
  ));

  const handleCompetitorChange = (index, e) => {
    const updatedCompetitors = [...competitors];
    updatedCompetitors[index] = e.target.value;
    setCompetitors(updatedCompetitors);
  };

  const handlePromptBrandReachChange = (e) => {
    setPromptBrandReach(e.target.value);
  };

  return (
    <div className="">
      <CustomNavbar
        toggleDropdown={toggleDropdown}
        isDropdownOpen={isDropdownOpen}
      />
      <Container fluid>
        <Container className="border border-secondary-subtle borderSet mt">
          <h4 className="float-start text1">Find Your LLM Benchmark</h4>
          {/****************************** Big Initial First Section ******************************/}
          <div className="p-3 mt-5 initialChanges">
            <h5 className="float-start">What would you like to do?</h5>
            <Form.Group as={Col} md="10">
              <Row>
                <ul className="nav brand-tabs">
                  <Col md="2">
                    <li style={{ cursor: "pointer" }}>
                      <a
                        className={`nav-link ${
                          selectedOptionFirstShow === "Discover"
                            ? "active cursor-pointer"
                            : ""
                        }`}
                        onClick={() => handleRadioSectionFirstShow("Discover")}
                      >
                        <span></span> Discover
                      </a>
                    </li>
                  </Col>
                  <Col md="2">
                    <li style={{ cursor: "pointer" }}>
                      <a
                        className={`nav-link ${
                          selectedOptionFirstShow === "Monitoring"
                            ? "active cursor-pointer"
                            : ""
                        }`}
                        onClick={() =>
                          handleRadioSectionFirstShow("Monitoring")
                        }
                      >
                        <span></span> Monitoring
                      </a>
                    </li>
                  </Col>
                </ul>
              </Row>
            </Form.Group>
          </div>
          {/****************************** Big Initial First Section ******************************/}

          {/****************************** Big Initial Second Section ******************************/}
          <div className="p-3">
            <Container className="back">
              <Form className="form-inline form-5yquicksearch mx-auto mt-2 p-3">
                {/*********************** Small Discover First Section *************************/}
                {selectedOptionFirstShow === "Discover" && (
                  <Row className="mb-3">
                    <h6 className="float-start text mb-4 mt-4">
                      What Would You Like to Focus On?
                    </h6>
                    {/**************** Very  Small Discover First Section *******************/}
                    {/*------------------------ Show Big Section ------------------------*/}
                    {selectedOptionShow === "Company/Brand" && (
                      <>
                        <Form.Group as={Col} md="12">
                          <Form.Control
                            as="textarea"
                            rows={1}
                            cols={2}
                            name="firstName"
                            placeholder="Company/Brand (input)"
                            className="big custom-placeholder mt-2"
                            value={promptData}
                            onChange={(e) => setPromptData(e.target.value)}
                          />
                        </Form.Group>
                      </>
                    )}

                    {selectedOptionShow === "Product" && (
                      <>
                        <Form.Group as={Col} md="12">
                          <Form.Control
                            as="textarea"
                            rows={1}
                            cols={2}
                            type="text"
                            name="firstName"
                            placeholder="Product (input)"
                            className="big custom-placeholder mt-2"
                            value={promptData}
                            onChange={(e) => setPromptData(e.target.value)}
                          />
                        </Form.Group>
                      </>
                    )}
                    {/*------------------------ Show Big Section ------------------------*/}

                    <Form.Group as={Col} md="12">
                      <Row>
                        <ul className="nav brand-tabs">
                          <Col md="2">
                            <li style={{ cursor: "pointer" }}>
                              <a
                                className={`nav-link ${
                                  selectedOptionShow === "Company/Brand"
                                    ? "active cursor-pointer"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleRadioSectionShow("Company/Brand")
                                }
                              >
                                <span></span> Company/Brand
                              </a>
                            </li>
                          </Col>
                          <Col md="auto">
                            <li style={{ cursor: "pointer" }}>
                              <a
                                className={`nav-link ${
                                  selectedOptionShow === "Product"
                                    ? "active cursor-pointer"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleRadioSectionShow("Product")
                                }
                              >
                                <span></span> Product
                              </a>
                            </li>
                          </Col>
                          <Col md="2">
                            <li style={{ cursor: "pointer" }}>
                              <a
                                className={`nav-link ${
                                  selectedOptionShow === "Key Prompt"
                                    ? "active cursor-pointer"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleRadioSectionShow("Key Prompt")
                                }
                              >
                                <span></span> Key Prompt
                              </a>
                            </li>
                          </Col>
                        </ul>
                      </Row>
                    </Form.Group>

                    {/*------------------ Company/Brand Second Section -----------------*/}
                    {selectedOptionShow === "Company/Brand" && (
                      <BrandRadioOptions
                        selectedOption={selectedOption}
                        handleRadioSelection={handleRadioSelection}
                      />
                    )}
                    {/*------------------ Company/Brand Second Section -----------------*/}

                    {/*----------------------------- Product ---------------------------*/}
                    {selectedOptionShow === "Product" && (
                      <ProductRadioOptions
                        promptData={promptData}
                        setPromptData={setPromptData}
                        selectedOption={selectedOption}
                        handleRadioSelection={handleRadioSelection}
                      />
                    )}
                    {/*----------------------------- Product ---------------------------*/}

                    {/*----------------------------- Key Prompt ------------------------*/}
                    {selectedOptionShow === "Key Prompt" && (
                      <>
                        {/* <Form.Group as={Col} md="6">
                              <Form.Control
                                type="text"
                                name="firstName"
                                placeholder="Company/Brand/Product"
                                className="height0 custom-placeholder mb-3"
                                value={promptBrand}
                                onChange={(e) => setPromptBrand(e.target.value)}
                              />
                            </Form.Group> */}

                        <Form.Group as={Col} md="12">
                          <Form.Control
                            as="textarea"
                            rows={1}
                            cols={2}
                            name="firstName"
                            placeholder="Enter the Key Prompt"
                            className="big custom-placeholder mb-3"
                            value={promptBrandKey}
                            onChange={(e) => setPromptBrandKey(e.target.value)}
                          />
                        </Form.Group>
                      </>
                    )}
                    {/*----------------------------- Key Prompt ------------------------*/}

                    {/*$$$$$$$$$$$$$$$$$$$$$ Inside Data Section $$$$$$$$$$$$$$$$$$$$$$$$*/}
                    {selectedOption === "Brand Overview" && (
                      <OverviewComponent
                        checkedItems={checkedItems}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                    )}

                    {selectedOption === "Brand Favorability" && (
                      <FavorabilityComponent
                        checkedItems={checkedItems}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                    )}

                    {selectedOption === "Brand Category Dimensions" &&
                      selectedOptionShow === "Company/Brand" && (
                        <CategoryDimensions
                          checkedItems={checkedItems}
                          handleCheckBoxChange={handleCheckBoxChange}
                          handlePromptBrandReachChange={
                            handlePromptBrandReachChange
                          }
                          promptBrandReach={promptBrandReach}
                        />
                      )}

                    {selectedOption === "Category Leadership" &&
                      selectedOptionFirstShow === "Discover" && (
                        <ReachComponent
                          promptBrandReach={promptBrandReach}
                          checkedItems={checkedItems}
                          handlePromptBrandReachChange={
                            handlePromptBrandReachChange
                          }
                          handleCheckBoxChange={handleCheckBoxChange}
                        />
                      )}

                    {selectedOption === "Product Representation" && (
                      <RepresentationComponent
                        checkedItems={checkedItems}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                    )}

                    {selectedOption === "Product Favorability" && (
                      <PFavorabilityComponent
                        checkedItems={checkedItems}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                    )}

                    {selectedOption === "Product Reach" && (
                      <PReachComponent
                        promptBrandReach={promptBrandReach}
                        checkedItems={checkedItems}
                        handlePromptBrandReachChange={
                          handlePromptBrandReachChange
                        }
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                    )}

                    {selectedOption === "Competition" &&
                      selectedOptionShow === "Company/Brand" && (
                        <BrandCompetition
                          showCheckBoxData={showCheckBoxData}
                          competitors={competitors}
                          checkedItems={checkedItems}
                          handleCheckBoxData={handleCheckBoxData}
                          handleCompetitorChange={handleCompetitorChange}
                          handleCheckBoxChange={handleCheckBoxChange}
                        />
                      )}

                    {selectedOption === "Competition" &&
                      selectedOptionShow === "Product" && (
                        <ProductCompetition
                          showCheckBoxData={showCheckBoxData}
                          competitors={competitors}
                          checkedItems={checkedItems}
                          handleCheckBoxData={handleCheckBoxData}
                          handleCompetitorChange={handleCompetitorChange}
                          handleCheckBoxChange={handleCheckBoxChange}
                        />
                      )}

                    {selectedOption === "Dashboard and Reporting" && (
                      <ReportingComponent
                        checkedItemsReport={checkedItemsReport}
                        handleCheckBoxChangeReport={handleCheckBoxChangeReport}
                        showGetData={showGetData}
                        dataItem={dataItem}
                        againSelectedItems={againSelectedItems}
                        checkedItems={checkedItems}
                        checkedItemStore={checkedItemStore}
                      />
                    )}

                    <LLMSelectionComponent
                      selectedCount={selectedCount}
                      selectedItems={selectedItems}
                      selectAll={selectAll}
                      options={options}
                      showData={showData}
                      handleSelectAllChange={handleSelectAllChange}
                      handleCheckChange={handleCheckChange}
                      handleClickShow={handleClickShow}
                      handleClickReset={handleClickReset}
                    />
                    {/*$$$$$$$$$$$$$$$$$$$$$ Inside Data Section $$$$$$$$$$$$$$$$$$$$$$$$*/}

                    {/**************** Very Small Discover First Section *******************/}
                  </Row>
                )}
                {/*********************** Small Discover First Section *************************/}

                {/*********************** Small Discover Second Section ************************/}
                {selectedOptionFirstShow === "Monitoring" && (
                  <Row className="mb-3">
                    <h6 className="float-start text mb-4 mt-4">
                      What Would You Like to Moniter?
                    </h6>

                    {/*------------------------ Show Big Section ------------------------*/}
                    {selectedOptionShow === "Company/Brand" && (
                      <>
                        <Form.Group as={Col} md="12">
                          <Form.Control
                            as="textarea"
                            rows={1}
                            cols={2}
                            name="firstName"
                            placeholder="Company/Brand/Product (input)"
                            className="big custom-placeholder mt-2"
                            value={promptData}
                            onChange={(e) => setPromptData(e.target.value)}
                          />
                        </Form.Group>
                      </>
                    )}

                    {selectedOptionShow === "Product" && (
                      <>
                        <Form.Group as={Col} md="12">
                          <Form.Control
                            as="textarea"
                            rows={1}
                            cols={2}
                            type="text"
                            name="firstName"
                            placeholder="Product (input)"
                            className="big custom-placeholder mt-2"
                            value={promptData}
                            onChange={(e) => setPromptData(e.target.value)}
                          />
                        </Form.Group>
                      </>
                    )}
                    {/*------------------------ Show Big Section ------------------------*/}

                    <Form.Group as={Col} md="12">
                      <Row>
                        <ul className="nav brand-tabs">
                          <Col md="2">
                            <li style={{ cursor: "pointer" }}>
                              <a
                                className={`nav-link ${
                                  selectedOptionShow === "Company/Brand"
                                    ? "active cursor-pointer"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleRadioSectionShow("Company/Brand")
                                }
                              >
                                <span></span> Company/Brand
                              </a>
                            </li>
                          </Col>
                          <Col md="auto">
                            <li style={{ cursor: "pointer" }}>
                              <a
                                className={`nav-link ${
                                  selectedOptionShow === "Product"
                                    ? "active cursor-pointer"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleRadioSectionShow("Product")
                                }
                              >
                                <span></span> Product
                              </a>
                            </li>
                          </Col>
                          <Col md="2">
                            <li style={{ cursor: "pointer" }}>
                              <a
                                className={`nav-link ${
                                  selectedOptionShow === "Key Prompt"
                                    ? "active cursor-pointer"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleRadioSectionShow("Key Prompt")
                                }
                              >
                                <span></span> Key Prompt
                              </a>
                            </li>
                          </Col>
                        </ul>
                      </Row>
                    </Form.Group>

                    {/*------------------ Company/Brand Second Section -----------------*/}
                    {selectedOptionShow === "Company/Brand" && (
                      <>
                        <BrandRadioOptions
                          selectedOption={selectedOption}
                          handleRadioSelection={handleRadioSelection}
                        />

                        <h6 className="float-start mt-4">
                          What Frequency Would You Like to Moniter?
                        </h6>
                        <Form.Group as={Col} md="8" className="topData">
                          <Row>
                            <ul className="nav brand-tabs">
                              <Col md="2">
                                <li style={{ cursor: "pointer" }}>
                                  <a
                                    className={`nav-link ${
                                      selectedOptionSecondShow === "Daily"
                                        ? "active cursor-pointer"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handleRadioSectionSecondShow("Daily")
                                    }
                                  >
                                    <span></span> Daily
                                  </a>
                                </li>
                              </Col>
                              <Col md="2">
                                <li style={{ cursor: "pointer" }}>
                                  <a
                                    className={`nav-link ${
                                      selectedOptionSecondShow === "Weekly"
                                        ? "active cursor-pointer"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handleRadioSectionSecondShow("Weekly")
                                    }
                                  >
                                    <span></span> Weekly
                                  </a>
                                </li>
                              </Col>
                              <Col md="2">
                                <li style={{ cursor: "pointer" }}>
                                  <a
                                    className={`nav-link ${
                                      selectedOptionSecondShow === "Monthly"
                                        ? "active cursor-pointer"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handleRadioSectionSecondShow("Monthly")
                                    }
                                  >
                                    <span></span> Monthly
                                  </a>
                                </li>
                              </Col>
                            </ul>
                          </Row>
                        </Form.Group>
                      </>
                    )}
                    {/*------------------ Company/Brand Second Section -----------------*/}

                    {/*-------------------------- Product -----------------------*/}
                    {selectedOptionShow === "Product" && (
                      <ProductRadioOptions
                        promptData={promptData}
                        setPromptData={setPromptData}
                        selectedOption={selectedOption}
                        handleRadioSelection={handleRadioSelection}
                      />
                    )}
                    {/*------------------------- Product ------------------------*/}

                    {/*-------------------------- Key Prompt -----------------------*/}
                    {selectedOptionShow === "Key Prompt" && (
                      <>
                        {/* <Form.Group as={Col} md="6">
                        <Form.Control
                          type="text"
                          name="firstName"
                          placeholder="Company/Brand/Product"
                          className="height0 custom-placeholder mb-3"
                          value={promptBrand}
                          onChange={(e) => setPromptBrand(e.target.value)}
                        />
                      </Form.Group> */}

                        <Form.Group as={Col} md="12">
                          <Form.Control
                            as="textarea"
                            rows={1}
                            cols={2}
                            name="firstName"
                            placeholder="Enter the Key Prompt"
                            className="big custom-placeholder mb-3"
                            value={promptBrandKey}
                            onChange={(e) => setPromptBrandKey(e.target.value)}
                          />
                        </Form.Group>
                      </>
                    )}

                    {/*-------------------------- Key Prompt -----------------------*/}
                    {/**************** Very Small Discover First Section *******************/}
                    {/*$$$$$$$$$$$$$$$$$$$$$ Inside Data Section $$$$$$$$$$$$$$$$$$$$$$$$*/}
                    {selectedOption === "Brand Overview" && (
                      <MOverviewComponent
                        checkedItems={checkedItems}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                    )}

                    {selectedOption === "Brand Favorability" && (
                      <MFavorabilityComponent
                        checkedItems={checkedItems}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                    )}

                    {selectedOption === "                                                                                                                                                                                                                                                            " &&
                      selectedOptionShow === "Company/Brand" && (
                        <MCategoryDimensions
                          checkedItems={checkedItems}
                          handleCheckBoxChange={handleCheckBoxChange}
                          handlePromptBrandReachChange={
                            handlePromptBrandReachChange
                          }
                          promptBrandReach={promptBrandReach}
                        />
                      )}

                    {selectedOption === "Brand Reach" &&
                      selectedOptionFirstShow === "Monitoring" && (
                        <MReachComponent
                          promptBrandReach={promptBrandReach}
                          checkedItems={checkedItems}
                          handlePromptBrandReachChange={
                            handlePromptBrandReachChange
                          }
                          handleCheckBoxChange={handleCheckBoxChange}
                        />
                      )}

                    {selectedOption === "Competition" &&
                      selectedOptionShow === "Company/Brand" && (
                        <MBrandCompetition
                          showCheckBoxData={showCheckBoxData}
                          competitors={competitors}
                          checkedItems={checkedItems}
                          handleCheckBoxData={handleCheckBoxData}
                          handleCompetitorChange={handleCompetitorChange}
                          handleCheckBoxChange={handleCheckBoxChange}
                        />
                      )}

                    {selectedOption === "Dashboard and Reporting" &&
                      selectedOptionShow === "Company/Brand" && (
                        <DashboardReportingData
                          checkedItems={checkedItems}
                          handleCheckBoxChange={handleCheckBoxChange}
                        />
                      )}

                    {selectedOption === "Product Representation" && (
                      <MRepresentationComponent
                        checkedItems={checkedItems}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                    )}

                    {selectedOption === "Product Favorability" && (
                      <MPFavorabilityComponent
                        checkedItems={checkedItems}
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                    )}

                    {selectedOption === "Product Reach" && (
                      <MPReachComponent
                        promptBrandReach={promptBrandReach}
                        checkedItems={checkedItems}
                        handlePromptBrandReachChange={
                          handlePromptBrandReachChange
                        }
                        handleCheckBoxChange={handleCheckBoxChange}
                      />
                    )}

                    {selectedOption === "Competition" &&
                      selectedOptionShow === "Product" && (
                        <MProductCompetition
                          showCheckBoxData={showCheckBoxData}
                          competitors={competitors}
                          checkedItems={checkedItems}
                          handleCheckBoxData={handleCheckBoxData}
                          handleCompetitorChange={handleCompetitorChange}
                          handleCheckBoxChange={handleCheckBoxChange}
                        />
                      )}

                    {selectedOption === "Dashboard and Reporting" &&
                      selectedOptionShow === "Product" && (
                        <ReportingComponent
                          checkedItemsReport={checkedItemsReport}
                          handleCheckBoxChangeReport={
                            handleCheckBoxChangeReport
                          }
                          showGetData={showGetData}
                          dataItem={dataItem}
                          againSelectedItems={againSelectedItems}
                          checkedItems={checkedItems}
                          checkedItemStore={checkedItemStore}
                        />
                      )}

                    <LLMSelectionComponent
                      selectedCount={selectedCount}
                      selectedItems={selectedItems}
                      selectAll={selectAll}
                      options={options}
                      showData={showData}
                      handleSelectAllChange={handleSelectAllChange}
                      handleCheckChange={handleCheckChange}
                      handleClickShow={handleClickShow}
                      handleClickReset={handleClickReset}
                    />
                    {/*$$$$$$$$$$$$$$$$$$$$$ Inside Data Section $$$$$$$$$$$$$$$$$$$$$$$$*/}
                    {/**************** Very Small Discover First Section *******************/}
                  </Row>
                )}
                {/*********************** Small Discover Second Section ************************/}
              </Form>
            </Container>
            {/*-------------------- Data Display Section --------------------*/}
            {showGetData === true && (
              <LLMDataDisplayComponent
                dataItem={dataItem}
                copyToClipboard={copyToClipboard}
              />
            )}
            {/*-------------------- Data Display Section --------------------*/}
          </div>
          {/****************************** Big Initial Second Section ******************************/}
        </Container>

        <ChatComponent
          isChatVisible={isChatVisible}
          toggleChat={toggleChat}
          closeChat={closeChat}
          messageList={messageList}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
        />
      </Container>
      <NotificationContainer />
    </div>
  );
}
export default MainPage;
