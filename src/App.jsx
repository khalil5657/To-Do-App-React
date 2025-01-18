import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { RouterProvider, createBrowserRouter, Outlet, Link, useNavigate } from 'react-router-dom'
// import {Link} from "react-router-dom"
import Home from './Home'
import ShowTodos from './Showtodos'
import CreateTask from './createtask'
import CreateProject from './createproject'
import ShowTask from './showtask'
import EditTask from './edittask'
import EditProject from './editproject'
function RootLayout() {
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true)
  const [update, setUpdate] = useState("")
  const [message, setMessage ] = useState("")
  const [messageState, setMessageState] = useState(false)
  const navigate = useNavigate()
  // set Data from local storage or not
  useEffect(()=>{
    (
      async () =>{
        let data = JSON.parse(localStorage.getItem("data"))
        if (data){
          setData(data)
        }else{
          let data = {life:[{title:"Go Outside", content:"You must go outside and touch some grass.", priority:"HIGH", dateDue:"24/10/2003", complete:"no"}]}
          localStorage.setItem("data", JSON.stringify(data))
          setData(data)
        }
        setLoading(false)
      }
    )()
  }, [update])

  function deleteProj(e, proj){
    e.preventDefault()
    let theData = data
    delete theData[proj]
    localStorage.setItem("data", JSON.stringify(theData))
    setMessage("Project deleted Successfully")
    aMessage()
    setUpdate({})

  }

  if (loading){
    return <h1>Loading...</h1>
  }
  function aMessage(){
    setMessageState(true)
      setTimeout(() => {
        setMessageState(false)
      }, 3000);
  }
  let projects = []
  for (let proj in data){
    let aProject=
      <div className='project' key={proj}>
        <Link className='Link' to={`/showprojecttodos/${proj}`} state={{projName:proj}} ><img src="/project-svgrepo-com.svg" alt="" height="20px"/> <div>{proj}</div></Link>
        <Link className='Link proj' to="/createtask" state={{projName:proj}} style={{display:"flex", alignItems:"center", justifyContent:"center"}}><img src="/add-to-queue-svgrepo-com (1).svg" alt="" height="20px"/></Link>
        <Link className='Link proj' ><img src="/delete-svgrepo-com (1).svg" alt="" onClick={(e)=>deleteProj(e, proj)} height="20px" width="20px"/></Link>
        <Link className='Link proj' to="/editproject" state={{projName:proj}} style={{display:"flex", alignItems:"center", justifyContent:"center"}}><img src="/pen-line-svgrepo-com.svg" alt="" height="20px"/></Link>
      </div>
    projects.push(aProject)
  }
  return <div>
          <nav >
            <div className="icon">
              <Link className='Link thelogo' to="/"><img src="/to-do-list-svgrepo-com.svg" alt="" height="45px" width="45px"></img></Link>
              <span>To-Do-App</span>
              <Link className='Link plusbtn' to="/createproject"><span>+</span></Link>
            </div>
            <div className="projects">
                {projects}
            </div>
          </nav>
          {messageState==true&&<div className='amessage'>{message}</div>}
          <Outlet context={[data, setData, setUpdate, setMessage, aMessage]}/>
      </div>
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/showprojecttodos/:name",
        element:<ShowTodos />
      },
      {
        path:"/createtask",
        element:<CreateTask />
      },
      {
        path:"/createproject",
        element:<CreateProject />
      },
      {
        path:"/showtask",
        element:<ShowTask />
      },
      {
        path:"/edittask",
        element:<EditTask />
      },
      {
        path:"/editproject",
        element:<EditProject />
      },
    ] 
  }
])

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App
