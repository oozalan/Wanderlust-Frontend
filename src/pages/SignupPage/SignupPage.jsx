import React from "react";
import { signup } from "../../api/apiCalls.js";
import "./SignupPage.css";

export default class SignupPage extends React.Component {
  state = {
    name: "",
    surname: "",
    username: "",
    password: "",
    isPending: false,
    nameErrMsg: "",
    surnameErrMsg: "",
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

    const body = {
      name: this.state.name,
      surname: this.state.surname,
      username: this.state.username,
      password: this.state.password,
    };

    const isNameInvalid = !this.validate("name", body.name);
    const isSurnameInvalid = !this.validate("surname", body.surname);
    const isUsernameInvalid = !this.validate("username", body.username);
    const isPasswordInvalid = !this.validate("password", body.password);

    let isFormInvalid =
      isNameInvalid ||
      isSurnameInvalid ||
      isUsernameInvalid ||
      isPasswordInvalid;

    if (isFormInvalid) return;

    this.setState({
      isPending: true,
    });

    try {
      await signup(body);
    } catch (error) {
      console.log("Bad signup POST request");
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

    if (field == "name" || field == "surname") {
      if (value.length < 2 || value.length > 30) {
        let errMsg = `${field} must be at least 2 and at most 30 characters long.`;
        errMsg = errMsg[0].toUpperCase() + errMsg.slice(1);
        this.setState({
          [field + "ErrMsg"]: errMsg,
        });
        return false;
      }

      if (!/^[a-z çğıöşü]+$/i.test(value)) {
        let errMsg = `${field} must contain only letters and spaces.`;
        errMsg = errMsg[0].toUpperCase() + errMsg.slice(1);
        this.setState({
          [field + "ErrMsg"]: errMsg,
        });
        return false;
      }

      if (!/[a-zçğıöşü]/i.test(value)) {
        let errMsg = `${field} cannot contain only spaces.`;
        errMsg = errMsg[0].toUpperCase() + errMsg.slice(1);
        this.setState({
          [field + "ErrMsg"]: errMsg,
        });
        return false;
      }
    } else if (field == "username") {
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
        this.state.nameErrMsg ||
        this.state.surnameErrMsg ||
        this.state.usernameErrMsg ||
        this.state.passwordErrMsg
    );

    return (
      <div className="signup-container">
        <form>
          <h1 className="text-center mb-3">Signup</h1>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className={
                this.state.nameErrMsg
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onChange={this.onChange}
            />
            <div className="invalid-feedback">{this.state.nameErrMsg}</div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="surname"
              className="form-label"
            >
              Surname
            </label>
            <input
              type="text"
              id="surname"
              className={
                this.state.surnameErrMsg
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onChange={this.onChange}
            />
            <div className="invalid-feedback">{this.state.surnameErrMsg}</div>
          </div>
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
              <span> Sign Up</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
