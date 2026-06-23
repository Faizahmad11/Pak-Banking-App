"use client";

import React, { useState } from "react";
import Link from "next/link";
import { axiosClient } from "@/utils/AxiosClient";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import {
  User,
  Mail,
  Lock,
  Wallet,
  CreditCard,
  ShieldCheck,
  Building2,
  ChevronDown,
} from "lucide-react";
import CustomAuthButton from "@/components/reuseable/CustomAuthButton";
import { useMainContext } from "@/context/MainContext";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
    const {fetchUserProfile} = useMainContext()
    const router = useRouter()
  

  const initialValues = {
    name: "",
    email: "",
    password: "",
    ac_type: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is Required"),

    email: yup
      .string()
      .email("Email must be valid")
      .required("Email is Required"),

    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is Required"),

    ac_type: yup
      .string()
      .oneOf(["savings", "current"], "Select Saving or Current Account")
      .required("Account Type is Required"),
  });

  const onSubmitHandler = async (values, helpers) => {
  try {
    setLoading(true);

    const response = await axiosClient.post("/auth/register", values);
    const data = response.data;

    toast.success(data.msg || "Registration Successful!");

    if (data?.token) {
      localStorage.setItem("token", data.token);
    console.log(response.data);

      await fetchUserProfile();
     router.push("/")

    }

    helpers.resetForm();

  } catch (error) {
    console.log(error);

    toast.error(
      error?.response?.data?.msg ||
      error?.message ||
      "Something went wrong"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4 sm:p-6 antialiased">
      <div className="w-full max-w-6xl grid lg:grid-cols-12 overflow-hidden rounded-[2.5rem] border border-white/5 shadow-[0_0_80px_rgba(6,182,212,0.1)] bg-slate-900/20 backdrop-blur-md">
        
        {/* LEFT SIDE - BRANDING & FEATURES */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between px-12 py-14 overflow-hidden bg-gradient-to-b from-blue-950/40 via-slate-950/60 to-slate-950/80 border-r border-white/5">
          {/* Ambient Glow Orbs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Top Brand Logo Section */}
          <div className="relative z-10 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 flex items-center justify-center border border-cyan-500/30 shadow-inner">
              <Building2 size={24} className="text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Pak Banking
              </h2>
              <p className="text-cyan-400/80 text-xs font-medium uppercase tracking-wider">
                Secure Digital Banking
              </p>
            </div>
          </div>

          {/* Center Main Heading */}
          <div className="relative z-10 my-auto py-12">
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-[1.15] mb-6 tracking-tight">
              Smart Banking
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                For Modern Pakistan
              </span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Create your secure account and access digital banking, transfers, asset management, and instant transaction monitoring.
            </p>
          </div>

          {/* Bottom Value Props */}
          <div className="relative z-10 space-y-5 border-t border-white/5 pt-8">
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center transition-colors group-hover:border-cyan-500/30">
                <ShieldCheck size={20} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold tracking-wide">Bank Level Security</h3>
                <p className="text-slate-400 text-xs">Fully multi-layered encryption protection</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center transition-colors group-hover:border-cyan-500/30">
                <Wallet size={20} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold tracking-wide">High-Yield Savings</h3>
                <p className="text-slate-400 text-xs">Maximize your wealth generation effortlessly</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center transition-colors group-hover:border-cyan-500/30">
                <CreditCard size={20} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold tracking-wide">Seamless Ecosystem</h3>
                <p className="text-slate-400 text-xs">Fast, localized, and global digital transfers</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM CONTAINER */}
        <div className="lg:col-span-7 bg-slate-950/40 backdrop-blur-xl p-8 sm:p-12 xl:p-16 flex flex-col justify-center relative">
          {/* Subtle Mobile Only ambient orb */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 blur-[120px] rounded-full lg:hidden pointer-events-none"></div>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
          >
            <Form className="relative z-10 w-full max-w-md mx-auto lg:mx-0">
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Register Account
                </h2>
                <p className="text-slate-400 mt-2.5 text-sm sm:text-base">
                  Open your premium banking gateway in seconds
                </p>
              </div>

              <div className="space-y-5">
                {/* Full Name Field */}
                <div>
                  <div className="relative group">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-cyan-400"
                    />
                    <Field
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-cyan-400/80 focus:ring-4 focus:ring-cyan-500/10 focus:bg-slate-900/40"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-400/90 text-xs font-medium mt-1.5 pl-1"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <div className="relative group">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-cyan-400"
                    />
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-cyan-400/80 focus:ring-4 focus:ring-cyan-500/10 focus:bg-slate-900/40"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-400/90 text-xs font-medium mt-1.5 pl-1"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <div className="relative group">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-cyan-400"
                    />
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-cyan-400/80 focus:ring-4 focus:ring-cyan-500/10 focus:bg-slate-900/40"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-400/90 text-xs font-medium mt-1.5 pl-1"
                  />
                </div>

                {/* Account Type Dropdown */}
                <div>
                  <div className="relative group">
                    <Field
                      as="select"
                      name="ac_type"
                      className="w-full py-4 pl-4 pr-10 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none appearance-none transition-all duration-200 focus:border-cyan-400/80 focus:ring-4 focus:ring-cyan-500/10 focus:bg-slate-900/40 cursor-pointer"
                    >
                      <option value="" className="bg-slate-950 text-slate-400">
                        Select Account Type
                      </option>
                      <option value="savings" className="bg-slate-950 text-white">
                        Saving Account
                      </option>
                      <option value="current" className="bg-slate-950 text-white">
                        Current Account
                      </option>
                    </Field>
                    <ChevronDown 
                      size={18} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors group-focus-within:text-cyan-400" 
                    />
                  </div>
                  <ErrorMessage
                    name="ac_type"
                    component="p"
                    className="text-red-400/90 text-xs font-medium mt-1.5 pl-1"
                  />
                </div>

                {/* Submit Action Button Wrapper */}
                <div className="pt-2">
                  <CustomAuthButton
                    isLoading={loading}
                    text={"Create an Account"}
                    type="submit"
                  />
                </div>

                {/* Already Have An Account Divider/Link */}
                <div className="text-center text-sm text-slate-400 pt-2">
                  Already have an account?{" "}
                  <Link 
                    href="/login" 
                    className="text-cyan-400 hover:text-cyan-300 font-semibold tracking-wide transition-colors duration-200 underline-offset-4 hover:underline ml-1"
                  >
                    Login
                  </Link>
                </div>

              </div>
            </Form>
          </Formik>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;