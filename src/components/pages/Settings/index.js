import styled from "styled-components";

import Checkbox from "components/uiElements/Checkbox";
import SideBar from "components/uiElements/SideBar";
import SettingsContext from "context/Settings";
import { useContext } from "react";

const Settings = ({ isOpen, setIsOpen }) => {
  const { setDarkMode, setFontSize } = useContext(SettingsContext);

  const handleDarkmode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <SideBar isOpen={isOpen} setIsOpen={setIsOpen}>
      <Title>Settings</Title>
      <Form>
        <Checkbox description="Darkmode" onClick={handleDarkmode} />
      </Form>
    </SideBar>
  );
};

const Form = styled.form`
  flex-basis: 90%;

  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
`;

const Title = styled.h3`
  font-size: 2rem;
  color: white;
`;

export default Settings;
