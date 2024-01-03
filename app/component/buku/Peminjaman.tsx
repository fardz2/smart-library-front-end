import Link from "next/link";
import Image from "next/image";
interface peminjaman {
  id: string;
  tanggal_pengembalian: string;
  denda: number;
  status: number;
  buku: any[];
  user: string | null;
}
export default function Peminjaman({
  id,
  tanggal_pengembalian,
  denda,
  status,
  buku,
  user,
}: peminjaman) {
  return (
    <>
      {user != null ? (
        <Link href={`peminjaman/${id}`}>
          <div className="bg-white rounded-md p-5 flex flex-col">
            <div className="flex justify-between">
              <p>{id}</p>
              <div>
                <p>Tanggal Pengembalian</p>
                <div className="flex gap-3 justify-between">
                  <p>{tanggal_pengembalian}</p>
                  {denda > 0 ? (
                    <div className="text-red-500">(terlambat)</div>
                  ) : (
                    ""
                  )}
                </div>
                {denda > 0 ? <div>Denda : Rp.{denda}</div> : ""}
                {status === 0 ? (
                  <div className="color-red">(belum dikembalikan)</div>
                ) : (
                  <div>(Sudah dikembalikan)</div>
                )}
                {user != null ? <div>{user}</div> : ""}
              </div>
            </div>
            <div>
              {buku.map((item) => (
                <>
                  <div className="w-20 h-22">
                    <Image
                      src={item.cover}
                      alt="image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }} // optional
                    />
                  </div>

                  <div>{item.judul_buku}</div>
                </>
              ))}
            </div>
          </div>
        </Link>
      ) : (
        <Link href={`my-shelf/${id}`}>
          <div className="bg-white rounded-md p-5 flex flex-col">
            <div className="flex justify-between">
              <p>{id}</p>
              <div>
                <p>Tanggal Pengembalian</p>
                <div className="flex gap-3 justify-between">
                  <p>{tanggal_pengembalian}</p>
                  {denda > 0 ? (
                    <div className="text-red-500">(terlambat)</div>
                  ) : (
                    ""
                  )}
                </div>
                {status === 0 ? (
                  <div className="color-red">(belum dikembalikan)</div>
                ) : (
                  <div>(Sudah dikembalikan)</div>
                )}
                {denda > 0 ? <div>Denda : Rp.{denda}</div> : ""}
                {user != null ? <div>{user}</div> : ""}
              </div>
            </div>
            <div>
              {buku.map((item) => (
                <>
                  <div className="w-20 h-22">
                    <Image
                      src={item.cover}
                      alt="image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }} // optional
                    />
                  </div>

                  <div>{item.judul_buku}</div>
                </>
              ))}
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
