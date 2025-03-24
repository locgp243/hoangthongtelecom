'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperclip } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { SiZalo } from "react-icons/si";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Hoàng Thông Telecom - Chuyên cung cấp camera, thiết bị mạng chất lượng tại bình dương",
//   description: "Hoàng Thông Telecom - Chuyên cung cấp camera, thiết bị mạng giá rẻ, chất lượng tại bình dương, dành cho người thu nhập trung bình, cho sinh viên bình dương, camera giá rẻ bình dương, router giá rẻ bình dương, switch giá rẻ bình dương, cáp mạng giá rẻ bình dương",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!isAdminPage && <Header />}
        {children}
        {!isAdminPage && <Footer />}
        {/* Biểu tượng liên hệ */}
              <div className="fixed bottom-10 right-5 flex flex-col gap-3">
                <button className="bg-red-500 text-white p-3 rounded-full shadow-lg">
                  <AiOutlineShoppingCart size={24} />
                </button>
                <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg">
                  <SiZalo size={24} />
                </button>
                <button className="bg-orange-500 text-white p-3 rounded-full shadow-lg">
                  <FaPhone size={24} />
                </button>
              </div>
      </body>
    </html>
  );
}
