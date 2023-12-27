"use client";

import BorrowBuku from "./BorrowBuku";
import EditBuku from "./EditBuku";
import { useSession } from "next-auth/react";

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
export default function ButtonBuku({
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
  const { data: session, status }: { data: any; status: string } = useSession();

  return (
    <>
      {session?.user.role === "admin" || session?.user.role === "pustakawan" ? (
        <EditBuku
          id={id}
          cover={cover}
          judul_buku={judul_buku}
          penerbit={penerbit}
          pengarang={pengarang}
          sinopsis={sinopsis}
          tahun_terbit={tahun_terbit}
          jumlah_buku={jumlah_buku}
          lokasi_rak_buku={lokasi_rak_buku}
          pdf_buku={pdf_buku}
        />
      ) : (
        <BorrowBuku id={id} />
      )}
    </>
  );
}
