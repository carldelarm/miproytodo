import React from 'react';

interface Props {
  taskName: string
}

const Task = ({taskName}:Props) => {
  return (
    <>
        <section className='caja-tarea'>
            <div style={{width:'10%'}}>
              <input type="checkbox" name="" id="" />
            </div>
            <div style={{width:'60%', textAlign:'left'}}>
              <label>{taskName}</label>
            </div>
            <div style={{width:'30%', textAlign:'right'}}>
              <input type="button" value="Remove" className='btn btn-danger btn-sm'/>
            </div>
        </section>
    </>
  )
}

export default Task
