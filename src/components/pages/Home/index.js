import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

import PageContainer from "components/uiElements/PageContainer";
import Footer from "components/uiElements/Footer";
import TestAccount from "components/pages/Home/TestAccount";

const Home = () => {
  return (
    <PageContainer>
      <NoteCard area={"2/2/5/4"} order={1} side="left">
        <h3>Create</h3>
        <span>
          <FontAwesomeIcon icon={faPenFancy} />
        </span>
        <p>Register or log in and create your first note within a minute!</p>
      </NoteCard>
      <NoteCard area={"4/3/7/6"} order={0} dark></NoteCard>
      <NoteCard area={"8/2/11/4"} order={1} dark>
        <h3>Upadate</h3>
        <span>
          <FontAwesomeIcon icon={faEdit} />
        </span>
        <p>Edit your notes any time You want!</p>
      </NoteCard>
      <NoteCard area={"6/5/9/8"} order={1} side="left">
        <h3>Manage</h3>
        <span>
          <FontAwesomeIcon icon={faHistory} />
        </span>
        <p>Mark as completed, delete, browse deleted, and much more!</p>
      </NoteCard>

      <TestAccount />
      <Footer />
    </PageContainer>
  );
};

const NoteCard = styled.section`
  position: relative;
  z-index: ${({ order }) => order};
  grid-area: ${({ area }) => area};

  display: flex;
  flex-wrap: wrap;

  box-shadow: 0 0 4px 0 ${({ theme }) => theme.colors.black};
  border: 2px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;

  background: ${({ theme, dark }) =>
    dark ? theme.colors.gray : theme.colors.main};

  padding: 1rem;

  h3,
  p,
  span {
    z-index: 999;
    font-size: 1.5rem;

    color: white;
  }

  h3 {
    flex-basis: 100%;
    height: 2rem;

    border-bottom: 1px solid white;
  }

  span {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    border-radius: 10px;

    background-color: ${({ theme, dark }) =>
      dark ? "rgb(150, 150, 150)" : theme.colors.blue};
    clip-path: circle(
      ${({ side }) =>
        side === "left" ? "90% at left bottom" : "75% at right bottom"}
    );
  }
`;

export default Home;
