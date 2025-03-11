import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hoàng Thông Telecom - Chuyên cung cấp camera, thiết bị mạng chất lượng tại bình dương",
  description: "Hoàng Thông Telecom - Chuyên cung cấp camera, thiết bị mạng giá rẻ, chất lượng tại bình dương, dành cho người thu nhập trung bình, cho sinh viên bình dương, camera giá rẻ bình dương, router giá rẻ bình dương, switch giá rẻ bình dương, cáp mạng giá rẻ bình dương",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
