import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfilePosts from '../components/ProfilePosts'
import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
// import {  } from '../url'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'



const Profile = () => {

  const param = useParams().id
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [updated, setUpdated] = useState(false)
  const [posts, setPosts] = useState([])
  const {user,setUser} = useContext(UserContext)
  const navigate = useNavigate()

  const fetchProfile = async () => {
    try{
      const res = await axios.get("/api/users/"+user._id,{withCredentials:true})
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
    }
    catch(err){
      console.log(err)
    }
  }

  const handdleUserUpdate = async () => {
    setUpdated(false)
    try{
      const res = await axios.put("/api/users/"+user._id,{username,email,password},{withCredentials:true})
      // console.log(res)
      setUpdated(true)
    }
    catch(err){
      console.log(err)
      setUpdated(false)
    }
  }

  const handleUserDelete = async () => {
    try{
      const res = await axios.delete("/api/users/"+user._id,{withCredentials:true})
      setUser(null)
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
  }

  const fetchUserPosts = async () => {
    try{
      const res = await axios.get("/api/posts/user/"+user._id)
      setPosts(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchProfile()
  }
  ,[param])

  useEffect(()=>{
    fetchUserPosts()
  }
  ,[param])


  return (
    <div>
        <Navbar/> 
        <div className='px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start'>
          <div className='flex flex-col md:w-[70%] w-full mt-8 md:mt-0'>
                <h1 className='text-xl font-bold mb-4'>Your Posts:</h1>
                {posts?.map((p)=>(
                  <ProfilePosts key={p._id} p={p}/>
                ))}
          </div>
          <div className='md:sticky md:top-12 flex justify-end items-start md:w-[30%] w-full md:items-end'>
          <div className='flex flex-col space-y-4 items-start '>
          <h1 className='text-xl font-bold mb-4'>Profile</h1>
                <input onChange={(e)=>setUsername(e.target.value)} value={username} className='outline-none px-4 py-2 text-gray-500' placeholder='Your username' type='text'/>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='outline-none px-4 py-2 text-gray-500' placeholder='Your email' type='email'/>
                {/* <input onChange={(e)=>setPassword(e.target.value)} value={password} className='outline-none px-4 py-2 text-gray-500' placeholder='Your password' type='password'/> */}
                <div className='flex items-center space-x-4 mt-8'>
                    <button onClick={handdleUserUpdate} className='text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400'>Update</button>
                    <button onClick={handleUserDelete} className='text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400'>Delete</button>
                </div>
                {updated && <p className='text-green-500 text-center mt-4'>Profile updated successfully!!</p>}
          </div>
            
          </div>
        </div> 
        <Footer/>
    </div>
  )
}

export default Profile