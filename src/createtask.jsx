import { useEffect, useState } from "react"
import { useLocation, useNavigate, useOutletContext } from "react-router"

function CreateTask(){

    const [data, setData, setUpdate, setMessage, aMessage] = useOutletContext()
    const {state} = useLocation()
    const [title, setTitle] = useState("")
    const [projName, setProjName] = useState(state?state.projName:"")
    const [content, setContent] = useState("")
    const [dateDue, setDateDue] = useState('')
    const [priority, setPriority] = useState("HIGH")
    const navigate = useNavigate()

    useEffect(()=>{
        setProjName(state.projName)
    }, [state])

    function addTask(e){
        e.preventDefault()
        let obj = {title:title, content:content, priority:priority, dateDue:dateDue, complete:"no"}
        let theData = data
        console.log(state)
        theData[projName][theData[projName].length]=(obj)
        localStorage.setItem("data", JSON.stringify(theData))
        setMessage("Task added successfully")
        aMessage()
        setUpdate({})
        navigate(`/showprojecttodos/${projName}`, {state:{projName:projName}})
    }
    return <div className="content">
            <div className="createtaskform">
                <div>Create a Task</div>
                <form action="" onSubmit={(e)=>addTask(e)}>
                    <label htmlFor="">Title</label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                    <textarea name="" id="" rows={4} onChange={(e)=>setContent(e.target.value)} value={content} required></textarea>
                    <label htmlFor="">Date Due</label>
                    <input type="date" name="" id="" onChange={(e)=>setDateDue(e.target.value.split("-").reverse().join("-").replaceAll("-", "/"))} required/>
                    <label htmlFor="">Priority</label>
                    <select id="cars" name="cars" onChange={(e)=>setPriority(e.target.value)} required>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
}
export default CreateTask