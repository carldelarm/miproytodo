import { useState } from "react";
import { Tarea } from "../types/tarea";

interface Props {
  tarea: Tarea,
  onDelete: (id:number) => void,
  onUpdate: (data:any) => void
}

const Task = ({tarea,onDelete,onUpdate}:Props) => {

  const {id,title,done} = tarea;

  const [executed, setExecuted] = useState(done);
  const [taskDescription, setTaskDescription] = useState(title);
  const [showBtnUpdate, setShowBtnUpdate] = useState(false);

  const onUpdateTask = (event:any) => {
    const {target} = event;
    const {value} = target;
    setTaskDescription(value);

    const btnToHide = document.getElementById(`btn_update_${id}`);
    if (btnToHide !== null) btnToHide.style.display = 'block';
    
    if (value !== title || executed !== done) {
      setShowBtnUpdate(true);
    } else {
      setShowBtnUpdate(false);
    }  
  }

  const onMarkTask = (event:any) => {
    const {target} = event;
    const {checked} = target;
    setExecuted(checked);

    const btnToHide = document.getElementById(`btn_update_${id}`);
    if (btnToHide !== null) btnToHide.style.display = 'block';

    if (checked !== done || taskDescription !== title) {
      setShowBtnUpdate(true);
    } else {
      setShowBtnUpdate(false);
    } 
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
          <input type="text" value={taskDescription} className="input-task" onChange={onUpdateTask} />
        </div>

        {
          showBtnUpdate && (
            <div className="div-actualizar" style={{width:'20%', textAlign:'right'}}>
              <button className='btn btn-primary btn-sm' 
                name={`btn_update_${id}`} id={`btn_update_${id}`}
                onClick={() => onUpdate({id,taskDescription,executed})}>Actualizar</button>&nbsp;
          </div>
          )
        }

        <div style={{width:'40%', textAlign:'right'}}>
          <button className='btn btn-danger btn-sm' onClick={() => onDelete(id)}>Remover</button>
        </div>
    </section>
  )
}

export default Task
