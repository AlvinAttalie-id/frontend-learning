import { useState, useEffect } from "react";
import { createUser, updateUser } from "../api/reqres";

export default function UserForm({
  selectedUser,
  onSuccess,
  onAddUser,
  onUpdateUser,
}) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setName(`${selectedUser.first_name} ${selectedUser.last_name}`);
      setJob(selectedUser.job || "");
    } else {
      setName("");
      setJob("");
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Nama lengkap harus diisi");
      return;
    }

    if (selectedUser) {
      try {
        const updated = await updateUser(selectedUser.id, { name, job });
        onUpdateUser({
          ...selectedUser,
          first_name: name.split(" ")[0],
          last_name: name.split(" ").slice(1).join(" "),
          job,
          ...updated,
        });
        onSuccess();
      } catch {
        alert("Gagal mengupdate user");
      }
    } else {
      try {
        const created = await createUser({ name, job });
        const newUser = {
          id: created.id || Math.random().toString(36).slice(2, 9),
          first_name: name.split(" ")[0],
          last_name: name.split(" ").slice(1).join(" "),
          job,
          avatar: "https://via.placeholder.com/150",
          email: "", // bisa ditambah input email kalau mau
        };
        onAddUser(newUser);
        onSuccess();
      } catch {
        alert("Gagal menambah user");
      }
    }

    setName("");
    setJob("");
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">
        {selectedUser ? "Edit Pengguna" : "Tambah Pengguna"}
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          className="p-2 border rounded"
          placeholder="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="p-2 border rounded"
          placeholder="Pekerjaan"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {selectedUser ? "Update" : "Tambah"}
        </button>
      </form>
    </div>
  );
}
