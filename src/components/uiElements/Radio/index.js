import styled from "styled-components";
import PropTypes from "prop-types";

import { handleChange } from "utils/handleButtonClick";

/**
 * Functional React component - renders custom radio input
 * @param {Object} props - React props
 * @returns {JSX.Element}
 */
const Radio = ({
  active = null,
  value = null,
  onClick = () => {},
  description = "",
}) => {
  const handleOnChange = e => {
    handleChange(e, onClick, value);
  };

  return (
    <Label onClick={handleOnChange}>
      {description}
      <RadioInput active={active} tabIndex="0" onKeyDown={handleOnChange} />
    </Label>
  );
};

Radio.propTypes = {
  /**
   * if true, radio will be displayed as an active input
   */
  active: PropTypes.bool,

  /**
   * value which is passed to the onClick function
   */
  value: PropTypes.any.isRequired,

  /**
   * function which is called on every click
   */
  onClick: PropTypes.func.isRequired,

  /**
   * optional input description
   */
  description: PropTypes.string,
};

const Label = styled.label`
  text-align: center;
  color: white;
`;

const RadioInput = styled.div`
  margin: 1rem;
  position: relative;

  width: 1.75rem;
  height: 1.75rem;

  border-radius: 50%;
  outline: none;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.off};

  cursor: pointer;

  &:hover::before,
  &:focus::before {
    clip-path: circle(35% at center);
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    border-radius: 50%;

    background: ${({ theme }) => theme.colors.off};

    clip-path: ${({ active }) =>
      active ? "circle(35% at center)" : "circle(0 at center)"};
    transition: 0.3s ease-out;
  }
`;

export default Radio;
