import { useState } from "react";
import { register } from "../api/reqres";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("pistol");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register(email, password);
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Register gagal. Periksa data.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  );
}
