import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import * as routerLink from "../../config/routersConfig";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { usersState } from "../../services/redux/selectors/selectors";
import { checkLoginStatus } from "../../utils/functions/commonFunctions";
import { removeLocalStorage } from "../../services/Storage/localStorage";
import { removeSessionStorage } from "../../services/Storage/sessionStorage";
import * as Ri from "react-icons/ri";

function Header() {
  let userName = useRef("");
  let navigate = useNavigate();
  let usState = useSelector(usersState);
  const [permission, setPermission] = useState("none");
  const [websiteSize, setWebsiteSize] = useState("none");
  let navbarElement = <></>;
  let userBarElementMb = <></>;
  let userBarElementPc = <></>;

  useEffect(() => {
    if (window.innerWidth >= 1006) setWebsiteSize("pc");
    else setWebsiteSize("mobile");

    let loginStatus = checkLoginStatus();
    if (usState.length !== 0) {
      usState.forEach((user) => {
        if (
          user.email === loginStatus.email &&
          user.password === loginStatus.password &&
          user.statusUser
        ) {
          userName.current = user.userName;
          setPermission(user.typeUser);
        }
      });
    }
  }, [usState]);

  const logOutAcc = (e) => {
    e.preventDefault();
    navigate(routerLink.index.path);
    removeLocalStorage("loginStatus");
    removeSessionStorage("loginStatus");
    setPermission("none");
  };

  window.addEventListener("resize", () => {
    if (window.innerWidth < 1006) {
      if (websiteSize === "pc") {
        setWebsiteSize("mobile");
      }
    } else if (websiteSize === "mobile") {
      setWebsiteSize("pc");
    }
  });

  //===================Render UserNavbar===================//
  if (permission === "user") {
    userBarElementMb = (
      <>
        <hr />
        {/* <NavDropdown.ItemText>
          <NavLink to={routerLink.user.path}>Th??ng tin c?? nh??n </NavLink>
        </NavDropdown.ItemText> */}
        <NavDropdown.ItemText>
          <NavLink to={routerLink.cart.path}>Qu???n l?? ????n h??ng</NavLink>
        </NavDropdown.ItemText>
        <NavDropdown.ItemText>
          <NavLink to={routerLink.favorite.path}>Y??u th??ch</NavLink>
        </NavDropdown.ItemText>
        <NavDropdown.ItemText>
          <Link to={"/"} onClick={logOutAcc}>
            ????ng xu???t
          </Link>
        </NavDropdown.ItemText>
      </>
    );
    userBarElementPc = (
      <>
        <NavDropdown
          title={
            <>
              <Ri.RiUserLine style={{ marginTop: "-3px" }} />
              <span> </span>
              {userName.current}
            </>
          }
          id="collasible-nav-dropdown"
        >
          {/* <NavDropdown.ItemText>
            <NavLink to={routerLink.user.path}>Th??ng tin c?? nh??n </NavLink>
          </NavDropdown.ItemText> */}
          <NavDropdown.ItemText>
            <NavLink to={routerLink.cart.path}>Qu???n l?? ????n h??ng</NavLink>
          </NavDropdown.ItemText>
          <NavDropdown.ItemText>
            <NavLink to={routerLink.favorite.path}>Y??u th??ch</NavLink>
          </NavDropdown.ItemText>
          <NavDropdown.ItemText>
            <Link to={"/"} onClick={logOutAcc}>
              ????ng xu???t
            </Link>
          </NavDropdown.ItemText>
        </NavDropdown>
      </>
    );
  } else if (permission === "admin") {
    userBarElementMb = (
      <>
        <hr />
        <NavDropdown.ItemText>
          <NavLink to={routerLink.admin.path}>Qu???n tr???</NavLink>
        </NavDropdown.ItemText>
        <NavDropdown.ItemText>
          <Link to={"#"} onClick={logOutAcc}>
            ????ng xu???t
          </Link>
        </NavDropdown.ItemText>
      </>
    );
    userBarElementPc = (
      <>
        <NavDropdown
          title={
            <>
              <Ri.RiAdminFill style={{ marginTop: "-3px" }} />
              <span> </span>
              Admin
            </>
          }
          id="collasible-nav-dropdown"
        >
          <NavDropdown.ItemText>
            <NavLink to={routerLink.admin.path}>Qu???n tr???</NavLink>
          </NavDropdown.ItemText>
          <NavDropdown.ItemText>
            <Link to={"/"} onClick={logOutAcc}>
              ????ng xu???t
            </Link>
          </NavDropdown.ItemText>
        </NavDropdown>
      </>
    );
  } else if (permission === "none") {
    userBarElementMb = (
      <>
        <hr />
        <NavDropdown.ItemText>
          <NavLink to={routerLink.login.path}>????ng nh???p</NavLink>
        </NavDropdown.ItemText>
        <NavDropdown.ItemText>
          <NavLink to={routerLink.register.path}>????ng k??</NavLink>
        </NavDropdown.ItemText>
      </>
    );
    userBarElementPc = (
      <>
        <Nav>
          <NavLink to={routerLink.login.path}>????ng nh???p</NavLink>
        </Nav>
        <Nav>
          <NavLink to={routerLink.register.path}>????ng k??</NavLink>
        </Nav>
      </>
    );
  }

  //===================Render Navbar===================//
  if (websiteSize === "mobile") {
    navbarElement = (
      <>
        <Nav>
          <NavLink to={routerLink.index.path}>Trang ch???</NavLink>
        </Nav>
        <Nav>
          <NavLink to={routerLink.products.path}>S???n ph???m</NavLink>
        </Nav>
        <Nav>
          <hr />
          <NavDropdown title="Kh??c" id="collasible-nav-dropdown">
            <NavDropdown.ItemText>
              <NavLink to={routerLink.about.path}>Gi???i thi???u</NavLink>
            </NavDropdown.ItemText>
            <NavDropdown.ItemText>
              <NavLink to={routerLink.client.path}>Kh??ch h??ng</NavLink>
            </NavDropdown.ItemText>
            <NavDropdown.ItemText>
              <NavLink to={routerLink.contact.path}>Li??n h???</NavLink>
            </NavDropdown.ItemText>
            {userBarElementMb}
          </NavDropdown>
        </Nav>
      </>
    );
  }
  if (websiteSize === "pc") {
    navbarElement = (
      <>
        <Nav className="me-auto header_navbar_center">
          <Nav>
            <NavLink to={routerLink.index.path}>Trang ch???</NavLink>
          </Nav>
          <Nav>
            <NavLink to={routerLink.products.path}>S???n ph???m</NavLink>
          </Nav>
          <Nav>
            <NavLink to={routerLink.about.path}>Gi???i thi???u</NavLink>
          </Nav>
          <Nav>
            <NavLink to={routerLink.client.path}>Kh??ch h??ng</NavLink>
          </Nav>
          <Nav>
            <NavLink to={routerLink.contact.path}>Li??n h???</NavLink>
          </Nav>
        </Nav>
        <Nav>
          <hr />
          {userBarElementPc}
        </Nav>
      </>
    );
  }

  return (
    <header className="header-area">
      {/* header section start */}
      <div className="header_main_section">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar>
              <Link to={routerLink.index.path} className="navbar-brand">
                SHOES SHOP
              </Link>
            </Navbar>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {navbarElement}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {/* header section end */}
    </header>
  );
}

export default Header;
