"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
import { toast } from "react-toastify";
import { Input, Button } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
YupPassword(yup);
type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const schema = yup
  .object({
    name: yup.string().required("Nama harus diisi"),
    email: yup
      .string()
      .email("Email harus berupa email yang valid")
      .required("Email harus diisi"),
    password: yup
      .string()
      .min(8, "Password minimal harus 8 karakter")
      .minUppercase(1, "Password harus mengandung minimal 1 huruf besar")
      .minNumbers(1, "Password harus berisi minimal 1 angka")
      .minSymbols(1, "Password harus mengandung minimal 1 simbol")
      .required("Password harus diisi"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Confirm Password harus sesuai")
      .required("Confirm Password harus diisi"),
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
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleConPassword, setIsVisibleConPassword] =
    useState<boolean>(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);
  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);
  const toggleVisibilityConPassword = () =>
    setIsVisibleConPassword(!isVisibleConPassword);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoadingRegister(true);
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
      toast.success("Register berhasil", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoadingRegister(false);
      router.replace("/login");
    } catch (error: any) {
      if (error.response.data.status == 404) {
        return alert(error.response.data.message);
      } else {
        setIsLoadingRegister(false);
        return alert(error.response.data.errors.email);
      }
    }
  };
  return (
    <section className=" w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen ">
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 h-auto">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <center>
              <h3 className="text-lg font-bold leading-tight tracking-tight text-gray-900  dark:text-white">
                Registrasi
              </h3>
            </center>
            <form
              className="space-y-3 md:space-y-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Input
                  key={"outside"}
                  radius={"sm"}
                  type="text"
                  label="Nama"
                  placeholder="Masukkan nama anda"
                  labelPlacement={"outside"}
                  isInvalid={errors.name ? true : false}
                  errorMessage={errors.name?.message}
                  className="mb-10 "
                  {...register("name")}
                />
              </div>
              <div>
                <Input
                  key={"outside"}
                  radius={"sm"}
                  type="text"
                  label="Email"
                  placeholder="Masukkan email anda"
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
                  placeholder="Masukkan password anda"
                  labelPlacement={"outside"}
                  isInvalid={errors.password ? true : false}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibilityPassword}
                    >
                      {isVisiblePassword ? (
                        <EyeOff strokeWidth={0.75} />
                      ) : (
                        <Eye strokeWidth={0.75} />
                      )}
                    </button>
                  }
                  type={isVisiblePassword ? "text" : "password"}
                  className="mb-10"
                  {...register("password")}
                />
              </div>
              <div>
                <Input
                  key={"outside"}
                  radius={"sm"}
                  label="Konfirmasi Password"
                  placeholder="Ketik ulang password"
                  labelPlacement={"outside"}
                  isInvalid={errors.confirmPassword ? true : false}
                  errorMessage={errors.confirmPassword?.message}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibilityConPassword}
                    >
                      {isVisibleConPassword ? (
                        <EyeOff strokeWidth={0.75} />
                      ) : (
                        <Eye strokeWidth={0.75} />
                      )}
                    </button>
                  }
                  type={isVisibleConPassword ? "text" : "password"}
                  className="mb-10"
                  {...register("confirmPassword")}
                />
              </div>
              <div className=" !mt-3 space-y-3 md:!mt-10">
                <Button
                  type="submit"
                  className=" w-full text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  isLoading={isLoadingRegister}
                >
                  Register
                </Button>
                <Link href={"/"}>
                  <button className="mt-3 w-full text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Kembali
                  </button>
                </Link>
              </div>
              <p>
                Sudah mempunyai akun?
                <Link href={"/login"}>
                  <span className="underline">Masuk sekarang</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
