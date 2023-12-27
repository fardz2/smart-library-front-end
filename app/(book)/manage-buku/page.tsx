"use client";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Pagination,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Buku from "@/app/component/cardBuku";
import { useSession } from "next-auth/react";
type Inputs = {
  cover: FileList;
  judul_buku: string;
  penerbit: string;
  pengarang: string;
  sinopsis: string;
  tahun_terbit: string;
  jumlah_buku: string;
  lokasi_rak_buku: string;
  pdf_buku: FileList;
};

const schema = yup
  .object({
    judul_buku: yup.string().required("Judul Buku is a required field"),
    penerbit: yup.string().required("Penerbit is a required field"),
    pengarang: yup.string().required("Pengarang is a required field"),
    sinopsis: yup.string().required("Sinopsis is a required field"),
    tahun_terbit: yup.string().required("Tahun terbit is a required field"),
    jumlah_buku: yup.string().required("Jumlah Buku is a required field"),
    lokasi_rak_buku: yup
      .string()
      .required("Lokasi rak buku is a required field"),
  })
  .required();

export default function Page() {
  const { data: session }: { data: any } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState<number>(
    page != null ? parseInt(page) : 1
  );

  const [buku, setBuku] = useState<any>({
    last_page: null,
    data: [],
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    getBuku();
  }, [currentPage]);

  useEffect(() => {
    const redirectToPage = () => {
      const targetPage =
        currentPage === 1 ? "manage-buku" : `manage-buku?page=${currentPage}`;
      router.push(targetPage);
    };
    redirectToPage();
  }, [currentPage, router]);

  const getBuku = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/buku?page=${currentPage}`
    );
    const data = res.data.data;
    setBuku({ last_page: data.last_page, data: data.data });
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("cover", data.cover[0]);
      formData.append("judul_buku", data.judul_buku);
      formData.append("penerbit", data.penerbit);
      formData.append("pengarang", data.pengarang);
      formData.append("sinopsis", data.sinopsis);
      formData.append("tahun_terbit", data.tahun_terbit);
      formData.append("jumlah_buku", data.jumlah_buku);
      formData.append("lokasi_rak_buku", data.lokasi_rak_buku);
      formData.append("pdf_buku", data.pdf_buku[0]);

      const headers = {
        Authorization: `Bearer ${session?.user.accessToken}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/buku",
        formData,
        {
          headers,
        }
      );
      toast.success("Add Buku Success", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(response);
      console.log(formData);
      onClose();
      reset();
      getBuku();
    } catch (error: any) {
      if (error.response.data.status == 404) {
        return alert(error.response.data.message);
      } else {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-3 w-full">
        <div></div>
        <Button
          onPress={() => {
            onOpen();
          }}
        >
          {" "}
          <Plus />
          Add User
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          scrollBehavior="inside"
          hideCloseButton
          placement="bottom"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Buku
                </ModalHeader>
                <ModalBody>
                  <form
                    className="space-y-3 md:space-y-3"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Cover Buku
                      </label>
                      <input
                        className="block w-full text-sm text-gray-600 file:h-[40px] bg-gray-100 file:me- file:py-2 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semiboldfile:bg-blue-600 file:text-white file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none rounded-lg h-[40px] mb-10"
                        type="file"
                        accept="image/png, image/jpeg ,image/png"
                        {...register("cover")}
                      />
                    </div>
                    <div>
                      <Input
                        key={"outside"}
                        radius={"sm"}
                        type="text"
                        label="Judul Buku"
                        placeholder="Enter judul buku"
                        labelPlacement={"outside"}
                        isInvalid={errors.judul_buku ? true : false}
                        errorMessage={errors.judul_buku?.message}
                        className="mb-10 "
                        {...register("judul_buku")}
                      />
                    </div>
                    <div>
                      <Input
                        key={"outside"}
                        radius={"sm"}
                        type="text"
                        label=" Penerbit"
                        placeholder="Enter Penerbit"
                        labelPlacement={"outside"}
                        isInvalid={errors.penerbit ? true : false}
                        errorMessage={errors.penerbit?.message}
                        className="mb-10 "
                        {...register("penerbit")}
                      />
                    </div>
                    <div>
                      <Input
                        key={"outside"}
                        radius={"sm"}
                        type="text"
                        label=" Pengarang"
                        placeholder="EnterPengarang"
                        labelPlacement={"outside"}
                        isInvalid={errors.pengarang ? true : false}
                        errorMessage={errors.pengarang?.message}
                        {...register("pengarang")}
                      />
                    </div>

                    <div>
                      <Textarea
                        label="Description"
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        className="max-w-full mb-10 "
                        isInvalid={errors.sinopsis ? true : false}
                        errorMessage={errors.sinopsis?.message}
                        {...register("sinopsis")}
                      />
                    </div>
                    <div>
                      <Input
                        key={"outside"}
                        radius={"sm"}
                        type="date"
                        label=" Tahun terbit"
                        placeholder="EnterPengarang"
                        labelPlacement={"outside"}
                        isInvalid={errors.tahun_terbit ? true : false}
                        errorMessage={errors.tahun_terbit?.message}
                        className="mb-10 "
                        {...register("tahun_terbit")}
                      />
                    </div>
                    <div>
                      <Input
                        key={"outside"}
                        radius={"sm"}
                        type="number"
                        label="Jumlah buku"
                        placeholder="Enter Jumlah buku"
                        labelPlacement={"outside"}
                        isInvalid={errors.jumlah_buku ? true : false}
                        errorMessage={errors.jumlah_buku?.message}
                        {...register("jumlah_buku")}
                      />
                    </div>
                    <div>
                      <Input
                        key={"outside"}
                        radius={"sm"}
                        type="text"
                        label="Lokasi rak buku"
                        placeholder="Enter Lokasi rak buku"
                        labelPlacement={"outside"}
                        isInvalid={errors.lokasi_rak_buku ? true : false}
                        errorMessage={errors.lokasi_rak_buku?.message}
                        {...register("lokasi_rak_buku")}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Pdf buku
                      </label>
                      <input
                        className="block w-full text-sm text-gray-600 file:h-[40px] bg-gray-100 file:me- file:py-2 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semiboldfile:bg-blue-600 file:text-white file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none rounded-lg h-[40px] mb-10"
                        type="file"
                        accept="application/pdf"
                        {...register("pdf_buku")}
                      />
                    </div>

                    <div>
                      <Button
                        type="submit"
                        className=" w-full text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Add Buku
                      </Button>
                    </div>
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
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {buku.data.map((e: any) => (
          <Buku
            key={e.id}
            id={e.id}
            cover={e.cover}
            judul={e.judul_buku}
            author={e.pengarang}
          />
        ))}
      </div>

      <div className=" flex justify-center ">
        {buku.last_page == 1 ? (
          ""
        ) : (
          <Pagination
            isCompact
            showControls
            total={buku.last_page}
            initialPage={currentPage}
            onChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
