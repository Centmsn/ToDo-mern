import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../../../context/Auth";
import Button from "../Button";
import Input from "../Input";
import styled from "styled-components";
import { useState, useContext } from "react";

const LoginForm = () => {
  const [isInSignUpMode, setIsInSignUpMode] = useState(false);
  const [name, setName] = useState({ value: "", error: null });
  const [email, setEmail] = useState({ value: "", error: null });
  const [password, setPassword] = useState({ value: "", error: null });

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleSwitchMode = () => {
    setName({ value: "", error: null });
    setEmail({ value: "", error: null });
    setPassword({ value: "", error: null });

    setIsInSignUpMode(prev => !prev);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    const error = responseData.message.split(" ")[0];

    if (error.toLowerCase() === "email") {
      setEmail(prev => ({ value: prev.value, error: responseData.message }));
    }

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
            onChange={setName}
            value={name.value}
            error={name.error}
          />
        )}
        <Input
          type="email"
          desc="Email"
          onChange={setEmail}
          value={email.value}
          error={email.error}
        />
        <Input
          type="password"
          desc="Password"
          onChange={setPassword}
          value={password.value}
          error={password.error}
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
