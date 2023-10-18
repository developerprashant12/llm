import React, { useState, useEffect } from "react";
import "../App.css";
import {
  Container,
  Navbar,
  Form,
  Row,
  Col,
  Button,
  Card,
  Dropdown,
} from "react-bootstrap";

function MainPage() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isCheckedAccuracy, setIsCheckedAccuracy] = useState(false);
  const [isCheckedFavorability, setIsCheckedFavorability] = useState(false);
  const [isCheckedReach, setIsCheckedReach] = useState(false);
  const [isCheckedCompetition, setIsCheckedCompetition] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  //--------------------------------------Select Data-------------------------------------//
  const options = ["GPT4", "GPT4/Bing", "SGE", "BARD", "Llama"];
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (label, isChecked) => {
    const updatedSelectedItems = { ...selectedItems, [label]: isChecked };
    setSelectedItems(updatedSelectedItems);

    const newSelectedCount =
      Object.values(updatedSelectedItems).filter(Boolean).length;
    setSelectedCount(newSelectedCount);
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);

    const updatedSelectedItems = {};
    options.forEach((option) => {
      updatedSelectedItems[option] = isChecked;
    });

    setSelectedItems(updatedSelectedItems);
    setSelectedCount(isChecked ? options.length : 0);
  };
  //--------------------------------------Select Data-------------------------------------//

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

  const handleFormGroupClick = (checkboxName) => {
    switch (checkboxName) {
      case "BrandAccuracy":
        setIsCheckedAccuracy(!isCheckedAccuracy);
        break;
      case "BrandFavorability":
        setIsCheckedFavorability(!isCheckedFavorability);
        break;
      case "BrandReach":
        setIsCheckedReach(!isCheckedReach);
        break;
      case "Competition":
        setIsCheckedCompetition(!isCheckedCompetition);
        break;
      default:
        break;
    }
  };

  const toggleChat = () => {
    console.log("hii");
    setIsChatVisible(true);
  };

  const closeChat = () => {
    console.log("hello");
    setIsChatVisible(false);
  };

  return (
    <div>
      <Navbar className="bg-white p-2 mb-5">
        <Container fluid>
          <Navbar.Brand className="navbar-brand mb-0 h1 d-none d-md-block">
            <img
              alt=""
              src="http://elancethemes.com/36/LLMsApplication/menu.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            &nbsp; LLM and Co-Pilot Brand Navigator
            <br />
            <span className="fs-6" style={{ marginLeft: "3rem" }}>
              Brand discovery for LLMs
            </span>
          </Navbar.Brand>
          <Navbar.Brand className="d-flex flex-1 d-block d-md-none">
            <a href="#" className="sidebar-toggle ml-3">
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
                src="http://elancethemes.com/36/LLMsApplication/profile.png"
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
                <Dropdown.Item href="#action/1">My Profile</Dropdown.Item>
                <Dropdown.Item href="#action/2">Settings</Dropdown.Item>
                <hr className="mt-2 mb-2" />
                <Dropdown.Item href="#action/2" className="text-danger">
                  Sign out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Container className="border border-secondary-subtle">
          <Container className="mt-2 mb-5">
            <h5 className="float-start fw-normal text">
              Find your LLM Benchmark
            </h5>
            <Form className="form-inline form-quicksearch d-none d-md-block mx-auto mt-2">
              <Form.Group>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Your Brand/Product"
                  className="height0 custom-placeholder mb-3"
                />
              </Form.Group>
              <Row className="mb-3 mt-5">
                <h5 className="float-start fw-normal text">
                  What Would You Like to Focus On?
                </h5>
                <Form.Group
                  as={Col}
                  md="6"
                  onClick={() => handleFormGroupClick("BrandAccuracy")}
                  className="cursor-pointer"
                >
                  <Form.Check
                    type="checkbox"
                    name="firstName"
                    label="Brand Accuracy"
                    className="height1 custom-checkbox mb-3"
                    checked={isCheckedAccuracy}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="6"
                  onClick={() => handleFormGroupClick("BrandFavorability")}
                  className="cursor-pointer"
                >
                  <Form.Check
                    type="checkbox"
                    name="firstName"
                    label="Brand Favorability"
                    className="height1 custom-checkbox mb-3"
                    checked={isCheckedFavorability}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  onClick={() => handleFormGroupClick("BrandReach")}
                  className="cursor-pointer"
                >
                  <Form.Check
                    type="checkbox"
                    name="firstName"
                    label="Brand Reach"
                    className="height1 custom-checkbox mb-3"
                    checked={isCheckedReach}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="6"
                  onClick={() => handleFormGroupClick("Competition")}
                  className="cursor-pointer"
                >
                  <Form.Check
                    type="checkbox"
                    name="firstName"
                    label="Competition"
                    className="height1 custom-checkbox mb-3"
                    checked={isCheckedCompetition}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Row>
                    <Col md="8">
                      <Dropdown className="dropdownllms">
                        <Dropdown.Toggle variant="default" id="dropdown-basic">
                          <span className="dropdown-text lucnhbtn">
                            {" "}
                            Select LLM<span>s</span> ({selectedCount} Selected)
                          </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          style={{
                            width: "103%",
                            marginTop: "6px",
                            marginLeft: "-10px",
                            borderRadius: "4px",
                          }}
                        >
                          <Form.Check
                            type="checkbox"
                            label="Select All"
                            className="mb-2 text-xxl"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                          />
                          <Dropdown.Divider />

                          {options.map((option) => (
                            <Form.Check
                              key={option}
                              type="checkbox"
                              label={option}
                              className="mb-2"
                              checked={selectedItems[option] || false}
                              onChange={(event) =>
                                handleCheckboxChange(
                                  option,
                                  event.target.checked
                                )
                              }
                            />
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                    <Col md="4">
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
                      >
                        LAUNCH
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
            </Form>
          </Container>
        </Container>
        <Row className="mt-5">
          <Col md="8">
            <Card className="border border-secondary-subtle mb-5 rounded-0">
              <Card.Header className="float-start  p-3 bottom">
                LLMs
              </Card.Header>
              <Container className="mt-3">
                <Card.Body>
                  <div className="dboxcont">
                    <nav className="card-header-actions">
                      <a
                        className="card-header-action"
                        aria-expanded="false"
                        aria-controls="card1"
                        title="Copy"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fas fa-clipboard"></i>
                      </a>
                    </nav>
                    <span className="brnd">GPT4</span>
                    <h4 className="card-title">Brand Accuracy</h4>
                    <p className="card-text">
                      What dimensions do you want to focus on (choose all that
                      apply)
                    </p>
                    <ul>
                      <li>Brand Description</li>
                      <li>Brand Logo</li>
                      <li>Product Portfolio</li>
                      <ul>
                        <li>Product Description</li>
                        <li>Price</li>
                        <li>Retail Distribution</li>
                      </ul>
                      <li>Cited Sources</li>
                      <li>Other</li>
                    </ul>
                    <small>
                      <b>Note:</b> Interactive bot would ask what the user would
                      like to focus on. Prompt is written based on this feedback
                    </small>
                  </div>
                  <hr />
                  <div className="dboxcont">
                    <nav className="card-header-actions">
                      <a
                        className="card-header-action"
                        aria-expanded="false"
                        aria-controls="card1"
                        title="Copy"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fas fa-clipboard"></i>
                      </a>
                    </nav>
                    <span className="brnd">GPT4/Bing</span>
                    <h4 className="card-title">Brand Accuracy</h4>
                    <p className="card-text">
                      What dimensions do you want to focus on (choose all that
                      apply)
                    </p>
                    <ul>
                      <li>Brand Description</li>
                      <li>Brand Logo</li>
                      <li>Product Portfolio</li>
                      <ul>
                        <li>Product Description</li>
                        <li>Price</li>
                        <li>Retail Distribution</li>
                      </ul>
                      <li>Cited Sources</li>
                      <li>Other</li>
                    </ul>
                    <small>
                      <b>Note:</b> Interactive bot would ask what the user would
                      like to focus on. Prompt is written based on this feedback
                    </small>
                  </div>
                  <hr />
                  <div className="dboxcont">
                    <nav className="card-header-actions">
                      <a
                        className="card-header-action"
                        aria-expanded="false"
                        aria-controls="card1"
                        title="Copy"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fas fa-clipboard"></i>
                      </a>
                    </nav>
                    <span className="brnd">SGE</span>
                    <h4 className="card-title">Brand Accuracy</h4>
                    <p className="card-text">
                      What dimensions do you want to focus on (choose all that
                      apply)
                    </p>
                    <ul>
                      <li>Brand Description</li>
                      <li>Brand Logo</li>
                      <li>Product Portfolio</li>
                      <ul>
                        <li>Product Description</li>
                        <li>Price</li>
                        <li>Retail Distribution</li>
                      </ul>
                      <li>Cited Sources</li>
                      <li>Other</li>
                    </ul>
                    <small>
                      <b>Note:</b> Interactive bot would ask what the user would
                      like to focus on. Prompt is written based on this feedback
                    </small>
                  </div>
                  <hr />
                  <div className="dboxcont">
                    <nav className="card-header-actions">
                      <a
                        className="card-header-action"
                        aria-expanded="false"
                        aria-controls="card1"
                        title="Copy"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fas fa-clipboard"></i>
                      </a>
                    </nav>
                    <span className="brnd">BARD</span>
                    <h4 className="card-title">Brand Accuracy</h4>
                    <p className="card-text">
                      What dimensions do you want to focus on (choose all that
                      apply)
                    </p>
                    <ul>
                      <li>Brand Description</li>
                      <li>Brand Logo</li>
                      <li>Product Portfolio</li>
                      <ul>
                        <li>Product Description</li>
                        <li>Price</li>
                        <li>Retail Distribution</li>
                      </ul>
                      <li>Cited Sources</li>
                      <li>Other</li>
                    </ul>
                    <small>
                      <b>Note:</b> Interactive bot would ask what the user would
                      like to focus on. Prompt is written based on this feedback
                    </small>
                  </div>
                  <hr />
                  <div className="dboxcont">
                    <nav className="card-header-actions">
                      <a
                        className="card-header-action"
                        aria-expanded="false"
                        aria-controls="card1"
                        title="Copy"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fas fa-clipboard"></i>
                      </a>
                    </nav>
                    <span className="brnd">LIama</span>
                    <h4 className="card-title">Brand Accuracy</h4>
                    <p className="card-text">
                      What dimensions do you want to focus on (choose all that
                      apply)
                    </p>
                    <ul>
                      <li>Brand Description</li>
                      <li>Brand Logo</li>
                      <li>Product Portfolio</li>
                      <ul>
                        <li>Product Description</li>
                        <li>Price</li>
                        <li>Retail Distribution</li>
                      </ul>
                      <li>Cited Sources</li>
                      <li>Other</li>
                    </ul>
                    <small>
                      <b>Note:</b> Interactive bot would ask what the user would
                      like to focus on. Prompt is written based on this feedback
                    </small>
                  </div>
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
        <div className="botIcon">
          {/* Chat */}
          <div className="botIconContainer" onClick={toggleChat}>
            {isChatVisible === false ? <div className="iconInner">
              <i className="fa fa-commenting" aria-hidden="true"></i>
            </div> : ""}
           
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
                          Brand Accuracy
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
                    </ul>
                  </div>
                  <div className="Messages">
                    <div className="Messages_list"></div>
                  </div>
                  <form id="messenger">
                    <div className="Input Input-blank">
                      {/* <!-- 	<textarea name="msg" className="Input_field" placeholder="Send a message..."></textarea> --> */}
                      <input
                        name="msg"
                        className="Input_field"
                        placeholder="What Would You Like to Focus On?"
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
    </div>
  );
}

export default MainPage;
