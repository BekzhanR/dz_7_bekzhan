import React,{useState,useMemo,useCallback} from "react";

const Task = () => {
    const [tasks,setTasks]= useState([
        {id:1, title:'Task-1', status:'todo'},
        {id:2, title:'Task-2', status:'in process'},
        {id:3, title:'Task-3', status:'done'},
    ])

    const [filter,setFilter] = useState('all')

    const filtered = useMemo(() =>{
        console.log('filtering task...')
        if (filter === 'all'){
            return tasks
        } else {
            return tasks.filter(task => task.status === filter)
        }
    },[tasks,filter])

    const handleStatus = useCallback((taskid,newStatus) => {
        setTasks(prevTasks =>{
            return prevTasks.map(task => {
                if (task.id === taskid){
                    return {...task,status:newStatus}
                }
                return task
            })
        })
    },[])

    return (
        <div>
            <div>
                <label>
                    Filter
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="todo">To do</option>
                        <option value="in process">In process</option>
                        <option value="done">Done</option>
                    </select>
                </label>
            </div>
            <ul>
                {filtered.map(task => (
                    <li key={task.id}>
                        {task.title} - Status:{task.status}
                        <button onClick={() => handleStatus(task.id,'to do')}>set to to do</button>
                        <button onClick={() => handleStatus(task.id,'in process')}>set to in process</button>
                        <button onClick={() => handleStatus(task.id,'done')}>set to done</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Task