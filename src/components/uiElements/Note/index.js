import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { useHttpRequest } from "../../../hooks/useHttpRequest";

const Note = ({ title, body, createdAt, _id, removeNote }) => {
  console.log(createdAt);
  const dateString = createdAt.split("T")[0];
  const timeString = createdAt.match(/\d*:\d*:\d*/g);
  const { sendRequest, error } = useHttpRequest();

  const handleNoteRemove = async () => {
    try {
      const response = await sendRequest(
        `http://localhost:3001/api/notes/${_id}`,
        "DELETE"
      );

      // !refactor
      if (!response) {
        return;
      }
    } catch (err) {
      // TODO: add error handling
      console.log(err);
    }
    // TODO: refactor to optimistic remove
    removeNote(_id);
  };

  const handleNoteEdit = () => {
    console.log("editing");
  };

  return (
    <Wrapper>
      <NoteInfo>
        <NoteTitle>{title}</NoteTitle>
        <NoteSettings>
          <Icon onClick={handleNoteRemove} tooltip="Remove note">
            <FontAwesomeIcon icon={faTrashAlt} />
          </Icon>

          <Icon onClick={handleNoteEdit} tooltip="Edit note">
            <FontAwesomeIcon icon={faEdit} />
          </Icon>
        </NoteSettings>
        <NoteTime>
          <span>{dateString}</span> <span>{timeString}</span>
        </NoteTime>
      </NoteInfo>

      <p>{body}</p>
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
  flex-basis: 50%;

  display: flex;
  justify-content: flex-end;

  color: white;
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

    visibility: hidden;
  }

  &:hover&:after {
    visibility: visible;
  }

  &:hover {
    color: black;
  }
`;

const NoteTitle = styled.h6`
  flex-basis: 50%;
  font-size: 1.1rem;

  color: black;
`;

export default Note;
