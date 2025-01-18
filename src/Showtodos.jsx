import { useEffect, useState } from "react"
import { useLocation, Link, useOutletContext, useNavigate } from "react-router"

function ShowTodos(){
    const {state} = useLocation()
    const [data, setData, setUpdate] = useOutletContext()
    const [projName, setProjName] = useState(state?state.projName:'')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        setUpdate({})
        setProjName(state.projName)
        setLoading(false)
    }, [state])

    function check(e, index){
        let oldData  = data
        if (e.target.checked==true){
            oldData[projName][index].complete = "yes"
        }else{
            oldData[projName][index].complete =  "no"
        }
        localStorage.setItem("data", JSON.stringify(oldData))
        // setData(oldData)
        setUpdate({})
        
    }
    function deleteIt(index){
        let theData = data
        theData[projName].splice(index, 1)
        localStorage.setItem("data", JSON.stringify(theData))
        setUpdate({})
    }

    function listIt(task, index){
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let currentDate = `${day}-${month}-${year}`;
        
        var date1ms = new Date(currentDate.split('-').reverse().join('-')).getTime();
        var date2ms = new Date(task.dateDue.replaceAll("/", "-").split("-").reverse().join("-")).getTime();


        return <div className="task" key={index}>
                {task.complete=='yes'?<Link className="Link" to="/showtask" state={{task:task}}><span className="line">{task.title}</span>{date1ms>date2ms&&<div className="time">Ran out of time</div>}</Link>:<Link className="Link" to="/showtask" state={{task:task}}><span>{task.title}</span>{date1ms>date2ms&&<div className="time">Ran out of time</div>}</Link>}
                <div className="taskbuttons">
                    <button onClick={()=>deleteIt(index)}>Delete</button>
                    <Link style={{textDecoration:"none", color:"white"}} className="editbtn" to="/edittask" state={{projName:projName, index:index}}>Edit</Link>
                    <label class="switch">
                        {task.complete=="no"?<input type="checkbox" onChange={(e)=>check(e, index)}  checked={false}/>:<input type="checkbox" onChange={(e)=>check(e, index)} checked={true}/>}
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
    }
    if (loading){
        return <h1>Loading...</h1>
    }
    return <div className="content">
            <div className="projecttodos">
                <h1>{projName}</h1>
                <div className="todos">
                    {!data[projName]?navigate('/'):data[projName].length>0?data[projName].map((task, index)=>listIt(task, index)):"no data here"}
                </div>
            </div>
        </div>
}
export default ShowTodos