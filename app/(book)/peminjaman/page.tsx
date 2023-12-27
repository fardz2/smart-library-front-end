"use client";

import Peminjaman from "@/app/component/buku/Peminjaman";
import { Input, Pagination } from "@nextui-org/react";

import axios from "axios";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const [peminjaman, setPeminjaman] = useState<any>({
    last_page: null,
    data: [],
    status: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(
    page != null ? parseInt(page) : 1
  );
  const [searchParam, setSearchParam] = useState<string>(
    search != null ? search : ""
  );
  useEffect(() => {
    if (status == "authenticated") {
      getPeminjaman();
    }
  }, [session?.user.accessToken, currentPage]);

  useEffect(() => {
    const redirectToPage = () => {
      let targetPage;
      if (currentPage === 1) {
        targetPage =
          searchParam != ""
            ? `/peminjaman?search=${searchParam}`
            : "/peminjaman";
      } else {
        targetPage =
          searchParam != ""
            ? `/peminjaman?search=${searchParam}&page=${currentPage}`
            : `/peminjaman?page=${currentPage}`;
      }
      router.push(targetPage);
    };
    redirectToPage();
  }, [currentPage, router, searchParam]);
  const getPeminjaman = async () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${session?.user.accessToken}`,
    };

    const res = await axios.get(
      `http://127.0.0.1:8000/api/peminjaman?search=${searchParam}&page=${currentPage}`,
      {
        headers,
      }
    );

    if (res.data.status == 404) {
      setPeminjaman({ last_page: 0, data: [], status: res.data.status });
    } else {
      const data = res.data.data;
      setPeminjaman({
        last_page: data.last_page,
        data: data.data,
        status: res.data.status,
      });
    }
    setLoading(false);
  };
  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search") as string;
    router.push(`/peminjaman?search=${searchValue}`);
  };

  return (
    <div>
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

      {loading ? (
        <p>loading</p>
      ) : peminjaman.status == 404 ? (
        <div> tidak ditemukan </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {peminjaman.data.map((item: any) => (
              <Peminjaman
                key={item.peminjaman_id}
                id={item.peminjaman_id}
                tanggal_pengembalian={item.tanggal_pengembalian}
                denda={item.denda}
                status={item.status}
                buku={item.peminjaman_buku}
                user={item.user.name}
              />
            ))}
          </div>
          <div className=" flex justify-center ">
            {peminjaman.last_page == 1 ? (
              ""
            ) : (
              <Pagination
                isCompact
                showControls
                total={peminjaman.last_page}
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
