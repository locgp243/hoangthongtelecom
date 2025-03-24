import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin   } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
        {/* Cột 1: Thông tin liên hệ */}
        <div>
          <h3 className="text-lg font-bold mb-3">THÔNG TIN LIÊN HỆ</h3>
          <p className="font-semibold text-orange-400">Hoàng Thông TELECOM</p>
          <p>Hotline: <span className="text-orange-300">0979 193 037  </span></p>
          <p>📍 Trụ Sở: 1073 Huỹnh Văn Lũy, Thủ Dầu Một, Bình Dương</p>
        </div>

        {/* Cột 2: Chính sách */}
        <div>
          <h3 className="text-lg font-bold mb-3">CHÍNH SÁCH</h3>
          <ul>
            <li>✅ Chính sách giao nhận</li>
            <li>✅ Chính sách bảo hành</li>
            <li>✅ Chính sách đổi trả sản phẩm</li>
            <li>✅ Chính sách bảo mật thông tin khách hàng</li>
          </ul>
        </div>

        {/* Cột 3: Mạng xã hội */}
        <div>
          <h3 className="text-lg font-bold mb-3">FOLLOW US:</h3>
          <div className="flex space-x-3">
            <a href="#" className="bg-red-500 p-2 rounded-full">
              <FaFacebook width={1} height={1} className="w-6 h-6 text-white" />
            </a>
            <a href="#" className="bg-blue-500 p-2 rounded-full">
              <FaTwitter width={1} height={1} className="w-6 h-6 text-white" />
            </a>
            <a href="#" className="bg-light-blue-500 p-2 rounded-full">
              <FaInstagram width={1} height={1} className="w-6 h-6 text-white" />
            </a>
            <a href="#" className="bg-red-600 p-2 rounded-full">
              <FaLinkedin width={1} height={1} className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div className="mt-8 text-center border-t border-gray-400 pt-4">
        <p>© {new Date().getFullYear()} HOÀNG THÔNG TELECOM. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
