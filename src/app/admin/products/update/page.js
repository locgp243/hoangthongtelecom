import { useState, useEffect } from "react";

export default function UpdateProduct({ product, onClose }) {
  const [formData, setFormData] = useState({
    title: product.Title || "",
    description: product.Description || "",
    price: product.Price || "",
    ProductMainCategoryID: product.ProductMainCategoryID || "",
    ProductCategoryID: product.ProductCategoryID || "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  console.log("Check product: ", product)
  useEffect(() => {
    // Tải danh mục chính
    fetch("http://localhost/HOANGTHONGSTORE/server/get_categories.php")
      .then((res) => res.json())
      .then((data) => setMainCategories(data))
      .catch((err) => console.error("Lỗi:", err));

    // Tải danh mục con dựa trên danh mục chính của sản phẩm
    if (product.ProductMainCategoryID) {
      fetch(`http://localhost/HOANGTHONGSTORE/server/get_category_ids.php?mainCategoryID=${product.ProductMainCategoryID}`)
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error("Lỗi:", err));
    }
  }, [product]);

  const handleMainCategoryChange = (e) => {
    const mainCategoryID = e.target.value;
    setFormData((prev) => ({ ...prev, ProductMainCategoryID: mainCategoryID, ProductCategoryID: "" }));

    fetch(`http://localhost/HOANGTHONGSTORE/server/get_category_ids.php?mainCategoryID=${mainCategoryID}`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Lỗi:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("ProductID", product.ProductID);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("ProductMainCategoryID", formData.ProductMainCategoryID);
    data.append("ProductCategoryID", formData.ProductCategoryID);
    if (formData.image) data.append("image", formData.image);

    try {
      const response = await fetch("http://localhost/HOANGTHONGSTORE/server/update_product.php", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      setMessage("Lỗi khi cập nhật sản phẩm.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4">Cập Nhật Sản Phẩm</h2>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-gray-700 font-semibold">Tên sản phẩm</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Giá</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Chọn thể loại chính */}
        <div>
          <label className="block text-gray-700 font-semibold">Thể loại chính</label>
          <select name="ProductMainCategoryID" value={formData.ProductMainCategoryID} onChange={handleMainCategoryChange} className="w-full p-2 border rounded-md" required>
            <option value="">Chọn thể loại chính</option>
            {mainCategories.map((category) => (
              <option key={category.ProductMainCategoryID} value={category.ProductMainCategoryID}>
                {category.Title}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn danh mục con */}
        <div>
          <label className="block text-gray-700 font-semibold">Danh mục</label>
          <select name="ProductCategoryID" value={formData.ProductCategoryID} onChange={handleChange} className="w-full p-2 border rounded-md" required>
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.ProductCategoryID} value={category.ProductCategoryID}>
                {category.Title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Hình ảnh</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
        </div>

        <div className="flex items-center justify-between mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Lưu
          </button>
          <button type="button" onClick={onClose} className="text-red-500">
            ❌ Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
