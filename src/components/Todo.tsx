import { useEffect, useState } from 'react';
import Task from './Task';
import { Tarea } from '../types/tarea';

const data: Tarea[] = [
  {
    id: 1,
    title: 'Trabajar',
    done: false
  },
  {
    id: 2,
    title: 'Estudiar',
    done: false
  },
  {
    id: 3,
    title: 'Ir al Gym',
    done: false
  }
]


const Todo = () => {

  const [contador,setContador] = useState(0);
  const [tasksList, setTasksList] = useState(data);
  const [description, setDescription] = useState("");

  const getListTasks = async () => {
    console.log('Metodo que deberia consultar todas las tareas');
    setContador(tasksList.length+1);
  }

  useEffect(() => {
    getListTasks();
  }, []);

  const onAddNewTask = (event:any) => {
    event.preventDefault();

    if(description.trim() === ''){
      alert(`Por favor, ingrese una tarea valida`);
      setDescription('');
      return;
    }

    let existe = false;

    tasksList.forEach((element:Tarea) => {
      const { title } = element;
      const itemName:string = title;
      if(description.toLowerCase().trim() === itemName.toLowerCase().trim()) existe = true;
    });

    if(existe){
      alert(`La tarea ya existe, por favor ingrese una nueva`);
      setDescription('');
      return;
    }

    const newTask: Tarea = {
      id: contador,
      title: `${description}`,
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
        <h2>TODO APP</h2>

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
          tasksList.map( (dataTask: Tarea) => (
            <Task key={dataTask.id} 
                  id={dataTask.id} 
                  taskName={`${dataTask.title}`} 
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
