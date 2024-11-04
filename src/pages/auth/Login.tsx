import { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/e-com-store";
import { useNavigate } from "react-router-dom";

interface form {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin);
  // const user = useEcomStore((state) => state.user);
  // console.log(user);

  const [form, setForm] = useState<form>({
    email: "",
    password: "",
  });

  const handleOnChange = (e: any) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.email && !form.password) {
      return toast.error("Email and Password is Required");
    }
    if (!form.email) {
      return toast.error("Email is Required");
    }
    if (!form.password) {
      return toast.error("Password is Required");
    }
    // console.log(form);
    try {
      const res:any = await actionLogin(form);
      toast.success(res.data?.message);
      // console.log(res);
      const role = res.data.user.role
      // console.log(role);

      if(role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/user')
      }

            
    } catch (err: any) {
      // console.log(err.response?.data?.message);

      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  return (
    <div>
      Login
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email">Email</label>
        <input
          className="border"
          type="email"
          name="email"
          onChange={handleOnChange}
        />
        <label htmlFor="password">Password</label>a
        <input
          type="password"
          name="password"
          className="border"
          onChange={handleOnChange}
        />
        <button className="bg-blue-500 rounded-md" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
