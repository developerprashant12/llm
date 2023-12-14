import React,{useState} from 'react'
import { Navbar, Container, Dropdown, Modal } from "react-bootstrap";
import "../../App.css";

function CustomNavbar({ toggleDropdown, isDropdownOpen }) {


   const [isModalOpen, setIsModalOpen] = useState(false);

   const userProfile = {
     name: "John Doe",
     email: "john@example.com",
     bio: "Software Developer",
     location: "Cityville",
   };

   const openModal = () => {
     setIsModalOpen(true);
   };

   const closeModal = () => {
     setIsModalOpen(false);
   };


  return (
    <div>
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
            &nbsp; LLM and Co-Pilot Brand Luminaire
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
                <Dropdown.Item href="" onClick={openModal}>
                  My Profile
                </Dropdown.Item>
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
      <Modal show={isModalOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Profile Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <p>
              <strong>Name:</strong> {userProfile.name}
            </p>
            <p>
              <strong>Email:</strong> {userProfile.email}
            </p>
            <p>
              <strong>Bio:</strong> {userProfile.bio}
            </p>
            <p>
              <strong>Location:</strong> {userProfile.location}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="modalClose rounded"
            style={{
              backgroundColor: "#3dc863",
              color: "white",
              border: "1px solid #3dc863",
            }}
            onClick={closeModal}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomNavbar;