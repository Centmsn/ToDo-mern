import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

import AuthContext from "../../../context/Auth";
import AddNote from "../../uiElements/AddNote";
import NotesHistory from "../../uiElements/NotesHistory";
import PageContainer from "../../uiElements/PageContainer";
import RoundButton from "../../uiElements/RoundButton";
import UserNotes from "./UserNotes";
import Spinner from "../../uiElements/Spinner";
import Settings from "../../uiElements/Settings";
import { useHttpRequest } from "../../../hooks/useHttpRequest";

const UserPanel = () => {
  const [userNotes, setUserNotes] = useState([]);

  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { userID, isLoggedIn } = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpRequest();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/api/notes/user/${userID}`
        );

        console.log(responseData.notes);
        setUserNotes(responseData.notes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotes();
  }, [sendRequest, userID]);

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

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <PageContainer>
      <Options>
        <Title>Management</Title>
        <ButtonContainer>
          <RoundButton
            text="Add note"
            onClick={handleAddNote}
            isActive={isAddNoteOpen}
          >
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

      <AddNote
        isOpen={isAddNoteOpen}
        setIsOpen={setIsAddNoteOpen}
        setNotes={setUserNotes}
        notes={userNotes}
      />
      <NotesHistory isOpen={isHistoryOpen} />
      <Settings isOpen={isSettingsOpen} />

      {isLoading ? (
        <Spinner text="Loading..." />
      ) : (
        <UserNotes userNotes={userNotes} />
      )}
    </PageContainer>
  );
};

const Options = styled.section`
  grid-area: 1/1/-1/4;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled.div`
  flex-basis: 100%;
  height: 3rem;

  font-size: 2.25rem;
  text-align: center;

  border-bottom: 2px solid ${({ theme }) => theme.colors.blue};

  color: ${({ theme }) => theme.colors.gray};
`;

const ButtonContainer = styled.div`
  position: relative;
  flex-basis: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  padding-left: 2rem;
`;

export default UserPanel;
