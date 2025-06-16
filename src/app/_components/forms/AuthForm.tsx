"use client";

import type { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "~/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES, FIELD_PLACEHOLDERS } from "~/constants";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  // onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
}: Props<T>) => {
  const [isLoading,] = useState(false);
  const [errorMessage,] = useState("");
  const [next, setNext] = useState<string | null>(null);
  const isSignIn = type === "SIGN_IN";
  const router = useRouter();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNext(params.get("next"));
  }, []);

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    console.log("values", data);
    router.push("/grupos");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="auth-form">
          <h1 className="form-title">
            {isSignIn ? "Inicia sesión en tu cuenta" : "Registrarse"}
          </h1>
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label capitalize">
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        placeholder={
                          FIELD_PLACEHOLDERS[
                            field.name as keyof typeof FIELD_PLACEHOLDERS
                          ]
                        }
                        {...field}
                        className="shad-input shad-no-focus"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          ))}
          {!isSignIn && (
            <p className="mt-4 text-center text-sm text-neutral-500">
              Al registrarte, aceptas nuestras{" "}
              <Link href="#" className="text-[#141e3a] hover:underline">
                Condiciones
              </Link>{" "}
              y nuestra{" "}
              <Link href="#" className="text-[#141e3a] hover:underline">
                Política de datos
              </Link>
              .
            </p>
          )}
          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {isSignIn ? "Ingresar" : "Registrarse"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
          {errorMessage && <p className="error-message">*{errorMessage}</p>}

          <div className="flex w-full items-center">
            <div className="flex-grow border-t border-neutral-300" />
            <span className="body-2 mx-4 text-neutral-900">O</span>
            <div className="flex-grow border-t border-neutral-300" />
          </div>

          <div className="flex justify-center space-x-12">google</div>

          <div className="body-2 mt-4 flex justify-center">
            <p className="text-light-100">
              {isSignIn ? "Aun no tienes una cuenta?" : "Ya tienes una cuenta?"}
            </p>
            <Link
              href={
                isSignIn
                  ? `/sign-up${next ? `?next=${next}` : ""}`
                  : `/sign-in${next ? `?next=${next}` : ""}`
              }
              className="ml-1 font-medium text-[#141e3a] hover:underline"
            >
              {isSignIn ? "Registrarse" : "Iniciar sesión"}
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
