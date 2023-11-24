"use client";
import React from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";

YupPassword(yup);
type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const schema = yup
  .object({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email().required("Email is a required field"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .minUppercase(1, "Password must contain at least 1 uppercase letter")
      .minSymbols(1, "Password must contain at least 1 symbol")
      .required("Password is a required field"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Confirm Password must match")
      .required("Confirm Password is a required field"),
  })
  .required();
export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const jsonData = JSON.stringify(data);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        jsonData,
        {
          headers,
        }
      );
      router.replace("/login");
      alert("berhasil registrasi, silahkan login");
    } catch (error: any) {
      if (error.response.data.status == 404) {
        return alert(error.response.data.message);
      } else {
        return alert(error.response.data.errors.email);
      }
    }
  };
  return (
    <section className=" w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen ">
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 h-full">
          <div className="p-6 s pace-y-4 md:space-y-6 sm:p-8">
            <center>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Welcome Back
              </h1>
              <h3>Sign in to continue</h3>
            </center>

            <form
              className="space-y-3 md:space-y-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name{" "}
                </label>
                <input
                  type="text"
                  id="name"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.name ? "border-rose-600" : ""
                  }`}
                  placeholder="Name"
                  {...register("name")}
                />
                <p className="text-red-500">{errors.name?.message}</p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                  ${errors.email ? "border-rose-600" : ""}
                  `}
                  placeholder="Email"
                  {...register("email")}
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>

                <div className="flex ">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                  ${errors.password ? "border-rose-600" : ""}
                  `}
                    {...register("password")}
                  />
                </div>
                <p className="text-red-500">{errors.password?.message}</p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>

                <div className="flex ">
                  <input
                    type="password"
                    id="password"
                    placeholder="Confirm Password"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                  ${errors.confirmPassword ? "border-rose-600" : ""}
                  `}
                    {...register("confirmPassword")}
                  />
                </div>
                <p className="text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              <div className=" !mt-3 space-y-3 md:!mt-10">
                <button
                  type="submit"
                  className=" w-full text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Register
                </button>
                <Link href={"/"}>
                  <button className="mt-3 w-full text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Back
                  </button>
                </Link>
              </div>
              <p>
                Already a user?
                <Link href={"/login"}>
                  <span className="underline">Login now</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
