import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// password regex: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
const schema = yup.object().shape({
  // firstName: yup.string().required("First Name is required"),
  // lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must be minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      }
    ),
});

export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log(errors);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      {/* <section className="form-input-group">
        <label htmlFor="firstName">First Name: </label>
        <input {...register("firstName")} id="firstName" />
        <p>{errors.firstName && errors.firstName.message}</p>
      </section>

      <section className="form-input-group">
        <label htmlFor="lastName">Last Name</label>
        <input {...register("lastName")} id="lastName" />
        <p>{errors.lastName && errors.lastName.message}</p>
      </section> */}
      <section className="form-input-group">
        <label htmlFor="email">Email: </label>
        <input {...register("email")} id="email" />
        <p>{errors.email && errors.email.message}</p>
      </section>
      <section className="form-input-group">
        <label htmlFor="password">Password: </label>
        <input {...register("password")} id="password" />
        <p>{errors.password && errors.password.message}</p>
      </section>
      <input type="submit" />
    </form>
  );
};
