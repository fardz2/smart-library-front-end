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
        className="flex-shrink-0 bg-white mr-10 rounded-lg h-[500px] w-[300px] p-4"
        key={id}
      >
        <Image
          src={cover}
          width={500}
          height={670}
          quality={100}
          style={{ width: "auto", height: "auto" }} // optional
          alt="Picture of the author"
        />
        <h4 className="text-[20px]">{judul}</h4>
        <p className="text-[15px]">{author}</p>
        <p className="text-[12px]">4.5/5</p>
      </div>
    </Link>
  );
}
