import styled from "styled-components";

import Button from "components/uiElements/Button";
import Checkbox from "components/uiElements/Checkbox";
import SideBar from "components/uiElements/SideBar";
import SettingsContext from "context/Settings";
import { useContext } from "react";
import Slider from "components/uiElements/Slider";

const Settings = ({ isOpen, setIsOpen, handleClearHistory }) => {
  const { setDarkMode, setFontSize, fontSize } = useContext(SettingsContext);

  const handleDarkmode = () => {
    setDarkMode(prev => !prev);
  };

  const handleFontSize = value => {
    setFontSize(value);
  };

  return (
    <SideBar isOpen={isOpen} setIsOpen={setIsOpen}>
      <Title>Settings</Title>
      <Form>
        <Slider
          text="Font size"
          min={12}
          max={24}
          onChange={handleFontSize}
          value={fontSize}
        />
        <Checkbox description="Darkmode" onClick={handleDarkmode} />

        <Section>
          Removes all notes from the history. This operation cannot be undone.
          <Button onClick={handleClearHistory}>
            <span>Clear history</span>
          </Button>
        </Section>
      </Form>
    </SideBar>
  );
};

const Form = styled.form`
  flex-basis: 90%;
  height: 80%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-self: flex-start;
`;

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  color: white;
`;

const Title = styled.h3`
  z-index: 999;
  font-size: 2rem;
  color: white;
`;

export default Settings;
