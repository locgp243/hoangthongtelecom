"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ProductSlider = () => {
  const BASE_IMAGE_URL = "http://localhost/HOANGTHONGSTORE/server/upload/";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost/HOANGTHONGSTORE/server/get_products.php");
        const data = await response.json();

        if (Array.isArray(data)) {
          // Sắp xếp sản phẩm theo thời gian mới nhất
          const sortedProducts = data.sort((a, b) => new Date(b.CreateAt) - new Date(a.CreateAt));
          setProducts(sortedProducts);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  // Hàm cập nhật lượt xem
  const updateViewCount = async (productId) => {
    try {
      const response = await fetch("http://localhost/HOANGTHONGSTORE/server/update_views.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ProductID: productId }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Lượt xem đã cập nhật:", result);
    } catch (error) {
      console.error("Lỗi khi cập nhật lượt xem:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Sản phẩm mới nhất</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="px-4"
      >
        {products.length > 0 ? (
          products.map((product) => (
            <SwiperSlide key={product.ProductID} className="p-4">
              <div
                className="bg-white shadow-lg rounded-lg p-4 text-center flex flex-col justify-between h-full"
                onClick={() => updateViewCount(product.ProductID)}
              >
                <div className="relative w-[250px] h-[250px] mx-auto">
                  <Image
                    src={`${BASE_IMAGE_URL}${product.Avatar}`}
                    alt={product.Title}
                    layout="fill"
                    objectFit="cover" 
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-bold mt-2 line-clamp-1">{product.Title}</h3>
                <p className="text-red-500 font-semibold">${product.Price}</p>
                {product.NewPrice && <p className="text-gray-500 line-through">${product.NewPrice}</p>}
                <p className="text-gray-600">Lượt xem: {product.ViewCount}</p>

                {/* Nút liên hệ */}
                <a
                  href="tel:0123456789"
                  className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                  Liên hệ
                </a>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-500">Đang tải sản phẩm...</p>
        )}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
