import React from 'react'
import "./Loader.css";
import logotodo from "../../../images/logotodo.png"


const Loader = () => {
  return (
    <div className="coffee" >    
      <img src={logotodo} className="LogoOnCup"/>
      
      
      <div><div><div></div></div></div>
      <div><div><div></div></div></div>
      <div><div><div></div></div></div>
      <div><div><div></div></div></div>
      <div><div><div></div></div></div>
      <div><div><div></div></div></div>

      </div>
      
  )
}

export default Loader