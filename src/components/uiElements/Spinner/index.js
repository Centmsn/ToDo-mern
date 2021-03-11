import gsap from "gsap";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useEffect, useRef } from "react";

/**
 * Functional Component - renders loading spinner on the screen
 * @param {Object} props - React props
 * @returns {JSX.Element}
 */
const Spinner = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const spinner = containerRef.current.children;

    gsap.to(spinner[0], {
      rotation: 360,
      repeat: -1,
      duration: 2,
      ease: "none",
    });
    gsap.to(spinner[1], {
      rotation: -360,
      repeat: -1,
      duration: 1.25,
      ease: "none",
    });
    gsap.to(spinner[2], {
      rotation: 360,
      repeat: -1,
      duration: 1.5,
      ease: "none",
    });
    gsap.to(spinner[3], {
      rotation: -360,
      repeat: -1,
      duration: 1.75,
      ease: "none",
    });
  }, []);

  return (
    <Container ref={containerRef}>
      <LoadingSpinner d={50} color={"rgb(0, 222, 205)"}></LoadingSpinner>
      <LoadingSpinner d={40} color={"rgb(51, 198, 212)"}></LoadingSpinner>
      <LoadingSpinner d={30} color={"rgb(59, 161, 212)"}></LoadingSpinner>
      <LoadingSpinner d={20} color={"rgb(49, 83, 140)"}></LoadingSpinner>
      {text && <Description>{text}</Description>}
    </Container>
  );
};

Spinner.propTypes = {
  text: PropTypes.string,
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  width: 10rem;
  height: 10rem;

  border-radius: 10px;
  box-shadow: inset 0 0 4px 0 ${({ theme }) => theme.colors.off};

  background-color: ${({ theme }) => theme.colors.main};
  overflow: hidden;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: ${({ d }) => (100 - d) / 2}%;
  left: ${({ d }) => (100 - d) / 2}%;

  width: ${({ d }) => d}%;
  height: ${({ d }) => d}%;

  border-radius: 50%;
  background-color: ${({ color }) => color};
  box-shadow: 0 0 4px 0px rgb(49, 83, 140);
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    top: 0;

    width: 100%;
    height: 50%;

    background-color: white;
  }

  &:before {
    content: "";
    position: absolute;
    top: 5%;
    left: 5%;

    width: 90%;
    height: 90%;

    border-radius: 50%;

    background-color: white;
  }
`;

const Description = styled.p`
  position: absolute;
  bottom: 0.25rem;
  left: 0;
  right: 0;

  text-align: center;
  font-family: ${({ theme }) => theme.fonts.main};
  color: gray;
`;

export default Spinner;
