import Button from "../Button";

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
        <Button as={"button"} onClick={toggleMenuVisibility}>
          <span>{icon}</span> <span>{text}</span>
        </Button>
      </li>
    );
  }
};

export default MenuListItem;
