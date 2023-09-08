import './App.css'
import React from 'react'
import LeftSection from './Components/LeftSection'
import RightSection from './Components/RightSection'

/*export default function App() {

  const [tasks, setTasks] = useState([[], [], [], [], [], [], []])


  return (
    <main>
      <LeftSection />
      <RightSection />
    </main>
  )
}*/

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      tasks: [],
      weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      draggedElement: -1,
      draggedElementDim: {w:0, x:0, y:0},
      mousePos: {x:0, y:0}
    }

  }

  StartDrag = (e, id) => {
    let _newList = this.state.tasks;
    _newList[id].dragged = true;
    this.setState({
      tasks: _newList,
      draggedElement: id
    })
    console.log(e)
    let dim = {
      w: e.target.clientWidth,
      x: this.state.mousePos.x - e.target.getBoundingClientRect().left,
      y: this.state.mousePos.y -  e.target.getBoundingClientRect().top,
    }
    
    this.setState({
      draggedElementDim: dim
    })
  }

  EndDrag = (day) => {
    let _newList = this.state.tasks;
    _newList[this.state.draggedElement].dragged = false;
    _newList[this.state.draggedElement].day = day;
    this.setState({
      tasks: _newList,
      draggedElement: -1
    })
  }

  StickToMouse = (e) => {

    if(this.state.draggedElement==-1 && this.state.tasks.length > 0)
    {
      let dim = {
        w: document.querySelector(".left-section .pending-tasks td").clientWidth,
        
      }
      
      this.setState({
        draggedElementDim: dim
      })
    }
    
    let x = e.clientX;
    let y = e.clientY;
    let w = this.state.draggedElementDim.w;

    this.setState({
      mousePos: {x: x, y:y}
    })
    
    console.log((this.state.draggedElementDim.x))
    document.querySelector(".dragged-element").style.left = (x - this.state.draggedElementDim.x) + 'px'
    document.querySelector(".dragged-element").style.top = (y + 10) + 'px'
    document.querySelector(".dragged-element").style.width = w + 'px'


  }

  render() {
    return (
      <main onMouseMove={this.StickToMouse}>
        <LeftSection app={this} />
        <RightSection app={this} />
        <div className={"dragged-element" + (this.state.draggedElement > -1 ? "" : " dragged-element-hidden")}>
          {this.state.draggedElement == -1 ? null : this.state.tasks[this.state.draggedElement].title}
        </div>
      </main >
    )
  }
}

export default App 