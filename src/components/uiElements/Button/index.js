import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = ({ path, as, onClick, children }) => {
  return (
    <Btn as={as} to={path} onClick={onClick}>
      {children}
    </Btn>
  );
};

const Btn = styled(Link)`
  position: relative;
  margin: 0.5rem 1rem;

  display: flex;

  box-shadow: inset 0 0 0px 2px ${({ theme }) => theme.colors.off};
  outline: none;
  border-radius: 5px;

  font-size: 1.5rem;

  background-color: white;
  color: gray;

  padding: 1rem;
  transition: 300ms;
  cursor: pointer;

  span {
    z-index: 999;
    margin: 0 0.1rem;
  }

  &:focus&:before {
    clip-path: circle(100% at left bottom);
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    border-radius: 5px;

    background-color: ${({ theme }) => theme.colors.off};
    clip-path: circle(0 at left bottom);
    transition: 0.4s linear;
  }

  &:hover&:before {
    clip-path: circle(100% at left bottom);
  }
`;

export default Button;
