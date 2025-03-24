"use client"; // Nếu dùng Next.js App Router

import { useEffect, useState } from "react";

const TableComponent = ({ title, data, buttonText, onRowClick, onAddClick }) => {
  return (
    <div className="w-full md:w-1/2 p-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={onAddClick}
          >
            {buttonText}
          </button>
        </div>

        {/* Table */}
        {data.length > 0 ? (
          <table className="w-full border-collapse border rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3">TÊN</th>
                <th className="p-3">VỊ TRÍ</th>
                <th className="p-3">TRẠNG THÁI</th>
                <th className="p-3">THỜI GIAN TẠO</th>
                <th className="p-3">NGƯỜI TẠO</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-gray-50 cursor-pointer ${
                    index === 0 ? "bg-gray-200" : ""
                  }`}
                  onClick={() => onRowClick && onRowClick(item.ProductMainCategoryID)}
                >
                  <td className="p-3">{item.Title}</td>
                  <td className="p-3">{item.Position || "N/A"}</td>
                  <td className="p-3">{item.Status === "1" ? "Hoạt động" : "Ngừng hoạt động"}</td>
                  <td className="p-3">{new Date(item.CreateAt).toLocaleDateString("vi-VN")}</td>
                  <td className="p-3">admin</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">Không có dữ liệu</p>
        )}
      </div>
    </div>
  );
};

export default function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [filteredProductCategories, setFilteredProductCategories] = useState([]); // Mặc định là rỗng
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ title: "", position: "", status: "1" });

  useEffect(() => {
    async function fetchData() {
      try {
        const [resCategories, resProductCategories] = await Promise.all([
          fetch("http://localhost/HOANGTHONGSTORE/server/get_categories.php"),
          fetch("http://localhost/HOANGTHONGSTORE/server/get_productcategories.php"),
        ]);

        if (!resCategories.ok || !resProductCategories.ok) {
          throw new Error("Lỗi khi lấy dữ liệu từ API");
        }

        const categoriesData = await resCategories.json();
        const productCategoriesData = await resProductCategories.json();

        setCategories(categoriesData);
        setProductCategories(productCategoriesData);
      } catch (error) {
        console.error("Lỗi API:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleCategoryClick = (categoryID) => {
    const filtered = productCategories.filter(
      (item) => item.ProductMainCategoryID === categoryID
    );
    setFilteredProductCategories(filtered);
  };

  const handleAddCategory = async () => {
    if (!newCategory.title.trim()) {
      alert("Tên thể loại không được để trống");
      return;
    }
  
    const categoryData = {
      title: newCategory.title,
      description: newCategory.title, // Có thể trùng với title nếu không nhập riêng
      position: newCategory.position || 0, // Mặc định là 0 nếu rỗng
      status: newCategory.status,
      createAt: new Date().toISOString().slice(0, 19).replace("T", " ") // Định dạng thời gian giống MySQL
    };
  
    try {
      const response = await fetch("http://localhost/HOANGTHONGSTORE/server/add_category.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Thêm thể loại thành công");
        setShowModal(false);
        setCategories([...categories, categoryData]);
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi khi thêm thể loại:", error);
    }
  };
  
  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="flex flex-wrap justify-center p-6">
      <TableComponent
        title="Thể loại sản phẩm"
        data={categories}
        buttonText="Thêm thể loại"
        onRowClick={handleCategoryClick}
        onAddClick={() => setShowModal(true)}
      />
      <TableComponent
        title="Danh mục sản phẩm"
        data={filteredProductCategories}
        buttonText="Thêm danh mục"
      />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Thêm thể loại mới</h2>
            <input
              type="text"
              placeholder="Tên thể loại"
              className="border p-2 w-full mb-2"
              value={newCategory.title}
              onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
            />
            <input
              type="number"
              placeholder="Vị trí"
              className="border p-2 w-full mb-2"
              value={newCategory.position}
              onChange={(e) => setNewCategory({ ...newCategory, position: e.target.value })}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
              onClick={handleAddCategory}
            >
              Thêm
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
