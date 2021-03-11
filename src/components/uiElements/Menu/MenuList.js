import styled from "styled-components";

import MenuListItem from "./MenuListItem";

const MenuList = ({ listItems }) => {
  const renderListItems = elements => {
    const listElements = [];

    for (let i = 0; i < elements.length; i++) {
      const { text, path, icon } = elements[i];

      listElements.push(
        <MenuListItem text={text} path={path} key={i} icon={icon} />
      );
    }

    return listElements;
  };

  return <Wrapper>{renderListItems(listItems)}</Wrapper>;
};

const Wrapper = styled.ul`
  display: flex;

  list-style: none;
`;

export default MenuList;
