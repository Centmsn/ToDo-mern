import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

/**
 * Functional react component - renders side bar on the screen
 * @param {Object} props - react props
 * @returns {JSX.Element}
 */
const SideBar = ({ children, isOpen, setIsOpen, size = "30vw" }) => {
  const backdropRef = useRef(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const handleBackdropClick = () => {
      setIsOpen();
    };

    backdrop.addEventListener("click", handleBackdropClick);

    return () => {
      backdrop.removeEventListener("click", handleBackdropClick);
    };
  }, [setIsOpen]);

  let timeout = size.match(/\d/g).join("") * 1;

  if (timeout < 100) timeout = timeout * 10;
  else if (timeout > 1000) timeout = 1000;

  return (
    <>
      <Backdrop ref={backdropRef} isOpen={isOpen}></Backdrop>
      <CSSTransition
        in={isOpen}
        classNames={"bar"}
        timeout={timeout}
        unmountOnExit
      >
        <Bar size={size}>
          {setIsOpen && (
            <CloseBtn onClick={setIsOpen}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseBtn>
          )}

          {children}
        </Bar>
      </CSSTransition>
    </>
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

  /**
   * function which triggers isOpen state change
   */
  setIsOpen: PropTypes.func.isRequired,
};

const Bar = styled.div`
  position: absolute;
  z-index: 9999;
  top: calc(100vh / 12);
  right: 0;
  bottom: 0;

  width: ${({ size }) => size};
  min-width: 200px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  box-shadow: 0 5px 4px 0 black;

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

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;

  font-size: 1.5rem;

  color: white;
  transition: transform 300ms;

  &:hover {
    transform: scale(1.25);
    color: ${({ theme }) => theme.colors.off};
  }
`;

const Backdrop = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

  background: rgb(75, 75, 75, 0.35);
`;

export default SideBar;
