import styled from "styled-components";

import MenuListItem from "./MenuListItem";

/**
 * Renders nav links
 * @param {Object} props - react props
 * @returns {JSX.Element}
 */
const MenuList = ({ listItems, toggleMenuVisibility }) => {
  /**
   * Renders link on the screen
   * @param {Object[]} elements - list elements
   * @param {string} elements[].text - text rendered inside list item
   * @param {string} elements[].path - link path
   * @param {JSX.Element} elements[].icon - icon wrapped in react component
   * @returns {Object[]}
   */
  const renderListItems = elements => {
    const listElements = [];

    for (let i = 0; i < elements.length; i++) {
      const { text, path, icon } = elements[i];

      listElements.push(
        <MenuListItem
          text={text}
          path={path}
          key={i}
          icon={icon}
          toggleMenuVisibility={toggleMenuVisibility}
        />
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
