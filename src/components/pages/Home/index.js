import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";

import PageContainer from "../../uiElements/PageContainer";
import Footer from "../../uiElements/Footer";

const Home = () => {
  return (
    <PageContainer>
      <NoteCard area={"2/2/5/4"} order={1}></NoteCard>
      <NoteCard area={"4/3/7/6"} order={0} dark></NoteCard>
      <NoteCard area={"8/2/11/4"} order={1} dark></NoteCard>
      <NoteCard area={"6/5/9/8"} order={1}></NoteCard>

      <Footer />
    </PageContainer>
  );
};

const NoteCard = styled.section`
  z-index: ${({ order }) => order};
  grid-area: ${({ area }) => area};

  border: 2px solid ${({ theme }) => theme.colors.off};
  border-radius: 10px;

  background: ${({ theme, dark }) =>
    dark ? theme.colors.gray : theme.colors.main};
`;

export default Home;
