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
        <div className="flex justify-center items-center gap-10 bg-white py-6 px-4">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full text-3xl">
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold mt-2">{service.title}</h3>
            <p className="text-gray-500 text-sm">{service.description}</p>
          </div>
        ))}
        </div>
      <ProductSlider />

      <h1 className="text-2xl font-bold text-center mb-4">Thiết bị mạng</h1>
      <ProductByCategory />
      <h1 className="text-2xl font-bold text-center mb-4">Camera giá rẻ</h1>
      <ProductByCategory />
      <CustomerReviews />

    </main>
  );
}
