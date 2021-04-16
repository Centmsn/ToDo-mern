import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * Functional react component - renders button component
 * @param {Object} props - react props
 * @returns {JSX.Element}
 * @example
 * <Btn
 *  onClick={() => console.log("clicked")
 *  danger={true} path="/index.html"}
 * >
 *  <span>description</span>
 * </Btn>
 *
 */
const Button = ({
  path,
  onClick,
  children,
  isActive = false,
  disabled = false,
  danger = undefined,
}) => {
  const handleOnClick = e => {
    if (!path) {
      e.preventDefault();
    }

    if (!disabled && typeof onClick === "function") onClick();
  };

  return (
    <Btn
      to={path}
      as={!path && "button"}
      onClick={handleOnClick}
      isActive={isActive}
      disabled={disabled}
      danger={danger}
    >
      {children}
    </Btn>
  );
};

Button.propTypes = {
  /**
   * adding a path will cause the component to render <a> tag instead of <button>
   */
  path: PropTypes.string,

  /**
   * function which will be triggred on click
   */
  onClick: PropTypes.func,

  /**
   * if set to true hover effect will be displayed permanently
   */
  isActive: PropTypes.bool,

  /**
   * if set to true component will not display hover effect, onClick function will not be triggered
   */
  disabled: PropTypes.bool,

  /**
   * Changes button theme to red
   */
  danger: PropTypes.bool,
};

const Btn = styled(Link)`
  position: relative;
  margin: 0 1rem;

  display: flex;

  box-shadow: inset 0 0 0px 2px
    ${({ theme, danger }) =>
      danger ? theme.colors.red["500"] : theme.colors.off};
  border-radius: 5px;

  font-size: 1.5rem;

  background-color: ${({ danger, theme }) =>
    danger ? theme.colors.red[200] : "white"};
  filter: grayscale(${({ disabled }) => (disabled ? "1" : "0")});
  color: ${({ danger }) => (danger ? "white" : "gray")};

  padding: 1rem;
  transition: 300ms;

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

    background-color: ${({ theme, danger }) =>
      danger ? theme.colors.red["500"] : theme.colors.off};
    clip-path: ${({ isActive }) =>
      isActive ? "circle(100% at left bottom)" : "circle(0 at left bottom)"};
    transition: 0.4s linear;
  }

  &:hover&:before {
    clip-path: circle(
      ${({ disabled }) => (disabled ? "0" : "100%")} at left bottom
    );
  }
`;

export default Button;
