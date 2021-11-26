import React, { useState } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert'
import styles from '../styles/Home.module.css'

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
    <div >
      <form className={styles.description} onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={phone}
            onChange={onChange}
            className={styles.description}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            className={styles.description}
          />
        </div>

        <input type="submit" className={styles.description} value="Register" />
      </form>
    </div>
  );
};
