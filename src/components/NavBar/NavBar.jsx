import "./NavBar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLogoutAction } from "../../redux/actions";

export default function NavBar() {
  const { isLoggedIn, username } = useSelector((store) => store);
  const dispatch = useDispatch();

  let links = (
    <ul className="my-navbar-list">
      <li>
        <Link
          className="my-navbar-link"
          to="/login"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          className="my-navbar-link"
          to="/signup"
        >
          Signup
        </Link>
      </li>
    </ul>
  );

  if (isLoggedIn) {
    links = (
      <ul className="my-navbar-list">
        <li>
          <Link
            className="my-navbar-link"
            to={`/user/${username}`}
          >
            {username}
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="my-navbar-link"
            onClick={onClickLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="my-navbar">
      <Link
        className="my-navbar-link my-navbar-title"
        to="/"
      >
        Wanderlust
      </Link>
      {links}
    </nav>
  );

  // Functions
  function onClickLogout() {
    dispatch(getLogoutAction());
  }
}
