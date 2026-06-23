"use client";

import React, { useEffect } from "react";
import { useMainContext } from "@/context/MainContext";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useSelector, useDispatch } from "react-redux";
import { setIsToggle } from "@/redux/slice/sidebarSlice";
import { LogOut, Home, Calendar } from "lucide-react";
import {GrCurrency} from "react-icons/gr"
import { GiFalloutShelter } from "react-icons/gi";
import Link from "next/link";

const RootTemplate = ({ children }) => {
  const { user, LogoutHandler } = useMainContext();
  const router = useRouter();
  const pathname = usePathname();

  const { isToggle } = useSelector((state) => state.SidebarSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Loader />
      </div>
    );
  }

  const CustomMenu = ({ link, text, icon }) => (
    <MenuItem
      active={pathname === link}
      icon={icon}
      component={<Link href={link} />}
    >
      {text}
    </MenuItem>
  );

  return (
    <section className="flex h-screen bg-slate-100 overflow-hidden">
      <Sidebar
        breakPoint="lg"
        toggled={isToggle}
        onBackdropClick={() => dispatch(setIsToggle())}
        backgroundColor="#ffffff"
        style={{
          marginTop: "20px",
          height: "calc(90vh - 65px)",
          borderRight: "1px solid #e2e8f0",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-green-600">
              Banking App
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Welcome, {user?.name || "User"}
            </p>
          </div>

          {/* Menu */}
          <div className="flex-grow py-3">
            <Menu
              menuItemStyles={{
                button: ({ active }) => ({
                  backgroundColor: active ? "#22c55e" : "transparent",
                  color: active ? "#fff" : "#334155",
                  borderRadius: "12px",
                  margin: "6px 10px",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                }),
              }}
            >
              <CustomMenu
                link="/"
                text="Dashboard"
                icon={<Home size={18} />}
              />

               <CustomMenu
                link="/amount"
                text="Amount"
                icon={<GrCurrency size={18} />}
              />

               <CustomMenu
                link="/fd-amount"
                text="FD-Amount"
                icon={<Calendar size={18} />}
              />

               <CustomMenu
                link="/atm-cards"
                text="ATM-Cards"
                icon={<Calendar size={18} />}
              />
             
              <CustomMenu
                link="/profile"
                text="Profile"
                icon={<GiFalloutShelter size={18} />}
              />








            </Menu>
          </div>

          {/* Logout */}
          <div className="p-5 border-t border-slate-200 bg-white">
            <button
              onClick={LogoutHandler}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-50 transition-all font-semibold"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="bg-white rounded-3xl shadow-sm min-h-full p-5 md:p-8">
          {children}
        </div>
      </main>
    </section>
  );
};

export default RootTemplate;