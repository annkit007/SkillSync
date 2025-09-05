import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:8080/api/goals")
      .then((res) => res.json())
      .then((data) => {
        setGoals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching goals:", err);
        setLoading(false);
      });
  }, []);

  const addGoal = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newGoal = { title, description, completed: false };

    const res = await fetch("http://localhost:8080/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    });

    const savedGoal = await res.json();
    setGoals([...goals, savedGoal]);
    setTitle("");
    setDescription("");
  };

  const deleteGoal = async (id) => {
    await fetch(`http://localhost:8080/api/goals/${id}`, {
      method: "DELETE",
    });
    setGoals(goals.filter((g) => g.id !== id));
  };

  const markComplete = async (id) => {
    const goal = goals.find((g) => g.id === id);
    await fetch(`http://localhost:8080/api/goals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...goal, completed: true }),
    });
    setGoals(goals.map((g) => (g.id === id ? { ...g, completed: true } : g)));
  };

  const filteredGoals = goals.filter((g) => {
    if (filter === "pending") return !g.completed;
    if (filter === "completed") return g.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        🎯 SkillSync Goals
      </motion.h1>

      {/* Add Goal Form */}
      <motion.form
        onSubmit={addGoal}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-4 mb-6"
      >
        <h2 className="text-lg font-semibold mb-3">➕ Add a New Goal</h2>
        <input
          type="text"
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded-lg"
          required
        />
        <textarea
          placeholder="Goal description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Add Goal
        </button>
      </motion.form>

      {/* Filter Tabs */}
      <div className="flex space-x-3 mb-6">
        {["all", "pending", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === tab
                ? tab === "completed"
                  ? "bg-green-500 text-white"
                  : tab === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-blue-500 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Goals List */}
      {loading ? (
        <p className="text-gray-500">Loading goals...</p>
      ) : (
        <motion.div layout className="w-full max-w-lg space-y-4">
          <AnimatePresence>
            {filteredGoals.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-600"
              >
                No {filter} goals. Add one above! 🚀
              </motion.p>
            ) : (
              filteredGoals.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  layout
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h2
                      className={`text-lg font-semibold ${
                        goal.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {goal.title}
                    </h2>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    {!goal.completed && (
                      <button
                        onClick={() => markComplete(goal.id)}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                      >
                        ✅ Done
                      </button>
                    )}
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
