export default function UserList({ users, onEdit, onDelete }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Daftar Pengguna</h2>
      <div className="grid gap-4">
        {users.length === 0 && <p>Tidak ada pengguna.</p>}
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar || "https://via.placeholder.com/48"}
                alt={user.first_name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-sm text-gray-600">{user.email || "-"}</p>
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
                onClick={() => onDelete(user.id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
