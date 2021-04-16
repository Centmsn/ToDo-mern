import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "context/Auth";
import MenuList from "./MenuList";
import LoginForm from "components/uiElements/LoginForm";
import SideBar from "components/uiElements/SideBar";

/**
 * Renders navigation bar
 * @param {Object} props - react props
 * @returns {JSX.Element}
 */
const Menu = ({ title }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const menuLinks = [
    {
      text: "Dashboard",
      path: "/userPanel",
      icon: <FontAwesomeIcon icon={faClipboard} />,
    },
    {
      text: "Home",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      text: isLoggedIn ? "Logout" : "Login",
      icon: <FontAwesomeIcon icon={faPowerOff} />,
    },
  ];

  const sideMenuHandler = direction => {
    if (!isLoggedIn) {
      if (typeof direction === "boolean") {
        setIsFormOpen(direction);
      } else {
        setIsFormOpen(prev => !prev);
      }
    } else {
      history.push("/");
      setIsLoggedIn(false);
    }
  };

  const links = isLoggedIn ? menuLinks : menuLinks.slice(1);

  return (
    <>
      <MenuBar>
        {title && <MenuTitle>{title}</MenuTitle>}
        <MenuList listItems={links} toggleMenuVisibility={sideMenuHandler} />
      </MenuBar>

      {!isLoggedIn && (
        <SideBar isOpen={isFormOpen} setIsOpen={() => setIsFormOpen(false)}>
          <LoginForm />
        </SideBar>
      )}
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
  z-index: 9999;
  position: relative;
  grid-area: 1/1/2/-1;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  box-shadow: 0 0 4px 0 black;

  background-color: ${({ theme }) => theme.colors.main};

  padding: 0.5rem 0;

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
