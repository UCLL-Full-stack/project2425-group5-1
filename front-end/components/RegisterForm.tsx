import UserService from "@/services/UserService";
import styles from "@/styles/RegisterForm.module.css";
import { ChangeEvent, useEffect, useState } from "react";

const RegisterForm = () => {
  const [submit, setSubmit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!submit) return;
    const data = {
      username: username,
      email: email,
      password: password,
    };

    if (data.email.length && data.username.length && data.password.length) {
      UserService.postRegisterData(data);
    }

    setSubmit(false);
  }, [submit]);

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  return (
    <form className={`${styles.registerForm}`}>
      <h1>Register</h1>
      <label>
        <b>Username</b>
        <input
          type="text"
          placeholder="Enter Username"
          name="uname"
          onChange={handleUsernameChange}
          required
        />
      </label>
      <label>
        <b>Email</b>
        <input
          type="email"
          placeholder="Enter Email"
          name="uname"
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label>
        <b>Password</b>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          onChange={handleEmailChange}
          required
        />
      </label>
      <button type="submit" onClick={() => { setSubmit(true); }}>Register</button>
    </form>
  );
};

export default RegisterForm;
