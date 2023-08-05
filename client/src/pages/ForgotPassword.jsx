import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { forgotPassword, reset } from "../features/auth/authSlice";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get and destructure the auth slice
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user || email) {
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
    if (!email) {
      toast.error('Please enter an email'); 
    } else {
      const userData = {
        email
      };
      dispatch(forgotPassword(userData));

    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          Forgot Password? 
        </h1>
        <p>Please enter your email.</p>
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
          <button className="btn btn-block" type="submit">Submit</button>
          <hr />
        </form>
      </section>
    </>
  );
}

export default ForgotPassword;
