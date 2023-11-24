"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/app/stores/authStore";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
YupPassword(yup);
type Inputs = {
  email: string;
  password: string;
};
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().password().required(),
  })
  .required();
export default function Login() {
  const router = useRouter();
  const { setToken, token } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log(token);
  }, [token]);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
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
      localStorage.setItem("token", response.data.token);
      setToken(localStorage.getItem("token"));
      router.replace("/");
      alert("berhasil login");
    } catch (error: any) {
      if (error.response.data.status == 404) {
        return alert(error.response.data.message);
      } else {
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
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Welcome Back
              </h1>
            </center>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email{" "}
                </label>
                <input
                  type="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.email ? "border-rose-600" : ""
                  }`}
                  placeholder="name@company.com"
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
                    placeholder="password"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.password ? "border-rose-600" : ""
                    }`}
                    {...register("password")}
                  />
                </div>

                <p className="text-red-500">{errors.password?.message}</p>
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
                <button
                  type="submit"
                  className=" w-full text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
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
