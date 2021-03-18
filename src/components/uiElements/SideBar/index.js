import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * Functional react component - renders side bar on the screen
 * @param {Object} props - react props
 * @returns {JSX.Element}
 */
const SideBar = ({ children, isOpen, size = "30vw" }) => {
  let timeout = size.match(/\d/g).join("") * 1;

  if (timeout < 100) timeout = timeout * 10;
  else if (timeout > 1000) timeout = 1000;

  return (
    <CSSTransition
      in={isOpen}
      classNames={"bar"}
      timeout={timeout}
      unmountOnExit
    >
      <Wrapper size={size}>{children}</Wrapper>
    </CSSTransition>
  );
};

SideBar.propTypes = {
  /**
   * Determinates if component is visible
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * Sets components width, all units are accepted
   */
  size: PropTypes.string,
};

const Wrapper = styled.div`
  position: absolute;
  top: calc(100vh / 12);
  right: 0;
  bottom: 0;

  width: ${({ size }) => size};
  min-width: 200px;

  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.colors.main};

  transition: 300ms;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    background-color: ${({ theme, dark }) =>
      dark ? "rgb(150, 150, 150)" : theme.colors.blue};
    clip-path: circle(200px at right top);
  }

  &.bar-enter {
    transform: translateX(${({ size }) => size});
  }

  &.bar-enter-active {
    transform: translateX(0);
  }

  &.bar-exit {
    transform: translateX(0);
  }

  &.bar-exit-active {
    transform: translateX(${({ size }) => size});
  }
`;

export default SideBar;
