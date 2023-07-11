"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AiOutlineMenu } from "react-icons/ai";

export const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const {} = useRouter();

  const { status, data } = useSession();

  const handleLoginClick = () => signIn();

  const handleLogoutClick = () => {
    setMenuIsOpen(false);
    signOut();
  };

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  return (
    <>
      <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
        <Link href="/">
          <div className="relative h-[32px] w-[182px]">
            <Image src="/logo.png" alt="Full Stack Week" fill />
          </div>
        </Link>
        {status === "unauthenticated" && (
          <button className="text-primary text-sm font-semibold" onClick={handleLoginClick}>
            Login
          </button>
        )}
        {status === "authenticated" && data.user && (
          <div className="flex items-center gap-3 border-grayLighter border rounded-full border-solid p-2 px-3 relative">
            <AiOutlineMenu size={16} onClick={handleMenuClick} className="cursor-pointer" />
            <Image
              height={35}
              width={35}
              src={data.user.image!}
              alt={data.user.name!}
              className="rounded-full shadow-md"
            />
            {menuIsOpen && (
              <div className="z-50 absolute top-14 left-0 w-full h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
                <Link href="/my-trips">
                  <button className="text-primary pb-2 border-b border-grayLighter border-solid text-xs font-semibold">
                    Minhas viagens
                  </button>
                </Link>
                <button className="text-primary pt-2 text-xs font-semibold" onClick={handleLogoutClick}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
