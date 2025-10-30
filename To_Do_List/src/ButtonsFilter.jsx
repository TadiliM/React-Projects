import React, { useEffect, useState } from 'react'
import './ButtonsFilter.css'

function ButtonsFilter(props) {

    const [filtre, setFiltre] = useState("Haute");

    const [UnNonCochee, setUnNonCochee] = useState(true);
    useEffect(() => {
      setUnNonCochee(props.tasks.some((t) => !t.checked));
    }, [props.tasks])

    const handleFiltre = () => {
        const newTasks = props.tasks.filter( (t) => t.priority == filtre);
        props.setTasks(newTasks);
    };

    const handleTrier = () => {
        const priorityValue = {
          "Haute": 3,
          "Moyenne": 2,
          "Faible": 1
        };
    
        const sortedTasks = [...props.tasks].sort((a, b) => {
          return priorityValue[b.priority] - priorityValue[a.priority];
        });
    
        props.setTasks(sortedTasks);
    };

    const handleNettoyer = () => {
        const newTasks = props.tasks.filter( (t) => !t.checked);
        props.setTasks(newTasks);
    };

    const handleCheckAll = () => {
        const newTasks = props.tasks.map((t) => {return ({ ...t, checked: UnNonCochee })} );
        props.setTasks(newTasks);
    };

    const handleRemoveAll = () => {
        props.setTasks([]);
    };



    return (
        <>
            <div className="priority-filter">
                <button onClick={handleTrier}>Trier</button>
                <button onClick={handleRemoveAll}>Tout Supprimer</button>
                <button onClick={handleNettoyer} >Nettoyer</button>
                <button onClick={handleCheckAll}>Tout {UnNonCochee ? "Cocher" : "Déchocher"}</button>

                <button onClick={handleFiltre} >Filtrer Priorité: </button>
                <select value={filtre} onChange={(e) => setFiltre(e.target.value)}>
                                      <option>Haute</option>
                                      <option>Moyenne</option>
                                      <option>Faible</option>
                </select> 
            </div>        
        </>
    )
}

export default ButtonsFilter;