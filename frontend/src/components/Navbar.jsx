"use client";

import React from "react";
import Link from "next/link";
import Logo from "./reuseable/Logo";
import { usePathname } from "next/navigation";
import { useMainContext } from "@/context/MainContext";
import { useDispatch } from "react-redux";
import { setIsToggle } from "@/redux/slice/sidebarSlice"; // Redux action import

import {
  Menu,
  Home,
  BriefcaseBusiness,
  Info,
  Phone,
  LogIn,
  UserPlus,
  Landmark,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const { user, LogoutHandler } = useMainContext();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const navLinks = [
    { title: "Home", href: "/", icon: Home },
    ...(user
      ? [{ title: "Dashboard", href: "/dashboard", icon: Landmark }]
      : []),
    { title: "Services", href: "/services", icon: BriefcaseBusiness },
    { title: "About", href: "/about", icon: Info },
    { title: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 transition-all ${
                      pathname === item.href
                        ? "text-cyan-400"
                        : "text-slate-300 hover:text-cyan-400"
                    }`}
                  >
                    <Icon size={18} />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden 2xl:flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10">
            <ShieldCheck size={16} className="text-green-400" />
            <span className="text-sm text-cyan-300">
              Secure Banking Platform
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={LogoutHandler}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                >
                  <LogIn size={18} />
                  Login
                </Link>

                <Link
                  href="/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                >
                  <UserPlus size={18} />
                  Open Account
                </Link>
              </>
            )}
          </div>

          {/* Yahan Menu icon add kiya gaya hai (Top par Logo wali side/header mein) */}
          <button
            onClick={() => dispatch(setIsToggle())}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-slate-700 text-white hover:bg-slate-800 transition-all"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Mobile Bottom Navigation (Isme ab sirf page links hain) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-2 py-2 flex justify-around items-center z-[100]">
        {/* Shuru ke 4 links show karein (Home, Services, About, Contact etc.) */}
        {navLinks.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-[#4242e9] text-white" 
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <span className="text-sm font-semibold">{item.title}</span>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;