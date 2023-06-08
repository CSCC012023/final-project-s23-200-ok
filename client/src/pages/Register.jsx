import { useState, useEffect } from "react";

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Destructure formData
  const { userName, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value]
    }));
  };

  return (
    <>
      <section className="heading">
        <h1>
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form className="form-group">
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