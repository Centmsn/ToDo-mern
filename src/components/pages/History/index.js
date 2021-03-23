import styled from "styled-components";

import AuthContext from "context/Auth";
import HistoryItem from "./HistoryItem";
import SideBar from "components/uiElements/SideBar";
import Spinner from "components/uiElements/Spinner";
import { useHttpRequest } from "hooks/useHttpRequest";
import { useEffect, useContext, useState } from "react";
import { getSessionItem } from "utils/handleSessionStorage";

const NotesHistory = ({ isOpen, setIsOpen }) => {
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

    if (!historyNotes.length) {
      return <h3>No history found</h3>;
    }

    historyNotes.map(note => {
      const { title, body, date } = note;
      const completed =
        date.split("T")[0] + " " + date.split("T")[1].match(/\d*:\d*:\d*/);
      return notes.push(
        <HistoryItem title={title} body={body} completed={completed} />
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
`;

const NotesWrapper = styled.div`
  z-index: 999;
  width: 90%;
  height: 90%;

  overflow-y: auto;

  padding: 1rem;
`;

export default NotesHistory;
