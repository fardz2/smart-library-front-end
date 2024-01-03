"use client";
import Image from "next/image";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  divider,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
interface infoBuku {
  cover: string;
  judul_buku: string;
  penerbit: string;
  tahun_terbit: string;
  tanggal_peminjaman: string;
  tanggal_pengembalian: string;
  id: number;
  statusBuku: number;
}
export default function CardPeminjaman({
  cover,
  judul_buku,
  penerbit,
  tahun_terbit,
  tanggal_peminjaman,
  tanggal_pengembalian,
  id,
  statusBuku,
}: infoBuku) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session, status }: { data: any; status: string } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const editStatusBuku = async () => {
    const headers = {
      Authorization: `Bearer ${session?.user.accessToken}`,
    };
    const res = await axios.get(
      `http://127.0.0.1:8000/api/peminjaman/buku/${id}`,
      {
        headers,
      }
    );

    const data = res.data;
    if (data.status == 404) {
      alert("tidak ditemukan");
    } else {
      toast.success("Buku telah dikembalikan", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push(pathname);
    }
  };
  return (
    <div className="w-[330px] bg-white p-3 rounded-2xl">
      <div className="grid grid-rows-4 grid-flow-col gap-3">
        <div className="row-span-3">
          <div className="w-[180px]">
            <div className="bg-red-400 w-full h-80 rounded relative overflow-hidden">
              <Image
                src={cover}
                objectFit="cover"
                objectPosition="center"
                layout="fill"
                quality={100}
                // style={{ width: "auto", height: "auto" }} // optional
                alt="Picture of the author"
              />
            </div>
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
          <p>Dipinjam pada</p>
          <p className="mb-5">{tanggal_peminjaman}</p>
          <p>Batas waktu pengembalian</p>
          <p>{tanggal_pengembalian}</p>
        </div>
        <div className="row-span-2">
          <div>
            {session.user.role === "admin" ||
            session.user.role === "pustakawan" ? (
              statusBuku === 0 ? (
                <>
                  <Button onPress={onOpen}>Kembalikan</Button>
                  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            {judul_buku}
                          </ModalHeader>
                          <ModalBody>
                            <p>Kembalikan Buku?</p>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="danger"
                              variant="light"
                              onPress={onClose}
                            >
                              Close
                            </Button>
                            <Button
                              color="primary"
                              onPress={() => {
                                editStatusBuku();
                                onClose();
                              }}
                            >
                              Kembalikan
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </>
              ) : (
                <div>telah dikembalikan</div>
              )
            ) : statusBuku === 0 ? (
              <div>belum dikembalikan</div>
            ) : (
              <div>telah dikembalikan</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
