import ButtonBuku from "@/app/component/buku/ButtonBuku";
import InfoSinopsis from "@/app/component/buku/infoSinopsis";
import { Button } from "@nextui-org/react";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: number } }) {
  const res = await fetch(`http://127.0.0.1:8000/api/buku/${params.slug}`, {
    next: { revalidate: 0 },
  });
  const resData = await res.json();

  if (resData.status == 200) {
    const data = resData.data;
    return (
      <div>
        <center>
          <h1>{data.judul_buku}</h1>
        </center>
        <div className="flex md:gap-36 gap-5 md:flex-row flex-col justify-center items-center">
          <center>
            <div className="p-5bg-white w-[220px] h-[350px] rounded-2xl shadow-xl">
              <div className="bg-red-400 w-[200px] h-80 rounded relative overflow-hidden">
                <Image
                  src={data.cover}
                  objectFit="cover"
                  objectPosition="center"
                  layout="fill"
                  quality={100}
                  // style={{ width: "auto", height: "auto" }} // optional
                  alt="Picture of the author"
                />
              </div>
            </div>
            <div className="mt-10">
              <ButtonBuku
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
          </center>
          <div>
            <InfoSinopsis
              penerbit={data.penerbit}
              pengarang={data.pengarang}
              sinopsis={data.sinopsis}
              tahun_terbit={data.tahun_terbit}
              jumlah_buku={data.jumlah_buku}
              lokasi_rak_buku={data.lokasi_rak_buku}
            />
          </div>
        </div>
      </div>
    );
  } else if (resData.status == 404) {
    return <p>404</p>;
  }
}
