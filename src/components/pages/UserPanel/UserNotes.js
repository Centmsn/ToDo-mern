import styled from "styled-components";

import Note from "../../uiElements/Note";

const UserNotes = ({ userNotes }) => {
  const renderUserNotes = () => {
    return userNotes.map((note, index) => <Note key={index} {...note} />);
  };

  return <Wrapper>{renderUserNotes()}</Wrapper>;
};

const Wrapper = styled.div`
  grid-area: 1/4/-1/-1;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

export default UserNotes;
