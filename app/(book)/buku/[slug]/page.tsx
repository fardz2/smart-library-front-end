import { Button } from "@mui/material";
import axios from "axios";
import Image from "next/image";
export default async function Page({ params }: { params: { slug: number } }) {
  const res = await axios.get(`http://127.0.0.1:8000/api/buku/${params.slug}`);
  const data = res.data;
  if (data.status == 200) {
    const data = res.data.data;
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
          <div className="flex space-x-4">
            <Button className="text-white bg-[#F27851] w-[150px] h-[40px]">
              Borrow
            </Button>
            <Button className="text-white bg-[#41B64D] w-[150px] h-[40px]">
              Read now
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (data.status == 404) {
    return <p>404</p>;
  }
}
