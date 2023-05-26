import "./SignupPage.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSignupAction } from "../../redux/actions";
import { signup } from "../../api/apiCalls.js";

export default function SignupPage(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [nameErrMsg, setNameErrMsg] = useState("");
  const [surnameErrMsg, setSurnameErrMsg] = useState("");
  const [usernameErrMsg, setUsernameErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const dispatch = useDispatch();

  let isDisabled = Boolean(
    isPending ||
      nameErrMsg ||
      surnameErrMsg ||
      usernameErrMsg ||
      emailErrMsg ||
      passwordErrMsg
  );

  return (
    <div className="my-signup-container">
      <form className="my-signup">
        <h1 className="my-signup-header">Signup</h1>
        <div className="my-signup-input">
          <label
            htmlFor="name"
            className="form-label"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className={nameErrMsg ? "form-control is-invalid" : "form-control"}
            onChange={onChange}
          />
          <div className="invalid-feedback">{nameErrMsg}</div>
        </div>
        <div className="my-signup-input">
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
              surnameErrMsg ? "form-control is-invalid" : "form-control"
            }
            onChange={onChange}
          />
          <div className="invalid-feedback">{surnameErrMsg}</div>
        </div>
        <div className="my-signup-input">
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
        <div className="my-signup-input">
          <label
            htmlFor="email"
            className="form-label"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className={emailErrMsg ? "form-control is-invalid" : "form-control"}
            onChange={onChange}
          />
          <div className="invalid-feedback">{emailErrMsg}</div>
        </div>
        <div className="my-signup-input">
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
        <div className="my-signup-btn-container">
          <button
            className="btn btn-primary"
            onClick={onClickSignup}
            disabled={isDisabled}
          >
            {isPending && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span> Sign Up</span>
          </button>
        </div>
      </form>
    </div>
  );

  function onChange(event) {
    let field = event.target.id;
    let value = event.target.value;

    switch (field) {
      case "name":
        setName(value);
        break;
      case "surname":
        setSurname(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }

    validate(field, value);
  }

  async function onClickSignup(event) {
    event.preventDefault();

    const isNameInvalid = !validate("name", name);
    const isSurnameInvalid = !validate("surname", surname);
    const isUsernameInvalid = !validate("username", username);
    const isEmailInvalid = !validate("email", email);
    const isPasswordInvalid = !validate("password", password);

    let isFormInvalid =
      isNameInvalid ||
      isSurnameInvalid ||
      isUsernameInvalid ||
      isEmailInvalid ||
      isPasswordInvalid;

    if (isFormInvalid) return;

    setIsPending(true);

    const body = {
      name,
      surname,
      username,
      email,
      password,
    };

    try {
      // await signup(body);

      const userInfo = {
        ...body,
        image: null,
      };

      dispatch(getSignupAction(userInfo));
      props.history.push("/");
    } catch (error) {
      console.log("Invalid signup");
    } finally {
      setIsPending(false);
    }
  }

  function validate(field, value) {
    let errMsg = "";

    if (value.length == 0) errMsg = `${field} cannot be empty.`;
    else if (field == "name" || field == "surname") {
      if (value.length < 2 || value.length > 30)
        errMsg = `${field} must be at least 2 and at most 30 characters long.`;
      else if (!/^[a-z çğıöşü]+$/i.test(value))
        errMsg = `${field} must contain only letters and spaces.`;
      else if (!/[a-zçğıöşü]/i.test(value))
        errMsg = `${field} cannot contain only spaces.`;
    } else if (field == "username") {
      if (value.length < 3 || value.length > 12)
        errMsg = `${field} must be at least 3 and at most 12 characters long.`;
      else if (!/^[a-z0-9]+$/i.test(value))
        errMsg = `${field} must contain only letters and digits.`;
    } else if (field == "email") {
      if (!value.includes("@")) errMsg = `Please enter a valid email address.`;
    } else if (value.length < 8 || value.length > 12)
      errMsg = `${field} must be at least 8 and at most 12 characters long.`;

    if (errMsg) {
      errMsg = errMsg[0].toUpperCase() + errMsg.slice(1);

      if (field == "name") setNameErrMsg(errMsg);
      else if (field == "surname") setSurnameErrMsg(errMsg);
      else if (field == "username") setUsernameErrMsg(errMsg);
      else if (field == "email") setEmailErrMsg(errMsg);
      else setPasswordErrMsg(errMsg);

      return false;
    } else {
      if (field == "name" && nameErrMsg) setNameErrMsg(errMsg);
      else if (field == "surname" && surnameErrMsg) setSurnameErrMsg(errMsg);
      else if (field == "username" && usernameErrMsg) setUsernameErrMsg(errMsg);
      else if (field == "email" && emailErrMsg) setEmailErrMsg(errMsg);
      else if (field == "password" && passwordErrMsg) setPasswordErrMsg(errMsg);

      return true;
    }
  }
}
