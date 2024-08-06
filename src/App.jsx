import { useEffect, useState } from 'react';
import Input from './components/Input';
import Board from './components/Board';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import lexmeet from './assets/lexmeet.png';

function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('taskList'));
      if (storedTasks) {
        setTaskList(storedTasks);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, []);

  const handleDeleteAll = () => {
    setTaskList([]);
    localStorage.removeItem('taskList');
  };

  const handleCompleteAll = () => {
    const updatedTaskList = taskList.map(task => ({ ...task, completed: true }));
    setTaskList(updatedTaskList);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
  };

  return (
    <>
      <div className='head-cont'>
        <div className="head-content">
            <div className='head-logo'>
              <img src={lexmeet}/>
              <h1>LexMeet</h1>
            </div>
            <h2 className='text-white text-center'>To-Do Board</h2>
        </div>
      </div>

      <div className='vw-100'>
        <div className='position-relative bottom-50'>
          <Input taskList={taskList} setTaskList={setTaskList} />
          <div className='d-flex flex-row justify-content-center mt-4 gap-4'>
            <button
              onClick={handleCompleteAll}
              className='btn btn-success text-white'
            >
              Complete All
            </button>
            <button
              onClick={handleDeleteAll}
              className='btn btn-danger text-white'
            >
              Delete All
            </button>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            {taskList.map((task, index) => (
              <div key={index} className='col-md-4 mb-4 text-white'>
                <Board
                  index={index}
                  task={task}
                  taskList={taskList}
                  setTaskList={setTaskList}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
