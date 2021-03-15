import styled from "styled-components";

import SideBar from "../SideBar";

const NotesHistory = ({ isOpen }) => {
  return (
    <SideBar size={"50vw"} isOpen={isOpen}>
      History
    </SideBar>
  );
};

const Wrapper = styled.div``;

export default NotesHistory;
