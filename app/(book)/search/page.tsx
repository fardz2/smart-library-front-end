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

  useEffect(() => {
    getBuku();
  }, [currentPage]);

  useEffect(() => {
    const redirectToPage = () => {
      let targetPage;
      if (currentPage === 1) {
        targetPage =
          searchParam != "" ? `/search?search=${searchParam}` : "/search";
      } else {
        targetPage =
          searchParam != ""
            ? `/search?search=${searchParam}&page=${currentPage}`
            : `/search?page=${currentPage}`;
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

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search") as string;
    router.push(`/search?search=${searchValue}`);
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
        </>
      )}
    </div>
  );
}
