import { useState } from "react";

const Board = ({ task, index, taskList, setTaskList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      const updatedTaskList = taskList.filter((_, i) => i !== index);
      setTaskList(updatedTaskList);
      localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    }
  }

  const handleComplete = () => {
    const updatedTaskList = taskList.map((t, i) => 
      i === index ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t
    );
    setTaskList(updatedTaskList);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSaveEdit = () => {
    const updatedTaskList = taskList.map((t, i) =>
      i === index ? { ...t, text: editText, updatedAt: new Date().toISOString() } : t
    );
    setTaskList(updatedTaskList);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    setIsEditing(false);
  }

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  }

  return (
    <div className="d-flex flex-column align-items-center w-100 taskBoard">
      {isEditing ? (
        <div className="d-flex flex-column align-items-center w-100">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="editBoard"
          />
          <div className="d-flex gap-2 mt-2">
            <button
              className="border-2 border-black rounded-3 p-1 w-50 saveEdit"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              className="bg-secondary border-2 border-black rounded-3 p-1 w-50 cancelEdit"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
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
            Last Modified: {new Date(task.createdAt).toLocaleString()}
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
            className={`${task.completed} ? border-2 border-black rounded-3 p-1 w-75 completeBtn`}
            onClick={handleComplete}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
        </>
      )}
    </div>
  );
}

export default Board;
