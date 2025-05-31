import { useState, useEffect } from "react";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../api/reqres";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  // Load users from API saat mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.data);
    } catch (err) {
      alert("Gagal memuat pengguna");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSuccess = () => {
    setSelectedUser(null);
  };

  // Tambah user ke list state
  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  // Update user di list state
  const handleUpdateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  // Hapus user dari list state dan API
  const handleDeleteUser = async (id) => {
    if (window.confirm("Yakin ingin menghapus user ini?")) {
      try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch {
        alert("Gagal menghapus user");
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <UserForm
        selectedUser={selectedUser}
        onSuccess={handleSuccess}
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
      />
      <UserList
        users={users}
        onEdit={(user) => setSelectedUser(user)}
        onDelete={handleDeleteUser}
      />
    </div>
  );
}
