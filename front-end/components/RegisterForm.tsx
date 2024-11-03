import UserService from "@/services/UserService";
import styles from "@/styles/RegisterForm.module.css";
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from "react";

const RegisterForm = () => {
  const [submit, setSubmit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!submit) return;
    const data = {
      username: username,
      email: email,
      password: password,
    };
    if (data.email.length && data.username.length && data.password.length) {
      UserService.postRegisterData(data);
    } else {
      return;
    }

    router.push("/characterCreator");

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
    <form className={`${styles.registerForm}`} onSubmit={(e) => { e.preventDefault(); setSubmit(true); }}>
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
    </form>
  );
};

export default RegisterForm;
