import { useState } from "react";

const Board = ({ task, index, taskList, setTaskList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [error, setError] = useState("");

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      const updatedTaskList = taskList.filter((_, i) => i !== index);
      setTaskList(updatedTaskList);
      localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    }
  };

  const handleComplete = () => {
    const updatedTaskList = taskList.map((t, i) => 
      i === index ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t
    );
    setTaskList(updatedTaskList);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editText.trim() === "") {
      setError("Task cannot be empty or just spaces.");
      return;
    }
    const updatedTaskList = taskList.map((t, i) =>
      i === index ? { ...t, text: editText, updatedAt: new Date().toISOString() } : t
    );
    setTaskList(updatedTaskList);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    setIsEditing(false);
    setError("");
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
    setError("");
  };

  return (
    <div className="d-flex flex-column align-items-center w-100 taskBoard">
      {isEditing ? (
        <div className="d-flex flex-column align-items-center w-100">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="editTaskInput"
          />
          <div className="d-flex gap-2 mt-2">
            <button
              className="bg-success border-2 border-black rounded-3 p-1 w-50"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              className="bg-secondary border-2 border-black rounded-3 p-1 w-50"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      ) : (
        <>
          <p
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            className="fs-3 font-serif"
          >
            {task.text}
          </p>
          <p className="fs-6 text-muted">
            Created on: {new Date(task.createdAt).toLocaleString()}
          </p>
          <p className="fs-6 text-muted">
            Last modified: {new Date(task.updatedAt).toLocaleString()}
          </p>
          <button
            className="border-2 border-black rounded-3 p-1 my-2 w-75 editBtn"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-danger border-2 border-black rounded-3 p-1 my-4 w-75"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className={`${task.completed ? 'completed' : ''} border-2 border-black rounded-3 p-1 w-75 completeBtn`}
            onClick={handleComplete}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
        </>
      )}
    </div>
  );
};

export default Board;
