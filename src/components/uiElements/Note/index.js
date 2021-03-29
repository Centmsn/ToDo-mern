import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Note = ({ title, body, createdAt, _id, onNoteEdit, onNoteRemove }) => {
  const dateString = createdAt.split("T")[0];
  const timeString = createdAt.match(/\d*:\d*:\d*/g);

  const handleNoteRemove = () => {
    onNoteRemove(_id);
  };

  const handleNoteEdit = () => {
    const noteData = {
      title,
      body,
      _id,
    };

    onNoteEdit(noteData);
  };

  return (
    <Wrapper>
      <NoteInfo>
        <NoteTitle>{title}</NoteTitle>

        <NoteTime>
          <span>{dateString}</span> <span>{timeString}</span>
        </NoteTime>
      </NoteInfo>

      <p>{body}</p>
      <NoteSettings>
        <Icon onClick={handleNoteRemove} tooltip="Remove note">
          <FontAwesomeIcon icon={faTrashAlt} />
        </Icon>

        <Icon onClick={handleNoteEdit} tooltip="Edit note">
          <FontAwesomeIcon icon={faEdit} />
        </Icon>
      </NoteSettings>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1rem 0;
  flex-basis: 30%;

  min-height: 100px;
  max-height: 25vh;

  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gray};
  border-radius: 5px;

  color: ${({ theme }) => theme.colors.text};

  padding: 0.25rem;
  overflow-y: auto;
`;

const NoteInfo = styled.div`
  display: flex;
  flex-wrap: wrap;

  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.off};

  padding: 0.25rem;
`;

const NoteTime = styled.p`
  flex-basis: 100%;

  display: flex;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.gray};
`;

const NoteSettings = styled.div`
  position: relative;

  flex-basis: 100%;

  display: flex;
  justify-content: flex-end;

  color: ${({ theme }) => theme.colors.gray};
`;

const Icon = styled.span`
  margin: 0 0.5rem;
  cursor: pointer;

  &:after {
    content: ${({ tooltip }) => `"${tooltip}"`};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    color: ${({ theme }) => theme.colors.gray};

    visibility: hidden;
  }

  &:hover&:after {
    visibility: visible;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const NoteTitle = styled.h6`
  flex-basis: 100%;
  margin-bottom: 0.25rem;

  text-align: center;
  font-size: 1.1rem;
`;

export default Note;
