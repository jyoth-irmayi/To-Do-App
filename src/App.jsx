import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EditTask from "./EditTask"; 

function TodoList() {
  const [task, setTask] = useState(""); 
  const [tasks, setTasks] = useState([]); 
  //for editing
  const [editingIndex, setEditingIndex] = useState(null); 
  const [completedTasks, setCompletedTasks] = useState(new Set()); 



  const addTask = () => {
    if (task.trim() === "") return; 
    setTasks([...tasks, task]); 
    setTask("");
  };

  const startEditing = (index) => {
    setEditingIndex(index); 
  };


  const updateTask = (newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = newText; 
    setTasks(updatedTasks);
    setEditingIndex(null); 
  };

   const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); 
    setTasks(updatedTasks);
  };


  const toggleComplete = (index) => {
    setCompletedTasks((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index); 
      } else {
        updated.add(index); 
      }
      return updated;
    });
  };

  return (
    <div>
      <h2>📝 To-Do List</h2>
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((t, index) => (
          <li 
            key={index} 
            style={{ 
              textDecoration: completedTasks.has(index) ? "line-through" : "none",
              color: completedTasks.has(index) ? "gray" : "black"
            }}
          >
            <button onClick={() => toggleComplete(index)}>✅</button>
            {editingIndex === index ? ( 
              <EditTask 
                initialText={t} 
                onSave={updateTask} 
                onCancel={() => setEditingIndex(null)}
              />
            ) : (
              <>
                {t}{" "}
                <button onClick={() => startEditing(index)}>✏️ Edit</button>
                <button onClick={() => deleteTask(index)}>🗑️ Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
