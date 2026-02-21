import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import CategoryScreen from "./components/CategoryScreen";
import AddTaskModal from "./components/AddTaskModal";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { categories } from "./data/categories";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showCategory, setShowCategory] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [taskInput, setTaskInput] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskDate, setTaskDate] = useState("");

  // 🔥 THIS IS THE IMPORTANT PART
  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    checkToken();
  }, []);

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/api/tasks`, {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {
    if (!taskInput) return alert("Enter task");

    await axios.post(
      `${API}/api/tasks`,
      {
        task: taskInput,
        category: selectedCategory.title,
        priority: taskPriority,
        dueDate: taskDate,
      },
      { headers: { Authorization: token } }
    );

    setTaskInput("");
    setTaskPriority("Low");
    setTaskDate("");
    setShowModal(false);
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await axios.put(
      `${API}/api/tasks/${id}`,
      {},
      { headers: { Authorization: token } }
    );
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/api/tasks/${id}`, {
      headers: { Authorization: token },
    });
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !token ? (
              <Login />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home"
          element={
            token ? (
              <div
                className={`wrapper ${
                  showCategory ? "show-category" : ""
                }`}
              >
                <div className="screen-backdrop"></div>

                <HomeScreen
                  categories={categories}
                  tasks={tasks}
                  setSelectedCategory={setSelectedCategory}
                  setShowCategory={setShowCategory}
                  handleLogout={handleLogout}
                />

                <CategoryScreen
                  selectedCategory={selectedCategory}
                  tasks={tasks}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  setShowCategory={setShowCategory}
                />

                <div
                  className="add-task-btn"
                  onClick={() => setShowModal(true)}
                >
                  +
                </div>

                <AddTaskModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  taskInput={taskInput}
                  setTaskInput={setTaskInput}
                  taskPriority={taskPriority}
                  setTaskPriority={setTaskPriority}
                  taskDate={taskDate}
                  setTaskDate={setTaskDate}
                  addTask={addTask}
                />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;