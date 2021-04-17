import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import styled from "styled-components";
import { useEffect, useRef } from "react";

import Button from "components/uiElements/Button";

const TestAccount = () => {
  useEffect(() => {}, []);

  return (
    <Wrapper>
      <Title>Test account available!</Title>

      <SubTitle>Try without creating account</SubTitle>
      <Section>
        <p
          style={{
            fontSize: "2rem",
            flexBasis: "100%",
            textDecoration: "underline",
          }}
        >
          Please keep in mind
        </p>

        <span>
          <FontAwesomeIcon icon={faInfo} />
        </span>
        <p>
          Other users may also use this account to try the app. Do not store any
          confidential data in test account!
        </p>
      </Section>
      <Button>
        <span>Click to get email and password!</span>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: 3/9/10/12;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  box-shadow: 0 0 5px 0 ${({ theme }) => theme.colors.gray};
  border: 2px solid ${({ theme }) => theme.colors.off};
  border-radius: 10px;

  color: white;
  background: ${({ theme }) => theme.colors.main};

  padding: 1rem;
`;

const Section = styled.section`
  height: 50%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  p {
    flex-basis: 80%;

    text-align: center;
    font-size: 1.25rem;
  }
`;

const Title = styled.h3`
  flex-basis: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.off};

  font-size: 2rem;
  text-align: center;
`;

const SubTitle = styled.h5`
  font-size: 1.25rem;
  font-weight: 100;
  text-align: center;
`;

export default TestAccount;
