import axios from "axios";
import Buku from "../component/cardBuku";
export default async function Home() {
  const res = await axios.get("http://127.0.0.1:8000/api/buku");
  const data = res.data.data;

  return (
    <>
      <h1 className="text-[35px] font-[600] text-[#4D4D4D]">Hello</h1>

      <div>
        <h3>Recommended for you</h3>
        <div className="overflow-x-scroll flex flex-nowrap">
          {data.map((e: any) => (
            <Buku
              key={e.id}
              id={e.id}
              cover={e.cover}
              judul={e.judul_buku}
              author={e.pengarang}
            />
          ))}
        </div>
      </div>
    </>
  );
}
