import { useState } from "react";

interface Props {
  id:number,
  taskName: string,
  taskDone:boolean,
  tasksList:any[],
  setTasksList:any
}

const Task = ({id,taskName,taskDone,tasksList,setTasksList}:Props) => {

  const [done, setDone] = useState(taskDone);

  const onDeleteTask = (event:any) => {
    const btnSelected = event.target.id;
    const data = btnSelected.split('_');
    const idToDelete = data[2];
    const result = tasksList.filter((task:any) => task.id != idToDelete);
    setTasksList(result);
  }

  const onUpdateTask = () => {
    console.log('Actualizando input');
  }

  const onMarkTask = () => {
    setDone(!done);
  }

  return (
    <section className='caja-tarea'>
        <div style={{width:'10%'}}>
          <input type="checkbox" 
                name={`task_${id}`} 
                id={`task_${id}`} 
                checked={done} 
                onChange={onMarkTask}
          />
        </div>
        <div style={{width:'50%', textAlign:'left'}}>
          <input type="text" value={taskName} className="input-task" onChange={onUpdateTask}/>
        </div>
         <div className="div-actualizar" style={{width:'20%', textAlign:'right'}}>
            <button className='btn btn-primary btn-sm' 
              name={`btn_update_${id}`} id={`btn_update_${id}`}
              onClick={onUpdateTask}>Actualizar</button>&nbsp;
        </div>
        <div style={{width:'20%', textAlign:'right'}}>
          <button className='btn btn-danger btn-sm' 
            name={`btn_remove_${id}`} id={`btn_remove_${id}`}
            onClick={onDeleteTask}>Remover</button>
        </div>
    </section>
  )
}

export default Task
