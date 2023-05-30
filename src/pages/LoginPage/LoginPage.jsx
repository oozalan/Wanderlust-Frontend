import "./LoginPage.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getLoginAction } from "../../redux/actions";
import { login } from "../../api/apiCalls.js";

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [usernameErrMsg, setUsernameErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const dispatch = useDispatch();

  const isDisabled = Boolean(isPending || usernameErrMsg || passwordErrMsg);

  return (
    <div className="my-login-container">
      <form className="my-login">
        <h1 className="my-login-header">Login</h1>
        <div className="my-login-input">
          <label
            htmlFor="username"
            className="form-label"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className={
              usernameErrMsg ? "form-control is-invalid" : "form-control"
            }
            onChange={onChange}
          />
          <div className="invalid-feedback">{usernameErrMsg}</div>
        </div>
        <div className="my-login-input">
          <label
            htmlFor="password"
            className="form-label"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className={
              passwordErrMsg ? "form-control is-invalid" : "form-control"
            }
            onChange={onChange}
          />
          <div className="invalid-feedback">{passwordErrMsg}</div>
        </div>
        <div className="my-login-btn-container">
          <button
            className="btn btn-primary"
            onClick={onClickLogin}
            disabled={isDisabled}
            style={{ fontWeight: 500 }}
          >
            {isPending && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span> Log In</span>
          </button>
        </div>
      </form>
    </div>
  );

  function onChange(event) {
    let field = event.target.id;
    let value = event.target.value;

    if (field == "username") setUsername(value);
    else setPassword(value);

    validate(field, value);
  }

  async function onClickLogin(event) {
    event.preventDefault();

    const isUsernameInValid = !validate("username", username);
    const isPasswordInValid = !validate("password", password);

    if (isUsernameInValid || isPasswordInValid) return;

    setIsPending(true);

    const credentials = {
      username,
      password,
    };

    try {
      // TODO: Get all user information (including id and token), store them in redux store
      // const response = await login(credentials);
      // const userInfo = response.data;

      const userInfo = {
        ...credentials,
        name: "Onat",
        surname: "Özalan",
        email: "o171141@gmail.com",
        image: null,
        id: 1,
        token: "adasdadsda",
      };

      dispatch(getLoginAction(userInfo));
      props.history.push("/");
    } catch (error) {
      // TODO: Display errors coming from backend
    } finally {
      setIsPending(false);
    }
  }

  function validate(field, value) {
    let errMsg = "";

    if (value.length == 0) errMsg = `${field} cannot be empty.`;
    else if (field == "username") {
      if (value.length < 3 || value.length > 12)
        errMsg = `${field} must be at least 3 and at most 12 characters long.`;
      else if (!/^[a-z0-9]+$/i.test(value))
        errMsg = `${field} must contain only letters and digits.`;
    } else if (value.length < 8 || value.length > 12)
      errMsg = `${field} must be at least 8 and at most 12 characters long.`;

    if (errMsg) {
      errMsg = errMsg[0].toUpperCase() + errMsg.slice(1);

      if (field == "username") setUsernameErrMsg(errMsg);
      else setPasswordErrMsg(errMsg);

      return false;
    } else {
      if (field == "username" && usernameErrMsg) setUsernameErrMsg(errMsg);
      else if (field == "password" && passwordErrMsg) setPasswordErrMsg(errMsg);

      return true;
    }
  }
}
