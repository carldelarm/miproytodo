import { useState } from "react";
import { Tarea } from "../types/tarea";

interface Props {
  tarea: Tarea,
  onDelete: (id:number) => void
}

const Task = ({tarea,onDelete}:Props) => {

  const {id,title,done} = tarea;

  const [executed, setExecuted] = useState(done);

  const onUpdateTask = () => {
    console.log('Actualizando input');
  }

  const onMarkTask = () => {
    setExecuted(!executed);
  }

  return (
    <section className='caja-tarea'>
        <div style={{width:'10%'}}>
          <input type="checkbox" name={`chk_task_${id}`} id={`chk_task_${id}`} 
                checked={executed} 
                onChange={onMarkTask}
          />
        </div>

        <div style={{width:'50%', textAlign:'left'}}>
          <input type="text" value={title} className="input-task" onChange={onUpdateTask} />
        </div>

        {/*          
        <div className="div-actualizar" style={{width:'20%', textAlign:'right'}}>
            <button className='btn btn-primary btn-sm' 
              name={`btn_update_${id}`} id={`btn_update_${id}`}
              onClick={onUpdateTask}>Actualizar</button>&nbsp;
        </div>
        */}

        <div style={{width:'40%', textAlign:'right'}}>
          <button className='btn btn-danger btn-sm' onClick={() => onDelete(id)}>Remover</button>
        </div>
    </section>
  )
}

export default Task
