"use client";
import { useSession } from "next-auth/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";

type Inputs = {
  tipe_buku: string;
};
const schema = yup
  .object({
    tipe_buku: yup.string().required("Name is a required field"),
  })
  .required();
export default function BorrowBuku({ id }: any) {
  const { data: session }: { data: any } = useSession();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,

    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const peminjaman = {
      buku: [id],
    };
    const jsonData = JSON.stringify(peminjaman);
    console.log(jsonData);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/api/peminjaman",
      jsonData,
      {
        headers,
      }
    );

    console.log(response.data.status);
    if (response.data.status === 400) {
      toast.error("Anda tidak bisa meminjam buku lebih dari 3", {
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
      toast.success("Peminjaman berhasil", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <Button
        onPress={() => {
          onOpen();
        }}
        className="  text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {" "}
        Borrow
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        scrollBehavior="inside"
        hideCloseButton
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Borrow Buku
              </ModalHeader>
              <ModalBody>
                <form
                  className="space-y-3 md:space-y-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    control={control}
                    name="tipe_buku"
                    render={({ field: { onChange } }) => (
                      <RadioGroup
                        label="Select your favorite city"
                        isInvalid={errors.tipe_buku ? true : false}
                        errorMessage={errors.tipe_buku?.message}
                        onChange={onChange}
                      >
                        <Radio value="1">Hard copy</Radio>
                        <Radio value="2">Soft copy</Radio>
                      </RadioGroup>
                    )}
                  />
                  <Button
                    type="submit"
                    className=" w-full text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Borrow
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    reset();
                    onClose();
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
