// import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import useStore from "../store";
import "./Columns.css";
import Task from "./Task";
import classNames from "classnames"


interface columnProp {
  state: "PLANNED" | "ONGOING" | "COMPLETED";
}

const Columns = ({ state }: columnProp) => {
    const {tasks, addTask,draggedTask,setDraggedTask,moveTask} = useStore(); //destructuring

    const [text,setText] = useState<string>("");
    const [open,setOpen] = useState<boolean>(false);
  
    const filteredTasks = tasks.filter((task) => task.state === state)

    // This will fetch the entire store state
    // const storeState = useStore.getState();  
    // console.log("Zustand Store State:", storeState);

  return (  
    <div className={classNames("column",state)}
      onDragOver={(e)=>e.preventDefault()} 
      onDrop={(e)=>{
        e.preventDefault();
        if(draggedTask){
          setDraggedTask(null);
          moveTask(draggedTask?.title,state)
          // console.log(draggedTask);
        }
      }
    }>

      <div className="titleWrap">

        <p className="heading">{state}</p>

        {/* add button */}
        <button className="add-btn"onClick={()=>setOpen(true)}>
          +
        </button>

      </div>

      {filteredTasks.length > 0 ? (filteredTasks.map((task) => <Task key={task.title} title={task.title} />)) : (<p className="titleWrap">No task found</p>)}
      {open &&(<div className="Modal">

        <div className="modalContent">
          <input className="input" onChange={(e)=>setText(e.target.value)} value={text} placeholder="Enter a task" />

          <button 
            className="submit"
            onClick={()=>{
              addTask(text,state);
              setText("");
              setOpen(false);
            }}>
            Add
          </button>

        </div>

      </div>)}

    </div> 
  )
}

export default Columns;
