import styled from "styled-components";

import Button from "components/uiElements/Button";
import Checkbox from "components/uiElements/Checkbox";
import SideBar from "components/uiElements/SideBar";
import SettingsContext from "context/Settings";
import { useContext } from "react";
import Radio from "components/uiElements/Radio";

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
        <Section separator>
          <h4>Choose font size</h4>
          <Radio
            value={12}
            description="Small"
            onClick={handleFontSize}
            active={fontSize === 12}
          />
          <Radio
            value={16}
            description="Medium"
            onClick={handleFontSize}
            active={fontSize === 16}
          />
          <Radio
            value={20}
            description="Large"
            onClick={handleFontSize}
            active={fontSize === 20}
          />
        </Section>

        <Section separator>
          <h4>Turn off the lights</h4>
          <Checkbox description="Darkmode" onClick={handleDarkmode} />
        </Section>

        <Section>
          Removes all notes from the history. This operation cannot be undone.
          <Button onClick={handleClearHistory} danger={true}>
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
  flex-basis: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  border-bottom: ${({ separator }) => (separator ? "2px" : 0)} solid
    ${({ theme }) => theme.colors.gray};

  color: white;

  h4 {
    z-index: 999;
    flex-basis: 100%;

    font-size: 1.25rem;
    text-align: center;
    letter-spacing: 2px;
  }
`;

const Title = styled.h3`
  z-index: 999;
  font-size: 2rem;
  color: white;
`;

export default Settings;
