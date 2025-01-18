import { useOutletContext } from "react-router"

function Home(){
    const [data] = useOutletContext()
    // function deleteIt(){
    //     localStorage.clear();
    // }
    return <div className="content">
            <div className="home">
                <img src="https://to-do-list-webpack.onrender.com/b29a39f77887e20d4b87.png"/>
                <p>Create a new list by clicking the + button or select an existing one to start adding your tasks.</p>
            </div>
        </div>
}

export default Home