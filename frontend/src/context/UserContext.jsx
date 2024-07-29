
import { createContext,useEffect,useState } from "react";
import axios from 'axios'
// import { set } from "mongoose";

export const UserContext=createContext({})

export function UserContextProvider({children}){

    const [user,setUser]=useState(null)

    useEffect(()=>{
        getUser()
    },[])

    const getUser=async()=>{
        try{
            const res = await axios.get("/api/auth/refetch",{withCredentials:true})
            // console.log(res.data)
            setUser(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <UserContext.Provider value={{user,setUser}}>
         {children}
        </UserContext.Provider>
        
    )
}
