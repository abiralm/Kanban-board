import classNames from "classnames"
import "./Task.css"
import useStore from "../store"
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";


interface titleProp{
    title:string
}

const Task = ({title}:titleProp) => {

  const tasks = useStore((store)=>store.tasks.find((task)=>task.title===title));
 
  const {deleteTask,editTask,setDraggedTask} = useStore(); //destructuring


  return (
    <div className="task" draggable onDragStart={()=>{tasks?setDraggedTask(tasks): setDraggedTask(null)}}>
        <div className="todo">{tasks?.title}</div>
        <div className="container">
          <div className="buttons-div">
            <MdDelete className="delete" onClick={()=>tasks?.title && deleteTask(tasks?.title)}/>
            <MdEdit 
              className="edit" 
              onClick={() => {
                const newTitle = prompt("Edit the task:", tasks?.title);
                if (newTitle && tasks?.title) {
                  editTask(tasks.title, newTitle, tasks.state);
                }
              }} 
            />

          </div>
            <div className={classNames("status",tasks?.state)}>{tasks?.state}</div>
        </div>
    </div>
  )
}

export default Task