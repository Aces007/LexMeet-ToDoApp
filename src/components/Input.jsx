import { useState } from "react";

const Input = ({ taskList, setTaskList }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  

  const handleAddTask = (e) => {
    e.preventDefault();
    if (input.trim() == "") {
      setError("Task cannot be empty or just spaces.");
      return;
    }

    const newTask = { 
      text: input, 
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString() 
    };

    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    setInput(""); 
    setError("")
  }

  return (
    <form className="d-flex flex-column justify-content-center align-items-center gap-1 mt-4">
      <input 
        type="text" 
        placeholder="Add a task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="addTask"
        required
      />
      <button
        onClick={handleAddTask}
        className="addTaskBtn"
      >
        Record Task
      </button>
      <p className="fw-bold text-white mt-3">{error}</p>
    </form>
  );
}

export default Input;
