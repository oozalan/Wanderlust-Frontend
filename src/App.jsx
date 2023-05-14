import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import NavBar from "./components/NavBar.jsx";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <NavBar></NavBar>
      <Switch>
        <Route
          exact
          path="/"
          component={HomePage}
        />
        <Route
          exact
          path="/login"
          component={LoginPage}
        />
        <Route
          exact
          path="/signup"
          component={SignupPage}
        />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}
