import React, { useEffect, useState } from 'react'
import './App.css'
import InputTask from './InputTask';
import ButtonsFilter from './ButtonsFilter';
import ShowTask from './ShowTask';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) return JSON.parse(saved);
    return [];
  });
  const [task, setTask] = useState({text: "", priority: "Faible", checked: false});

  useEffect(() => {
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) => {
    setTask({...task, text:e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.text == "") return;
    //setTasks([...tasks, task]);
    const newTasks = [...tasks, task];
    const priorityValue = { "Haute": 3, "Moyenne": 2, "Faible": 1 };
    newTasks.sort((a, b) => priorityValue[b.priority] - priorityValue[a.priority]);
    setTasks(newTasks);
    setTask({text: "", priority: "Faible", checked: false});
  };
  

  return (
    <>
      <InputTask tasks={tasks} handleSubmit={handleSubmit} handleChange={handleChange} text={task.text}/>
      <ButtonsFilter tasks={tasks} setTasks={setTasks}/>
      <br></br>    

      { tasks.length === 0 ? "Aucune tâche" : tasks.map( (t,i) => 
      <ShowTask t={t} i={i} tasks={tasks} setTasks={setTasks} />
      )}
    </>
  )
}

export default App
