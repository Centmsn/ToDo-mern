import styled from "styled-components";
import { useState, useContext } from "react";

import Button from "../Button";
import Input from "../Input";
import SideBar from "../SideBar";
import Spinner from "../Spinner";
import { useHttpRequest } from "../../../hooks/useHttpRequest";
import AuthContext from "../../../context/Auth";

const AddNote = ({ isOpen, notes, setNotes }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const { userID } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();

  const handleFormSubmit = async e => {
    e.preventDefault();

    let responseData;
    try {
      responseData = await sendRequest(
        "http://localhost:3001/api/notes",
        "POST",
        JSON.stringify({ noteTitle, noteBody, userID }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {
      console.log(err);
    }
    setNoteBody("");
    setNoteTitle("");

    setNotes(prev => [
      ...prev,
      {
        title: responseData.note.title,
        time: responseData.note.time,
        body: responseData.note.body,
      },
    ]);
  };

  const handleNoteTitle = value => {
    setNoteTitle(value);
  };

  return (
    <SideBar isOpen={isOpen}>
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

        <Button onClick={handleFormSubmit}>
          <span>Create</span>
        </Button>
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

export default AddNote;
