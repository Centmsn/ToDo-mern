import styled from "styled-components";

import SideBar from "../SideBar";
import HistoryItem from "./HistoryItem";

const DUMMY_HISTORY_NOTES = {
  body: "an old note",
  title: "Note Titile",
  completed: "24-03-2019",
};

const NotesHistory = ({ isOpen, setIsOpen }) => {
  return (
    <SideBar size={"50vw"} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Title>Removed notes</Title>

      <NotesWrapper>
        <HistoryItem
          body={DUMMY_HISTORY_NOTES.body}
          title={DUMMY_HISTORY_NOTES.title}
          completed={DUMMY_HISTORY_NOTES.completed}
        />
      </NotesWrapper>
    </SideBar>
  );
};

const Title = styled.h2`
  color: white;
`;

const NotesWrapper = styled.div`
  z-index: 999;
  flex-basis: 100%;
  height: 90%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  overflow-y: auto;
`;

export default NotesHistory;
