import './App.css'
import React from 'react'
import LeftSection from './Components/LeftSection'
import RightSection from './Components/RightSection'
import Task from './Components/Task'


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      tasks: [],
      weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      weekDaysDim: [null,null,null,null,null,null,null] ,
      draggedElement: -1,
      draggedElementDim: {offsetX: 0, offsetY:0, width:0, height:0},
      mousePos: { x: 0, y: 0 },

    }
  } 

  GetWeekDaysPos = () => {

    for(let i=0;i<this.state.weekDaysDim.length;i++)
      {
        this.state.weekDaysDim[i] = document.querySelectorAll(".task-row-td")[i].getBoundingClientRect()
      }
    

    this.setState({
      weekDaysDim: this.state.weekDaysDim
    })
    
  }
  
  StartDrag = (e, id) => {
    if(e.target.className.includes("del-button") || e.target.className.includes("done-button") || e.target.className.includes("lock-button"))
        return;
    if(this.state.tasks[id].locked)return;
    
     //clientWidth, clientHeight, nativeEvent.offsetX, clientX
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    
    this.setState({
      draggedElementDim: {
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY,
        width: e.target.clientWidth,
        height: e.target.clientHeight
      },
      
        draggedElement: id,
    })

    this.state.tasks[id].dragged = true;

    document.querySelector("#dragged-element").style.left = ( mouseX - e.nativeEvent.offsetX) + "px";
    document.querySelector("#dragged-element").style.top = ( mouseY - e.nativeEvent.offsetY) + "px";
    document.querySelector("#dragged-element").style.width = ( e.target.clientWidth) + "px";
  }

  EndDrag = (day) => {
    if(this.state.draggedElement==-1)return;
    this.state.tasks[this.state.draggedElement].dragged = false;
    this.state.tasks[this.state.draggedElement].day = day;
    
     this.setState({
       draggedElement: -1,
       tasks: this.state.tasks
     })     
  }

  MouseMove = (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    
    this.StickToMouse(e);
    this.GetWeekDaysPos();

    
    if(e.buttons == 0 && this.state.draggedElement > -1)
    {
     //left, top, width, height, clientX, clientY
      let dropped = false;
      for(let i=0;i<this.state.weekDays.length;i++)
        {
          
          let dim = this.state.weekDaysDim[i];
          if(mouseX >=dim.left && mouseX < dim.left + dim.width)
          {
            this.EndDrag(i);
            dropped = true;
          }
        }

      if(!dropped)
      {
        this.EndDrag(null);
      }
    }
  }

  StickToMouse = (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    
    document.querySelector("#dragged-element").style.left = ( mouseX - this.state.draggedElementDim.offsetX) + "px";
    document.querySelector("#dragged-element").style.top = ( mouseY - this.state.draggedElementDim.offsetY) + "px";
    document.querySelector("#dragged-element").style.width = ( this.state.draggedElementDim.width) + "px";
  }


  DelTask = (id) => {
    if(this.state.tasks[id].locked)return;
    this.setState({
      draggedElement: -1,
    })
    this.state.tasks.splice(id, 1)
  }

  DoneTask = (id) => {
    let _newArr = this.state.tasks;
    _newArr[id].done = !_newArr[id].done
    this.setState({
      tasks: _newArr
    })
  }

  LockTask = (id) => {
    let _newArr = this.state.tasks;
    _newArr[id].locked = !_newArr[id].locked
    this.setState({
      tasks: _newArr
    })
  }
  
  render() {
    return (
      <main onMouseMove={(e)=>{this.MouseMove(e);}} >
        <LeftSection app={this} />
        <RightSection app={this} />
        <div id="dragged-element" className={"dragged-element" + (this.state.draggedElement > -1 ? "" : " dragged-element-hidden")}>
          { 
            this.state.draggedElement>-1 ?  (
              <Task app={this} _key={this.state.draggedElement} task={this.state.tasks[this.state.draggedElement]} />) : null
          }
          
        </div>
      </main >
    )
  }
}

export default App 