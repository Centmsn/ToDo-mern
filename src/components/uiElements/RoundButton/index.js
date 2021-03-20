import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * Functional Component - Renders round button on the screen
 * @param {Object} props - React props
 * @returns {JSX.Element}
 */
const RoundButton = ({
  children,
  text = "",
  onClick = () => {},
  isActive = false,
}) => {
  return (
    <RoundBtn text={text} onClick={onClick} isActive={isActive}>
      {children}
    </RoundBtn>
  );
};

RoundButton.propTypes = {
  /**
   * Button description
   */
  text: PropTypes.string.isRequired,

  /**
   * Function which is triggered on button click
   */
  onClick: PropTypes.func.isRequired,

  /**
   * if set to true component will keep hover effect permanently
   */
  isActive: PropTypes.bool,
};

const RoundBtn = styled.button`
  width: 7rem;
  height: 7rem;

  border-radius: 50%;
  outline: none;
  box-shadow: ${({ isActive, theme }) =>
    isActive
      ? `0 0 0 6px ${theme.colors.off},
      0 0 0 8px ${theme.colors.main}`
      : `0 0 0 2px white, 0 0 0 4px ${theme.colors.main}`};

  font-size: 4rem;

  background-color: ${({ theme }) => theme.colors.blue};
  color: white;

  cursor: pointer;
  transition: 300ms linear;

  &:after {
    content: "${({ text }) => text}";
    position: absolute;
    z-index: -1;
    top: 2rem;
    right: 0;
    bottom: 0;
    left: 2rem;

    transform: translateX(${({ isActive }) => (isActive ? "0" : "-25%")});
    opacity: ${({ isActive }) => (isActive ? "1" : "0")};

    font-size: 2rem;
    color: ${({ theme }) => theme.colors.gray};
    transition: 300ms;
  }

  &:focus,
  &:hover {
    box-shadow: 0 0 0 6px ${({ theme }) => theme.colors.off},
      0 0 0 8px ${({ theme }) => theme.colors.main};
  }

  &:focus {
    &:after {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:hover&:after {
    opacity: 1;
    transform: translateX(0);
  }
`;

export default RoundButton;
