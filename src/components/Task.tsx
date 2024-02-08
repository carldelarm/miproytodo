
interface Props {
  id:number,
  taskName: string,
  tasksList:any[],
  setTasksList:any
}

const Task = ({id,taskName,tasksList,setTasksList}:Props) => {

  const onDeleteTask = (event:any) => {
    const btnSelected = event.target.id;
    const data = btnSelected.split('_');
    const idToDelete = data[2];
    const result = tasksList.filter((task:any) => task.id != idToDelete);
    setTasksList(result);
  }

  return (
    <section className='caja-tarea'>
        <div style={{width:'10%'}}>
          <input type="checkbox" name={`task_${id}`} id={`task_${id}`} />
        </div>
        <div style={{width:'60%', textAlign:'left'}}>
          <label>{taskName}</label>
        </div>
        <div style={{width:'30%', textAlign:'right'}}>
          <button className='btn btn-danger btn-sm' 
            name={`btn_remove_${id}`} id={`btn_remove_${id}`}
            onClick={onDeleteTask}>Remove</button>
        </div>
    </section>
  )
}

export default Task
