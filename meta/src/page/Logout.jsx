import React,{useEffect,useContext} from 'react'
import { UserContext } from '../App';
import {useHistory} from "react-router-dom"

function Logout() {
  const {state , dispatch}= useContext(UserContext);

  const history=useHistory();
  const callAbout=async()=>{

    try {
      const res=await fetch("/logout",{
method:"GET",
headers:{
  Accept:"application/json",
  "Content-Type": "application/json",
},
credentials:"include"

      })

     
    
      if(!res.status===200){
        const error=new Error(res.error)
        throw error;
      }else{
        dispatch({type:'user' , payload:false})
        history.push("/login" , {replace:true})
      }
      

    } catch (error) {
      dispatch({type:'user' , payload:false})
      console.log(error)
      history.push("/login" , {replace:true})
     
      
    }

  }
  useEffect(()=>{
    callAbout()
  },[])
 


  return (
    <div>
      <h1>LogOut</h1>
    </div>
  )
}

export default Logout