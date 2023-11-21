import React, { useState, useEffect } from "react";
import "../App.css";
import Markdown from "markdown-to-jsx";
import {
  Container,
  Navbar,
  Form,
  Row,
  Col,
  Button,
  Card,
  Dropdown,
  Spinner,
  Table,
} from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function MainPage() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionShow, setSelectedOptionShow] = useState("Company/Brand");
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
  //----------------------------------Dynamic  Data for API-------------------------------//

  //--------------------------------------Select Data-------------------------------------//
  const options = [
    { name: "GPT-4 (OpenAI)", value: "gpt_4" },
    { name: "Palm2 (Google/Bard)", value: "palm2_chat" },
    { name: "Llama2 (Meta)", value: "llama2_70b_chat" },
    { name: "Claude (Anthropic)", value: "Claude" },
    { name: "SGE (Google)", value: "SGE" },
    { name: "Bing Chat (Microsoft)", value: "GPT4/Bing" },
  ];

  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const [againselectedItems, setAgainSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


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
    setCompetitors('');
    setPromptBrandReach("");
    setAgainSelectedItems([])
    setSelectedItems({})
    setSelectedOption(null);
    setSelectAll(false);
    setSelectedCount(0);
    setPromptBrandKey("");
  };

  const handleDotShow = (option) => {
    setCheckedItems([]);
    setSelectedDotShow(option);
  };

  const handleClickShow = () => {
    console.log("checkedItems", checkedItems);
    if (
      (promptData.length != 0 &&
        checkedItems.length != 0 &&
        againselectedItems != 0) ||
      (promptBrandKey.length != 0)
    ) {
      setShowData(true);
      setShowGetData(false);




      const inputPrompt = `${
        promptBrandKey.length !== 0
          ? `${promptBrandKey}. Please Don't send me incomplete data and Please don't give me any wrong information in response.`
          : `Please provide me specific data of ${promptData} with ${checkedItems}  ${
              competitors.length !== 0 ? "and" + competitors + "competitor" : ""
            } ${
              promptBrandReach.length !== 0
                ? "Prompt:" + "" + promptBrandReach
                : ""
            } of ${selectedOption}.and  Do not send me data related to words like 'Sure and I hope'. I don't want any unnecessary response to this or Don't send me incomplete data and Please don't give me any wrong information in response. 
            ${
              selectedOption != "Competition"
                ? `I don't want any data in the table in the response.`
                : ""
            }  ${
              checkedItems.includes("Brand Image and Logos")
                ? `If asked about Brand Image and logos, I just want this response in response."Model does not currently provide images and logos". I don't want anything else in response except this message.`
                : ""
            } ${
              checkedItems.includes("Brand Attributes")
                ? `If Brand Attributes data is provided, format the data in an unordered list with bullets.`
                : ""
            }
            ${
              selectedOption === "Competition"
                ? `Create a border on the table that contains the following. Company name in the first column, ${competitors} and its related companies in the rows, company description in the second column. The top 5 positive attributes as the third column in that table, and the top 5 negative attributes as the fourth column in that table. Please list all features as concise bullet points.`
                : ""
            }
            ${
              checkedItems.includes("Competitive Set")
                ? `If Competitive Set data is provided, format the data in an unordered list with bullets.`
                : ""
            } ${
              checkedItems.includes("Sources")
                ? `If asked about data related to Sources, only provide the message: 'Model does not provide accurate source information'. Apart from this message, I don't need anything else in response.`
                : ""
            } ${
              checkedItems.includes("Product Image and Logos")
                ? `If asked about Product Image and logos, I just want this response in response. I don't need anything else in response except the message: "Model does not currently provide images and logos".`
                : ""
            } ${
              checkedItems.includes("Product Attributes")
                ? `If Product Attributes data is provided, format the data in an unordered list with bullets.`
                : ""
            }`
      }`.replace(/\s+/g, " ");




      const payload = {
        input_prompt: inputPrompt,
        selected_models: againselectedItems,
        avoid_repetition: false,
        num_outputs: 1,
        quality: 1,
        max_tokens: 500,
        sampling_temperature: 0.7,
        variables: null,
      };
      console.log("payload", payload);
      fetch("https://api.gooey.ai/v2/CompareLLM/", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer sk-90Jd8cyDCCjWFNJBE25bQLCr7Os0ObHik9is2A7Djz8Sy2K2",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.output && data.output.output_text != undefined) {
            NotificationManager.success("Launch Successfully", "", 3000);
            setShowData(false);
            setShowGetData(true);
            setDataItem(data.output.output_text);
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
      <Navbar className="bg-white p-2 mb-5">
        <Container fluid>
          <Navbar.Brand className="navbar-brand mb-0 h1 d-none d-md-block">
            <img
              alt=""
              src="menu.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            &nbsp; LLM and Co-Pilot Brand Luminare
            <br />
            <span className="fs-6" style={{ marginLeft: "3rem" }}>
              Brand Discovery and Monitoring
            </span>
          </Navbar.Brand>
          <Navbar.Brand className="d-flex flex-1 d-block d-md-none">
            <a href="" className="sidebar-toggle ml-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-menu"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <img
                alt=""
                src="profile.png"
                onClick={toggleDropdown}
                id="profileImage"
                style={{ cursor: "pointer" }}
              />
            </Navbar.Text>
            <Dropdown
              show={isDropdownOpen}
              align="end"
              id="profileDropdown"
              onClick={(e) => e.stopPropagation()}
            >
              <Dropdown.Menu className="mt-4">
                <Dropdown.Item href="">My Profile</Dropdown.Item>
                <Dropdown.Item href="">Settings</Dropdown.Item>
                <hr className="mt-2 mb-2" />
                <Dropdown.Item href="" className="text-danger">
                  Sign out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Container className="border border-secondary-subtle borderSet mt">
          <h4 className="float-start text1">Find Your LLM Benchmark</h4>
          <div className="p-3 mt-5">
            <Container className="back">
              <Form className="form-inline form-quicksearch mx-auto mt-2 p-3">
                <Row className="mb-3">
                  <h6 className="float-start text mb-4 mt-4">
                    What Would You Like to Focus On?
                  </h6>

                  {/*------------------ Company/Brand First Section -----------------*/}
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
                  {/*------------------ Company/Brand First Section -----------------*/}

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
                              onClick={() => handleRadioSectionShow("Product")}
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
                      <Form.Group
                        as={Col}
                        md="4"
                        className="cursor-pointer"
                        onClick={() => handleRadioSelection("Brand Overview")}
                      >
                        <Form.Check
                          type="radio"
                          name="firstName"
                          label="Brand Overview"
                          className="height1 custom-checkbox mb-3"
                          checked={selectedOption === "Brand Overview"}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="4"
                        className="cursor-pointer"
                        onClick={() =>
                          handleRadioSelection("Brand Favorability")
                        }
                      >
                        <Form.Check
                          type="radio"
                          name="firstName"
                          label="Brand Favorability"
                          className="height1 custom-checkbox mb-3"
                          checked={selectedOption === "Brand Favorability"}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="4"
                        className="cursor-pointer"
                        onClick={() => handleRadioSelection("Monitoring")}
                      >
                        <Form.Check
                          type="radio"
                          name="firstName"
                          label="Monitoring"
                          className="height3 custom-checkbox mb-3"
                          checked={selectedOption === "Monitoring"}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="4"
                        className="cursor-pointer"
                        onClick={() => handleRadioSelection("Brand Reach")}
                      >
                        <Form.Check
                          type="radio"
                          name="firstName"
                          label="Brand Reach"
                          className="height1 custom-checkbox mb-3"
                          checked={selectedOption === "Brand Reach"}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        className="cursor-pointer"
                        onClick={() => handleRadioSelection("Competition")}
                      >
                        <Form.Check
                          type="radio"
                          name="firstName"
                          label="Competition"
                          className="height1 custom-checkbox mb-3"
                          checked={selectedOption === "Competition"}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="4"
                        className="cursor-pointer"
                        onClick={() =>
                          handleRadioSelection("Dashboard/Reporting")
                        }
                      >
                        <Form.Check
                          type="radio"
                          name="firstName"
                          label="Dashboard/Reporting"
                          className="height3 custom-checkbox mb-3"
                          checked={selectedOption === "Dashboard/Reporting"}
                        />
                      </Form.Group>
                    </>
                  )}
                  {/*------------------ Company/Brand Second Section -----------------*/}

                  {/*-------------------------- Product -----------------------*/}
                  {selectedOptionShow === "Product" && (
                    <>
                      <Form.Group as={Col} md="4">
                        <Form.Control
                          type="text"
                          name="firstName"
                          placeholder="Product (input)"
                          className="height0 custom-placeholder mb-3"
                          value={promptData}
                          onChange={(e) => setPromptData(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="4"
                        className="cursor-pointer"
                        onClick={() =>
                          handleRadioSelection("Product Representation")
                        }
                      >
                        <Form.Check
                          type="radio"
                          name="firstName"
                          label="Product Representation"
                          className="height1 custom-checkbox mb-3"
                          checked={selectedOption === "Product Representation"}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="4"
                        className="cursor-pointer"
                        onClick={() =>
                          handleRadioSelection("Product Favorability")
                        }
                      >
                        <Form.Check
                          type="radio"
                          name="firstName"
                          label="Product Favorability"
                          className="height1 custom-checkbox mb-3"
                          checked={selectedOption === "Product Favorability"}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="4"
                        className="cursor-pointer"
                        onClick={() => handleRadioSelection("Product Reach")}
                      >
                        <Form.Check
                          type="radio"
                          name="firstName"
                          label="Product Reach"
                          className="height1 custom-checkbox mb-3"
                          checked={selectedOption === "Product Reach"}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        className="cursor-pointer"
                        onClick={() => handleRadioSelection("Competition")}
                      >
                        <Form.Check
                          type="radio"
                          name="firstName"
                          label="Competition"
                          className="height1 custom-checkbox mb-3"
                          checked={selectedOption === "Competition"}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="4"
                        className="cursor-pointer"
                        onClick={() =>
                          handleRadioSelection("Dashboard/Reporting")
                        }
                      >
                        <Form.Check
                          type="radio"
                          name="firstName"
                          label="Dashboard/Reporting"
                          className="height1 custom-checkbox mb-3"
                          checked={selectedOption === "Dashboard/Reporting"}
                        />
                      </Form.Group>
                    </>
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

                  {selectedOption === "Brand Overview" && (
                    <Container className="mb-3">
                      <Card as={Col} md="12" className="border-0 whi">
                        <Card.Body>
                          <Card.Title className="">Brand Overview</Card.Title>
                          <Card.Text className="mt-4">
                            What dimensions do you want to focus on (choose all
                            that apply)
                          </Card.Text>
                          <ul className="focus-on">
                            {[
                              "Brand Description",
                              "Brand Attributes",
                              "Brand Image and Logos",
                              "Competitive Set",
                              "Sources",
                            ].map((key) => (
                              <li key={key}>
                                <input
                                  type="checkbox"
                                  name=""
                                  value=""
                                  checked={checkedItems.includes(key)}
                                  onChange={() =>
                                    handleCheckBoxChange(
                                      "Brand Representation",
                                      key
                                    )
                                  }
                                />{" "}
                                {key}
                              </li>
                            ))}
                          </ul>
                          <small>
                            {/* Note: interactive bot would ask what the user would
                            like to focus on. Prompt is written based on this
                            feedback */}
                          </small>
                        </Card.Body>
                      </Card>
                    </Container>
                  )}

                  {selectedOption === "Brand Favorability" && (
                    <Container className="mb-3">
                      <Card as={Col} md="12" className="border-0 whi">
                        <Card.Body>
                          <Card.Title>Brand Favorability</Card.Title>
                          <Card.Text className="mt-4">
                            What dimensions do you want to focus on (choose all
                            that apply)
                          </Card.Text>
                          <ul className="focus-on">
                            {[
                              "Top 5 Positive and Negative Attributes",
                              "Competitor Comparison",
                              "Sources",
                            ].map((key) => (
                              <li key={key}>
                                <input
                                  type="checkbox"
                                  name=""
                                  value=""
                                  checked={checkedItems.includes(key)}
                                  onChange={() =>
                                    handleCheckBoxChange(
                                      "Brand Favorability",
                                      key
                                    )
                                  }
                                />{" "}
                                {key}
                              </li>
                            ))}
                          </ul>
                          <small>
                            {/* Note: interactive bot would ask what the user would
                            like to focus on. Prompt is written based on this
                            feedback */}
                          </small>
                        </Card.Body>
                      </Card>
                    </Container>
                  )}

                  {selectedOption === "Brand Reach" && (
                    <Container className="mb-3">
                      <Card as={Col} md="12" className="border-0 whi">
                        <Card.Body>
                          <Card.Title className="">Brand Reach</Card.Title>
                          <Card.Text>
                            {/* <ul className="nav brand-tabs">
                              <li>
                                <a
                                  className={
                                    selectedDotShow === "Input key Prompt :"
                                      ? "active"
                                      : ""
                                  }
                                  data-toggle="tab"
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDotShow("Input key Prompt :");
                                  }}
                                >
                                  <span></span> Input key Prompt
                                </a>
                              </li>
                              <li>
                                <a
                                  className={
                                    selectedDotShow ===
                                    "Generate top 3 Prompt :"
                                      ? "active"
                                      : ""
                                  }
                                  data-toggle="tab"
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDotShow("Generate top 3 Prompt :");
                                  }}
                                >
                                  <span></span> Generate top 3 Prompt
                                </a>
                              </li>
                            </ul> */}

                            <ul className="focus-on mt-4">
                              <li>
                                <input
                                  type="text"
                                  placeholder="Prompt"
                                  name="promptBrandReach"
                                  value={promptBrandReach}
                                  onChange={handlePromptBrandReachChange}
                                />
                              </li>
                            </ul>
                          </Card.Text>
                          {/* {selectedDotShow === "Input key Prompt :" && ( */}
                          <ul className="focus-on">
                            {["Responses", "Sources"].map((key) => (
                              <li key={key}>
                                <input
                                  type="checkbox"
                                  name=""
                                  value=""
                                  checked={checkedItems.includes(key)}
                                  onChange={() =>
                                    handleCheckBoxChange("Brand Reach", key)
                                  }
                                />{" "}
                                {key}
                              </li>
                            ))}
                          </ul>
                          {/* )} */}
                          {/* {selectedDotShow === "Generate top 3 Prompt :" && (
                            <ul className="focus-on">
                              {[
                                "Mention Rate and Ranking",
                                "Competitive Set",
                                "Sources for Brand Info",
                                "Sources for overall Info",
                              ].map((key) => (
                                <li key={key}>
                                  <input
                                    type="checkbox"
                                    name=""
                                    value=""
                                    checked={checkedItems.includes(key)}
                                    onChange={() =>
                                      handleCheckBoxChange("Brand Reach", key)
                                    }
                                  />{" "}
                                  {key}
                                </li>
                              ))}
                            </ul>
                          )} */}
                          {/* <small>
                            Prompt or up to 3 prompts are writtent based on
                            prompt feedback. Also could be a possibility of bot
                            to recommend prompts.
                          </small> */}
                        </Card.Body>
                      </Card>
                    </Container>
                  )}

                  {selectedOption === "Product Representation" && (
                    <Container className="mb-3">
                      <Card as={Col} md="12" className="border-0 whi">
                        <Card.Body>
                          <Card.Title className="">
                            Product Representation
                          </Card.Title>
                          <Card.Text className="mt-4">
                            What dimensions do you want to focus on (choose all
                            that apply)
                          </Card.Text>
                          <ul className="focus-on">
                            {[
                              "Product Description",
                              "Product Attributes",
                              "Product Image and Logos",
                              "Sources",
                            ].map((key) => (
                              <li key={key}>
                                <input
                                  type="checkbox"
                                  name=""
                                  value=""
                                  checked={checkedItems.includes(key)}
                                  onChange={() =>
                                    handleCheckBoxChange(
                                      "Product Representation",
                                      key
                                    )
                                  }
                                />{" "}
                                {key}
                              </li>
                            ))}
                          </ul>
                          <small>
                            {/* Note: interactive bot would ask what the user would
                            like to focus on. Prompt is written based on this
                            feedback */}
                          </small>
                        </Card.Body>
                      </Card>
                    </Container>
                  )}

                  {selectedOption === "Product Favorability" && (
                    <Container className="mb-3">
                      <Card as={Col} md="12" className="border-0 whi">
                        <Card.Body>
                          <Card.Title>Product Favorability</Card.Title>
                          <Card.Text className="mt-4">
                            What dimensions do you want to focus on (choose all
                            that apply)
                          </Card.Text>
                          <ul className="focus-on">
                            {[
                              "Top 5 Positive and Negative Attributes",
                              "Competitor Comparison",
                              "Sources",
                            ].map((key) => (
                              <li key={key}>
                                <input
                                  type="checkbox"
                                  name=""
                                  value=""
                                  checked={checkedItems.includes(key)}
                                  onChange={() =>
                                    handleCheckBoxChange(
                                      "Product Favorability",
                                      key
                                    )
                                  }
                                />{" "}
                                {key}
                              </li>
                            ))}
                          </ul>
                          <small>
                            {/* Note: interactive bot would ask what the user would
                            like to focus on. Prompt is written based on this
                            feedback */}
                          </small>
                        </Card.Body>
                      </Card>
                    </Container>
                  )}

                  {selectedOption === "Product Reach" && (
                    <Container className="mb-3">
                      <Card as={Col} md="12" className="border-0 whi">
                        <Card.Body>
                          <Card.Title className="">Product Reach</Card.Title>
                          <Card.Text>
                            {/* <ul className="nav brand-tabs">
                              <li>
                                <a
                                  className={
                                    selectedDotShow === "Input key Prompt :"
                                      ? "active"
                                      : ""
                                  }
                                  data-toggle="tab"
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDotShow("Input key Prompt :");
                                  }}
                                >
                                  <span></span> Input key Prompt
                                </a>
                              </li>
                              <li>
                                <a
                                  className={
                                    selectedDotShow ===
                                    "Generate top 3 Prompt :"
                                      ? "active"
                                      : ""
                                  }
                                  data-toggle="tab"
                                  href=""
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDotShow("Generate top 3 Prompt :");
                                  }}
                                >
                                  <span></span> Generate top 3 Prompt
                                </a>
                              </li>
                            </ul> */}
                          </Card.Text>
                          {/* {selectedDotShow === "Input key Prompt :" && ( */}
                          <ul className="focus-on">
                            {["Responses", "Sources"].map((key) => (
                              <li key={key}>
                                <input
                                  type="checkbox"
                                  name=""
                                  value=""
                                  checked={checkedItems.includes(key)}
                                  onChange={() =>
                                    handleCheckBoxChange("Product Reach", key)
                                  }
                                />{" "}
                                {key}
                              </li>
                            ))}
                          </ul>
                          {/* )} */}
                          {/* {selectedDotShow === "Generate top 3 Prompt :" && (
                            <ul className="focus-on">
                              {[
                                "Mention Rate and Ranking",
                                "Competitive Set",
                                "Sources for Brand Info",
                                "Sources for overall Info",
                              ].map((key) => (
                                <li key={key}>
                                  <input
                                    type="checkbox"
                                    name=""
                                    value=""
                                    checked={checkedItems.includes(key)}
                                    onChange={() =>
                                      handleCheckBoxChange("Product Reach", key)
                                    }
                                  />{" "}
                                  {key}
                                </li>
                              ))}
                            </ul>
                          )}
                          <small>
                            Prompt or up to 3 prompts are writtent based on
                            prompt feedback. Also could be a possibility of bot
                            to recommend prompts.
                          </small> */}
                        </Card.Body>
                      </Card>
                    </Container>
                  )}

                  {selectedOption === "Competition" &&
                    selectedOptionShow === "Company/Brand" && (
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
                                        onChange={(e) =>
                                          handleCompetitorChange(index, e)
                                        }
                                      />
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                ""
                              )}

                              <li>
                                What Dimensions Would You Like to Focus On?
                              </li>
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
                                    "Brand Description",
                                    "Top 5 Positive and Negative Attributes",
                                  ].map((key) => (
                                    <li key={key}>
                                      <input
                                        type="checkbox"
                                        name=""
                                        value=""
                                        checked={checkedItems.includes(key)}
                                        onChange={() =>
                                          handleCheckBoxChange(
                                            "Brand Representation Competition",
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
                    )}

                  {selectedOption === "Competition" &&
                    selectedOptionShow === "Product" && (
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
                                        onChange={(e) =>
                                          handleCompetitorChange(index, e)
                                        }
                                      />
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                ""
                              )}

                              <li>
                                What Dimensions Would You Like to Focus On?
                              </li>
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
                    )}

                  {selectedOption === "Dashboard/Reporting" &&
                    selectedOptionShow === "Company/Brand" && (
                      <Container className="mb-3">
                        <Card as={Col} md="12" className="border-0 whi">
                          <Card.Body>
                            <Card.Title className="mb-4">
                              Dashboard/Reporting
                            </Card.Title>

                            <ul className="focus-on">
                              {[
                                "Company Description",
                                "Company Key Facts",
                                "Brand Representation",
                                "Brand Image and Logos",
                                "Executive Bios",
                              ].map((key) => (
                                <li key={key}>
                                  <input
                                    type="checkbox"
                                    name=""
                                    value=""
                                    checked={checkedItems.includes(key)}
                                    onChange={() =>
                                      handleCheckBoxChange(
                                        "Dashboard/Reporting",
                                        key
                                      )
                                    }
                                  />{" "}
                                  {key}
                                </li>
                              ))}
                            </ul>
                          </Card.Body>
                        </Card>
                      </Container>
                    )}

                  {selectedOption === "Dashboard/Reporting" &&
                    selectedOptionShow === "Product" && (
                      <Container className="mb-3">
                        <Card as={Col} md="12" className="border-0 whi">
                          <Card.Body>
                            <Card.Title className="mb-4">
                              Dashboard/Reporting
                            </Card.Title>

                            <ul className="focus-on">
                              {[
                                "Company Description",
                                "Company Key Facts",
                                "Product Representation",
                                "Product Image and Logos",
                                "Executive Bios",
                              ].map((key) => (
                                <li key={key}>
                                  <input
                                    type="checkbox"
                                    name=""
                                    value=""
                                    checked={checkedItems.includes(key)}
                                    onChange={() =>
                                      handleCheckBoxChange(
                                        "Dashboard/Reporting",
                                        key
                                      )
                                    }
                                  />{" "}
                                  {key}
                                </li>
                              ))}
                            </ul>
                          </Card.Body>
                        </Card>
                      </Container>
                    )}

                  <Form.Group as={Col} md="12">
                    <Row>
                      <Col md="4">
                        <Dropdown className="dropdownllms">
                          <Dropdown.Toggle
                            variant="default"
                            id="dropdown-basic"
                          >
                            <span className="dropdown-text lucnhbtn">
                              {selectedCount ? (
                                <>
                                  {" "}
                                  ({selectedCount})<span>Selected </span>{" "}
                                </>
                              ) : (
                                <>
                                  Select LLM<span>s</span>
                                </>
                              )}
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            style={{
                              width: "103%",
                              marginTop: "0px",
                              marginLeft: "-13px",
                              borderRadius: "4px",
                            }}
                          >
                            <Form.Check
                              type="checkbox"
                              label="Select All"
                              className="mb-2 text-xxl data"
                              checked={selectAll}
                              onChange={handleSelectAllChange}
                            />
                            <Dropdown.Divider />

                            {options.map((option, index) => (
                              <Form.Check
                                key={option.name}
                                type="checkbox"
                                label={option.name}
                                className={`mb-2 ${
                                  index >= options.length - 3
                                    ? "gray-checkbox"
                                    : ""
                                } customData`}
                                checked={selectedItems[option.value] || false}
                                onChange={(event) =>
                                  index < options.length - 3 &&
                                  handleCheckChange(
                                    option.value,
                                    event.target.checked
                                  )
                                }
                              />
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                      <Col md="2">
                        <Button
                          type="button"
                          name="firstName"
                          placeholder="Your Brand/Product"
                          className="height2 mb-3"
                          style={{
                            width: "-webkit-fill-available",
                            backgroundColor: "#3dc863",
                            color: "white",
                          }}
                          onClick={handleClickShow}
                          disabled={showData}
                        >
                          {showData ? (
                            <div style={{ fontSize: "19px" }}>
                              <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              Please Wait...
                            </div>
                          ) : (
                            <div>LAUNCH</div>
                          )}
                        </Button>
                      </Col>

                      <Col md="2">
                        <Button
                          type="button"
                          name="firstName"
                          placeholder="Your Brand/Product"
                          className="height2 mb-3"
                          style={{
                            width: "-webkit-fill-available",
                            backgroundColor: "#3dc863",
                            color: "white",
                          }}
                          onClick={handleClickReset}
                          disabled={showData}
                        >
                          RESET
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Row>
              </Form>
            </Container>

            {showGetData === true ? (
              <Row className="mt-5 mb-4">
                <Col md="8">
                  <Card className="border border-secondary-subtle rounded-0">
                    <Card.Header className="float-start p-3 bottom">
                      LLMs
                    </Card.Header>
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
                                  onClick={() =>
                                    copyToClipboard(dataItem[name][0])
                                  }
                                >
                                  <i className="fas fa-clipboard"></i>
                                </a>
                              </nav>
                              <span className="brnd">{name}</span>
                              <h4 className="card-title">{selectedOption} </h4>
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
                        <span className="d-block pb-2">Today</span>
                        <div className="histoblck">
                          <h4 className="card-title2">
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
                            Brand Accuracy...
                          </h4>
                          <span style={{ cursor: "pointer" }}>
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
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
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
                        <div className="histoblck">
                          <h4 className="card-title2">
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
                            Brand Favorability...
                          </h4>
                          <span style={{ cursor: "pointer" }}>
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
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
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
                        <hr />
                        <span className="d-block pb-2">Yesterday</span>
                        <div className="histoblck">
                          <h4 className="card-title2">
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
                            Brand Reach...
                          </h4>
                          <span style={{ cursor: "pointer" }}>
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
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
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
                      </Card.Body>
                    </Container>
                  </Card>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </div>
        </Container>

        <div className="botIcon">
          {/* Chat */}
          <div className="botIconContainer" onClick={toggleChat}>
            {isChatVisible === false ? (
              <div className="iconInner">
                <i className="fa fa-commenting" aria-hidden="true"></i>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* Chat */}
          {/* Chat Message */}
          {isChatVisible === true ? (
            <div className="Layout-open">
              <div className="Messenger_messenger">
                <div className="Messenger_header">
                  <h4 className="Messenger_prompt">Virtual assistant</h4>{" "}
                  <span className="chat_close_icon" onClick={closeChat}>
                    <i className="fa fa-window-close" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="Messenger_content">
                  <div className="defltBox">
                    <p>
                      Welcome! 👋 Ask me about <b>LLMs</b> Assistant or select
                      an option below to get started.
                    </p>
                    <ul>
                      <li>
                        <span>
                          <input
                            style={{
                              marginTop: "5px",
                              position: "relative",
                              top: "2px",
                            }}
                            type="checkbox"
                          />{" "}
                          Brand Representation
                        </span>{" "}
                        <svg
                          id="ucx-e4ee9485-a9e1-4019-ac40-61cc046a1ca5"
                          focusable="false"
                          preserveAspectRatio="xMidYMid meet"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#0f62fe"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          aria-hidden="true"
                          data-di-res-id="26678fd6-58246de"
                          data-di-rand="1697448215957"
                        >
                          <polygon points="18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6"></polygon>
                          <title></title>
                        </svg>
                      </li>
                      <li>
                        <span>
                          <input
                            style={{
                              marginTop: "5px",
                              position: "relative",
                              top: "2px",
                            }}
                            type="checkbox"
                          />{" "}
                          Brand Favorability
                        </span>{" "}
                        <svg
                          id="ucx-e4ee9485-a9e1-4019-ac40-61cc046a1ca5"
                          focusable="false"
                          preserveAspectRatio="xMidYMid meet"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#0f62fe"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          aria-hidden="true"
                          data-di-res-id="26678fd6-58246de"
                          data-di-rand="1697448215957"
                        >
                          <polygon points="18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6"></polygon>
                          <title></title>
                        </svg>
                      </li>
                      <li>
                        <span>
                          <input
                            style={{
                              marginTop: "5px",
                              position: "relative",
                              top: "2px",
                            }}
                            type="checkbox"
                          />{" "}
                          Brand Reach
                        </span>{" "}
                        <svg
                          id="ucx-e4ee9485-a9e1-4019-ac40-61cc046a1ca5"
                          focusable="false"
                          preserveAspectRatio="xMidYMid meet"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#0f62fe"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          aria-hidden="true"
                          data-di-res-id="26678fd6-58246de"
                          data-di-rand="1697448215957"
                        >
                          <polygon points="18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6"></polygon>
                          <title></title>
                        </svg>
                      </li>
                      <li>
                        <span>
                          <input
                            style={{
                              marginTop: "5px",
                              position: "relative",
                              top: "2px",
                            }}
                            type="checkbox"
                          />{" "}
                          Competition
                        </span>{" "}
                        <svg
                          id="ucx-e4ee9485-a9e1-4019-ac40-61cc046a1ca5"
                          focusable="false"
                          preserveAspectRatio="xMidYMid meet"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#0f62fe"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          aria-hidden="true"
                          data-di-res-id="26678fd6-58246de"
                          data-di-rand="1697448215957"
                        >
                          <polygon points="18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6"></polygon>
                          <title></title>
                        </svg>
                      </li>
                      <li>
                        <span>
                          <input
                            style={{
                              marginTop: "5px",
                              position: "relative",
                              top: "2px",
                            }}
                            type="checkbox"
                          />{" "}
                          Hallucination ID
                        </span>{" "}
                        <svg
                          id="ucx-e4ee9485-a9e1-4019-ac40-61cc046a1ca5"
                          focusable="false"
                          preserveAspectRatio="xMidYMid meet"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#0f62fe"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          aria-hidden="true"
                          data-di-res-id="26678fd6-58246de"
                          data-di-rand="1697448215957"
                        >
                          <polygon points="18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6"></polygon>
                          <title></title>
                        </svg>
                      </li>
                    </ul>
                  </div>
                  <div className="Messages">
                    <div className="Messages_list">{messageList}</div>
                  </div>
                  <form id="messenger" onSubmit={handleSubmit}>
                    <div className="Input Input-blank">
                      {/* <!-- 	<textarea name="msg" className="Input_field" placeholder="Send a message..."></textarea> --> */}
                      <input
                        name="msg"
                        className="Input_field"
                        placeholder="What Would You Like to Focus On?"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="Input_button Input_button-send"
                      >
                        <div className="Icon">
                          <svg
                            viewBox="1496 193 57 54"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <g
                              id="Group-9-Copy-3"
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                              transform="translate(1523.000000, 220.000000) rotate(-270.000000) translate(-1523.000000, -220.000000) translate(1499.000000, 193.000000)"
                            >
                              <path
                                d="M5.42994667,44.5306122 L16.5955554,44.5306122 L21.049938,20.423658 C21.6518463,17.1661523 26.3121212,17.1441362 26.9447801,20.3958097 L31.6405465,44.5306122 L42.5313185,44.5306122 L23.9806326,7.0871633 L5.42994667,44.5306122 Z M22.0420732,48.0757124 C21.779222,49.4982538 20.5386331,50.5306122 19.0920112,50.5306122 L1.59009899,50.5306122 C-1.20169244,50.5306122 -2.87079654,47.7697069 -1.64625638,45.2980459 L20.8461928,-0.101616237 C22.1967178,-2.8275701 25.7710778,-2.81438868 27.1150723,-0.101616237 L49.6075215,45.2980459 C5.08414042,47.7885641 49.1422456,50.5306122 46.3613062,50.5306122 L29.1679835,50.5306122 C27.7320366,50.5306122 26.4974445,49.5130766 26.2232033,48.1035608 L24.0760553,37.0678766 L22.0420732,48.0757124 Z"
                                id="sendicon"
                                fill="#96AAB4"
                                fillRule="nonzero"
                              ></path>
                            </g>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Chat Message */}
        </div>
      </Container>
      <NotificationContainer />
    </div>
  );
}

export default MainPage;
