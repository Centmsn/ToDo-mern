import Button from "../Button";

const MenuListItem = ({ text, path, icon, toggleMenuVisibility }) => {
  if (path) {
    return (
      <li>
        <Button to={path} onClick={() => toggleMenuVisibility(false)}>
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
