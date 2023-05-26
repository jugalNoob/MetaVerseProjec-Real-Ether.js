
import React, { useState,useContext } from 'react';
import { useHistory  , NavLink} from 'react-router-dom';
import "./style/login.css"
import { UserContext } from '../App';

function Login() {
  const {state , dispatch}= useContext(UserContext);
  const [user, setUser] = useState({
 
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

   

    if (!user.password) {
      errors.password = "Please enter your password";
    } else if (user.password.length < 3) {
      errors.password = "Password should be at least 3 characters long";
    }
    // } else if (isNaN(user.password)) {
    //   errors.password = "Password should contain at least one character";
    // }

    setErrors(errors);
  };

  //Login start row class

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidation();
    try {
      const { email, password } = user;
  
      if (!email || !password) {
        throw new Error('Missing required fields');
      }
  
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        // Login successful
      
          localStorage.setItem("usersdatatoken", data.result.token);
          localStorage.setItem("EMAIL", email);
          localStorage.setItem("password" , password)
          alert(data.message);
          alert("You are logged in.");
          history.push("/");
          dispatch({type:'user' , payload:true})
          // Handle successful login, e.g., redirect to home page
        
      } else {
        // Login failed
        alert(data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  // ether@gmail.com
 //ether123
  return (
    <div>

<div className="form-all">

<div className="forms">

      <form onSubmit={handleSubmit}>
     

        <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your email" />
        <br />
<br />
        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your password"    style={{ borderColor: errors.password && "red" }}/>
        {errors.password && <p>{errors.password}</p>}
        <br />
<br />
        <button type="submit">Submit</button>
        <br />
        <br />
        <p> you already login?<NavLink to="/">home</NavLink> </p>
      </form>

      </div>
</div>
    </div>
  );
}

export default Login
