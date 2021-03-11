import GlobalStyle from "../context/globalStyle";
import { Switch, Route } from "react-router-dom";

import Theme from "../context/Theme";
import MainContainer from "./uiElements/MainContainer";
import Spinner from "./uiElements/Spinner";
import Menu from "./uiElements/Menu";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Theme>
        <GlobalStyle />

        <MainContainer>
          <Menu title={"All Your notes in a single place"} />

          <Switch>
            <Route path="/" component={Home} exact />
          </Switch>
        </MainContainer>
      </Theme>
    </>
  );
};

export default App;
