import Image from "next/image";
import { Button } from "@nextui-org/react";
interface infoBuku {
  cover: string;
  judul_buku: string;
  penerbit: string;
  tahun_terbit: string;
  tanggal_peminjaman: string;
  tanggal_pengembalian: string;
}
export default function CardPeminjaman({
  cover,
  judul_buku,
  penerbit,
  tahun_terbit,
  tanggal_peminjaman,
  tanggal_pengembalian,
}: infoBuku) {
  return (
    <div className="w-[308px]bg-white p-3 rounded-2xl">
      <div className="grid grid-rows-4 grid-flow-col gap-3">
        <div className="row-span-3">
          <div className=" rounded-md h-[260] w-[160] ">
            <Image
              src={cover}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className="row-span-1 ">
          <p>{judul_buku}</p>
          <p>
            {penerbit}
            {tahun_terbit}
          </p>
        </div>
        <div className="row-span-2 ">
          <p>borrowed on</p>
          <p>{tanggal_peminjaman}</p>
          <p>{tanggal_pengembalian}</p>
        </div>
        <div className="row-span-2">
          <div>
            <Button>Borrowed</Button>
          </div>
          <div>
            <Button>Return</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
