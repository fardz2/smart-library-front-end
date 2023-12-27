"use client";
import CardPeminjaman from "@/app/component/buku/CardPeminjaman";

import axios from "axios";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: number } }) {
  const { data: session, status }: { data: any; status: string } = useSession();
  const [infoPeminjaman, setInfoPeminjaman] = useState<any>({
    tanggal_peminjaman: null,
    tanggal_pengembalian: null,
    data: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status == "authenticated") {
      getInfoPeminjaman();
    }
  }, [session?.user.accessToken]);
  useEffect(() => {
    console.log(infoPeminjaman);
  }, [infoPeminjaman]);
  const getInfoPeminjaman = async () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${session?.user.accessToken}`,
    };

    const res = await axios.get(
      `http://127.0.0.1:8000/api/peminjaman/${params.id}`,
      {
        headers,
      }
    );
    const data = res.data;
    if (data.status == 404) {
      alert("tidak ditemukan");
    } else {
      const resData = data.data;
      console.log(resData);
      setInfoPeminjaman({
        tanggal_peminjaman: resData.tanggal_peminjaman,
        tanggal_pengembalian: resData.tanggal_pengembalian,
        data: resData.peminjaman_buku,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
        {infoPeminjaman.data.map((e: any) => (
          <CardPeminjaman
            cover={e.cover}
            judul_buku={e.judul_buku}
            penerbit={e.penerbit}
            tahun_terbit={e.tahun_terbit}
            tanggal_peminjaman={infoPeminjaman.tanggal_peminjaman}
            tanggal_pengembalian={infoPeminjaman.tanggal_pengembalian}
            id={e.pivot.id}
            statusBuku={e.pivot.status}
          />
        ))}
      </div>
    </>
  );
}
