import styled from "styled-components";
import PropsTypes from "prop-types";

/**
 * Functional React component - renders removed note
 * @param {Object} props - React props
 * @returns
 */
const HistoryItem = ({ title, body, completed }) => {
  return (
    <Wrapper>
      <NoteTitle>{title}</NoteTitle>
      <NoteDate>Completed: {completed}</NoteDate>
      <NoteBody>{body}</NoteBody>
    </Wrapper>
  );
};

HistoryItem.propTypes = {
  /**
   * Note title
   */
  title: PropsTypes.string.isRequired,

  /**
   * Note body
   */
  body: PropsTypes.string.isRequired,

  /**
   * Date as a string when note was marked as completed
   */
  completed: PropsTypes.string.isRequired,
};

const Wrapper = styled.div`
  z-index: 999;
  margin: 0.5rem 0;
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
  flex-basis: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  text-align: left;
  font-size: 1rem;
`;

const NoteDate = styled.span`
  flex-basis: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  text-align: left;
`;

const NoteBody = styled.p`
  flex-basis: 100%;
`;

export default HistoryItem;
