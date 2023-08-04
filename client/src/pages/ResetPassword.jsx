import { useState } from "react";
import axios from "axios"; 
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword() {
    const {id} = useParams();
    console.log(id);
    const [formData, setFormData] = useState({
      password: "",
      confirmPassword :""
    });
    const  {password, confirmPassword} = formData;

    const navigate = useNavigate();

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    };
    const onSubmit = (e) => {
      e.preventDefault();
      if (!password) {
        toast.error('Please enter a password'); 
      } else {
        axios.post("/api/users/resetpassword/" + id, {password})
        .then(response => {
          toast.success('Password reset, please login to continue.');
          navigate("/login");
          
        })

      }

    };
    
    return (<>
      <section className="heading">
        <h1>
          Reset Password
        </h1>
        <p>Please enter a new password.</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit} className="form-group">
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

          <button className="btn btn-block" type="submit">Save</button>
          <hr />
        </form>
      </section>
    </>)
}

export default ResetPassword;
