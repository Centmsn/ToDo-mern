import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";

import AuthContext from "../../../context/Auth";
import Button from "../Button";
import Input from "../Input";
import Spinner from "../Spinner";
import { useHttpRequest } from "../../../hooks/useHttpRequest";

const LoginForm = () => {
  const [isInSignUpMode, setIsInSignUpMode] = useState(false);
  const [name, setName] = useState({ value: "" });
  const [email, setEmail] = useState({ value: "" });
  const [password, setPassword] = useState({ value: "" });

  const { error, isLoading, sendRequest, clearError } = useHttpRequest();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    clearError();
  }, [name, email, password, clearError]);

  const handleSwitchMode = () => {
    setName({ value: "" });
    setEmail({ value: "" });
    setPassword({ value: "" });

    clearError();

    setIsInSignUpMode(prev => !prev);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        `http://localhost:3001/api/users/${
          isInSignUpMode ? "signup" : "login"
        }`,
        "POST",
        JSON.stringify({
          name: isInSignUpMode ? name.value : null,
          email: email.value,
          password: password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if (
        responseData?.statusCode === 201 ||
        (!isInSignUpMode && responseData?.statusCode === 200)
      ) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const buttonContent = isInSignUpMode
    ? "Switch to log in"
    : "Switch to signup";

  const titleContent = isInSignUpMode ? "Sign up" : "Log in";

  return (
    <>
      <FormTitle>{titleContent}</FormTitle>

      {isLoading && <Spinner text="Loading" />}
      <Form onSubmit={handleFormSubmit}>
        {error && <FormError>{error}</FormError>}
        {isInSignUpMode && (
          <Input
            type="text"
            desc="Name"
            onChange={setName}
            value={name.value}
          />
        )}
        <Input
          type="email"
          desc="Email"
          onChange={setEmail}
          value={email.value}
        />
        <Input
          type="password"
          desc="Password"
          onChange={setPassword}
          value={password.value}
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

const FormError = styled.div`
  margin-bottom: 1rem;

  border-radius: 5px;

  color: ${({ theme }) => theme.colors.red};
  background-color: rgb(237, 204, 197);

  padding: 0.5rem;
`;

const FormTitle = styled.h2`
  z-index: 999;
  flex-basis: 100%;

  text-align: center;
  color: white;
`;

export default LoginForm;
