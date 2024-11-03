import styles from "@/styles/RegisterForm.module.css";

const RegisterForm = () => {
  return (
    <form className={`${styles.registerForm}`}>
      <h1>Register</h1>
      <label>
        <b>Username</b>
        <input type="text" placeholder="Enter Username" name="uname" required />
      </label>
      <label>
        <b>Email</b>
        <input type="email" placeholder="Enter Email" name="uname" required />
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
