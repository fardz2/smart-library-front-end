"use client";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { toast } from "react-toastify";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface buku {
  id: string;
  cover: string;
  judul_buku: string;
  penerbit: string;
  pengarang: string;
  sinopsis: string;
  tahun_terbit: string;
  jumlah_buku: string;
  lokasi_rak_buku: string;
  pdf_buku: string;
}
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
export default function EditBuku({
  id,
  cover,
  judul_buku,
  penerbit,
  pengarang,
  sinopsis,
  tahun_terbit,
  jumlah_buku,
  lokasi_rak_buku,
  pdf_buku,
}: buku) {
  const router = useRouter();
  const { data: session }: { data: any } = useSession();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const formData = new FormData();
      const headers = {
        Authorization: `Bearer ${session?.user.accessToken}`,
        "Content-Type": "multipart/form-data",
      };
      if (data.cover.length > 0 && data.pdf_buku.length > 0) {
        formData.append("cover", data.cover[0]);
        formData.append("judul_buku", data.judul_buku);
        formData.append("penerbit", data.penerbit);
        formData.append("pengarang", data.pengarang);
        formData.append("sinopsis", data.sinopsis);
        formData.append("tahun_terbit", data.tahun_terbit);
        formData.append("jumlah_buku", data.jumlah_buku);
        formData.append("lokasi_rak_buku", data.lokasi_rak_buku);
        formData.append("pdf_buku", data.pdf_buku[0]);
        console.log(data);
      } else if (data.cover.length > 0) {
        formData.append("cover", data.cover[0]);
        formData.append("judul_buku", data.judul_buku);
        formData.append("penerbit", data.penerbit);
        formData.append("pengarang", data.pengarang);
        formData.append("sinopsis", data.sinopsis);
        formData.append("tahun_terbit", data.tahun_terbit);
        formData.append("jumlah_buku", data.jumlah_buku);
        formData.append("lokasi_rak_buku", data.lokasi_rak_buku);
      } else if (data.pdf_buku.length > 0) {
        formData.append("judul_buku", data.judul_buku);
        formData.append("penerbit", data.penerbit);
        formData.append("pengarang", data.pengarang);
        formData.append("sinopsis", data.sinopsis);
        formData.append("tahun_terbit", data.tahun_terbit);
        formData.append("jumlah_buku", data.jumlah_buku);
        formData.append("lokasi_rak_buku", data.lokasi_rak_buku);
        formData.append("pdf_buku", data.pdf_buku[0]);
      } else {
        formData.append("judul_buku", data.judul_buku);
        formData.append("penerbit", data.penerbit);
        formData.append("pengarang", data.pengarang);
        formData.append("sinopsis", data.sinopsis);
        formData.append("tahun_terbit", data.tahun_terbit);
        formData.append("jumlah_buku", data.jumlah_buku);
        formData.append("lokasi_rak_buku", data.lokasi_rak_buku);
      }
      formData.append("_method", "put");
      await axios.post(`http://127.0.0.1:8000/api/buku/${id}`, formData, {
        headers,
      });
      toast.success("Update buku berhasil", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      onClose();
      reset();
      router.refresh();
    } catch (error: any) {
      if (error.response.data.status == 404) {
        return alert(error.response.data.message);
      } else {
        console.log(error.response.data);
      }
    }
  };
  return (
    <>
      <div>
        <Button
          onPress={() => {
            onOpen();
          }}
          className="  text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {" "}
          Edit Buku
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
                  Edit Buku
                </ModalHeader>
                <ModalBody>
                  <form
                    className="space-y-3 md:space-y-3"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      <Image
                        src={cover}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                      />
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
                        defaultValue={judul_buku}
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
                        defaultValue={penerbit}
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
                        defaultValue={pengarang}
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
                        defaultValue={sinopsis}
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
                        defaultValue={tahun_terbit}
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
                        min="1"
                        defaultValue={jumlah_buku}
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
                        defaultValue={lokasi_rak_buku}
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
                        Edit Buku
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
    </>
  );
}
