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
import { Plus, Search } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
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
    judul_buku: yup.string().required("Judul Buku harus diisi"),
    penerbit: yup.string().required("Penerbit harus diisi"),
    pengarang: yup.string().required("Pengarang harus diisi"),
    sinopsis: yup.string().required("Sinopsis harus diisi"),
    tahun_terbit: yup.string().required("Tahun terbit harus diisi"),
    jumlah_buku: yup.string().required("Jumlah Buku harus diisi"),
    lokasi_rak_buku: yup.string().required("Lokasi rak buku harus diisi"),
  })
  .required();

export default function Page() {
  const { data: session }: { data: any } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const [searchParam, setSearchParam] = useState<string>(
    search != null ? search : ""
  );
  const [currentPage, setCurrentPage] = useState<number>(
    page != null ? parseInt(page) : 1
  );

  const [buku, setBuku] = useState<any>({
    last_page: null,
    data: [],
    status: 0,
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
      let targetPage;
      if (currentPage === 1) {
        targetPage =
          searchParam != ""
            ? `/manage-buku?search=${searchParam}`
            : "/manage-buku";
      } else {
        targetPage =
          searchParam != ""
            ? `/manage-buku?search=${searchParam}&page=${currentPage}`
            : `/manage-buku?page=${currentPage}`;
      }
      router.push(targetPage);
    };
    redirectToPage();
  }, [currentPage, router, searchParam]);

  const getBuku = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/buku?search=${searchParam}&page=${currentPage}`
    );
    if (res.data.status === 404) {
      setBuku({ last_page: 0, data: [], status: res.data.status });
    } else {
      const data = res.data.data;

      setBuku({
        last_page: data.last_page,
        data: data.data,
        status: res.data.status,
      });
    }
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
      toast.success("Tambah buku berhasil", {
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
  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search") as string;
    router.push(`/manage-buku?search=${searchValue}`);
  };
  return (
    <div className="w-full">
      <form onSubmit={onSearch}>
        <Input
          key={"outside"}
          radius={"sm"}
          type="text"
          label="Search"
          placeholder="Search"
          labelPlacement={"outside"}
          name="search"
          className="mb-10 "
          defaultValue={searchParam}
          startContent={<Search color="#000000" />}
        />
      </form>
      {buku.status === 404 ? (
        <div>Buku tidak ditemukan</div>
      ) : (
        <>
          <div className="flex justify-between mb-3 w-full">
            <div></div>
            <Button
              onPress={() => {
                onOpen();
              }}
              color="success"
            >
              {" "}
              <Plus />
              Tambah Buku
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
                      Tambah Buku
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
                            placeholder="Masukkan judul buku"
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
                            placeholder="Masukkan penerbit"
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
                            placeholder="Masukkan pengarang"
                            labelPlacement={"outside"}
                            isInvalid={errors.pengarang ? true : false}
                            errorMessage={errors.pengarang?.message}
                            {...register("pengarang")}
                          />
                        </div>

                        <div>
                          <Textarea
                            label="Sinopsis"
                            labelPlacement="outside"
                            placeholder="Masukkan sinopsis"
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
                            placeholder="MasukkanPengarang"
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
                            placeholder="Masukkan jumlah buku"
                            labelPlacement={"outside"}
                            isInvalid={errors.jumlah_buku ? true : false}
                            errorMessage={errors.jumlah_buku?.message}
                            className="mb-10 "
                            {...register("jumlah_buku")}
                          />
                        </div>
                        <div>
                          <Input
                            key={"outside"}
                            radius={"sm"}
                            type="text"
                            label="Lokasi rak buku"
                            placeholder="Masukkan lokasi rak buku"
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
                            className=" w-full  bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cMasukkan dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-white"
                          >
                            Tambah Buku
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

          <div className=" flex justify-cMasukkan ">
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
        </>
      )}
    </div>
  );
}
