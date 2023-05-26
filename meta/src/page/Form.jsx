
import React, { useState } from 'react';
import { useHistory  , NavLink} from 'react-router-dom';
import "./style/form.css"
function Form() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const history=useHistory();
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleValidation = () => {
    let errors = {};

    if (!user.name) {
      errors.name = "Please enter your name";
    } else if (user.name.length < 3) {
      errors.name = "Name should be at least 3 characters long";
    } else if (!isNaN(user.name)) {
      errors.name = "Name should contain at least one character";
    }

    if (!user.password) {
      errors.password = "Please enter your password";
    } else if (user.password.length < 3) {
      errors.password = "Password should be at least 3 characters long";
    } 


    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidation();
    try {
    const {name, email, password } = user;
  
    if (!name || !email || !password) {
      throw new Error('Missing required fields');
    }
  
    const response = await fetch('/Signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
console.log(data)
    if (response.status === 201) {
      // Registration successful
      // // localStorage.setItem("usersdatatoken", data.result.token);
      // localStorage.setItem("EMAIL", data.result.email);
      // localStorage.setItem("usersdatatoken", data.result.token);
      alert(data.message);
      history.push("/")
      // Handle successful registration, e.g., redirect to login page
    } else {
      // Registration failed
      alert(data.error);
      
    }
  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred. Please try again later.');
  }
    
  };
  
  return (
    <div>

<div className="form-all">

  <div className="forms">
  
  <form onSubmit={handleSubmit}>
  <h1>create an account</h1>
        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder=" name" 
          style={{ borderColor: errors.name && "red" }}/>
        {errors.name && <p>{errors.name}</p>}
        <br />
<br />

        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder=" email" />
        <br />
<br />

        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder=" password"  
          style={{ borderColor: errors.password && "red" }}/>
        {errors.password && <p>{errors.password}</p>}
        <br />
<br />

        <button type="submit">Submit</button>
<br />
<br />

        <p> already have account?<NavLink to="/login">login</NavLink> </p>
      </form>

  </div>
</div>

     
    </div>
  );
}

export default Form
