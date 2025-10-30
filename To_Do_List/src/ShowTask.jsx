import React, { useEffect, useState } from 'react'

function ShowTask({t,i, tasks, setTasks}) {

    const [iModif,setIModif] = useState(null);
    const [textModif, setTextModif] = useState(null);
    const [visible, setVisible] = useState(true);

    const handleModify = (index, actualText) => {
        setVisible(false);
        setTextModif(actualText);
        setIModif(index);
    };

    const handleRemove = (e) => {
        setTasks(tasks.filter( (t,i) => i != e.target.value));
    };
    

    const handleChangeModif = (e) => {
        setTextModif(e.target.value);
    };
  
    const handleKeyDown = (e) => {
        if (e.key !== "Enter" && iModif !== null && e.type ==="keydown") return;
        if (textModif == "") return;
        const newTasks = tasks.map ( (t,i ) =>   i === iModif ? { ...t, text: textModif } : t  );
        setTasks(newTasks);
        setVisible(false);
        setIModif(null);
        setTextModif("");
    
    };


    const handleChangePriority = (index, newPriority) => {
        const newTasks = tasks.map((t, i) =>
          i === index ? { ...t, priority: newPriority } : t
        );
        setTasks(newTasks);
    };
  
  
    const handleCheck = (index, check) => {
        const newTasks = tasks.map( (t,i) => 
          i == index ? {...t, checked: check} : t
        );
    
        setTasks(newTasks); 
    };


    return (
        
        <div className="task-item" key={i} style={{display: 'flex', alignItems: "center"}}>
        
            <button value={i} onClick={handleRemove}> x </button>

              { i != iModif ? 
              <p onClick={() => handleModify(i,t.text)} 
                 style={{ marginLeft: '1cm', 
                         textDecorationLine: t.checked ? "line-through" : ""}} >{t.text}
              </p>

                :
                
              <input class="modif" type="text" value={textModif} onChange={handleChangeModif}
                     onBlur={handleKeyDown} onKeyDown={handleKeyDown}
              />
                
              }

            <select value={t.priority} onChange={(e) => handleChangePriority(i, e.target.value)} >
              <option>Faible</option>
              <option>Moyenne</option>
              <option>Haute</option>
            </select>

            <input type="checkbox" checked={t.checked} onChange={(e) => handleCheck(i,e.target.checked)} />
        </div>        
    );
};
