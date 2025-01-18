import { useState } from "react"
import { useLocation, useNavigate, useOutletContext } from "react-router"

function EditProject(){
    const {state} = useLocation()
    const [data, setData, setUpdate, setMessage, aMessage] = useOutletContext()
    const [title, setTitle] = useState(state?state.projName:'')
    const navigate = useNavigate()

    function editProject(e){
        e.preventDefault()
        let theData = data
        
        if (state.projName !== title) {
            if (data[title]){
                setMessage("Project With The same Name Already exists.")
                aMessage()
                setUpdate({})
            }else{
                Object.defineProperty(theData,title,
                Object.getOwnPropertyDescriptor(theData, state.projName));
                delete theData[state.projName];
                localStorage.setItem("data", JSON.stringify(theData))
                setMessage("project name edited successfully")
                aMessage()
                setUpdate({})
            }
            
        }

        return navigate("/")
    }

    return <div className="content">
                <div className="createprojectform" >
                    <div>Edit A Project</div>
                    <form action="" onSubmit={(e)=>editProject(e)}>
                        <label htmlFor="">Title</label>
                        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} maxLength={14}/>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
}

export default EditProject