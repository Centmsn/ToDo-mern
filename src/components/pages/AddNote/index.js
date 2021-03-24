import styled from "styled-components";

import Button from "components/uiElements/Button";
import Input from "components/uiElements/Input";
import SideBar from "components/uiElements/SideBar";

const AddNote = ({
  createMode,
  isOpen,
  setIsOpen,
  onBodyChange,
  onTitleChange,
  onFormSubmit,
  value = { body: "", title: "" },
}) => {
  const titleContent = createMode ? "Add note" : "Edit note";
  return (
    <SideBar isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form>
        <FormTitle>{titleContent}</FormTitle>
        <Input
          type="text"
          desc="Title"
          onChange={onTitleChange}
          size="medium"
          value={value.title}
        />
        <Input
          type="textarea"
          desc="Description"
          onChange={onBodyChange}
          size="medium"
          value={value.body}
        />

        <Button onClick={onFormSubmit} disabled={!value.body || !value.title}>
          <span>{createMode ? "Create " : "Update "}note</span>
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
