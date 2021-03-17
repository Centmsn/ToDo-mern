import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const path = useParams();
  const history = useHistory();

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
      text: isLoggedIn ? "Logout" : "Login",
      icon: <FontAwesomeIcon icon={faPowerOff} />,
    },
  ];

  const sideMenuHandler = direction => {
    if (!isLoggedIn) {
      if (typeof direction === "boolean") {
        setIsFormOpen(direction);
      } else {
        setIsFormOpen(!isFormOpen);
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
        <SideBar isOpen={isFormOpen}>
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
