import { useState, useEffect } from "react";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard({ onLogout }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      onLogout();
      navigate("/");
    }
  }, [navigate, onLogout]);

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem("token");
    toast.info("Berhasil logout.");
    navigate("/");
  };

  const handleSuccess = () => {
    setSelectedUser(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header: always horizontal */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Content layout: form + list */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form */}
        <div className="w-full lg:w-1/3">
          <UserForm selectedUser={selectedUser} onSuccess={handleSuccess} />
        </div>

        {/* User List */}
        <div className="w-full lg:w-2/3">
          <UserList key={refreshKey} onEdit={(user) => setSelectedUser(user)} />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="colored"
      />
    </div>
  );
}
