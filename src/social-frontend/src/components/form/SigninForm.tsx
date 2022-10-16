import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useApi } from "../../hooks/useApi";
import { IFormProps, ISigninFormData } from "../../types/formTypes";
import FormField from "./FormField";

const SigninForm = (props: IFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninFormData>({
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const { signin } = useApi().user;

  const { mutate, isLoading } = useMutation(
    (values: ISigninFormData) => signin(values),
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

      <input type="submit" value={"Sign in"} className={"form-input submit"}/>
    </form>
  );
};

export default SigninForm;
