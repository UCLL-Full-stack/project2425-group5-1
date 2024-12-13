import UserService from "@/services/UserService";
import formStyles from "@/styles/main-menu/Form.module.css";
import registerStyles from "@/styles/main-menu/RegisterForm.module.css";
import { useForm } from "react-hook-form";

interface Props {
  setShow?: (show: "login" | "register") => void;
  showState: "login" | "register";
}

const RegisterForm: React.FC<Props> = ({ setShow, showState }) => {
  const { register, handleSubmit } = useForm({ defaultValues: { username: "", email: "", password: "" } });

  function registerUser(formData: { username: string, email: string, password: string; }) {
    if (formData.email.length && formData.username.length && formData.password.length) {
      UserService.postRegisterData(formData);
    }
  }

  if (showState !== "register") return <></>;
  return (
    <form className={`${formStyles.form} ${registerStyles.animate}`} onSubmit={handleSubmit(registerUser)}>
      <h1 className={formStyles.title}>Register</h1>
      <label>
        <b>Username</b>
        <input type="text" placeholder="Enter Username" {...register("username", { required: true })} />
      </label>
      <label>
        <b>Email</b>
        <input type="email" placeholder="Enter Email" {...register("email", { required: true })} />
      </label>
      <label>
        <b>Password</b>
        <input type="password" placeholder="Enter Password" {...register("password", { required: true })} />
      </label>
      <button type="submit">Register</button>
      <a className={formStyles.instead} href="#" onClick={() => setShow ? setShow("login") : null}>Login instead</a>
    </form>
  );
};

export default RegisterForm;
