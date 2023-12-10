"use client";
import CardPeminjaman from "@/app/component/buku/CardPeminjaman";
import useAuthStore from "@/app/stores/authStore";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: number } }) {
  const { token } = useAuthStore();
  const [infoPeminjaman, setInfoPeminjaman] = useState<any>({
    tanggal_peminjaman: null,
    tanggal_pengembalian: null,
    data: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token != null) {
      getInfoPeminjaman();
    }
  }, []);
  useEffect(() => {
    console.log(infoPeminjaman);
  }, [infoPeminjaman]);
  const getInfoPeminjaman = async () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await axios.get(
      `http://127.0.0.1:8000/api/peminjaman/${params.id}`,
      {
        headers,
      }
    );
    const data = res.data.data;
    setInfoPeminjaman({
      tanggal_peminjaman: data.tanggal_peminjaman,
      tanggal_pengembalian: data.tanggal_pengembalian,
      data: data.peminjaman_buku,
    });
    setLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
      {infoPeminjaman.data.map((e: any) => (
        <CardPeminjaman
          cover={e.cover}
          judul_buku={e.judul_buku}
          penerbit={e.penerbit}
          tahun_terbit={e.tahun_terbit}
          tanggal_peminjaman={infoPeminjaman.tanggal_peminjaman}
          tanggal_pengembalian={infoPeminjaman.tanggal_pengembalian}
        />
      ))}
    </div>
  );
}
