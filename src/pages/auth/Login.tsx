import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomStore from "../../store/e-com-store";

interface form {
  email: string,
  password: string
}

const Login = () => {

  const actionLogin = useEcomStore((state) => state.actionLogin)

  const [form, setForm] = useState<form>({
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
      const res = await actionLogin(form)
      console.log(res);
      
    } catch (err) {
      const errMsg = err
      // toast.error()
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
