import React, { useEffect, useState } from 'react';

function InputTask(props) {
    
    const [nbTache, setNbTache] = useState(0);
    
    useEffect(() => {
      setNbTache(props.tasks.filter((t) => !t.checked).length);
    }, [props.tasks]);

    return (
        <>
        <h1>To Do List</h1>
        <h3>Il y a {nbTache} tâche{nbTache > 1 ? "s" : ""} à faire</h3>
        <form onSubmit={props.handleSubmit}>
            <input type="text" value={props.text} onChange={props.handleChange} /> 
            <button type="submit">Ajouter</button>
        </form>
      </>
    )
}


export default InputTask;