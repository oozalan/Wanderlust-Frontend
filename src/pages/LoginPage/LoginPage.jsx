import React from "react";
import { login } from "../../api/apiCalls.js";
import "./LoginPage.css";

export default class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    isPending: false,
    usernameErrMsg: "",
    passwordErrMsg: "",
  };

  onChange = (event) => {
    let field = event.target.id;
    let value = event.target.value;
    this.setState({
      [field]: value,
    });

    this.validate(field, value);
  };

  onClick = async (event) => {
    event.preventDefault();

    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };

    const isUsernameInValid = !this.validate("username", credentials.username);
    const isPasswordInValid = !this.validate("password", credentials.password);

    if (isUsernameInValid || isPasswordInValid) return;

    this.setState({
      isPending: true,
    });

    try {
      await login(credentials);
    } catch (error) {
      console.log("Bad login POST request");
    } finally {
      this.setState({
        isPending: false,
      });
    }
  };

  validate(field, value) {
    if (value.length == 0) {
      let errMsg = `${field} cannot be empty.`;
      errMsg = errMsg[0].toUpperCase() + errMsg.slice(1);
      this.setState({
        [field + "ErrMsg"]: errMsg,
      });
      return false;
    }

    if (field == "username") {
      if (value.length < 3 || value.length > 12) {
        let errMsg = `${field} must be at least 3 and at most 12 characters long.`;
        errMsg = errMsg[0].toUpperCase() + errMsg.slice(1);
        this.setState({
          [field + "ErrMsg"]: errMsg,
        });
        return false;
      }

      if (!/^[a-z0-9]+$/i.test(value)) {
        let errMsg = `${field} must contain only letters and digits.`;
        errMsg = errMsg[0].toUpperCase() + errMsg.slice(1);
        this.setState({
          [field + "ErrMsg"]: errMsg,
        });
        return false;
      }
    } else {
      if (value.length < 8 || value.length > 12) {
        let errMsg = `${field} must be at least 8 and at most 12 characters long.`;
        errMsg = errMsg[0].toUpperCase() + errMsg.slice(1);
        this.setState({
          [field + "ErrMsg"]: errMsg,
        });
        return false;
      }
    }

    this.setState({
      [field + "ErrMsg"]: "",
    });
    return true;
  }

  render() {
    let isDisabled = Boolean(
      this.state.isPending ||
        this.state.usernameErrMsg ||
        this.state.passwordErrMsg
    );

    return (
      <div className="login-container">
        <form>
          <h1 className="text-center mb-3">Login</h1>
          <div className="mb-3">
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
                this.state.usernameErrMsg
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onChange={this.onChange}
            />
            <div className="invalid-feedback">{this.state.usernameErrMsg}</div>
          </div>
          <div className="mb-3">
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
                this.state.passwordErrMsg
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onChange={this.onChange}
            />
            <div className="invalid-feedback">{this.state.passwordErrMsg}</div>
          </div>
          <div className="mt-4 text-center">
            <button
              className="btn btn-primary"
              onClick={this.onClick}
              disabled={isDisabled}
            >
              {this.state.isPending && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span> Log In</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
