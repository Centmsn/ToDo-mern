import Button from "components/uiElements/Button";

const MenuListItem = ({ text, path, icon, toggleMenuVisibility }) => {
  if (path) {
    return (
      <li>
        <Button path={path}>
          <span>{icon}</span> <span>{text}</span>
        </Button>
      </li>
    );
  } else {
    return (
      <li>
        <Button onClick={toggleMenuVisibility}>
          <span>{icon}</span> <span>{text}</span>
        </Button>
      </li>
    );
  }
};

export default MenuListItem;
