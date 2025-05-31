import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/reqres";
import { toast } from "react-toastify";

export default function UserList({ onEdit }) {
  const [users, setUsers] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.data);
    } catch (err) {
      toast.error(err.error || "Gagal mengambil data user.");
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(selectedUserId);
      toast.success("User berhasil dihapus.");
      setConfirmOpen(false);
      setSelectedUserId(null);
      loadUsers();
    } catch (err) {
      toast.error(err.error || "Gagal menghapus user.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Daftar Pengguna</h2>
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(user)}
                className="text-sm bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(user.id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Konfirmasi */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h3 className="text-lg font-semibold mb-4 text-red-600">
              Yakin ingin menghapus akun ini?
            </h3>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
