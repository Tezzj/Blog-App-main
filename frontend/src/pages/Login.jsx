import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { UserContext } from "../context/UserContext"

const Login = () => {
 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try{
        const res = await axios.post("/api/auth/login", {email, password},{withCredentials:true})
        // console.log(res.data)
        setUser(res.data)
        navigate("/")
    }
    catch(err){
      setError(true)
      console.log(err)
    }
  }

  return (
    <>
    <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
      <h1 className='text-xl font-extrabold'><Link to="/">BlogNest</Link></h1>
      <h3><Link to="/register">Register</Link></h3>
    </div>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%] ">
          <h1 className="text-xl font-bold text-left">Login to your account</h1>
            <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-300 outline-0 rounded-md hover:border-black" type="text" placeholder="Enter Your Email"/>
            <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-300 outline-0 rounded-md hover:border-black" type="password" placeholder="Enter Your Password"/>
            <button onClick={handleLogin} className="w-full px-4 py-4 font-bold hover:bg-black text-white rounded-sm bg-gray-800">Login</button>
            {error && <p className="text-red-500">Something went wrong</p>}

            <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Login
