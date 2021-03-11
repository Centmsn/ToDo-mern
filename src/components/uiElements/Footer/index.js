import styled from "styled-components";

const Footer = () => {
  return <Wrapper>Copyright&#169; 2021 Wojciech Rygorowicz</Wrapper>;
};

const Wrapper = styled.div`
  grid-area: 12/1/-1/-1;

  display: flex;
  align-items: flex-end;

  color: ${({ theme }) => theme.colors.gray};
`;

export default Footer;
