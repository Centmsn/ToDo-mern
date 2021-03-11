import GlobalStyle from "../context/globalStyle";
import { Switch, Route } from "react-router-dom";

import Theme from "../context/Theme";
import Spinner from "./uiElements/Spinner";
import Menu from "./uiElements/Menu";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Theme>
        <GlobalStyle />
        <Menu />

        <Switch>
          <Route component={Home} path="/" exact />
        </Switch>
      </Theme>
    </div>
  );
};

export default App;
