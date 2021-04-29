import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";

import { handleChange } from "utils/handleButtonClick";

/**
 * Functional React component - renders custom checkbox on the screen
 * @returns {JSX.Element}
 */
const Checkbox = ({ description = "", onClick = () => {}, value }) => {
  /**
   * Triggers callback function and flips the value
   * @returns {undefined}
   */
  const toggleCheckbox = e => {
    handleChange(e, onClick, !value);
  };

  const status = <FontAwesomeIcon icon={value ? faCheck : faTimes} />;

  return (
    <Wrapper>
      {description && <Info>{description.toUpperCase()}</Info>}
      <Box
        isChecked={value}
        onClick={toggleCheckbox}
        onKeyDown={toggleCheckbox}
        tabIndex="0"
      >
        {status}
      </Box>
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
   * Checkbox state - is check if true is passed
   */
  value: PropTypes.bool.isRequired,
};

const Wrapper = styled.div`
  margin-bottom: 1rem;
  flex-basis: 100%;

  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  height: 25px;
  width: 25px;

  margin-left: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${({ theme }) => theme.colors.off};
  outline: none;
  border-radius: 5px;

  color: ${({ theme }) => theme.colors.off};

  padding: 0.2rem;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;

const Info = styled.p`
  line-height: 25px;
  user-select: none;
  color: white;
`;

export default Checkbox;
