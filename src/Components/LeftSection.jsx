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

    if(_title.trim()=="")return;
    
    document.add_task_form.title.value = "";
    console.log(_title)
    const _id = app.state.tasks.length > 0 ? app.state.tasks[app.state.tasks.length - 1].id + 1 : 0
    const _newTask = {
      id: _id,
      title: _title,
      day: null,
      number: null,
      done: false,
      locked: false,
      dragged: false
    }

    app.state.tasks.push(_newTask);
    app.setState({
      tasks: app.state.tasks
    })

  }

  return (
    <section className="left-section" onMouseUp={() => app.EndDrag(null)}>
      <h2>
        <span>Task</span> List
      </h2>
      <form id="add-task-form" name="add_task_form" onSubmit={() => e.preventDefault()}>
        <input type="text" name="title" onKeyDown={(e) => { if (e.keyCode == 13) { e.preventDefault(); AddTask() } }} />
        <input type="button" value="Add Task" onClick={AddTask} />
      </form>
      <br />
      <hr color="gray" />
      <PendingTasks app={app} />
    </section>
  )
}

export default LeftSection;