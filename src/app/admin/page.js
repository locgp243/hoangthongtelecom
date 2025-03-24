"use client"; // Để React xử lý state phía client
import { useState } from "react";
import ProductTable from "./products/page";
import EmailTable from "./contact/page";
import CategoryTable from "./categories/page";
import AddProduct from "./products/add/page";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview"); // Quản lý tab hiện tại
  const [currentView, setCurrentView] = useState("table"); // Mặc định hiển thị danh sách sản phẩm
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                className={`block w-full text-left p-2 rounded ${
                  activeTab === "overview" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Tổng Quan
              </button>
            </li>
            <li>
              <button
                className={`block w-full text-left p-2 rounded ${
                  activeTab === "overview" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("categories")}
              >
                Quản Lý Danh Mục
              </button>
            </li>
            <li>
              <button
                className={`block w-full text-left p-2 rounded ${
                  activeTab === "products" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("products")}
              >
                Quản Lý Sản Phẩm
              </button>
            </li>
            <li>
              <button
                className={`block w-full text-left p-2 rounded ${
                  activeTab === "contacts" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("contacts")}
              >
                Quản Lý Liên Hệ
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Nội dung chính */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between">
          <h1 className="text-lg font-semibold">
            {activeTab === "overview" && "Tổng Quan"}
            {activeTab === "categories" && "Quản Lý Danh Mục"}
            {activeTab === "products" && "Quản Lý Sản Phẩm"}
            {activeTab === "contacts" && "Quản Lý Liên Hệ"}
          </h1>
        </header>

        {/* Panel hiển thị nội dung */}
        <main className="p-6 flex-1 bg-gray-50">
          {activeTab === "overview" && (
            <div className="bg-white p-6 shadow rounded">Nội dung Tổng Quan</div>
          )}
          {activeTab === "categories" && (
            <div className="bg-white p-6 shadow rounded">
              <CategoryTable />
            </div>
          )}
          {activeTab === "products" && (
            <>
              {currentView === "table" && (
        <>
          <button onClick={() => setCurrentView("add")} className="mb-4 bg-green-500 text-white px-4 py-2 rounded">
            ➕ Thêm Sản Phẩm
          </button>
          <ProductTable
            onEdit={(id) => {
              setSelectedProductId(id);
              setCurrentView("update");
            }}
          />
        </>
      )}

      {currentView === "add" && <AddProduct onBack={() => setCurrentView("table")} />}

      {/* {currentView === "update" && selectedProductId && (
        <UpdateProduct productId={selectedProductId} onBack={() => setCurrentView("table")} />
      )} */}
            </>
          )}
          {activeTab === "contacts" && (
            <div className="bg-white p-6 shadow rounded">
              <EmailTable />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
