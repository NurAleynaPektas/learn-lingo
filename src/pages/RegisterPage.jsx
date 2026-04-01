import css from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import iziToast from "izitoast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import Loader from "../components/Loader";

const schema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Minimum 2 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      iziToast.success({
        title: "Success",
        message: "Registered successfully 🎉",
        position: "topRight",
      });

      navigate("/teachers");
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: error.message,
        position: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <section className={css.container}>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={css.title}>Register</h2>

          {/* NAME */}
          <div>
            <input
              type="text"
              placeholder="Name"
              className={css.input}
              {...register("name")}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className={css.input}
              {...register("email")}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
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

          {/* CONFIRM PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className={css.input}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className={css.error}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" className={css.button}>
            Register
          </button>
        </form>
      </section>
    </>
  );
}
