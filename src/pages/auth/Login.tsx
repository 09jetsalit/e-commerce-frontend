import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {

  const [form, setForm] = useState({
    email:"",
    password:"",
  })

  const handleOnChange = (e:any) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })    
  }

  const handleSubmit = async () => {
    // console.log(form);    
    try {
      const response = await axios.post('http://localhost:3000/api/login',form)
      // console.log(response);
      toast.success(response.data.message)
      
    } catch (err:any) {
      const errMsg = err.response?.data?.message
      toast.error('Email or Password Invalid')
      console.log(err);
      
    }
    
  }


  return (
    <div>
      Login
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email">Email</label>
        <input className="border" type="email" name="email" onChange = {handleOnChange}/>

        <label htmlFor="password">Password</label>a
        <input type="password" name="password" className="border" onChange = {handleOnChange}/>

        <button className="bg-blue-500 rounded-md" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
