import Image from "next/image";
import Slider from "@/components/Slider";
import ProductSlider from "@/components/ProductSlider";
import ProductByCategory from "@/components/ProductByCategory";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";
const services = [
  {
    icon: "📦", // Hoặc dùng icon từ thư viện lucide-react
    title: "Miễn phí vận chuyển",
    description: "Miễn phí vận chuyển cho đơn hàng 1.000.000 đ",
  },
  {
    icon: "💳",
    title: "Thanh toán linh hoạt",
    description: "Thanh toán bằng nhiều thẻ tín dụng",
  },
  {
    icon: "↩️",
    title: "Trả hàng trong 14 ngày",
    description: "Trong vòng 30 ngày cho một cuộc trao đổi",
  },
  {
    icon: "🎧",
    title: "Hỗ trợ cao cấp",
    description: "Hỗ trợ cao cấp vượt trội",
  },
];
export default function Home() {
  return (
    <main>
      <Slider />
      <div className="bg-white py-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 justify-items-center">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-100 rounded-full text-2xl sm:text-3xl">
                {service.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold mt-2">{service.title}</h3>
              <p className="text-gray-500 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <ProductSlider />

      <h1 className="text-2xl font-bold text-center mb-4">Danh sách sản phẩm</h1>
      <ProductByCategory />
      {/* <h1 className="text-2xl font-bold text-center mb-4">Camera giá rẻ</h1>
      <ProductByCategory /> */}
      <CustomerReviews />

    </main>
  );
}
