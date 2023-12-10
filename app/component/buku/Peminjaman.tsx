import Link from "next/link";

interface peminjaman {
  id: string;
}
export default function Peminjaman({ id }: peminjaman) {
  return (
    <Link href={`my-shelf/${id}`}>
      <div className="bg-white flex">
        <p>{id}</p>
      </div>
    </Link>
  );
}
