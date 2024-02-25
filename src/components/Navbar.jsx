import { useState,useContext } from 'react'

import { Route, Routes,useNavigate, Link } from "react-router-dom"
import { DataContext } from '../context/DataContext'
const Navbar = () =>{

    const [toggle,setToggle] = useState(false)

    const { data, updateData,setDefault } = useContext(DataContext);

  return(
  <>
   <nav className="bg-[#111111] mb-4 sm:pr-10">
  <div className="flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to={'/'}  className="">
        <span className="md:px-16 text-2xl font-semibold whitespace-nowrap  text-white">Resume Builder</span>
    </Link>
    <button onClick={()=>{setToggle(!toggle)}} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className={`${toggle?"":"hidden"} w-full md:block md:w-auto`} id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border space-y-5 md:space-y-0 md:flex-row md:space-x-8 md:mt-0 md:border-0">
        <li>
          <Link to={'/home'}  className="block py-2 pl-3 pr-4 text-sm md:text-lg text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Home</Link>
        </li>
        <li>
          <Link to={'/home'} onClick={setDefault} className="block text-sm md:text-lg py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Reset</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </>
  )
}

export default Navbar

