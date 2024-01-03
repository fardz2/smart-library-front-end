"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface infoBuku {
  id: string;
  judul_buku: string;
}
export default function HapusBuku({ id, judul_buku }: infoBuku) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session, status }: { data: any; status: string } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const hapusBuku = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    };
    const res = await axios.delete(`http://127.0.0.1:8000/api/buku/${id}`, {
      headers,
    });

    const data = res.data;
    if (data.status == 404) {
      alert("tidak ditemukan");
    } else {
      toast.success("Buku telah dihapus", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/manage-buku");
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="  text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        color="danger"
      >
        Hapus Buku
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {judul_buku}
              </ModalHeader>
              <ModalBody>
                <p>Hapus Buku?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    hapusBuku();
                    onClose();
                  }}
                >
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
