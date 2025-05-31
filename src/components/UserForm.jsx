import { useEffect, useState } from "react";
import { createUser, updateUser } from "../api/reqres";
import { toast } from "react-toastify";

export default function UserForm({ selectedUser, onSuccess }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setName(`${selectedUser.first_name} ${selectedUser.last_name}`);
      setJob("Developer");
    } else {
      setName("");
      setJob("");
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, { name, job });
        toast.success("User berhasil diupdate.");
      } else {
        await createUser({ name, job });
        toast.success("User berhasil ditambahkan.");
      }
      onSuccess();
      setName("");
      setJob("");
    } catch (err) {
      toast.error(err.error || "Gagal menyimpan user.");
    } finally {
      setLoading(false);
    }
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
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Memproses..." : selectedUser ? "Update" : "Tambah"}
        </button>
      </form>
    </div>
  );
}
