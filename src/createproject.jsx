import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router"

function CreateProject(){
    const [data, setData, setUpdate, setMessage, aMessage] = useOutletContext()
    const [title, setTitle] = useState("")
    const navigate = useNavigate()
    function addProject(e){
        e.preventDefault()
        let theData = data
        if (theData[title]){
            setMessage("Project With The same Name Already exists.")
            aMessage()
            setUpdate({})
            return navigate("/")
        }else{
            theData[title] = []
            localStorage.setItem("data", JSON.stringify(theData))
            setMessage("Project Created successfully")
            aMessage()
            setUpdate({})
            return navigate("/")
        }
        
    }
    return <div className="content">
                <div className="createprojectform" >
                    <div>Create A Project</div>
                    <form action="" onSubmit={(e)=>addProject(e)}>
                        <label htmlFor="">Title</label>
                        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} maxLength={14}/>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
}

export default CreateProject