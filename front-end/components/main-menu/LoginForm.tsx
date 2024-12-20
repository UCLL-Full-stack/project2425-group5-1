import UserService from "@/services/UserService";
import formStyles from "@/styles/main-menu/Form.module.css";
import loginStyles from "@/styles/main-menu/LoginForm.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

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
  const { t } = useTranslation();


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
      <h1 className={formStyles.title}>{t("root.login.title")}</h1>
      <label>
        <b>{t("root.login.email")}</b>
        <input type="text" placeholder={t("root.login.emailInput")} {...register("email", { required: true })} />
      </label>
      <label>
        <b>{t("root.login.password")}</b>
        <input type="password" placeholder={t("root.login.passwordInput")} {...register("password", { required: true })} />
      </label>
      <button type="submit">{t("root.login.submit")}</button>
      <a className={formStyles.instead} href="#" onClick={() => setShow ? setShow("register") : null}>{t("root.login.alternative")}</a>
    </form>
  );
};

export default LoginForm;
