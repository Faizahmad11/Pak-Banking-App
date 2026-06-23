import { Poppins } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layout/MainLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Pak Banking App",
  description: "Full Stack Banking Application",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-white text-black">
        <MainLayout>
        {children}
        </MainLayout>
      </body>
    </html>
  );
}