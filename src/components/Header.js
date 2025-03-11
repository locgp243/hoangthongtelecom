'use client'

import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex items-center">
          <Image src="/images/logo-1.png" alt="logo" className="w-15 h-15 mr-2" height={80} width={80} />
          HT Telecom
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-500">Trang chủ</Link>
          <Link href="/about" className="hover:text-blue-500">Giới thiệu</Link>
          <Link href="/products" className="hover:text-blue-500">Sản phẩm</Link>
          <Link href="/service" className="hover:text-blue-500">Dịch vụ</Link>       
          <Link href="/contact" className="hover:text-blue-500">Liên hệ</Link>
        </nav>

        {/* Icons */}
        <div className="hidden md:flex space-x-4">
          <AiOutlineSearch className="text-2xl cursor-pointer" />
          <AiOutlineUser className="text-2xl cursor-pointer" />
          <div className="relative">
            <AiOutlineShoppingCart className="text-2xl cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md p-4 absolute top-full left-0 w-full">
          <Link href="/" className="block py-2">Trang chủ</Link>
          <Link href="/products" className="block py-2">Sản phẩm</Link>
          <Link href="/news" className="block py-2">Tin tức</Link>
          <Link href="/about" className="block py-2">Giới thiệu</Link>
          <Link href="/contact" className="block py-2">Liên hệ</Link>
        </nav>
      )}
    </header>
  );
}
