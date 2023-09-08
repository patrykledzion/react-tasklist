import React from 'react'

const PendingTasks = ({ app }) => {

  return (
    <div className="pending-tasks">
      <table>
        {

          app.state.tasks.map((task, key) => {
            return task.day == null /*&& !task.dragged */ ? (
              <tr key={task.id}>
                <td key={task.id + "_td"} onMouseDown={(e) => app.StartDrag(e, key)} className={task.dragged == false ? "" : 'pending-task-hidden'}>
                  {task.title}
                </td>
              </tr>
            ) : null

          })
        }
      </table>
    </div>
  )
}

export default PendingTasks;