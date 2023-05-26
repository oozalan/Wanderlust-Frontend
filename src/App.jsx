import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";

export default function App() {
  return (
    <HashRouter>
      <NavBar />
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
        <Route
          exact
          path="/user/:username"
          component={UserPage}
        />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}
