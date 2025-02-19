import classNames from "classnames"
import "./Task.css"
import useStore from "../store"
import { MdDelete } from "react-icons/md";
 

interface titleProp{
    title:string
}

const Task = ({title}:titleProp) => {

  const tasks = useStore((store)=>store.tasks.find((task)=>task.title===title));
 
  const {deleteTask,setDraggedTask} = useStore(); //destructuring


  return (
    <div className="task" draggable onDragStart={()=>{tasks?setDraggedTask(tasks): setDraggedTask(null)}}>
        <div className="todo">{tasks?.title}</div>
        <div className="container">
            <div><MdDelete className="delete" onClick={()=>tasks?.title && deleteTask(tasks?.title)}/></div>
            {/* <div><button className="delete" onClick={()=>tasks?.title && deleteTask(tasks?.title)}>Edit</button></div> */}
            <div className={classNames("status",tasks?.state)}>{tasks?.state}</div>
        </div>
    </div>
  )
}

export default Task