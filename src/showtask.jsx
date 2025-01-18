import { useState } from "react"
import { useLocation, useOutletContext } from "react-router"

function ShowTask(){
    const [data, setData, setUpdate] = useOutletContext()
    const {state} = useLocation()
    const [task, setTask] = useState(state?state.task:'')
    return <div className="content">
                <div className="showtask">
                    <div className="tasktitle">{task.title}</div>
                    <p>{task.content}</p>
                    <div className="lastsection">
                        <div className={task.priority=="LOW"?"low":task.priority=="MEDIUM"?"medium":"high"}>{task.priority}</div>
                        <div><img src="/date.svg" height="25px"/>{task.dateDue}</div>
                    </div>
                </div>
            </div>
}


export default ShowTask