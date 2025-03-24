import { useState, useEffect } from "react";

export default function AddProduct({ onBack }) {
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    ProductCategoryID: "",
    image: null,
  });
  const [message, setMessage] = useState("");

  // Lấy danh sách thể loại chính
  useEffect(() => {
    fetch("http://localhost/HOANGTHONGSTORE/server/get_categories.php")
      .then((res) => res.json())
      .then((data) => setMainCategories(data))
      .catch((err) => console.error("Lỗi:", err));
  }, []);

  // Khi chọn thể loại chính, tải danh mục con
  const handleMainCategoryChange = (e) => {
    const mainCategoryID = e.target.value;
    setSelectedMainCategory(mainCategoryID);

    fetch(`http://localhost/HOANGTHONGSTORE/server/get_category_ids.php?mainCategoryID=${mainCategoryID}`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Lỗi:", err));
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý chọn file ảnh
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Gửi dữ liệu lên API PHP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("ProductCategoryID", formData.ProductCategoryID);
    data.append("image", formData.image);

    try {
      const response = await fetch("http://localhost/HOANGTHONGSTORE/server/add_product.php", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      setMessage("Lỗi khi thêm sản phẩm.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4">Thêm Sản Phẩm</h2>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="title" placeholder="Tên sản phẩm" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Mô tả sản phẩm" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="price" placeholder="Giá sản phẩm" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />

        {/* Chọn thể loại chính */}
        <select onChange={handleMainCategoryChange} className="w-full p-2 border rounded" required>
          <option value="">Chọn thể loại chính</option>
          {mainCategories.map((category) => (
            <option key={category.ProductMainCategoryID} value={category.ProductMainCategoryID}>
              {category.Title}
            </option>
          ))}
        </select>

        {/* Chọn danh mục con */}
        <select name="ProductCategoryID" value={formData.ProductCategoryID} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Chọn danh mục</option>
          {categories.map((category) => (
            <option key={category.ProductCategoryID} value={category.ProductCategoryID}>
              {category.Title}
            </option>
          ))}
        </select>

        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Thêm sản phẩm</button>
        <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">❌ Hủy</button>
      </form>
    </div>
  );
}
