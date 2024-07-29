import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HomePosts from '../components/HomePosts'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
// import { URL } from '../url'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import { UserContext } from '../context/UserContext'


const MyBlogs = () => {
  const {search} = useLocation()
  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loader, setLoader] = useState(false)
  const {user}=useContext(UserContext)
  // console.log(user)

  const fetchPosts = async () => {
    setLoader(true)
    try{
      const res = await axios.get("/api/posts/user/"+user._id)
      // console.log(res.data)
      setPosts(res.data) 
      if(res.data.length === 0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(() => {
    fetchPosts()
  },[search])  
  return (
    <div>
        <Navbar/>
        <div className='px-8 px-[200px] min-h-[80vh]'>
        {loader?<div className='h-[40vh] flex justify-center items-center'><Loader/></div>:!noResults? posts.map((post) =>(
        <>
        <Link to={user?`/posts/post/${post._id}`:"/login"}>
        <HomePosts key={post._id} post={post}/>
        </Link>
        </>
        
      )): <h3 className='text-center font-bold mt-16'>No posts available</h3>}
      </div>
        <Footer/>
    </div>
  )
}

export default MyBlogs