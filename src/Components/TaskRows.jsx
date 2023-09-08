import React from 'react'

const TaskRows = ({ app }) => {

  return (
    <tr>
      {
        app.state.weekDays.map((day, dayKey) => {
          return (
            <td className="task-row-td" key={"TaskRow" + day} onMouseUp={() => app.EndDrag(dayKey)}>
              {
                app.state.tasks.map((task, key) => {
                  return task.day == dayKey ? (
                    <div className="task-row" onMouseDown={(e) => app.StartDrag(e, key)} className={"task-row "+(task.dragged == false ? "" : 'task-hidden')}>{task.title}</div>
                  ) : null
                })
              }
            </td>
          )
        })
      }
    </tr>
  )
}

export default TaskRows;