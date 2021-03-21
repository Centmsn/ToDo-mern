import styled from "styled-components";

const PageContainer = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  grid-area: 2/1/-1/-1;

  display: grid;

  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);

  background-color: ${({ theme }) => theme.colors.background};
`;

export default PageContainer;
