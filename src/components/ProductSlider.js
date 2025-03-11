"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductSlider() {
  // const [products, setProducts] = useState([]); // Sửa từ {} thành []

  // useEffect(() => {
  //   fetch("http://localhost/get_products.php")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Dữ liệu API:", data); // Debug kiểm tra dữ liệu
  //       setProducts(data);
  //     })
  //     .catch((error) => console.error("Lỗi lấy dữ liệu:", error));
  // }, []);

    const products = [
    {
      id: 1,
      Title: "Camera 1",
      Price: "Liên hệ",
      image: "/images/camera-1.png",
    },
    {
      id: 2,
      Title: "Camera 2",
      Price: "Liên hệ",
      image: "/images/camera-2.png",
    },
    {
      id: 3,
      Title: "Camera 3",
      Price: "Liên hệ",
      image: "/images/camera-3.png",
    },
    {
      id: 4,
      Title: "Camera 4",
      Price: "Liên hệ",
      image: "/images/camera-4.png",
    },
  ];
  

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Các sản phẩm mới nhất</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="px-4"
      >
        {products.length > 0 ? (
          products.map((product) => (
            <SwiperSlide key={product.id} className="p-4 hover:bg-amber-50 cursor-pointer">
              <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                <div className="relative w-full h-60">
                  <Image src={product.image} alt={product.Title} layout="fill" objectFit="cover" className="rounded-lg" />
                </div>
                <h3 className="text-lg font-bold mt-2">{product.Title}</h3>
                <p className="text-red-500 font-semibold">{product.Price}</p>
                <p className="text-gray-500 line-through">{product.oldPrice}</p>
                <span className="text-green-600 font-bold">{product.discount}</span>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-500">Đang tải sản phẩm...</p>
        )}
      </Swiper>
    </div>
  );
}
