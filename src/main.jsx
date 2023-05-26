import "./bootstrap-override.scss";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import configureStoreObj from "./redux/configureStoreObj.js";

const store = configureStoreObj();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
