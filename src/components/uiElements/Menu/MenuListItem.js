import Button from "components/uiElements/Button";
import PropTypes from "prop-types";

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

MenuListItem.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string,
  icon: PropTypes.element.isRequired,
  toggleMenuVisibility: PropTypes.func.isRequired,
};

export default MenuListItem;
