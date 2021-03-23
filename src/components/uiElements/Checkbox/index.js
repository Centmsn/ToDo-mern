import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useState, useEffect } from "react";

/**
 * Functional React component - renders custom checkbox on the screen
 * @returns {JSX.Element}
 */
const Checkbox = ({
  description = "",
  onClick = () => {},
  initialValue = false,
}) => {
  const [checkboxState, setCheckboxState] = useState(false);

  useEffect(() => {
    // update state on active ID change
    setCheckboxState(initialValue);
  }, [initialValue]);

  /**
   * Toggles checkbox and calls onClick callback provided to the component
   * @return {undefined}
   */
  const toggleCheckbox = () => {
    setCheckboxState(prev => !prev);
    // pass current state to callback
    onClick(!checkboxState);
  };

  const status = <FontAwesomeIcon icon={checkboxState ? faCheck : faTimes} />;

  return (
    <Wrapper onClick={toggleCheckbox}>
      {description && <Info>{description.toUpperCase()}</Info>}
      <Box isChecked={checkboxState}>{status}</Box>
    </Wrapper>
  );
};

Checkbox.propTypes = {
  /**
   * Check box description
   */
  description: PropTypes.string,

  /**
   * A function which is called on checkbox click
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Initial value. True - checked.
   */
  initialValue: PropTypes.bool,
};

const Wrapper = styled.div`
  flex-basis: 20%;

  display: flex;
  justify-content: right;
`;

const Box = styled.div`
  height: 25px;
  width: 25px;

  margin-left: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${({ theme }) => theme.colors.off};
  border-radius: 5px;

  color: ${({ theme }) => theme.colors.off};

  padding: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;

const Info = styled.p`
  line-height: 25px;
  user-select: none;
`;

export default Checkbox;
