import { useState } from "react";
import { addTask } from "@/utils/api";

type Task = {
  title: string;
  description: string;
};

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [newTask, setNewTask] = useState("");

  const handleAddTask = async () => {
    if (!newTask) return;

    const task = { title: newTask, description: "Default description" }; 

    try {
      const createdTask = await addTask(task);
      setTasks([...tasks, createdTask]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Task Dashboard</h1>
      <div className="flex gap-2">
        <input
          className="border p-2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleAddTask}>
          Add
        </button>
      </div>
      <ul className="mt-4">
        {tasks.map((task, i) => (
          <li key={i} className="p-2 border">{task.title}</li> 
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
