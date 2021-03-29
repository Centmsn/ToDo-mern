import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Functional React component - renders range input on the screen
 * @returns {JSX.Element}
 */
const Slider = ({ text = "", min = 0, max = 10, onChange, value }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const bar = useRef(null);

  useEffect(() => {
    const { width } = bar.current.getBoundingClientRect();
    let range = max - min;

    if (min < 0) {
      range = Math.abs(min) + max;
    }

    const position = Math.floor(width / range) * (value - min);
    const sliderWidth = 30;

    setSliderPosition(position - sliderWidth / 2);
  }, [value, min, max]);

  const updateBarInfo = e => {
    const { width, left } = bar.current.getBoundingClientRect();
    const offsetLeft = e.clientX - left;

    if (offsetLeft < 0) {
      value = min;
    }

    if (offsetLeft > width) {
      value = max;
    }

    if (offsetLeft > 0 && offsetLeft < width) {
      let step;
      if (min < 0) {
        step = width / (Math.abs(min) + max);
        value = Math.floor(offsetLeft / step);
      } else {
        step = width / (max - min);
        value = Math.floor(offsetLeft / step) + min;
      }
    }

    onChange(value);
  };

  const startDrag = e => {
    e.preventDefault();
    document.addEventListener("mousemove", updateBarInfo);
    document.addEventListener("mouseup", stopDrag);
  };

  const stopDrag = () => {
    document.removeEventListener("mousemove", updateBarInfo);
    document.removeEventListener("mouseup", stopDrag);
  };

  return (
    <Wrapper>
      <Label>{text.toUpperCase()}</Label>
      <OptionBar ref={bar}>
        <InnerBar width={sliderPosition + 5} />
        <Draggable position={sliderPosition} onMouseDown={startDrag}>
          {value}
        </Draggable>
      </OptionBar>
    </Wrapper>
  );
};

Slider.propTypes = {
  /**
   * Optional - slider description
   */
  text: PropTypes.string,
  /**
   * Required - smallest possible input
   */
  min: PropTypes.number.isRequired,
  /**
   * Required - biggest possible input
   */
  max: PropTypes.number.isRequired,
  /**
   * Required - callback which is called on value change
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Required - piece of state which tracks the value
   */
  value: PropTypes.number.isRequired,
};

const Wrapper = styled.div`
  margin: 1rem 0;
  flex-basis: 100%;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  text-align: center;
`;

const OptionBar = styled.div`
  position: relative;
  flex-basis: 75%;
  height: 25px;

  border: 2px solid ${({ theme }) => theme.colors.off};
  border-radius: 5px;
`;

const InnerBar = styled.div.attrs(props => ({
  style: { width: props.width },
}))`
  position: absolute;

  left: 0;
  top: 0;
  bottom: 0;

  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.blue};
`;

const Draggable = styled.div.attrs(props => ({
  style: {
    left: props.position,
  },
}))`
  position: absolute;
  height: 140%;
  width: 30px;
  transform: translateY(-15%);

  display: flex;

  justify-content: center;
  align-items: center;

  color: white;
  background-color: ${({ theme }) => theme.colors.blue};
  border: 1px solid white;
  border-radius: 5px;

  cursor: pointer;
  user-select: none;
`;

const Label = styled.p`
  margin-bottom: 1rem;
  flex-basis: 100%;

  color: white;
  user-select: none;
`;

export default Slider;
