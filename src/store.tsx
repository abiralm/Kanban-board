import { create } from "zustand";

interface StoreType {
    tasks: Tasks[];
    addTask: (title: Tasks["title"], state: Tasks["state"]) => void;
    deleteTask:(title: Tasks["title"])=>void;
    draggedTask:Tasks | null,
    setDraggedTask: (task:Tasks | null)=>void;
    moveTask:(title:Tasks["title"],newState:Tasks["state"])=>void
}


interface Tasks {
    title:string,
    state:"PLANNED"|"ONGOING"|"COMPLETED"|string
}

const useStore = create<StoreType>((set)=>({
    // this code runs
    // tasks: [{title:"",state:""}],
    
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),

    addTask:(title: Tasks["title"],state: Tasks["state"])=>set((store)=>({tasks:[...store.tasks,{title,state}]})    
),

    deleteTask:(title:Tasks["title"])=>set((store)=>({tasks:store.tasks.filter((task)=>task.title!==title)})),

    draggedTask:null,

    setDraggedTask:(task:Tasks | null )=> set(()=>({draggedTask:task})) ,

    moveTask:(title,newState)=>set((store)=>({ tasks: store.tasks.map((task) => task.title === title ? { ...task,  state:newState } : task) }))
}))

export default useStore