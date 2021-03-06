import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "context/Auth";
import Button from "components/uiElements/Button";
import Input from "components/uiElements/Input";
import Spinner from "components/uiElements/Spinner";
import { useHttpRequest } from "hooks/useHttpRequest";
import { setSessionItem } from "utils/handleSessionStorage";

const LoginForm = () => {
  const [isInSignUpMode, setIsInSignUpMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { error, isLoading, sendRequest, clearError } = useHttpRequest();
  const { setIsLoggedIn, setUserID } = useContext(AuthContext);

  useEffect(() => {
    clearError();
  }, [name, email, password, clearError]);

  const handleSwitchMode = () => {
    setName("");
    setEmail("");
    setPassword("");

    clearError();

    setIsInSignUpMode(prev => !prev);
  };

  const handleFormSubmit = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/users/${
          isInSignUpMode ? "signup" : "login"
        }`,
        "POST",
        JSON.stringify({
          name: isInSignUpMode ? name : null,
          email: email,
          password: password,
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
        setUserID(responseData.userID);
        setSessionItem("token", responseData.token);
        history.push("/userPanel");
      }
    } catch (err) {
      console.log(err);
      history.push("/error");
    }
  };

  const buttonContent = isInSignUpMode
    ? "Switch to log in"
    : "Switch to signup";

  const titleContent = isInSignUpMode ? "Sign up" : "Log in";
  let isButtonDisabled = !password || !email;

  if (isInSignUpMode) {
    isButtonDisabled = !password || !email || !name;
  }

  return (
    <>
      <FormTitle>{titleContent}</FormTitle>

      {isLoading && <Spinner overlay />}

      <Form>
        {error && <FormError>{error}</FormError>}
        {isInSignUpMode && (
          <Input type="text" desc="Name" onChange={setName} value={name} />
        )}

        <Input type="email" desc="Email" onChange={setEmail} value={email} />

        <Input
          type="password"
          desc="Password"
          onChange={setPassword}
          value={password}
        />

        <Button
          as="button"
          onClick={handleFormSubmit}
          disabled={isButtonDisabled}
        >
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

  color: ${({ theme }) => theme.colors.red["500"]};
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
