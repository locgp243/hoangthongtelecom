"use client";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import Image from "next/image";
import UpdateProduct from "./update/page";
export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // Lưu sản phẩm cần cập nhật

  const BASE_IMAGE_URL = "http://localhost/HOANGTHONGSTORE/server/upload/";

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch("http://localhost/HOANGTHONGSTORE/server/get_productcategories.php"),
          fetch("http://localhost/HOANGTHONGSTORE/server/get_products.php"),
        ]);

        if (!categoriesRes.ok || !productsRes.ok) throw new Error("Lỗi API");

        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        const categoryMap = categoriesData.reduce((acc, cat) => {
          acc[cat.ProductCategoryID] = {
            title: cat.Title,
            mainCategoryID: cat.ProductMainCategoryID,
          };
          return acc;
        }, {});

        const mergedProducts = productsData.map((product) => ({
          ...product,
          categoryTitle: categoryMap[product.ProductCategoryID]?.title || "Không xác định",
          mainCategoryID: categoryMap[product.ProductCategoryID]?.mainCategoryID || "Không xác định",
        }));

        setCategories(categoryMap);
        setProducts(mergedProducts);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="p-4 text-center">Đang tải dữ liệu...</p>;

  return (
    <div className="p-4">
      {selectedProduct ? (
        <UpdateProduct product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      ) : (
        <ProductTable products={products} BASE_IMAGE_URL={BASE_IMAGE_URL} onEdit={setSelectedProduct} />
      )}
    </div>
  );
}

const handleDelete = async (productID) => {
  if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;

  try {
    const formData = new FormData();
    formData.append("ProductID", productID);

    const response = await fetch("http://localhost/HOANGTHONGSTORE/server/delete_product.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      alert("Sản phẩm đã bị xóa!");
      fetchProducts(); // Tải lại danh sách sau khi xóa
    } else {
      alert("Lỗi khi xóa: " + result.message);
    }
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
  }
};

// Component hiển thị danh sách sản phẩm
function ProductTable({ products, BASE_IMAGE_URL, onEdit }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="p-3"><input type="checkbox" /></th>
            <th className="p-3">TÊN SẢN PHẨM</th>
            <th className="p-3">DANH MỤC</th>
            <th className="p-3">THỂ LOẠI</th>
            <th className="p-3">GIÁ</th>
            <th className="p-3">HÀNH ĐỘNG</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.ProductID} className="border-b hover:bg-gray-50">
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3 flex items-center gap-3">
                  <Image
                    src={product.Avatar ? `${BASE_IMAGE_URL}${product.Avatar}` : "/placeholder.png"}
                    alt={product.Title}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <span className="font-semibold text-gray-800 max-w-[300px] truncate">
                    {product.Title}
                  </span>
                </td>
                <td className="p-3">{product.categoryTitle}</td>
                <td className="p-3">{product.mainCategoryID}</td>
                <td className="p-3 font-semibold text-blue-500">
                  {product.Price ? `${product.Price} VND` : "Liên hệ"}
                </td>
                <td className="p-3 flex items-center gap-2">
                  <button onClick={() => onEdit(product)} className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">
                    <FaEdit className="text-gray-600" />
                  </button>
                  <button onClick={() => handleDelete(product.ProductID)} style={{ color: "red" }}>
              Xóa
            </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                Không có sản phẩm nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
