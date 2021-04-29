import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import styled from "styled-components";
import { useEffect, useRef } from "react";

const TestAccount = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    gsap.to(container, {
      x: 0,
      delay: 1.5,
      duration: 0.2,
      ease: "none",
    });
  }, []);

  const handleRevealPassowrd = () => {
    const container = containerRef.current;

    const tl = gsap.timeline({ defaults: { duration: 0.3 } });

    tl.to(container, {
      y: "50%",
      height: "50%",
    })
      .to(container.children[0], { autoAlpha: 0 })
      .to(container.children[0], { display: "none", duration: 0 })
      .to(
        container,
        {
          width: "25vw",
        },
        "-=0.2"
      )
      .to(container.children[1], {
        display: "flex",
        cursor: "default",
      })
      .to(container.children[1], {
        autoAlpha: 1,
      });
  };

  return (
    <Wrapper ref={containerRef} onClick={handleRevealPassowrd}>
      <Title>Test account available</Title>

      <Section>
        <SubTitle>Try without creating account</SubTitle>
        <p>
          <span>
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </span>{" "}
          Please keep in mind
        </p>
        <p>
          Other users may also use this account to try the app. Do not store any
          confidential data in the test account!
        </p>

        <Credentials>
          <p>
            Email: <span>t@t.com</span>
          </p>
          <p>
            Password: <span>abc123</span>
          </p>
        </Credentials>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 50%;

  height: 25%;

  transform: translateX(100%);

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  box-shadow: 0 0 4px 1px black;
  border: 2px solid ${({ theme }) => theme.colors.gray};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right: none;

  color: white;
  background: ${({ theme }) => theme.colors.gray};

  padding: 1rem;
  cursor: pointer;

  overflow: hidden;
`;

const Section = styled.section`
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  font-size: 1.25rem;
  text-align: justify;

  opacity: 0;
  visibility: hidden;
  display: none;

  span {
    color: ${({ theme }) => theme.colors.off};
  }
`;

const Credentials = styled.div`
  width: 80%;
  height: 25%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  box-shadow: inset 0 0 4px 1px ${({ theme }) => theme.colors.gray};

  text-align: center;

  background: white;
  color: ${({ theme }) => theme.colors.gray};

  p {
    flex-basis: 100%;

    color: ${({ theme }) => theme.colors.main};
  }

  span {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const Title = styled.h3`
  writing-mode: vertical-lr;
`;

const SubTitle = styled.h5`
  flex-basis: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.colors.main};

  font-size: 1.5rem;
  font-weight: 100;
  text-align: center;
`;

export default TestAccount;
