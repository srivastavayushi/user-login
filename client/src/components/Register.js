import React, { useState } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert'

export default function Register(){
  
  const alert = useAlert()

  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const { phone, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
   
        e.preventDefault();
        const newUser = {
          phone, 
          password
        };
        try {
          const config = {
            headers: {
              'Accept': 'application/json, text/plain, */*',
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*'
            },
          };
          const body = JSON.stringify(newUser);
          const res = await axios.post("http://localhost:5000/api/user/register", body, config);
          if(res.data.errorData){
            alert.show(res.data.errorData)
          }else{
            alert.show("Registration Successful")
          }
          console.log(res.data);
        } catch (err) {
          console.error(err);
        }
      };

  return (
    <div className="container-fluid">
      <h1 className="large text-primary">Register</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>    
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={phone}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
    </div>
  );
};
