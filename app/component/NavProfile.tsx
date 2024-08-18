"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavProfile() {
  const pathname = usePathname();
  return (
    <>
      <Link href={"/profile"}>
        <div
          className={`border-b-2 ${
            pathname === "/profile"
              ? "border-[#FFC196] text-[#F4683C]"
              : "text-black"
          }`}
        >
          Account settings
        </div>
      </Link>
      <Link href={"/profile/security"}>
        <div
          className={`border-b-2 ${
            pathname === "/profile/security"
              ? "border-[#FFC196] text-[#F4683C]"
              : "text-black"
          }`}
        >
          Login & Security
        </div>
      </Link>
    </>
  );
}
