import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand bg-light shadow-sm ps-4 pe-4">
      <Link
        className="navbar-brand"
        to="/"
      >
        Wanderlust
      </Link>
      <ul className="navbar-nav ms-auto">
        <li>
          <Link
            className="nav-link"
            to="/login"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            className="nav-link"
            to="/signup"
          >
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
}
