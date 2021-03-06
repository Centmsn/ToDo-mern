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
  size = "medium",
  value = "",
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
        style={textAreaStyle}
        value={value}
      />
    ) : (
      <InputEl
        type={type}
        onChange={handleInputChange}
        style={{ flexBasis: inputSize }}
        value={value}
      />
    );

  return (
    <Label>
      <h3>{desc}</h3>
      {InputType}
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
   * Sets input size
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),

  /**
   * value - for controlled inputs
   */
  value: PropTypes.string,
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
`;

const InputEl = styled.input`
  margin-top: 0.5rem;

  font-size: 1.5rem;

  border: none;
  border-radius: 5px;
  outline: none;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gray};

  background-color: white;

  padding: 0.25rem;

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.off};
  }
`;

export default Input;
