import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../../../context/Auth";
import Button from "../Button";
import Input from "../Input";
import styled from "styled-components";
import { useState, useContext } from "react";

const LoginForm = () => {
  const [isInSignUpMode, setIsInSignUpMode] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleSwitchMode = () => {
    setNameValue("");
    setEmailValue("");
    setPasswordValue("");

    setIsInSignUpMode(prev => !prev);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    // console.log({ ok: response.ok, status: response.status });
    if (response.ok && response.status === 201) {
      setIsLoggedIn(true);
    }
  };

  const buttonContent = isInSignUpMode
    ? "Switch to log in"
    : "Switch to signup";

  const titleContent = isInSignUpMode ? "Sign up" : "Log in";

  return (
    <>
      <FormTitle>{titleContent}</FormTitle>

      <Form onSubmit={handleFormSubmit}>
        {isInSignUpMode && (
          <Input
            type="text"
            desc="Name"
            onChange={setNameValue}
            value={nameValue}
          />
        )}
        <Input
          type="email"
          desc="Email"
          onChange={setEmailValue}
          value={emailValue}
        />
        <Input
          type="password"
          desc="Password"
          onChange={setPasswordValue}
          value={passwordValue}
        />
        <Button as="button" onClick={() => {}}>
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
