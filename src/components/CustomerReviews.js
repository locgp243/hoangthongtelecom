"use client";

import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt, FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";
const reviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    image: "/images/avatar.png",
    rating: 5,
    review: "Sản phẩm rất tốt, chất lượng tuyệt vời! Giao hàng nhanh chóng.",
  },
  {
    id: 2,
    name: "Trần Thị B",
    image: "/images/avatar.png",
    rating: 4.5,
    review: "Tư vấn nhiệt tình, sản phẩm đáng giá tiền.",
  },
  {
    id: 3,
    name: "Phạm Văn C",
    image: "/images/avatar.png",
    rating: 4,
    review: "Sản phẩm tốt nhưng cần cải thiện khâu đóng gói.",
  },
];

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Tự động chuyển đánh giá sau 5 giây
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto text-center py-10">
      <h2 className="text-2xl font-bold mb-6">Đánh Giá Khách Hàng</h2>
      
      <div className="relative p-6 border rounded-lg shadow-md bg-white">
        <FaQuoteLeft className="text-4xl text-gray-300 absolute -top-4 left-4" />

        <Image
          src={reviews[currentIndex].image}
          alt={reviews[currentIndex].name}
          height={1}
          width={1}
          className="w-16 h-16 rounded-full mx-auto mb-3"
        />
        <h3 className="text-lg font-semibold">{reviews[currentIndex].name}</h3>
        <div className="flex justify-center text-yellow-500 my-2">
          {Array.from({ length: 5 }, (_, i) => (
            i + 0.5 === reviews[currentIndex].rating ? <FaStarHalfAlt key={i} /> :
            i < reviews[currentIndex].rating ? <FaStar key={i} /> : <FaStar key={i} className="text-gray-300" />
          ))}
        </div>
        <p className="text-gray-600 italic">{reviews[currentIndex].review}</p>
      </div>

      {/* Dots Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        {reviews.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${currentIndex === i ? "bg-blue-500" : "bg-gray-300"}`}
            onClick={() => setCurrentIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
