import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDizzy } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Error = props => {
  return (
    <Wrapper>
      <span>
        <FontAwesomeIcon icon={faDizzy} />
      </span>
      <h1>Uuppsss... something went wrong</h1>
      <h2>Please try to login again</h2>
      <span>Error code: {props.location.state.code}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: 2/1/-1/-1;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;

  h1,
  h2,
  span {
    flex-basis: 100%;

    text-align: center;
  }

  span:first-child {
    font-size: 10rem;

    color: ${({ theme }) => theme.colors.gray};
  }
`;

export default Error;
