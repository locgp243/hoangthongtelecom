"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  return (
    <div className="container w-[1200px] mx-auto p-4">
       <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.2} // Hiển thị 2.5 ảnh để ảnh giữa to hơn
        spaceBetween={10} // Giảm khoảng cách giữa các ảnh
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200, // Tăng chiều sâu 3D
          modifier: 1,
          scale: 0.8, // Giảm kích thước ảnh bên cạnh
          slideShadows: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        initialSlide={1}
        className="w-full max-w-5xl"
      >
        <SwiperSlide>
          <div className="relative w-full h-[500px]">
            <Image
              src="/images/slider-4.jpg"
              alt="Slide 1"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[500px]">
            <Image
              src="/images/slider-2.png"
              alt="Slide 2"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[500px]">
            <Image
              src="/images/slider-3.png"
              alt="Slide 3"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
