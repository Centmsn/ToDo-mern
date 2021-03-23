import styled from "styled-components";

import SideBar from "../../uiElements/SideBar";

const Settings = ({ isOpen, setIsOpen }) => {
  return (
    <SideBar isOpen={isOpen} setIsOpen={setIsOpen}>
      <form></form>
    </SideBar>
  );
};

export default Settings;
