import UserService from "@/services/UserService";
import styles from "@/styles/RegisterForm.module.css";
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from "react";

interface Props {
  setShow?: (show: "login" | "register") => void;
  showState: "login" | "register";
}

const RegisterForm: React.FC<Props> = ({ setShow, showState }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function registerUser() {
    const data = {
      username: username,
      email: email,
      password: password,
    };
    if (data.email.length && data.username.length && data.password.length) {
      UserService.postRegisterData(data);
      router.push("/characterCreator");
    } else {
      return;
    }
  }

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  if (showState !== "register") return <></>;
  return (
    <form className={`${styles.registerForm}`} onSubmit={(e) => { e.preventDefault(); registerUser(); }}>
      <h1>Register</h1>
      <label>
        <b>Username</b>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          onChange={handleUsernameChange}
          required
        />
      </label>
      <label>
        <b>Email</b>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label>
        <b>Password</b>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={handleEmailChange}
          required
        />
      </label>
      <button type="submit">Register</button>
      <a href="#" onClick={() => setShow ? setShow("login") : null}>Login instead</a>
    </form>
  );
};

export default RegisterForm;
