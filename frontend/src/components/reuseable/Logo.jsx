"use client";

import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/app/icon.png";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      {/* ICON */}
      <div className="w-10 h-10 rounded-2xl overflow-hidden bg-gradient-to-r flex items-center justify-center">
        <Image
          src={LogoImage}
          alt="Pak Banking"
          width={40}
          height={40}
          className="object-cover"
        />
      </div>

      {/* TEXT */}
      <div className="leading-tight">
        <h1 className="text-white font-bold text-base md:text-lg">
          Pak Banking
        </h1>

        <p className="text-[10px] md:text-xs text-slate-400">
          Secure Digital Banking
        </p>
      </div>
    </Link>
  );
};

export default Logo;