import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";
import { getProfile } from "../features/profile/profileSlice";
import { getIncomingFriendRequests, getOutgoingFriendRequests } from "../features/friendRequests/friendRequestsSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get and destructure the auth slice
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      dispatch(getProfile());
      dispatch(getIncomingFriendRequests());
      dispatch(getOutgoingFriendRequests());
      navigate("/");
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          Login
        </h1>
        <p>Connect with fellow gamers on Playbook.</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit} className="form-group">
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            placeholder="Email" 
            onChange={onChange} />
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            placeholder="Password" 
            onChange={onChange} />
          <button className="btn btn-block" type="submit">Log In</button>
          <hr />
          {/* TODO: add underline-link class in css in dev branch, process is weird atm */}
          <Link to="/register" className="underline-link">
            Don't have an account? Register today!
          </Link>
        </form>
      </section>
    </>
  );
}

export default Login;
