import React from "react";
import { Controller, useForm } from "react-hook-form";
import { IFormProps } from "../../types/formTypes";
import FormField from "./FormField";

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const onSubmit = (data: IFormInputs, submit: () => void) => {
  console.log(data);
  submit();
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

  return (
    <form onSubmit={handleSubmit(async (data) => onSubmit(data, props.onSubmit))} className="form">
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
