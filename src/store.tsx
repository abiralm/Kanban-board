import { create } from "zustand";

interface StoreType {
    tasks: Tasks[];
    addTask: (title: Tasks["title"], state: Tasks["state"]) => void;
    deleteTask:(title: Tasks["title"])=>void;
    draggedTask:Tasks | null,
    setDraggedTask: (task:Tasks | null)=>void;
    moveTask:(title:Tasks["title"],newState:Tasks["state"])=>void;
    editTask:(title:Tasks["title"],newTitle:Tasks["title"],state:Tasks["state"])=>void;
}


interface Tasks {
    title:string,
    state:"PLANNED"|"ONGOING"|"COMPLETED"|string
}

const useStore = create<StoreType>((set)=>({
    // this code runs
    // tasks: [{title:"",state:""}],
    
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),

    // addTask:(title: Tasks["title"],state: Tasks["state"])=>set
    // ((store)=>({tasks:[...store.tasks,{title,state}]}))

    addTask: (title: Tasks["title"], state: Tasks["state"]) => 
        set((store) => {
            const newTask = { title, state };
            const updatedTasks = [...store.tasks, newTask];
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return { tasks: updatedTasks };
    }),

    // deleteTask:(title:Tasks["title"])=>
    //     set((store)=>({tasks:store.tasks.filter((task)=>task.title!==title)})
    // ),

    deleteTask:(title:Tasks["title"])=>
        set((store)=>{
            const updatedTasks  = store.tasks.filter((task) => task.title !== title);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return { tasks: updatedTasks };
    }),

    draggedTask:null,

    setDraggedTask:(task:Tasks | null )=> set(()=>({draggedTask:task})) ,
    
    moveTask:(title,newState)=>
        set((store)=>{
           const movedTasks = store.tasks.map((task) =>
            task.title === title ? { ...task, state: newState } : task);
           localStorage.setItem("tasks",JSON.stringify(movedTasks));
           return {tasks:movedTasks};
        }),
        
    // moveTask:(title,newState)=>set((store)=>({ tasks: store.tasks.map((task) => task.title === title ? { ...task,  state:newState } : task) }))

    editTask: (title, newTitle, state) =>
        set((store) => {
          const editedTasks = store.tasks.map((task) =>
            task.title === title ? { ...task, title: newTitle, state } : task
          );
          localStorage.setItem("tasks", JSON.stringify(editedTasks));
          return { tasks: editedTasks };
        }),
}))

export default useStore