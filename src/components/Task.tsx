import { useState } from "react";
import { Tarea } from "../types/tarea";

interface Props {
  tarea: Tarea,
  onDelete: (id:number) => void,
  onUpdate: (data:object) => void
}

const Task = ({tarea,onDelete,onUpdate}:Props) => {

  const {id,title,done} = tarea;

  const [executed, setExecuted] = useState(done);
  const [taskDescription, setTaskDescription] = useState(title);
  const [showBtnUpdate, setShowBtnUpdate] = useState(false);

  const onUpdateTask = (event: React.ChangeEvent<HTMLInputElement>): void => {
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

  const onMarkTask = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
        <div className="container">
          <div className="row">
            <div className="col-1 p-1 m-0">
              <input type="checkbox" name={`chk_task_${id}`} id={`chk_task_${id}`} 
                    checked={executed} 
                    onChange={onMarkTask}
              />
            </div>
            <div className="col-7 p-1">
              <input type="text" 
                     value={taskDescription} 
                     className="input-task" 
                     onChange={onUpdateTask} 
              />
            </div>
            <div className="col-2 p-1">
              {
                showBtnUpdate && (
                  <>
                    <button className='btn btn-success btn-sm' 
                      name={`btn_update_${id}`} id={`btn_update_${id}`}
                      onClick={() => onUpdate({id,taskDescription,executed})}>Actualizar</button>&nbsp;
                  </>
                )
              }
            </div>
            <div className="col-2 p-1">
              <button className='btn btn-danger btn-sm' onClick={() => onDelete(id)}>Remover</button>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Task
