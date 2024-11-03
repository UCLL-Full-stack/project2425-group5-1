import styles from "@/styles/LoginForm.module.css";

const LoginForm = () => {
    return (
        <form className={`${styles.loginForm}`}>
            <h1>Login</h1>
            <label>
                <b>Username</b>
                <input type="text" placeholder="Enter Username" name="uname" required />
            </label>
            <label>
                <b>Password</b>
                <input type="password" placeholder="Enter Password" name="psw" required />
            </label>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;