import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Destructure form data
  const { userName, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get and destructure auth slice
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
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

    console.log(password);
    console.log(confirmPassword);

    if (password.toString() !== confirmPassword.toString()) {
      toast.error("Passwords do not match");
    }
    else {
      const userData = {
        userName,
        email,
        password
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  
  return (
    <>
      <section className="heading">
        <h1>
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit} className="form-group">
          <input 
            type="text"
            id="user-name"
            name="userName"
            value={userName}
            placeholder="Username"
            onChange={onChange} />
          <input 
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Email address"
            onChange={onChange} />
          <input 
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={onChange} />
          <input 
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={onChange} />
          <button className="btn btn-block" type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

export default Register;