import { useEffect, useState } from 'react';
import Task from './Task';

const Todo = () => {

  const [contador,setContador] = useState(0);
  const [tasksList, setTasksList] = useState([]);
  const [description, setDescription] = useState("");

  const getListTasks = async () => {
    console.log('Iniciando mi aplicación TODO');
  }

  useEffect(() => {
    getListTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddNewTask = (event:any) => {
    event.preventDefault();

    if(description.trim() === ''){
      alert(`Por favor, ingrese una tarea valida`);
      setDescription('');
      return;
    }

    let existe = false;

    tasksList.forEach((element) => {
      const { name } = element;
      const itemName:string = name;
      if(description.toLowerCase().trim() === itemName.toLowerCase().trim()) existe = true;
    });

    if(existe){
      alert(`La tarea ya existe, por favor ingrese una nueva`);
      setDescription('');
      return;
    }

    const newTask = {
      id: contador,
      name: `${description}`,
      done: false
    }

    const tasksListToUpdate:any = [...tasksList, newTask];
    setTasksList(tasksListToUpdate);
    setContador(contador+1);
    setDescription("");

  }  

  const onInputChange = (event:any) => {
    const {target} = event;
    const {value} = target;
    setDescription(value);
  }

  return (
      <div className='contenedor'>
        <h2>Mi Proyecto TODO</h2>

        <section id="busqueda">
          <div>
            <form>
              <input 
                  type="text"
                  name='taskname' 
                  id='taskname' 
                  placeholder='Ingrese una nueva tarea...'
                  value={ description }
                  onChange={ onInputChange }
              />&nbsp;&nbsp;
              <button type='submit' className='btn btn-primary' onClick={onAddNewTask}>Adicionar</button>&nbsp;&nbsp;
            </form>
          </div>
        </section>
        <br />

        {
          tasksList.map( (dataTask:any) => (
            <Task key={dataTask.id} 
                  id={dataTask.id} 
                  taskName={`${dataTask.name}`} 
                  taskDone={dataTask.done}
                  tasksList={tasksList}
                  setTasksList={setTasksList}
             />
          ))
        }

      </div>

  )
}

export default Todo
