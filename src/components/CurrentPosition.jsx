import { useState,useContext } from 'react'

import { Route, Routes,useNavigate, Link,useMatch, useLocation } from "react-router-dom"
import { DataContext } from '../context/DataContext'

const CurrentPosition = ({value}) =>{
    const pages = ["Personal Details","Education","Experience","Projects","Achievements","Tech stack"]

    const { data, updateData,setDefault } = useContext(DataContext);

  return(
  <>
  <div className='flex flex-row text-[0.5rem] sm:text-sm  md:text-2xl justify-center font-bold space-x-4 my-3'>
    {
        pages.map((val,index)=>(
            <p className={`${val.toLowerCase() == value?.toLowerCase() ? "text-white":"text-gray-500"}`} key={index}>{val}</p>
        ))
    }
  </div>
  </>
  )
}

export default CurrentPosition