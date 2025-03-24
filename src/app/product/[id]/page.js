"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const ProductDetail = () => {
  const BASE_IMAGE_URL = "http://localhost/HOANGTHONGSTORE/server/upload/";

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProductDetail(id);
    }
  }, [id]);

  const fetchProductDetail = async (productId) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost/HOANGTHONGSTORE/server/get_product_by_id.php?id=${productId}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-6">Đang tải sản phẩm...</p>;
  if (!product) return <p className="text-center mt-6 text-red-500">Sản phẩm không tồn tại!</p>;

  return (
    <div className="max-w-6xl mt-30 mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Cột 1: Chi tiết sản phẩm */}
      <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
        <div className="flex items-center gap-6">
          {/* Hình ảnh */}
          <Image
            src={`http://localhost/HOANGTHONGSTORE/server/upload/${product.Avatar}`}
            alt={product.Title}
            width={200}
            height={200}
            className="rounded-lg"
          />

          {/* Nội dung sản phẩm */}
          <div>
            <h1 className="text-red-500 text-xl font-bold">{product.Title}</h1>
            {/* <p className="text-gray-500">{product.Description}</p> */}
            <p className="my-2">Lượt mua: {product.ViewCount}</p>
            {/* <p className="text-red-500">{product.Price} VNĐ</p> */}
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
              <a href="tel:0979193037">Liên hệ</a>
            </button>
          </div>
        </div>
        <div className="p-3 mb-4">
            <h2 className="text-3xl text-gray-600 font-semibold">Mô tả sản phẩm</h2>
            <p className="text-gray-500">{product.Description}</p>

        </div>
      </div>


      {/* Cột 2: Quảng cáo (nhỏ hơn) */}
      <div className="w-64 hidden md:block">
        <div className="p-3 mb-4">
            <h2 className="text-3xl text-gray-600 font-semibold">Lắp đặt tại nhà!</h2>
            
            <p className="text-2xl text-gray-600 mt-1">💳Giá cực ưu đãi</p>
        </div>
        <div className="p-3 mb-4">
            <h2 className="text-3xl text-gray-600 font-semibold">📦Sản phẩm chính hãng 100%</h2>
                    </div>
        <div className="p-3 mb-4">
            <h2 className="text-2xl text-gray-600 font-semibold">🎧Hotline mua hàng: 0979 193 037</h2>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg shadow-md mb-4">
          <h2 className="text-sm font-semibold text-center">🔥 Ưu đãi hôm nay!</h2>
          <Image
            src="/images/ads1.jpg"
            alt="Khuyến mãi"
            width={200}
            height={150}
            className="rounded-lg w-full"
          />
          <p className="text-xs text-gray-600 mt-1">Mua ngay để nhận ưu đãi giảm giá 20%!</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg shadow-md">
          <h2 className="text-sm font-semibold text-center">🎉 Sản phẩm mới</h2>
          <Image
            src="/images/ads2.jpg"
            alt="Sản phẩm mới"
            width={200}
            height={150}
            className="rounded-lg w-full"
          />
          <p className="text-xs text-gray-600 mt-1">Giảm giá cực sốc, chỉ có hôm nay!</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
