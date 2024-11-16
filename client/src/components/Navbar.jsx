import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";

function SBNavbar() {
  let expand = "lg";

  const usertype = localStorage.getItem("usertype");

  const navigate = useNavigate();

  const { logout } = useContext(GeneralContext);
  return (
    usertype && (
      <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="/">SB Works</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                SB Works
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 gap-2">
                {usertype === "freelancer" && (
                  <>
                    <Nav.Link>
                      <p onClick={() => navigate("/freelancer")}>Dashboard</p>
                    </Nav.Link>
                    <Nav.Link>
                      <p onClick={() => navigate("/all-projects")}>
                        All Projects
                      </p>
                    </Nav.Link>
                    <Nav.Link>
                      <p onClick={() => navigate("/my-projects")}>
                        My Projects
                      </p>
                    </Nav.Link>
                    <Nav.Link>
                      <p onClick={() => navigate("/myApplications")}>
                        Applications
                      </p>
                    </Nav.Link>
                    <Nav.Link>
                      <p onClick={() => logout()}>Logout</p>
                    </Nav.Link>
                  </>
                )}

                {usertype === "client" && (
                  <>
                    <Nav.Link>
                      <p onClick={() => navigate("/client")}>Dashboard</p>
                    </Nav.Link>
                    <Nav.Link>
                      <p onClick={() => navigate("/new-project")}>
                        New Project
                      </p>
                    </Nav.Link>
                    <Nav.Link>
                      <p onClick={() => navigate("/project-applications")}>
                        Applications
                      </p>
                    </Nav.Link>
                    <Nav.Link>
                      <p onClick={() => logout()}>Logout</p>
                    </Nav.Link>
                  </>
                )}

                {usertype === "admin" && (
                  <>
                    <Nav.Link>
                      <p onClick={() => navigate("/admin")}>Home</p>
                    </Nav.Link>
                    <Nav.Link>
                      <p onClick={() => navigate("/all-users")}>All users</p>
                    </Nav.Link>
                    <Nav.Link>
                      <p onClick={() => navigate("/admin-projects")}>
                        Projects
                      </p>
                    </Nav.Link>
                    <Nav.Link>
                      <p onClick={() => navigate("/admin-applications")}>
                        Applications
                      </p>
                    </Nav.Link>
                    <Nav.Link>
                      <p onClick={() => logout()}>Logout</p>
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    )
  );
}

export default SBNavbar;
