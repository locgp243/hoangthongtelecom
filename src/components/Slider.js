"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 mt-10">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        initialSlide={0}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 5 }, // Điện thoại
          640: { slidesPerView: 1.2, spaceBetween: 10 }, // Tablet
          1024: { slidesPerView: 2.2, spaceBetween: 15 }, // Laptop
          1280: { slidesPerView: 2.5, spaceBetween: 20 }, // Màn hình lớn
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          scale: 0.8,
          slideShadows: false,
        }}
        className="w-full"
      >
        {["slider-4.jpg", "slider-2.png", "slider-3.png"].map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
              <Image
                src={`/images/${img}`}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
