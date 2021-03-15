import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../../../context/Auth";
import Button from "../Button";
import Input from "../Input";
import SideBar from "../SideBar";
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
    <>
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
    </>
  );
};

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
