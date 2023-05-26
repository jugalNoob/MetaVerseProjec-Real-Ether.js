import React,{useContext , useReducer} from 'react'
import { NavLink } from 'react-router-dom'
import  "./style/home.css"
import { UserContext } from '../App';
// import UFO from "./style/img/404 UFO.gif"
// import SOL from "./style/img/Social Media Analytic.gif"

function Home() {
  const {state , dispatch}= useContext(UserContext);
  const Render=()=>{

    if(state){

      return(

<>

 <NavLink to="/">home</NavLink>
<br />
<br />
<NavLink to="/meta">air</NavLink>
<br />
<br />
<NavLink to="/dash">about</NavLink>
<br />
<br />
<NavLink to="/logout">logout</NavLink>
<br />
<br />


{/* //Logout line last row class */}

</>

      )
    }else{

      return(
<>
<NavLink to="/">home</NavLink>
<br />
<br />
<NavLink to="/meta">air</NavLink>
<br />
<br />
<NavLink to="/form">form</NavLink>
<br />
<br />
<NavLink to="/login">login</NavLink>
<br />
<br />

</>

      )
    }

  }


  return (
    <div>

   <div className="Home-all">

<div className="image-all">

  <div className="flex-start">

    <div className="header-one">
<h1>NFT-MINT</h1>
    </div>
    <div className="icon">
    <i class="fa-regular fa-hexagon-vertical-nft"></i>
    </div>

    <div className="nav">

<Render/>
        {/* <NavLink to="/">home</NavLink>
        <br />
        <NavLink to="/meta">meta</NavLink>
        <br />
        <NavLink to="/form">form</NavLink>
        <br />
        <NavLink to="/login">login</NavLink>
        <br />
        <NavLink to="/dash">about</NavLink>
        <br />
        <NavLink to="/logout">logout</NavLink> */}
    </div>
  </div>

<div className="seond-row">
  <div className="head-two">
    <h1>welcome to <br />the metavers</h1>
    <br />
    <br />
    <NavLink to ="/meta">metavers</NavLink>
  </div>
</div>
</div>


   </div> 

        {/* <NavLink to="/">home</NavLink>
        <br />
        <NavLink to="/meta">meta</NavLink>
        <br />
        <NavLink to="/form">form</NavLink>
        <br />
        <NavLink to="/login">login</NavLink>

        <div className="image">
          <img src={UFO} alt="" width="200px"  height="500px" />
        </div>

        <div className="images">

          <img src={SOL} alt="" width="200px"  height="300px" />
        </div> */}
    </div>
  )
}

export default Home





//||||||||||||||||||||||||||||||||||||||||LogIn start row class||||||||||||||||

// import { useEffect } from "react"
// import { Link, useNavigate } from 'react-router-dom'



// function Home() {
//     const navigate = useNavigate()

//     useEffect(() => {
//         const token = localStorage.getItem('TOKEN')
//         if (!token) {
//             navigate('/signin')
//         }
//     }, [])

//     return (
//         <div className="card">
//             <div>HOME</div>
//             <div>
//                 <span> {localStorage.getItem('EMAIL')} </span>
//                 <button
//                     onClick={() => {
//                         localStorage.clear()
//                         navigate('/signin')
//                     }}
//                 > LOGOUT </button>
//             </div>



//         </div>
//     )
// }


// export default Home