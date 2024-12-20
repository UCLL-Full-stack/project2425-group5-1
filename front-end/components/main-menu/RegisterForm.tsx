import UserService from "@/services/UserService";
import formStyles from "@/styles/main-menu/Form.module.css";
import registerStyles from "@/styles/main-menu/RegisterForm.module.css";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  setShow?: (show: "login" | "register") => void;
  showState: "login" | "register";
}

const RegisterForm: React.FC<Props> = ({ setShow, showState }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { register, handleSubmit } = useForm({ defaultValues: { name: "", email: "", password: "" } });
  const [registerSuccess, setRegisterSuccess] = useState<boolean | null>(null);

  async function registerUser(formData: { name: string, email: string, password: string; }) {
    if (formData.email.length && formData.name.length && formData.password.length) {
      const response = await UserService.postRegisterData(formData);
      if(response.status === 200) {
        setRegisterSuccess(true);
        setTimeout(() => router.push("/characterCreator"), 1500);
        return;
      } else {
        setRegisterSuccess(false);
        return
      }
    }
  }

  if (showState !== "register") return <></>;
  return (
    <form className={`${formStyles.form} ${registerStyles.animate}`} onSubmit={handleSubmit(registerUser)}>
      <h1 className={formStyles.title}>{t("root.register.title")}</h1>
      <label>
        <b>{t("root.register.username")}</b>
        <input type="text" placeholder={t("root.register.usernameInput")} {...register("name", { required: true })} />
      </label>
      <label>
        <b>{t("root.register.email")}</b>
        <input type="email" placeholder={t("root.register.emailInput")} {...register("email", { required: true })} />
      </label>
      <label>
        <b>{t("root.register.password")}</b>
        <input type="password" placeholder={t("root.register.passwordInput")} {...register("password", { required: true })} />
      </label>
      <button type="submit">{t("root.register.submit")}</button>
      {registerSuccess === null ? null : registerSuccess ? <p style={{color: "green", textAlign: "center"}}>Registering...</p> : !registerSuccess ? <p style={{color: "red", textAlign: "center"}}>Something went wrong</p> : null}
      <a className={formStyles.instead} href="#" onClick={() => setShow ? setShow("login") : null}>{t("root.register.alternative")}</a>
    </form>
  );
};

export default RegisterForm;
