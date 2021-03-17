import styled from "styled-components";

const Note = ({ title, body, time }) => {
  return (
    <Wrapper>
      <h5>{title}</h5>
      <span>{time}</span>
      <p>{body}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Note;
