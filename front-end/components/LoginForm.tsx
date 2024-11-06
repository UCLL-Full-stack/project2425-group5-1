import styles from "@/styles/LoginForm.module.css";
import { useEffect, useState } from "react";

interface Props {
  setShow?: (show: "login" | "register") => void;
  showState: "login" | "register";
}

const LoginForm: React.FC<Props> = ({ setShow, showState }) => {
  const [firstAnimateDelay, usefirstAnimateDelay] = useState(-1);

  useEffect(() => {
    usefirstAnimateDelay(firstAnimateDelay + 1);
  }, [showState]);

  if (showState !== "login") return <></>;
  return (
    <form className={`${styles.loginForm} ${firstAnimateDelay ? styles.animate : null}`}>
      <h1>Login</h1>
      <label>
        <b>Username</b>
        <input type="text" placeholder="Enter Username" name="uname" required />
      </label>
      <label>
        <b>Password</b>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />
      </label>
      <button type="submit">Login</button>
      <a href="#" onClick={() => setShow ? setShow("register") : null}>Register instead</a>
    </form>
  );
};

export default LoginForm;
