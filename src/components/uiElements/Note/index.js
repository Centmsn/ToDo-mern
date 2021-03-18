import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { useHttpRequest } from "../../../hooks/useHttpRequest";

const Note = ({ title, body, time, _id }) => {
  const dateString = time.split("T")[0];
  const timeString = time.match(/\d*:\d*:\d*/g);

  const { sendRequest, error } = useHttpRequest();

  const handleNoteRemove = async () => {
    await sendRequest(`http://localhost:3001/api/notes/${_id}`, "DELETE");
  };

  return (
    <Wrapper>
      <NoteInfo>
        <NoteTitle>{title}</NoteTitle>
        <NoteSettings>
          <span onClick={handleNoteRemove}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
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
  flex-basis: 50%;

  display: flex;
  justify-content: flex-end;

  color: ${({ theme }) => theme.colors.main};
  span {
    cursor: pointer;
  }

  span:hover {
    color: white;
  }
`;

const NoteTitle = styled.h6`
  flex-basis: 50%;
  font-size: 1.1rem;

  color: black;
`;

export default Note;
