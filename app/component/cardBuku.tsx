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
    <Link href={`/buku/${id}`}>
      <div
        className="flex-shrink-0 bg-white mr-10 rounded-md h-[260] w-[160] "
        key={id}
      >
        <Image
          src={cover}
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <h4>{judul}</h4>
        <p>{author}</p>
      </div>
    </Link>
  );
}
