import UserService from "@/services/UserService";
import formStyles from "@/styles/main-menu/Form.module.css";
import loginStyles from "@/styles/main-menu/LoginForm.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  setShow?: (show: "login" | "register") => void;
  showState: "login" | "register";
}

const LoginForm: React.FC<Props> = ({ setShow, showState }) => {
  const [firstAnimateDelay, usefirstAnimateDelay] = useState(-1);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  useEffect(() => {
    usefirstAnimateDelay(firstAnimateDelay + 1);
  }, [showState]);

  const handleLogin = (formData: { email: string, password: string; }) => {
    if (formData.email.length && formData.password.length) {
      UserService.postLoginData(formData);
    }
  };

  if (showState !== "login") return <></>;
  return (
    <form className={`${formStyles.form} ${firstAnimateDelay ? loginStyles.animate : loginStyles.delayAnimate}`} onSubmit={handleSubmit(handleLogin)}>
      <h1 className={formStyles.title}>Login</h1>
      <label>
        <b>Email</b>
        <input type="text" placeholder="Enter Email" {...register("email", { required: true })} />
      </label>
      <label>
        <b>Password</b>
        <input type="password" placeholder="Enter Password" {...register("password", { required: true })} />
      </label>
      <button type="submit">Login</button>
      <a className={formStyles.instead} href="#" onClick={() => setShow ? setShow("register") : null}>Register instead</a>
    </form>
  );
};

export default LoginForm;
