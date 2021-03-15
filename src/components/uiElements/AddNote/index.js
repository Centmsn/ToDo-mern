import styled from "styled-components";
import { useState } from "react";

import Button from "../Button";
import Input from "../Input";
import SideBar from "../SideBar";

const AddNote = ({ isOpen }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  return (
    <SideBar isOpen={isOpen}>
      <Form>
        <FormTitle>Add note</FormTitle>
        <Input type="text" desc="Title" onChange={setNoteTitle} size="medium" />
        <Input
          type="textarea"
          desc="Description"
          onChange={setNoteBody}
          size="medium"
        />

        <Button>
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

const FormTitle = styled.form`
  margin-bottom: 5rem;

  font-size: 2rem;

  color: white;
`;

export default AddNote;
