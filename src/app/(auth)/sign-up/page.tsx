"use client";
import React from "react";
import AuthForm from "~/app/_components/forms/AuthForm";
import { signUpSchema } from "~/lib/validations";

const SignUp = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      fullName: "",
      email: "",
      password: "",
    }}
    // onSubmit={}
  />
);

export default SignUp;
