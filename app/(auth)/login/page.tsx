"use client";
import React, { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/app/stores/authStore";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";

import { toast } from "react-toastify";
import { Input, Button } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";

YupPassword(yup);
type Inputs = {
  email: string;
  password: string;
};
const schema = yup
  .object({
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Email is a required field"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .minUppercase(1, "Password must contain at least 1 uppercase letter")
      .minNumbers(1, "Password must contain at least 1 number")
      .minSymbols(1, "Password must contain at least 1 symbol")
      .required("Password is a required field"),
  })
  .required();
export default function Login() {
  const router = useRouter();
  const { setToken } = useAuthStore();
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
    try {
      setIsLoadingLogin(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const jsonData = JSON.stringify(data);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        jsonData,
        { headers }
      );

      // Handle respons dari API sesuai kebutuhan Anda
      // localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setIsLoadingLogin(false);
      router.replace("/");
      toast.success("Login success", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error: any) {
      if (error.response.data.status == 404) {
        toast.success(error.response.data.message, {
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
        setIsLoadingLogin(false);
        return alert(error.response.data.errors);
      }
    }
  };
  return (
    <section className=" w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen ">
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 h-full">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <center>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-10">
                Welcome Back
              </h1>
            </center>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-2">
                <Input
                  key={"outside"}
                  radius={"sm"}
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
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
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
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
                    Back
                  </button>
                </Link>
              </div>
              <p>
                New User?
                <Link href={"/register"}>
                  <span className="underline">Register Here</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
