const Board = ({ task, index, taskList, setTaskList }) => {
    const handleDelete = () => {
      const updatedTaskList = taskList.filter((_, i) => i !== index);
      setTaskList(updatedTaskList);
  
      localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    }
  
    const handleComplete = () => {
      const updatedTaskList = taskList.map((t, i) => 
        i === index ? { ...t, completed: !t.completed } : t
      );
      setTaskList(updatedTaskList);
  
      localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    }
  
    return (
      <div className="d-flex flex-column align-items-center w-100 taskBoard"> 
        <p
          style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          className="fs-3 font-serif"
        >
          {task.text}
        </p>
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
      </div>
    );
  }
  
  export default Board;
  