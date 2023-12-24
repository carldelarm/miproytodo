//import React from 'react';
import Task from './Task';

const Todo = () => {
  return (
    <div className='contenedor'>
      <h2>Mi Proyecto TODO</h2>

      <section id="contacto">
        <div>
          <input type="text" />
          <input type="button" value="Save" />
        </div>
      </section>
      <br />

      <Task taskName={'Tarea a realizar # 1'} />
      <Task taskName={'Tarea a realizar # 2'} />
      <Task taskName={'Tarea a realizar # 3'} />
      <Task taskName={'Tarea a realizar # 4'} />
      <Task taskName={'Tarea a realizar # 5'} />

    </div>
  )
}

export default Todo
