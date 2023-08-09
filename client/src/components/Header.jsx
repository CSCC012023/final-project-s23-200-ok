import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
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
        <NavLink to="/">
          <img
            src="https://cdn.discordapp.com/attachments/1105994213834899538/1117232429883740220/logo.png" 
            alt="playbookLogo" />
          playbook
        </NavLink>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <NavLink to="/chat" className={({ isActive }) => (
                isActive ? "active-nav-btn" : "inactive-nav-btn"
              )}>
                Chat {user.chatAlert && <span class="badge">New</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={({ isActive }) => (
                isActive ? "active-nav-btn" : "inactive-nav-btn"
              )}>
                Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile"className={({ isActive }) => (
                isActive ? "active-nav-btn" : "inactive-nav-btn"
              )}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/notifications"className={({ isActive }) => (
                isActive ? "active-nav-btn" : "inactive-nav-btn"
              )}>
                Notifications
              </NavLink>
            </li>
            <li>
              <NavLink to="/lfg"className={({ isActive }) => (
                isActive ? "active-nav-btn" : "inactive-nav-btn"
              )}>
                Lfg
              </NavLink>
            </li>
            <li>
              <NavLink to="/stat"className={({ isActive }) => (
                isActive ? "active-nav-btn" : "inactive-nav-btn"
              )}>
                Stats
              </NavLink>
            </li>
            <li>
              <NavLink to="/tournament"className={({ isActive }) => (
                isActive ? "active-nav-btn" : "inactive-nav-btn"
              )}>
                tournament
              </NavLink>
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
              <NavLink to="/register"className={({ isActive }) => (
                isActive ? "active-nav-btn" : "inactive-nav-btn"
              )}>
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login"className={({ isActive }) => (
                isActive ? "active-nav-btn" : "inactive-nav-btn"
              )}>
                Log In
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;