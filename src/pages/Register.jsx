import { useState } from "react";
import { register } from "../api/reqres";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterForm() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("pistol");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { token } = await register(email, password);
      localStorage.setItem("token", token);
      setSuccess("Registrasi berhasil! Mengalihkan ke dashboard...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError("Registrasi gagal. Periksa email dan password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-600 mb-3">{success}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 w-full rounded hover:bg-green-600"
          disabled={success !== ""}
        >
          Register
        </button>

        {/* Link ke halaman login */}
        <p className="mt-4 text-center text-sm">
          Sudah punya akun?{" "}
          <Link to="/" className="text-green-600 hover:underline">
            Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
}
