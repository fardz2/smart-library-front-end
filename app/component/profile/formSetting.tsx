"use client";

import { Avatar, Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { BookOpen } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
type Inputs = {
  name: string;
  nomor_telepon: string;
  alamat: string;
};
export function FormSetting() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    shouldUnregister: false,
  });
  const [infoUser, setInfoUser] = useState({
    name: "",
    email: "",
    id: "",
    nomor_telepon: "",
    alamat: "",
    buku_yang_telah_dipinjam: 0,
    buku_yang_sedang_dipinjam: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    };
    const jsonData = JSON.stringify(data);
    await axios.put(`http://127.0.0.1:8000/api/info`, jsonData, {
      headers,
    });
    toast.success("Add User Success", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(data);
    getInfoUser();
  };
  useEffect(() => {
    if (status == "authenticated") {
      getInfoUser();
    }
  }, [session?.user.accessToken]);

  const getInfoUser = async () => {
    setIsLoading(false);
    const headers = {
      Authorization: `Bearer ${session?.user.accessToken}`,
    };
    const response = await axios.get("http://127.0.0.1:8000/api/info", {
      headers,
    });
    setInfoUser({
      name: response.data.data.name,
      email: response.data.data.email,
      id: response.data.data.id,
      nomor_telepon: response.data.data.nomor_telepon,
      alamat: response.data.data.alamat,
      buku_yang_telah_dipinjam: response.data.data.buku_yang_telah_dipinjam,
      buku_yang_sedang_dipinjam: response.data.data.buku_yang_sedang_dipinjam,
    });
    setValue("name", response.data.data.name);
    setValue("nomor_telepon", response.data.data.nomor_telepon);
    setValue("alamat", response.data.data.alamat);
    setIsLoading(true);
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex justify-center items-center flex-col">
              <div>Your Profile Picture</div>
              <Avatar
                src="https://i.prava  =a04258114e29026708c"
                className="w-20 h-20 text-large"
              />
            </div>
            <div className="flex justify-center items-center">
              <div className="bg-[#F27851] p-4 w-[150px] h-[150px] rounded-md ">
                <div className="flex justify-between gap-5">
                  <div className="bg-white p-2 flex justify-center items-center  rounded-md">
                    <BookOpen />
                  </div>
                  <div className="text-lg text-white">
                    {infoUser.buku_yang_telah_dipinjam}
                  </div>
                </div>
                <div className="mt-3 ">
                  <div className="text-md text-white">
                    Buku yang telah dipinjam
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="bg-[#926CFF] p-4 w-[150px]  h-[150px] rounded-md ">
                <div className="flex justify-between gap-5">
                  <div className="bg-white p-2 flex justify-center items-center  rounded-md">
                    <BookOpen />
                  </div>
                  <div className="text-lg text-white">
                    {infoUser.buku_yang_sedang_dipinjam}
                  </div>
                </div>
                <div className="mt-3 ">
                  <div className="text-md text-white">
                    Buku yang sedang dipinjam
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid  grid-flow-row md:grid-cols-2 gap-4">
              <div>
                <Input
                  key={"outside"}
                  radius={"sm"}
                  type="text"
                  label="Name"
                  placeholder="Enter your name"
                  labelPlacement={"outside"}
                  defaultValue={infoUser?.name}
                  {...register("name")}
                />
              </div>
              <div>
                <Input
                  key={"outside"}
                  radius={"sm"}
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  labelPlacement={"outside"}
                  value={infoUser?.email}
                  isDisabled
                />
              </div>
              <div>
                <Input
                  key={"outside"}
                  radius={"sm"}
                  type="text"
                  label="Register number"
                  placeholder=""
                  labelPlacement={"outside"}
                  value={infoUser?.id}
                  isDisabled
                />
              </div>
              <div>
                <Input
                  key={"outside"}
                  radius={"sm"}
                  type="number"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  labelPlacement={"outside"}
                  startContent={<p>+62</p>}
                  defaultValue={infoUser?.nomor_telepon}
                  {...register("nomor_telepon")}
                />
              </div>
              <div className="md:col-span-2">
                <Textarea
                  label="Address"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                  className="max-w-full mb-10 "
                  defaultValue={infoUser?.alamat}
                  {...register("alamat")}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="  text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update Profile
            </Button>
          </form>
        </>
      ) : (
        "loading"
      )}
    </>
  );
}
