import styled from "styled-components";
import { useState, useContext } from "react";

import Button from "components/uiElements/Button";
import Input from "components/uiElements/Input";
import SideBar from "components/uiElements/SideBar";
import Spinner from "components/uiElements/Spinner";
import { useHttpRequest } from "hooks/useHttpRequest";
import AuthContext from "context/Auth";
import { getSessionItem } from "utils/handleSessionStorage";

const AddNote = ({ isOpen, setIsOpen, notes, setNotes }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [creatingError, setCreatingError] = useState(null);

  const { userID } = useContext(AuthContext);
  const { error, isLoading, sendRequest } = useHttpRequest();

  const handleFormSubmit = async () => {
    const token = getSessionItem("token");
    let responseData;
    try {
      responseData = await sendRequest(
        "http://localhost:3001/api/notes",
        "POST",
        JSON.stringify({ noteTitle, noteBody, userID }),
        { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      );

      //! refactor
      if (!responseData) {
        console.log(responseData);
        console.log(error);
        return;
      }

      setIsOpen(false);
    } catch (err) {
      setCreatingError(err.message);
      return;
    }
    setNoteBody("");
    setNoteTitle("");

    setNotes(prev => [
      ...prev,
      {
        title: responseData.note.title,
        createdAt: responseData.note.createdAt,
        body: responseData.note.body,
        _id: responseData.note._id,
      },
    ]);
  };

  const handleNoteTitle = value => {
    setNoteTitle(value);
  };

  return (
    <SideBar isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form>
        {isLoading && <Spinner text="Creating..." />}
        <FormTitle>Add note</FormTitle>
        <Input
          type="text"
          desc="Title"
          onChange={handleNoteTitle}
          size="medium"
          value={noteTitle}
        />
        <Input
          type="textarea"
          desc="Description"
          onChange={setNoteBody}
          size="medium"
          value={noteBody}
        />

        <Button onClick={handleFormSubmit} disabled={!noteBody || !noteTitle}>
          <span>Create</span>
        </Button>

        {creatingError && <ErrorMessage>{creatingError}</ErrorMessage>}
      </Form>
    </SideBar>
  );
};

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const FormTitle = styled.h3`
  margin-bottom: 5rem;

  font-size: 2rem;

  color: white;
`;

const ErrorMessage = styled.div`
  position: absolute;

  right: 12.5%;
  bottom: 10%;
  left: 12.5%;

  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.red};
  border-radius: 5px;

  text-align: center;

  background-color: white;
  color: ${({ theme }) => theme.colors.red};

  padding: 0.25rem;
`;

export default AddNote;