import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "../../../context/Auth";
import MenuList from "./MenuList";
import LoginForm from "../LoginForm";
import SideBar from "../SideBar";

/**
 * Renders navigation bar
 * @param {Object} props - react props
 * @returns {JSX.Element}
 */
const Menu = ({ title }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const path = useParams();

  const menuLinks = [
    {
      text: "Dashboard",
      path: "/TESTOWEID",
      icon: <FontAwesomeIcon icon={faClipboard} />,
      isActive: path === "/TESTOWEID",
    },
    {
      text: "Home",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      text: "Log in",
      icon: <FontAwesomeIcon icon={faPowerOff} />,
    },
  ];

  const sideMenuHandler = direction => {
    if (typeof direction === "boolean") {
      setIsSideMenuOpen(direction);
    } else {
      setIsSideMenuOpen(prev => !prev);
    }
  };

  const links = isLoggedIn ? menuLinks : menuLinks.slice(1);

  return (
    <>
      <MenuBar>
        {title && <MenuTitle>{title}</MenuTitle>}
        <MenuList listItems={links} toggleMenuVisibility={sideMenuHandler} />
      </MenuBar>

      <SideBar isOpen={isSideMenuOpen}>
        <LoginForm />
      </SideBar>
    </>
  );
};

Menu.propTypes = {
  title: PropTypes.string,
};

const MenuTitle = styled.h1`
  margin-right: auto;
  margin-left: 1rem;
  text-align: left;
  color: white;
`;

const MenuBar = styled.div`
  position: relative;
  grid-area: 1/1/2/-1;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  background-color: ${({ theme }) => theme.colors.main};

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme, dark }) =>
      dark ? "rgb(150, 150, 150)" : theme.colors.blue};
    clip-path: circle(200px at right bottom);
  }
`;

export default Menu;
