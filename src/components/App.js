import GlobalStyleProvider from "../context/globalStyle";
import { Switch, Route, Redirect } from "react-router-dom";

import { AuthContextProvider } from "../context/Auth";
import { SettingsContextProvider } from "../context/Settings";
import Theme from "../context/Theme";
import Error from "./pages/Error";
import MainContainer from "./uiElements/MainContainer";
import Menu from "./uiElements/Menu";
import Home from "./pages/Home";
import UserPanel from "./pages/UserPanel";

const App = () => {
  return (
    <>
      <SettingsContextProvider>
        <Theme>
          <GlobalStyleProvider />

          <AuthContextProvider>
            <MainContainer>
              <Menu title={"All Your notes in a single place"} />

              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/error" component={Error} exact />
                <Route path="/userPanel" component={UserPanel} />
                <Redirect to="/" />
              </Switch>
            </MainContainer>
          </AuthContextProvider>
        </Theme>
      </SettingsContextProvider>
    </>
  );
};

export default App;
