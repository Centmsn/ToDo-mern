import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSurprise as farSurprise } from "@fortawesome/free-regular-svg-icons";

import AuthContext from "context/Auth";
import Button from "components/uiElements/Button";
import HistoryItem from "./HistoryItem";
import SideBar from "components/uiElements/SideBar";
import Spinner from "components/uiElements/Spinner";
import { useHttpRequest } from "hooks/useHttpRequest";
import { useEffect, useContext, useState } from "react";
import { getSessionItem } from "utils/handleSessionStorage";

const NotesHistory = ({ isOpen, setIsOpen, openAddNote }) => {
  const [historyNotes, setHistoryNotes] = useState([]);
  const { sendRequest, error, isLoading } = useHttpRequest();
  const { userID } = useContext(AuthContext);

  // !fetch works on the first render only
  useEffect(() => {
    const fetchHistory = async () => {
      const token = getSessionItem("token");
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/notes/history/user/${userID}`,
        "GET",
        null,
        { Authorization: `Bearer ${token}` }
      );

      if (responseData) {
        setHistoryNotes(responseData.notes);
      }
    };
    fetchHistory();
  }, [sendRequest, userID]);

  const renderHistoryNotes = () => {
    const notes = [];

    if (error) {
      // !temporary error handling
      return (
        <p>
          Something went wrong... We couldn't find Your history. Please try
          again later
        </p>
      );
    }

    if (!historyNotes.length) {
      return (
        <NoHistory>
          <SubTitle as="h3">Your history is empty</SubTitle>
          <Icon icon={farSurprise} />
          <Button onClick={openAddNote}>
            <span>Create new note!</span>
          </Button>
        </NoHistory>
      );
    }

    historyNotes.map((note, index) => {
      const { title, body, date } = note;
      const completed =
        date.split("T")[0] + " " + date.split("T")[1].match(/\d*:\d*:\d*/);
      return notes.push(
        <HistoryItem
          title={title}
          body={body}
          completed={completed}
          key={index}
        />
      );
    });
    return notes;
  };

  return (
    <SideBar size={"50vw"} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Title>Removed notes</Title>

      {isLoading && <Spinner text="Loading..." />}
      <NotesWrapper>{!isLoading && renderHistoryNotes()}</NotesWrapper>
    </SideBar>
  );
};

const Title = styled.h2`
  color: white;
  text-align: center;
`;

const SubTitle = styled(Title)`
  flex-basis: 100%;

  font-size: 1.5rem;
`;

const Icon = styled(FontAwesomeIcon)`
  flex-basis: 100%;

  font-size: 7rem;
  color: ${({ theme }) => theme.colors.blue};
`;

const NoHistory = styled.div`
  height: 75%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const NotesWrapper = styled.div`
  z-index: 999;
  width: 90%;
  height: 90%;

  overflow-y: auto;

  padding: 1rem;
`;

export default NotesHistory;
