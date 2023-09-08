import React from 'react'

const Task = ({ task, _key, app }) => {

  let _class = "task-row ";
  _class += (task.dragged == false ? "" : 'task-hidden ')
  _class += (task.done ? ' task-done ' : "")
  _class += (task.locked ? 'task-locked' : '')
  
  return (
    <div onMouseDown={(e) => app.StartDrag(e, _key)} className={"task-row " + _class}>
      <span className='task-header'>
        <span className='del-button' onClick={() => app.DelTask(_key)}></span>
        <span className='done-button' onClick={() => app.DoneTask(_key)}></span>
        <span className={'lock-button ' + (task.locked ? 'lock-button-locked ' : '')} onClick={() => app.LockTask(_key)}></span>
      </span>
      <span className='task-title'>{task.title}</span>
    </div>
  )
}

export default Task;