import { useEffect, useState } from 'react';
import Task from './Task';
import { Tarea } from '../types/tarea';

const Todo = () => {

  const inicialList:Tarea[] = [];
  const [tasksList, setTasksList] = useState<Tarea[]>(inicialList);
  const [description, setDescription] = useState("");

  const getListTasks = async () => {

    const todos = localStorage.getItem('todos') ?? '[]';
    console.log('todos',todos);
    const tareas:Tarea[] = JSON.parse(todos);

    if (tareas.length === 0){

      const requestOptions: object = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://clase-8-react-back-dev-qkfz.2.us-1.fl0.io", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          const tareas:Tarea[] = JSON.parse(result);
          localStorage.setItem('todos',JSON.stringify(tareas));
          setTasksList(tareas);
        })
        .catch(error => console.log('error', error));      
    } else {
      localStorage.setItem('todos',JSON.stringify(tareas));
      setTasksList(tareas);
    }

  }

  useEffect(() => {
    getListTasks();
  }, []);
  
  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(tasksList));
  }, [tasksList]);

  const onAddNewTask = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
      id: new Date().getTime(),
      title: `${description}`,
      done: false
    }

    const tasksListToUpdate:Tarea[] = [...tasksList, newTask];
    setTasksList(tasksListToUpdate);
    setDescription("");
    localStorage.setItem('todos',JSON.stringify(tasksListToUpdate));
  }  

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = event;
    const { value } = target;
    setDescription(value);
  };
  
  const onDelete = (id:number) => {
    const newList = tasksList.filter((task:Tarea) => task.id != id);
    localStorage.setItem('todos',JSON.stringify(newList));
    setTasksList(newList);
  }

  const onUpdate = (data:any) => {
    const { id,taskDescription,executed } = data;
    //Borra primera la tarea con el [id]
    const newList = tasksList.filter((task:Tarea) => task.id != id);
    //Crear nuevamente la tarea con el mismo [id]
    const updatedList = [...newList, {id,title:taskDescription,done:executed}];

    updatedList.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });

    localStorage.setItem('todos',JSON.stringify(updatedList));
    setTasksList(updatedList);
    const btnToHide = document.getElementById(`btn_update_${id}`);
    if (btnToHide!==null) btnToHide.style.display = 'none';
    
  } 

  return (
      <div className='contenedor'>
        <h2 className='title'>TODO APP</h2>

        <section id="busqueda">
          <div>
            <form>
              <input 
                  type="text"
                  name='taskname' 
                  id='taskname' 
                  placeholder='Ingrese una nueva tarea...'
                  className='form-control'
                  value={ description }
                  onChange={ onInputChange }
              />
              <button type='submit' className='btn btn-primary btn-sm mt-3' onClick={onAddNewTask}>Adicionar</button>&nbsp;&nbsp;
            </form>
          </div>
        </section>
        <br />

        {
          tasksList.map( (dataTask: Tarea) => (
            <Task key={dataTask.id} 
                  tarea={dataTask} 
                  onDelete={onDelete} 
                  onUpdate={onUpdate}
            />
          ))
        }

      </div>

  )
}

export default Todo
