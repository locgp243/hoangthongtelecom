import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperclip } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { SiZalo } from "react-icons/si";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-30">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-center text-blue-800">LIÊN HỆ</h2>
      
      {/* Thông tin công ty */}
      <div className="flex">
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-orange-600">
          Hoàng Thông Telecom
        </h3>
        <p className="flex items-center mt-2"><FaMapMarkerAlt className="text-blue-500 mr-2" /> 1073 Huỳnh Văn Lũy, Thủ Dầu Một, Bình Dương</p>
        <p className="flex items-center"><FaPhone className="text-red-500 mr-2" /> <span className="text-red-600 font-bold">0979 193 037</span></p>
        <p className="flex items-center"><FaEnvelope className="text-blue-500 mr-2" /> <a href="mailto:cameratinnghia@gmail.com" className="text-blue-500">minhhoang2188@gmail.com</a></p>
      </div>
      
      {/* Form liên hệ */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Họ tên" className="border p-2 w-full rounded-md" />
            <input type="text" placeholder="Số điện thoại" className="border p-2 w-full rounded-md" />
            <input type="text" placeholder="Địa chỉ" className="border p-2 w-full rounded-md col-span-2" />
            <input type="email" placeholder="Email" className="border p-2 w-full rounded-md col-span-2" />
          </div>
          <input type="text" placeholder="Chủ đề" className="border p-2 w-full rounded-md mt-4" />
          <textarea placeholder="Nội dung" className="border p-2 w-full rounded-md mt-4 h-32"></textarea>
          <div className="flex items-center mt-4">
            <label className="flex items-center cursor-pointer text-gray-700">
              <FaPaperclip className="mr-2" /> Đính kèm file
              <input type="file" className="hidden" />
            </label>
          </div>
          <div className="mt-6 flex gap-4">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md">Gửi</button>
            <button type="reset" className="bg-gray-500 text-white px-6 py-2 rounded-md">Nhập lại</button>
          </div>
        </form>
      </div>
      
      {/* Biểu tượng liên hệ */}
      <div className="fixed bottom-10 right-5 flex flex-col gap-3">
        <button className="bg-red-500 text-white p-3 rounded-full shadow-lg">
          <AiOutlineShoppingCart size={24} />
        </button>
        <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg">
          <SiZalo size={24} />
        </button>
        <button className="bg-orange-500 text-white p-3 rounded-full shadow-lg">
          <FaPhone size={24} />
        </button>
      </div>
      </div>
    </div>
  );
}
