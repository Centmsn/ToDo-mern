import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../../../context/Auth";
import Button from "../Button";
import Input from "../Input";
import styled from "styled-components";
import { useState, useContext } from "react";

const LoginForm = () => {
  const [isInSignUpMode, setIsInSignUpMode] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleSwitchMode = () => {
    setIsInSignUpMode(prev => !prev);
  };

  const buttonContent = isInSignUpMode
    ? "Switch to log in"
    : "Switch to signup";

  const titleContent = isInSignUpMode ? "Sign up" : "Log in";

  return (
    <Wrapper>
      <FormTitle>{titleContent}</FormTitle>

      <Form>
        {isInSignUpMode && <Input type="text" desc="Name" />}
        <Input type="email" desc="Email" />
        <Input type="text" desc="Password" />
        <Button as="button">
          <span>Submit</span>
          <span>
            <FontAwesomeIcon icon={faPaperPlane} />
          </span>
        </Button>
      </Form>

      <Button as="button" onClick={handleSwitchMode}>
        <span>{buttonContent}</span>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: calc(100vh / 12);
  right: 0;
  bottom: 0;

  width: 30vw;
  min-width: 200px;

  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.colors.main};

  transition: 300ms;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme, dark }) =>
      dark ? "rgb(150, 150, 150)" : theme.colors.blue};
    clip-path: circle(200px at right top);
  }

  &.test-enter {
    transform: translateX(30vw);
  }

  &.test-enter-active {
    transform: translateX(0);
  }

  &.test-exit {
    transform: translateX(0);
  }

  &.test-exit-active {
    transform: translateX(30vw);
  }
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const FormTitle = styled.h2`
  flex-basis: 100%;

  text-align: center;
  color: white;
`;

export default LoginForm;
