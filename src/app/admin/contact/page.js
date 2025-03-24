"use client"; // Nếu dùng Next.js App Router

import { useEffect, useState } from "react";

export default function EmailTable() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số phản hồi hiển thị mỗi trang

  // Gọi API lấy phản hồi từ khách hàng
  useEffect(() => {
    async function fetchEmails() {
      try {
        const res = await fetch("http://localhost/HOANGTHONGSTORE/server/get_contacts.php");
        if (!res.ok) throw new Error("Lỗi khi lấy danh sách phản hồi");

        const data = await res.json();
        setEmails(data);
      } catch (error) {
        console.error("Lỗi API phản hồi:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmails();
  }, []);

  // Xử lý phân trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedEmails = emails.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(emails.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <p className="p-4 text-center">Đang tải dữ liệu...</p>;

  return (
    <div className="p-4">
      <table className="w-full border-collapse border rounded-lg shadow-md">
        {/* Header */}
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="p-3">MÃ</th>
            <th className="p-3">TÊN NGƯỜI GỬI</th>
            <th className="p-3">SỐ ĐIỆN THOẠI</th>
            <th className="p-3">THỜI GIAN GỬI</th>
            <th className="p-3">TRẠNG THÁI</th>
            <th className="p-3">NỘI DUNG</th>
            <th className="p-3">HÀNH ĐỘNG</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {selectedEmails.length > 0 ? (
            selectedEmails.map((email) => (
              <tr key={email.ContactID} className="border-b hover:bg-gray-50">
                <td className="p-3 text-red-500 font-semibold">#{email.ContactID}</td>
                <td className="p-3">{email.CustomerName}</td>
                <td className="p-3">{email.Phone}</td>
                <td className="p-3">{email.CreateAt}</td>
                <td className="p-3">
                  {email.Status === "1" ? (
                    <span className="text-green-500 font-semibold">Đã xử lý</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Chưa xử lý</span>
                  )}
                </td>
                <td className="p-3">{email.Message}</td>
                <td className="p-3 flex gap-2">
                  <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
                    ✏ Chi tiết
                  </button>
                  <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
                    📩 Phản hồi
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                Không có phản hồi nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            «
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            ‹
          </button>
          <span className="px-3 py-1 border rounded bg-black text-white">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            ›
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}
  