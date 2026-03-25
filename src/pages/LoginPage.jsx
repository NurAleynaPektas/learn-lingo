import css from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import iziToast from "izitoast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
});

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    localStorage.setItem("user", "true");
    window.dispatchEvent(new Event("userChanged"));

    iziToast.success({
      title: "Success",
      message: "Logged in successfully",
      position: "topRight",
    });

    navigate("/teachers");
  };

  return (
    <section className={css.container}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <div>
          <input
            type="email"
            placeholder="Email"
            className={css.input}
            {...register("email")}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className={css.input}
            {...register("password")}
          />
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className={css.button}>
          Log in
        </button>
      </form>
    </section>
  );
}
