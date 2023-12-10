import BorrowBuku from "@/app/component/buku/BorrowBuku";
import EditBuku from "@/app/component/buku/EditBuku";
import { Button } from "@mui/material";
import axios from "axios";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: number } }) {
  const res = await fetch(`http://127.0.0.1:8000/api/buku/${params.slug}`, {
    next: { revalidate: 0 },
  });
  const resData = await res.json();

  if (resData.status == 200) {
    const data = resData.data;
    return (
      <div className="flex ">
        <div>
          <div className="flex-shrink-0 bg-white mr-10 rounded-xl h-[260] w-[160] p-[20px]">
            <Image
              src={data.cover}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div>
          <h3 className="text-2xl">{data.judul_buku}</h3>
          <p>
            by {data.pengarang}, {data.tahun_terbit}
          </p>
          {}
          <div className="flex space-x-4">
            <BorrowBuku id={data.id} />
            <Button className="text-white bg-[#41B64D] w-[150px] h-[40px]">
              Read now
            </Button>
          </div>
        </div>
        <EditBuku
          id={data.id}
          cover={data.cover}
          judul_buku={data.judul_buku}
          penerbit={data.penerbit}
          pengarang={data.pengarang}
          sinopsis={data.sinopsis}
          tahun_terbit={data.tahun_terbit}
          jumlah_buku={data.jumlah_buku}
          lokasi_rak_buku={data.lokasi_rak_buku}
          pdf_buku={data.pdf_buku}
        />
      </div>
    );
  } else if (resData.status == 404) {
    return <p>404</p>;
  }
}
