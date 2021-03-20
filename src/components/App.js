import GlobalStyle from "../context/globalStyle";
import { Switch, Route } from "react-router-dom";

import { AuthContextProvider } from "../context/Auth";
import { SettingsContextProvider } from "../context/Settings";
import Theme from "../context/Theme";
import MainContainer from "./uiElements/MainContainer";
import Menu from "./uiElements/Menu";
import Home from "./pages/Home";
import UserPanel from "./pages/UserPanel";

const App = () => {
  return (
    <>
      <SettingsContextProvider>
        <Theme>
          <GlobalStyle />

          <AuthContextProvider>
            <MainContainer>
              <Menu title={"All Your notes in a single place"} />

              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/:id" component={UserPanel} />
              </Switch>
            </MainContainer>
          </AuthContextProvider>
        </Theme>
      </SettingsContextProvider>
    </>
  );
};

export default App;
