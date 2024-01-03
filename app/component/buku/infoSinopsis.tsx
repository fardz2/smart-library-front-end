"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";

interface InfoSinopsis {
  penerbit: string;
  pengarang: string;
  jumlah_buku: string;
  lokasi_rak_buku: string;
  tahun_terbit: string;
  sinopsis: string;
}
export default function InfoSinopsis({
  penerbit,
  pengarang,
  jumlah_buku,
  lokasi_rak_buku,
  tahun_terbit,
  sinopsis,
}: InfoSinopsis) {
  const [isSinopsis, setIsSinopsis] = useState<boolean>(false);
  return (
    <>
      <center>
        <Button
          onClick={() => setIsSinopsis(false)}
          className={`bg-transparent text-black ${
            isSinopsis == false ? "bg-white text-black" : ""
          }`}
        >
          Info
        </Button>
        <Button
          onClick={() => setIsSinopsis(true)}
          className={`bg-transparent text-black ${
            isSinopsis == true ? "bg-white text-black" : ""
          }`}
        >
          Sinopsis
        </Button>
      </center>
      <div className="bg-[#F27851] flex md:gap-5 p-10 rounded-2xl flex-col md:flex-row shadow-xl w-100">
        {isSinopsis ? (
          <p className="text-white">{sinopsis}</p>
        ) : (
          <>
            <div className="grid grid-flow-row md:grid-cols-2 md:gap-4 text-white">
              <p className="font-bold">Penerbit</p>
              <p>{penerbit}</p>
              <p className="font-bold">Pengarang</p>
              <p>{pengarang}</p>

              <p className="font-bold">Jumlah buku</p>
              <p>{jumlah_buku}</p>

              <p className="font-bold">Lokasi Rak Buku</p>
              <p>{lokasi_rak_buku}</p>
            </div>
            <div className="flex space-x-4">
              <div className="grid grid-flow-row md:grid-cols-2 md:gap-4 text-white">
                <p className="font-bold">Tahun Terbit</p>
                <p>{tahun_terbit}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
