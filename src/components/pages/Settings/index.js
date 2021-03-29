import styled from "styled-components";

import Checkbox from "components/uiElements/Checkbox";
import SideBar from "components/uiElements/SideBar";
import SettingsContext from "context/Settings";
import { useContext } from "react";
import Slider from "components/uiElements/Slider";

const Settings = ({ isOpen, setIsOpen }) => {
  const { setDarkMode, setFontSize, fontSize } = useContext(SettingsContext);

  const handleDarkmode = () => {
    setDarkMode(prev => !prev);
  };

  const handleFontSize = value => {
    setFontSize(value);
  };
  console.log(fontSize);
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
      </Form>
    </SideBar>
  );
};

const Form = styled.form`
  flex-basis: 90%;

  display: flex;
  justify-content: center;

  flex-wrap: wrap;
  align-self: flex-start;
`;

const Title = styled.h3`
  font-size: 2rem;
  color: white;
`;

export default Settings;
