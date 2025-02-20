import axios from "axios";

const API_URL = "http://localhost:4000";

type User = {
  username: string;
  password: string;
  token: string;
};

//login function
export const loginUser = async (username: string, password: string) => {
  const { data } = await axios.get(`${API_URL}/users`);
  const user = data.find((u: User) => u.username === username && u.password === password);

  if (!user) throw new Error("Invalid credentials");

  localStorage.setItem("token", user.token);
  return user.token;
};

//fetch tasks function
export const fetchTasks = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const { data } = await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

//add task function
export const addTask = async (task: { title: string; description: string }) => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const { data } = await axios.post(
    `${API_URL}/tasks`,
    { title: task.title, description: task.description },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return data;
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => localStorage.removeItem("token");
