import React from 'react';

interface Props {
  taskName: string
}

const Task = ({taskName}:Props) => {
  return (
    <>
        <section className='caja-tarea'>
            <input type="checkbox" name="" id="" />&nbsp;&nbsp;
            <label htmlFor="">{taskName} </label>&nbsp;&nbsp;
            <input type="button" value="Remove" />
        </section>
    </>
  )
}

export default Task
