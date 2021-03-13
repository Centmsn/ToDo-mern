import styled from "styled-components";

import PageContainer from "../../uiElements/PageContainer";

const UserPanel = () => {
  return (
    <PageContainer>
      <Options>
        <ButtonContainer>
          <OptionButton></OptionButton>
        </ButtonContainer>
        <ButtonContainer>
          <OptionButton></OptionButton>
        </ButtonContainer>
        <ButtonContainer>
          <OptionButton></OptionButton>
        </ButtonContainer>
      </Options>
    </PageContainer>
  );
};

const Options = styled.section`
  grid-area: 1/1/-1/3;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const OptionButton = styled.button`
  width: 7rem;
  height: 7rem;

  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.off};

  cursor: pointer;
`;

const ButtonContainer = styled.div`
  flex-basis: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  padding-left: 2rem;
`;

export default UserPanel;
