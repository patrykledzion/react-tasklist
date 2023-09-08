import React from 'react'
import TaskRows from './TaskRows'

const RightSection = ({ app }) => {

  return (
    <section className="right-section">
      <table className="table-main">
        <tr>
          {app.state.weekDays.map((day) => {
            return (
              <td key={day}>{day}</td>
            )
          })}
        </tr>
        <TaskRows app={app} />
      </table>
    </section>
  )
}

export default RightSection;