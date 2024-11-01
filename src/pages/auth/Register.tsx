import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const Register = () => {

  const [form, setForm] = useState({
    email:"",
    password:"",
    confirmPassword:""
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
    if (form.password !== form.confirmPassword) {
      return alert('Confirm Password is not match!')
    }
    try {
      const response = await axios.post('http://localhost:3000/api/register',form)
      // console.log(response);
      toast.success(response.data.message)
      
    } catch (err:any) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      // console.log(err);
      
    }
    
  }


  return (
    <div>
      Register
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email">Email</label>
        <input className="border" type="email" name="email" onChange = {handleOnChange}/>

        <label htmlFor="password">Password</label>a
        <input type="password" name="password" className="border" onChange = {handleOnChange}/>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" className="border" onChange = {handleOnChange}/>

        <button className="bg-blue-500 rounded-md" onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
};

export default Register;
