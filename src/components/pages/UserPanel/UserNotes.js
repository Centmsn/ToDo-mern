import styled from "styled-components";

import Note from "components/uiElements/Note";

const UserNotes = ({ userNotes, onNoteEdit, onNoteRemove }) => {
  const renderUserNotes = () => {
    return userNotes.map((note, index) => (
      <Note
        key={index}
        {...note}
        onNoteEdit={onNoteEdit}
        onNoteRemove={onNoteRemove}
      />
    ));
  };

  return (
    <>
      <Wrapper>
        <Title>Your notes</Title>
        {renderUserNotes()}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  grid-area: 1/4/-1/-1;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;

  overflow-y: auto;
`;

const Title = styled.div`
  flex-basis: 100%;
  height: 3rem;

  font-size: 2.25rem;
  text-align: center;

  box-shadow: 0 0 5px 0 black;
  border-bottom: 2px solid ${({ theme }) => theme.colors.blue};

  color: white;
  background: ${({ theme }) => theme.colors.blue};
`;

export default UserNotes;
