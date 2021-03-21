import styled from "styled-components";

import SideBar from "../SideBar";

const Settings = ({ isOpen, setIsOpen }) => {
  return (
    <SideBar isOpen={isOpen} setIsOpen={setIsOpen}>
      Settings
    </SideBar>
  );
};

export default Settings;
