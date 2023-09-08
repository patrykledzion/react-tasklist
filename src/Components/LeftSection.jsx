import React from 'react'
import PendingTasks from './PendingTasks'

const LeftSection = ({ app }) => {

  const AddTask = () => {
    /*
      Task = {
        id, 
        title,
        day,
        number
      }
    */
    const _title = document.add_task_form.title.value;
    document.add_task_form.title.value = "";
    console.log(_title)
    const _id = app.state.tasks.length > 0 ? app.state.tasks[app.state.tasks.length - 1].id + 1 : 0
    const _newTask = {
      id: _id,
      title: _title,
      day: null,
      number: null,
      dragged: false
    }

    let _newArr = app.state.tasks;
    _newArr.push(_newTask)

    app.setState({
      tasks: _newArr
    })

    console.log(app.state.tasks)

  }

  return (
    <section className="left-section">
      <h2>
        <span>Task</span> List
      </h2>
      <form id="add-task-form" name="add_task_form">
        <input type="text" name="title" />
        <input type="button" value="Add Task" onClick={AddTask} />
      </form>
      <br />
      <hr color="gray" />
      <PendingTasks app={app} />
    </section>
  )
}

export default LeftSection;