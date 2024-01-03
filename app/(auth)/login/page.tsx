"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";

import { toast } from "react-toastify";
import { Input, Button } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

YupPassword(yup);
type Inputs = {
  email: string;
  password: string;
};
const schema = yup
  .object({
    email: yup
      .string()
      .email("Email harus berupa email yang valid")
      .required("Email wajib diisi"),
    password: yup
      .string()
      .min(8, "Password minimal harus 8 karakter")
      .minUppercase(1, "Password harus mengandung minimal 1 huruf besar")
      .minNumbers(1, "Password harus berisi minimal 1 angka")
      .minSymbols(1, "Password harus mengandung minimal 1 simbol")
      .required("Password harus diisi"),
  })
  .required();
export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoadingLogin(true);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then(({ ok, error }: any) => {
      if (ok) {
        setIsLoadingLogin(false);
        router.replace("/");
        toast.success("Login berhasil", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast("Credentials do not match!", { type: "error" });
        setIsLoadingLogin(false);
      }
    });
  };
  return (
    <section className=" w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen ">
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 h-auto">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <center className="mb-6">
              <h3 className="text-lg font-bold leading-tight tracking-tight text-gray-900  dark:text-white">
                Selamat Datang
              </h3>
              <h4>Sign in untuk melanjutkan </h4>
            </center>

            <form
              className="space-y-4 md:space-y-6 mt-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-2">
                <Input
                  key={"outside"}
                  radius={"sm"}
                  type="email"
                  label="Email"
                  placeholder="Masukkan Email Anda"
                  labelPlacement={"outside"}
                  isInvalid={errors.email ? true : false}
                  errorMessage={errors.email?.message}
                  className="mb-10 "
                  {...register("email")}
                />
              </div>
              <div>
                <Input
                  key={"outside"}
                  radius={"sm"}
                  label="Password"
                  placeholder="Masukkan Password Anda"
                  labelPlacement={"outside"}
                  isInvalid={errors.password ? true : false}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeOff strokeWidth={0.75} />
                      ) : (
                        <Eye strokeWidth={0.75} />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  {...register("password")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Ingat Saya
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Lupa password?
                </a>
              </div>
              <div className=" !mt-3 space-y-3 md:!mt-10">
                <Button
                  type="submit"
                  className=" w-full text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  isLoading={isLoadingLogin}
                >
                  Login
                </Button>
                <Link href={"/"}>
                  <button className="mt-3 w-full text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Kembali
                  </button>
                </Link>
              </div>
              <p>
                User Baru?
                <Link href={"/register"}>
                  <span className="underline">Daftar Disini</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
