import axios from "axios";

const API_URL = "http://localhost:4000";

export const loginUser = async (username: string, password: string) => {
  const { data } = await axios.get(`${API_URL}/users`);
  const user = data.find((u: any) => u.username === username && u.password === password);

  if (!user) throw new Error("Invalid credentials");

  localStorage.setItem("token", user.token);
  return user.token;
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => localStorage.removeItem("token");
