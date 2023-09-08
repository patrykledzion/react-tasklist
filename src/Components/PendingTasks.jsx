import React from 'react'
import Task from './Task'

const PendingTasks = ({ app }) => {

  return (
    <div className="pending-tasks">
        {
          app.state.tasks.map((task, key) => {
            return task.day == null ? (
              <Task task={task} key={key} _key={key} app={app} />
            ) : null
          })
        }
    </div>
  )
}

export default PendingTasks;