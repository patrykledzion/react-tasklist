import React from 'react'
import Task from './Task'

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
                    <Task _key={key} task={task} app={app}/>
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