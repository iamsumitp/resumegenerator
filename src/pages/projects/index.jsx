import { useState,useContext } from 'react'
import { Route, Routes,useNavigate } from "react-router-dom"
import Navbar from '../../components/Navbar'
import { DataContext } from '../../context/DataContext';
import CurrentPosition from '../../components/CurrentPosition';
import ReactGA from "react-ga4";
function Project() {


   
    const navigation = useNavigate()
    const { data, updateData } = useContext(DataContext);
    
    const [formData, setFormData] = useState(data['projects'] == null ? [{projectName:'',tech:'',link:'',points:['','']}] : data['projects'] );


         const addInput = () => {
       const data = {projectName:'',tech:'',link:'',points:['']}
      setFormData([...formData, data]);
    };

       const nextPage =()=>{
      console.log("projects")
      ReactGA.send({ hitType: "pageview", page: `${window.location.pathname + window.location.search}`, title: "projects" });
      updateData('projects',formData)
      navigation('/app/achievement')
    }

  return (
    <>
    <Navbar/>
    <CurrentPosition value={"projects"}/>
    <h1 className='text-lg lg:text-5xl text-center text-white'>Projects</h1>
    

    
   
    
    <div className='bg-[#111111] py-[4%]'>
        {formData.map((value, index) => (
            <div key={index} >
            <ProjectInput value={value} index={index} formData={formData} setFormData={setFormData} />
            {
              formData.length -1 != index ?
                <hr className="border border-gray-300 my-4 mx-[20%]"/>
                :
                <></>
            }
            </div>
        ))}

   
    </div>

     <div className='flex justify-end mx-[20%]'>
            <button type="button" onClick={addInput} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Field</button>
    </div>

    <div className='flex justify-between mx-[10%] my-[20%] sm:mx-[20%] sm:my-0'>
        <button type="button" onClick={()=>{navigation(-1)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Previous</button>
        <button type="button" onClick={()=>{nextPage()}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Next</button>
    </div>
    
    </>
  )
}

const ProjectInput = ({value,formData,setFormData,index}) =>{

   const handleFormChange = (index, event) => {
   let data = [...formData];
   data[index][event.target.name] = event.target.value;
   setFormData(data);
}

const handlePointChange =(event,pointIndex)=>{
  let data =  [...formData]
  data[index]['points'][pointIndex] = event.target.value
  setFormData(data)
}

const addPoint = () =>{
  let data = [...formData]
  data[index]['points'] = [...data[index]['points'],'']
  setFormData(data)
}
 const removeItem = (index) =>{
    let data = [...formData];
    data.splice(index, 1)
    setFormData(data)
  }

const removePoint = (pointIndex) =>{
let data = [...formData]
data[index]['points'].splice(pointIndex,1)
setFormData(data)
}

return(
    <div className='xl:mx-[20%] mx-[10%]'>
        <div className='flex justify-end'>
            <button type="button" onClick={()=>{removeItem(index)}} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
        </div>
            <div className="grid gap-3 mb-6 md:grid-cols-2">
                <div>
                    <label  className="block mb-2 text-sm font-medium text-white">Project Name</label>
                    <input type="text" name="projectName" placeholder='project name' value={value.projectName} onChange={(e) => {handleFormChange(index,e)}}    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>
                <div>
                    <label  className="block mb-2 text-sm font-medium text-white">Tech</label>
                    <input type="text" name="tech" placeholder='node js,react,etc' value={value.tech} onChange={(e) => {handleFormChange(index,e)}}    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                </div>
                <div>
                    <label  className="block mb-2 text-sm font-medium text-white">Link</label>
                    <input type="text" name="link" placeholder='link' value={value.link} onChange={(e) => {handleFormChange(index,e)}}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                </div> 
                
                <div className='flex justify-end'>
                    <button type="button"  onClick={addPoint} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Add Description</button>
                </div>
                {
                    value.points.map((value,pointIndex)=>(
                        <div key={pointIndex}  className='flex flex-row space-x-5 w-full'>
                          <div className='w-[90%]'>
                            <label  className="block mb-2 text-sm font-medium text-white">Project Descriptions</label>
                             <input type="text" placeholder='A video chat app with great picture quality.' value={value} onChange={(e)=>{handlePointChange(e,pointIndex)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                          </div> 
                          <button type="button" onClick={()=>{removePoint(pointIndex)}} className="focus:outline-none text-white mt-7 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 h-10   dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Del</button>
                        </div>
                    ))
                }
                 
            </div>
        </div>

  )
}



export default Project