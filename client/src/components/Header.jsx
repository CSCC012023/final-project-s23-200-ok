import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

function Header({chatAlert}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header" >
      <div className="logo">
        <Link to="/">playbook</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/chat">chat {chatAlert && <span class="badge">New</span>}</Link>
            </li>
            <li>
              <Link to="/search">search</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/notifications">Notifications</Link>
            </li>
            <li>
              <Link to="/lfg">lfg</Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                Logout
              </button>
            </li>
            
          </>
        ) : (
          <>
            <li>
              <Link to="/register">register</Link>
            </li>
            <li>
              <Link to="/login">log in</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
