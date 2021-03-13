import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";

import MenuList from "./MenuList";
import LoginForm from "../LoginForm";

const menuLinks = [
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

/**
 * Renders navigation bar
 * @param {Object} props - react props
 * @returns {JSX.Element}
 */
const Menu = ({ title }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const sideMenuHandler = direction => {
    console.log(direction);
    if (typeof direction === "boolean") {
      setIsSideMenuOpen(direction);
    } else {
      setIsSideMenuOpen(prev => !prev);
    }
  };

  return (
    <>
      <MenuBar>
        {title && <MenuTitle>{title}</MenuTitle>}
        <MenuList
          listItems={menuLinks}
          toggleMenuVisibility={sideMenuHandler}
        />
      </MenuBar>

      <CSSTransition
        in={isSideMenuOpen}
        classNames="test"
        timeout={300}
        unmountOnExit
      >
        <LoginForm />
      </CSSTransition>
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
