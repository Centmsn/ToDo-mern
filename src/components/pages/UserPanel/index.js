import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState, useContext, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";

import AuthContext from "context/Auth";
import AddNote from "components/pages/AddNote";
import NotesHistory from "components/pages/History";
import PageContainer from "components/uiElements/PageContainer";
import RoundButton from "components/uiElements/RoundButton";
import UserNotes from "./UserNotes";
import Spinner from "components/uiElements/Spinner";
import Settings from "components/pages/Settings";
import { useHttpRequest } from "hooks/useHttpRequest";
import { getSessionItem } from "utils/handleSessionStorage";

// TODO notes should be kept within app state
// TODO request should be send in the background
const UserPanel = () => {
  // TODO refactor to reducer?
  const [userNotes, setUserNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [createMode, setCreateMode] = useState(true);
  const [editedNoteId, setEditedNoteId] = useState(null);

  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { userID, isLoggedIn } = useContext(AuthContext);
  const { error, sendRequest, isLoading } = useHttpRequest();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = getSessionItem("token");

        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/notes/user/${userID}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );

        if (!responseData) {
          return setUserNotes([]);
        }
        setUserNotes(responseData.notes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotes();
  }, [sendRequest, userID]);

  const handleNoteAdd = async () => {
    const url = createMode ? "/notes" : `/notes/${editedNoteId}`;
    const method = createMode ? "POST" : "PATCH";
    const body = createMode
      ? { noteTitle, noteBody, userID }
      : { body: noteBody, title: noteTitle };
    const token = getSessionItem("token");
    let responseData;
    try {
      responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}${url}`,
        method,
        JSON.stringify(body),
        { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      );

      //! refactor
      //! add error handling
      if (!responseData) {
        console.log(responseData);
        console.log(error);
        return;
      }

      setIsAddNoteOpen(false);
    } catch (err) {
      console.log(err);
      return;
    }

    if (createMode) {
      return setUserNotes(prev => [
        ...prev,
        {
          title: responseData.note.title,
          createdAt: responseData.note.createdAt,
          body: responseData.note.body,
          _id: responseData.note._id,
        },
      ]);
    }
    const newNotes = [...userNotes].map(note => {
      if (note._id === editedNoteId) {
        note.title = noteTitle;
        note.body = noteBody;
      }

      return note;
    });
    setUserNotes(newNotes);
  };

  const handleNoteEdit = ({ title, body, _id }) => {
    setCreateMode(false);
    setNoteTitle(title);
    setNoteBody(body);
    setEditedNoteId(_id);
    setIsAddNoteOpen(true);
  };

  const handleNoteRemove = async id => {
    try {
      const token = getSessionItem("token");
      await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/notes/${id}`,
        "DELETE",
        null,
        { Authorization: `Bearer ${token}` }
      );
    } catch (err) {
      console.log(err);
      return;
    }
    // TODO: refactor to optimistic remove
    setUserNotes(prev => prev.filter(el => el._id !== id));
  };

  const handleAddNote = useCallback(() => {
    setNoteBody("");
    setNoteTitle("");
    setCreateMode(true);
    setIsHistoryOpen(false);
    setIsSettingsOpen(false);

    setIsAddNoteOpen(prev => !prev);
  }, []);

  const handleNotesHistory = useCallback(() => {
    setIsAddNoteOpen(false);
    setIsSettingsOpen(false);

    setIsHistoryOpen(prev => !prev);
  }, []);

  const handleSettings = useCallback(() => {
    setIsAddNoteOpen(false);
    setIsHistoryOpen(false);

    setIsSettingsOpen(prev => !prev);
  }, []);

  const handleClearHistory = async () => {
    const token = getSessionItem("token");
    try {
      await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/notes/history/user/${userID}`,
        "DELETE",
        null,
        { Authorization: `Bearer ${token}` }
      );
    } catch (error) {
      // !add error handling
      console.log(error);
    }
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  // TODO change error code
  if (error) {
    return <Redirect to={{ pathname: "/error", state: { code: 401 } }} />;
  }

  return (
    <PageContainer>
      <Options>
        <Title>Management</Title>
        <ButtonContainer>
          <RoundButton
            text={createMode ? "Add note" : "Update note"}
            onClick={handleAddNote}
            isActive={isAddNoteOpen}
          >
            <FontAwesomeIcon icon={faPlus} />
          </RoundButton>
        </ButtonContainer>

        <ButtonContainer>
          <RoundButton
            text="History"
            onClick={handleNotesHistory}
            isActive={isHistoryOpen}
          >
            <FontAwesomeIcon icon={faHistory} />
          </RoundButton>
        </ButtonContainer>

        <ButtonContainer>
          <RoundButton
            text="Settings"
            onClick={handleSettings}
            isActive={isSettingsOpen}
          >
            <FontAwesomeIcon icon={faCog} />
          </RoundButton>
        </ButtonContainer>
      </Options>

      <AddNote
        isOpen={isAddNoteOpen}
        createMode={createMode}
        setIsOpen={handleAddNote}
        onFormSubmit={handleNoteAdd}
        onBodyChange={setNoteBody}
        onTitleChange={setNoteTitle}
        value={{ body: noteBody, title: noteTitle }}
      />
      <NotesHistory
        isOpen={isHistoryOpen}
        setIsOpen={handleNotesHistory}
        openAddNote={handleAddNote}
      />
      <Settings
        isOpen={isSettingsOpen}
        setIsOpen={handleSettings}
        handleClearHistory={handleClearHistory}
      />

      {isLoading ? (
        <Spinner text="Loading..." overlay={true} />
      ) : (
        <UserNotes
          userNotes={userNotes}
          setNotes={setUserNotes}
          onNoteEdit={handleNoteEdit}
          onNoteRemove={handleNoteRemove}
        />
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

  box-shadow: 0 0 5px 0 black;
  border-bottom: 2px solid ${({ theme }) => theme.colors.blue};

  color: white;
  background: ${({ theme }) => theme.colors.blue};
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
