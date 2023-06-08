import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">playbook</Link>
      </div>
      <ul>
        <li>
          <Link to="/register">
            register
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;