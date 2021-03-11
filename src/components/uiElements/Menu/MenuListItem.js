import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuListItem = ({ text, path, icon }) => {
  return (
    <li>
      <StyledLink to={path}>
        <span>{icon}</span> <span>{text}</span>
      </StyledLink>
    </li>
  );
};

const StyledLink = styled(Link)`
  position: relative;
  margin: 0 1rem;

  display: flex;

  box-shadow: inset 0 0 0px 2px ${({ theme }) => theme.colors.off};
  border-radius: 5px;

  font-size: 1.5rem;

  background-color: white;
  color: gray;

  padding: 1rem;
  transition: 300ms;
  cursor: pointer;

  span {
    z-index: 999;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.off};
    clip-path: circle(0 at left bottom);
    transition: 0.4s linear;
  }

  &:hover&:before {
    clip-path: circle(100% at left bottom);
  }
`;

export default MenuListItem;
