import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import MenuList from "./MenuList";

const menuLinks = [
  {
    text: "Home",
    path: "/",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  {
    text: "Login",
    path: "/login",
    icon: <FontAwesomeIcon icon={faPowerOff} />,
  },
];

const Menu = ({ title }) => {
  return (
    <MenuBar>
      {title && <MenuTitle>{title}</MenuTitle>}
      <MenuList listItems={menuLinks} />
    </MenuBar>
  );
};

const MenuTitle = styled.h1`
  margin-right: auto;
  margin-left: 1rem;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray};
`;

const MenuBar = styled.div`
  grid-area: 1/1/2/-1;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  box-shadow: inset 0 0 2px 0 ${({ theme }) => theme.colors.off};

  background-color: ${({ theme }) => theme.colors.main};
`;

export default Menu;
