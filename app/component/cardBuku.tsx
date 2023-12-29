import Image from "next/image";
import Link from "next/link";

interface buku {
  cover: string;
  judul: string;
  author: string;
  id: number;
}
export default function Buku({ id, cover, judul, author }: buku) {
  return (
    <Link href={`/book/${id}`}>
      <div
        className="flex-shrink-0 bg-white mr-10 rounded-lg w-[300px] p-5"
        key={id}
      >
        <div className="bg-red-400 w-full h-80 rounded relative overflow-hidden">
          <Image
            src={"/bg.png"}
            objectFit="cover"
            objectPosition="center"
            layout="fill"
            quality={100}
            // style={{ width: "auto", height: "auto" }} // optional
            alt="Picture of the author"
          />
        </div>
        <span className="flex flex-col gap-0.5 mt-3">
          <h4 className="text-[20px] font-semibold">{judul}</h4>
          <p className="text-[15px]">{author}</p>
          <p className="text-[12px] text-amber-500 font-bold">4.5/5</p>
        </span>
      </div>
    </Link>
  );
}
