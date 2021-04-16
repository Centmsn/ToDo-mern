import gsap from "gsap";
import styled from "styled-components";

const TestAccount = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  grid-area: 3/9/10/12;

  border: 2px solid ${({ theme }) => theme.colors.off};
  border-radius: 10px;
`;

export default TestAccount;
