import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1", 
  },
});

export const register = async (email, password) => {
  try {
    const response = await api.post("/register", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Terjadi kesalahan saat register." };
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Login gagal." };
  }
};

export const getUsers = async (page = 1) => {
  try {
    const response = await api.get(`/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Gagal mengambil data user." };
  }
};

export const createUser = async (user) => {
  try {
    const response = await api.post("/users", user);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Gagal membuat user." };
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Gagal mengupdate user." };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Gagal menghapus user." };
  }
};
