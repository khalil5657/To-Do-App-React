import { useEffect, useState } from "react"
import { useLocation, useNavigate, useOutletContext } from "react-router"

function EditTask(){

    const [data, setData, setUpdate, setMessage, aMessage] = useOutletContext()
    const {state} = useLocation()
    const [title, setTitle] = useState(state?data[state.projName][state.index].title:'')
    const [projName, setProjName] = useState(state?state.projName:"")
    const [content, setContent] = useState(state?data[state.projName][state.index].content:'')
    const [dateDue, setDateDue] = useState(state?(data[state.projName][state.index].dateDue):'')
    const [priority, setPriority] = useState(state?data[state.projName][state.index].priority:'')
    const navigate = useNavigate()
    console.log(priority)
    useEffect(()=>{
        setProjName(state.projName)
    }, [state])

    function editTask(e){
        e.preventDefault()
        let obj = {title:title, content:content, priority:priority, dateDue:dateDue, complete:"no"}
        let theData = data
        console.log(state)
        theData[projName].splice(state.index, 1, obj)
        localStorage.setItem("data", JSON.stringify(theData))
        setMessage("Task edited successfully")
        aMessage()
        setUpdate({})
        navigate(`/showprojecttodos/${projName}`, {state:{projName:projName}})

    }

    return <div className="content">
            <div className="createtaskform">
                <div>Edit a Task</div>
                <form action="" onSubmit={(e)=>editTask(e)}>
                    <label htmlFor="">Title</label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                    <textarea name="" id="" rows={4} onChange={(e)=>setContent(e.target.value)} value={content} required></textarea>
                    <label htmlFor="">Date Due</label>
                    <input type="date" name="" id="" onChange={(e)=>setDateDue(e.target.value.split("-").reverse().join("-").replaceAll("-", "/"))} required value={dateDue.replaceAll("/", "-").split("-").reverse().join("-")}/>
                    <label htmlFor="">Priority</label>
                    <select id="cars" name="cars" onChange={(e)=>setPriority(e.target.value)} required>
                        {priority=="HIGH"?<option value="HIGH" selected>High</option>:<option value="HIGH">High</option>}
                        {priority=="MEDIUM"?<option value="MEDIUM" selected>Medium</option>:<option value="MEDIUM" >Medium</option>}
                        {priority=="LOW"?<option value="LOW" selected>Low</option>:<option value="LOW">Low</option>}
                    </select>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </div>
}
export default EditTask