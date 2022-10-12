import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useApi } from "../../hooks/useApi";
import { IFormProps } from "../../types/formTypes";
import FormField from "./FormField";

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = (props: IFormProps) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { signup } = useApi().user;

  const { mutate, isLoading } = useMutation(
    (values: IFormInputs) => signup(values),
    {
      onSuccess() {
        props.onSubmit();
      },
      onError() {
        console.log("api error");
      }
    }
  );

  return (
    <form onSubmit={handleSubmit((data) => {mutate(data);})} className="form">
      <Controller
        control={control}
        rules={{
          required: "Username is required",
        }}
        render={({ field: { onChange, value } }) => (
          <FormField
            label="Username"
            error={errors.username?.message}
            onChange={onChange}
            value={value}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: "Email is required",
        }}
        render={({ field: { onChange, value } }) => (
          <FormField
            label="Email"
            type="email"
            error={errors.email?.message}
            onChange={onChange}
            value={value}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: "Password is required",
        }}
        render={({ field: { onChange, value } }) => (
          <FormField
            label="Password"
            type="password"
            error={errors.password?.message}
            onChange={onChange}
            value={value}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          validate: {
            matchesPreviousPassword: (value) => {
              const { password } = getValues();
              return password === value || "Passwords must match";
            },
          },
        }}
        render={({ field: { onChange, value } }) => (
          <FormField
            label="Confirm password"
            type="password"
            error={errors.confirmPassword?.message}
            onChange={onChange}
            value={value}
          />
        )}
        name="confirmPassword"
      />

      <input type="submit" value={"Sign up"} className={"form-input submit"}/>
    </form>
  );
};

export default SignupForm;
