"use client";

import { useState } from "react";
import Image from "next/image";
const categories = ["Tất cả", "Router", "Switch", "Camera", "Dây cáp"];

const products = [
  { id: 1, name: "Camera WiFi Ezviz", category: "Camera", Price: 745000, discount: 38, image: "/images/camera-1.png" },
  { id: 2, name: "Camera Srihome SH030", category: "Camera",Price: 495000, discount: 43, image: "/images/camera-2.png" },
  { id: 3, name: "Camera Wifi Imou F22FP", category: "Camera", Price: 1020000, discount: 38, image: "/images/camera-3.png" },
  { id: 4, name: "Camera Srihome SH037", category: "Camera", Price: 650000, discount: 43, image: "/images/camera-4.png" },
  { id: 5, name: "Router TP-Link AX50", category: "Router", Price: 1450000, discount: 27, image: "/images/router-1.png" },
  { id: 6, name: "Router Xiaomi AX6000", category: "Router", Price: 1890000, discount: 24, image: "/images/router-2.jpg" },
  { id: 7, name: "Switch TP-Link TL-SG108", category: "Switch",Price: 490000, discount: 25, image: "/images/switch-1.jpg" },
  { id: 8, name: "Switch Cisco SG110D", category: "Switch", Price: 1190000, discount: 25, image: "/images/switch-2.jpg" },
];

const PRODUCTS_PER_PAGE = 4; // Số sản phẩm trên mỗi trang

const ProductByCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc sản phẩm theo danh mục
  const filteredProducts = selectedCategory === "Tất cả" 
    ? products 
    : products.filter((product) => product.category === selectedCategory);

  // Tính toán số trang
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Lấy danh sách sản phẩm cho trang hiện tại
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Xử lý thay đổi trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Tabs danh mục */}
      <div className="flex space-x-4 border-b pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // Reset về trang đầu khi đổi danh mục
            }}
            className={`px-4 py-2 text-sm font-medium ${
              selectedCategory === category ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {displayedProducts.map((product) => (   
          <div key={product.id} className="border p-4 rounded-lg shadow-sm">
            <Image src={product.image} alt={product.name} width={1} height={1} className="w-full h-40 object-cover mb-2" />
            <div className="text-yellow-500 font-bold text-sm"></div>
            <h3 className="text-gray-800 font-semibold">{product.name}</h3>
            <div className="text-red-500 font-bold">Liên hệ: 0978 243 734</div>
            <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg">Thêm vào giỏ hàng</button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            {"<"} Trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Tiếp {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductByCategory;
