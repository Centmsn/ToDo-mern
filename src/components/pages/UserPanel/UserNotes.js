import styled from "styled-components";

import Note from "../../uiElements/Note";

const UserNotes = ({ userNotes, setNotes }) => {
  console.log(userNotes);
  const handleNoteRemove = id => {
    setNotes(prev => prev.filter(el => el._id !== id));
  };

  const renderUserNotes = () => {
    return userNotes.map((note, index) => (
      <Note key={index} {...note} removeNote={handleNoteRemove} />
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

  border-bottom: 2px solid ${({ theme }) => theme.colors.blue};

  color: ${({ theme }) => theme.colors.gray};
`;

export default UserNotes;
