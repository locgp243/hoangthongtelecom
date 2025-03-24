"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = ["Tất cả"];
const PRODUCTS_PER_PAGE = 8;

const Product = () => {
  const BASE_IMAGE_URL = "http://localhost/HOANGTHONGSTORE/server/upload/";
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Gọi API khi chọn danh mục
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost/HOANGTHONGSTORE/server/get_products.php`);
      const data = await res.json();
      
      // Lọc theo danh mục
      const filtered = selectedCategory === "Tất cả"
        ? data
        : data.filter((product) => product.ProductCategoryID === getCategoryID(selectedCategory));

      setProducts(filtered);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm map danh mục sang ID
  const getCategoryID = (category) => {
    const categoryMap = {
      "Router": "2",
      "Switch": "3",
      "Camera": "1",
      "Dây cáp": "4",
    };
    return categoryMap[category] || "";
  };

  // Tính toán số trang
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Lấy danh sách sản phẩm cho trang hiện tại
  const displayedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Xử lý thay đổi trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-30">
      {/* Tabs danh mục */}
      <div className="flex flex-wrap justify-center space-x-2 border-b pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-2 text-sm font-medium transition ${
              selectedCategory === category 
                ? "text-blue-500 border-b-2 border-blue-500" 
                : "text-gray-600 hover:text-blue-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Hiển thị sản phẩm */}
      {loading ? (
        <p className="text-center mt-4">Đang tải sản phẩm...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {displayedProducts.map((product) => (
            <div 
              key={product.ProductID} 
              className="border p-4 rounded-lg shadow-sm bg-white cursor-pointer hover:shadow-md transition"
              onClick={() => router.push(`/product/${product.ProductID}`)}  
            >
              <Image
                src={`${BASE_IMAGE_URL}${product.Avatar}`} 
                alt={product.Title} 
                width={200} 
                height={200} 
                className="w-full h-40 object-cover mb-2 rounded-md"
              />
              <h3 className="text-gray-800 font-semibold text-sm line-clamp-1">{product.Title}</h3>
              <p className="text-red-500 font-bold">{product.Price} VNĐ</p>
              <p className="text-gray-500 text-xs">Lượt xem: {product.ViewCount}</p>
              <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg text-sm">
                <a href="tel:0123456789">Liên hệ</a>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
          >
            {"<"} Trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
          >
            Tiếp {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
