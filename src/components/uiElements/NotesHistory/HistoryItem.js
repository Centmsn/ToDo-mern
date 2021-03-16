import styled from "styled-components";

const HistoryItem = ({ title, body, completed }) => {
  return (
    <Wrapper>
      <NoteTitle>{title}</NoteTitle>
      <NoteDate>Completed: {completed}</NoteDate>
      <NoteBody>{body}</NoteBody>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 999;
  margin: 0.25rem 0;
  flex-basis: 75%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  border-radius: 5px;

  background-color: white;
  color: ${({ theme }) => theme.colors.gray};

  padding: 0.25rem;
  overflow-y: auto;
`;

const NoteTitle = styled.h5`
  flex-basis: 50%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  text-align: center;
  font-size: 1rem;
`;

const NoteDate = styled.span`
  flex-basis: 50%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  text-align: right;
`;

const NoteBody = styled.p`
  flex-basis: 100%;
`;

export default HistoryItem;
