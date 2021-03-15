import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState, useContext } from "react";
import AuthContext from "../../../context/Auth";
import AddNote from "../../uiElements/AddNote";
import NotesHistory from "../../uiElements/NotesHistory";
import PageContainer from "../../uiElements/PageContainer";
import RoundButton from "../../uiElements/RoundButton";
import UserNotes from "./UserNotes";

const UserPanel = () => {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { isFormOpen, setIsFormOpen } = useContext(AuthContext);

  const handleAddNote = () => {
    setIsHistoryOpen(false);
    setIsSettingsOpen(false);

    setIsAddNoteOpen(prev => !prev);
  };

  const handleNotesHistory = () => {
    setIsAddNoteOpen(false);
    setIsSettingsOpen(false);

    setIsHistoryOpen(prev => !prev);
  };

  const handleSettings = () => {
    setIsAddNoteOpen(false);
    setIsHistoryOpen(false);

    setIsSettingsOpen(prev => !prev);
  };

  return (
    <PageContainer>
      <Options>
        <ButtonContainer>
          <RoundButton text="Add note" onClick={handleAddNote}>
            <FontAwesomeIcon icon={faPlus} />
          </RoundButton>
        </ButtonContainer>

        <ButtonContainer>
          <RoundButton text="History" onClick={handleNotesHistory}>
            <FontAwesomeIcon icon={faHistory} />
          </RoundButton>
        </ButtonContainer>

        <ButtonContainer>
          <RoundButton text="Settings" onClick={handleSettings}>
            <FontAwesomeIcon icon={faCog} />
          </RoundButton>
        </ButtonContainer>
      </Options>

      <AddNote isOpen={isAddNoteOpen} />
      <NotesHistory isOpen={isHistoryOpen} />
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

const ButtonContainer = styled.div`
  position: relative;
  flex-basis: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  padding-left: 2rem;
`;

export default UserPanel;
