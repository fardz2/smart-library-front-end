"use client";

import Peminjaman from "@/app/component/buku/Peminjaman";
import useAuthStore from "@/app/stores/authStore";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const { token } = useAuthStore();
  const [peminjaman, setPeminjaman] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (token != null) {
      getPeminjaman();
    }
  }, []);
  useEffect(() => {
    console.log(peminjaman);
  }, [peminjaman]);
  const getPeminjaman = async () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await axios.get("http://127.0.0.1:8000/api/peminjaman", {
      headers,
    });
    const data = res.data.data;
    setPeminjaman(data);
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : (
        peminjaman.map((item: any) => <Peminjaman key={item.id} id={item.id} />)
      )}

      {/* <p>siapa</p> */}
    </div>
  );
}
