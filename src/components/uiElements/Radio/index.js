import styled from "styled-components";

const Radio = ({
  active = null,
  value = null,
  onClick = () => {},
  description = "",
}) => {
  const handleOnClick = () => {
    onClick(value);
  };

  return (
    <Label onClick={handleOnClick}>
      {description}
      <RadioInput active={active} />
    </Label>
  );
};

const Label = styled.label`
  color: white;
`;

const RadioInput = styled.div`
  margin: 0 1rem;
  position: relative;

  width: 1.75rem;
  height: 1.75rem;

  border-radius: 50%;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.off};

  cursor: pointer;

  &:hover::before {
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

    background-color: ${({ theme }) => theme.colors.off};

    clip-path: ${({ active }) =>
      active ? "circle(35% at center)" : "circle(0 at center)"};
    transition: 0.3s ease-out;
  }
`;

export default Radio;
