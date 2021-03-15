import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * Renders input in the label
 * @param {Object} props - react props
 * @returns {JSX.Element}
 */
const Input = ({
  type = "text",
  desc,
  onChange,
  error = null,
  size = "medium",
}) => {
  const handleInputChange = e => {
    onChange(e.target.value);
  };

  let inputSize;

  if (size === "small") {
    inputSize = "50%";
  } else if (size === "medium") {
    inputSize = "75%";
  } else if (size === "large") {
    inputSize = "90%";
  }

  const textAreaStyle = {
    resize: "none",
    height: "200px",
    flexBasis: inputSize,
  };

  const InputType =
    type === "textarea" ? (
      <InputEl
        as={"textarea"}
        onChange={handleInputChange}
        error={error}
        style={textAreaStyle}
      />
    ) : (
      <InputEl
        type={type}
        onChange={handleInputChange}
        error={error}
        style={{ flexBasis: inputSize }}
      />
    );

  return (
    <Label>
      <h3>{desc}</h3>
      {InputType}
      {error && <span>{error}</span>}
    </Label>
  );
};

Input.propTypes = {
  /**
   * input type - default is text
   */
  type: PropTypes.string,
  /**
   * Input description
   */
  desc: PropTypes.string,
  /**
   * Function which is triggered on every state change
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Error message to display below input
   */
  error: PropTypes.string,

  /**
   * Sets input size
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

const Label = styled.label`
  width: 100%;

  margin-bottom: 1rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  h3,
  span {
    flex-basis: 100%;

    text-align: center;
  }

  h3 {
    color: white;
  }

  span {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const InputEl = styled.input`
  margin-top: 0.5rem;

  font-size: 1.5rem;

  border: none;
  border-radius: 5px;
  outline: none;
  box-shadow: 0 0 0 2px
    ${({ theme, error }) => (error ? theme.colors.red : theme.colors.gray)};

  background-color: ${({ theme, error }) =>
    error ? "rgb(237, 204, 197)" : "white"};

  padding: 0.25rem;

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.off};
  }
`;

export default Input;
