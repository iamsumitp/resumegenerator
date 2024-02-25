import { useState,useContext } from 'react'
import { Route, Routes,useNavigate } from "react-router-dom"
import Navbar from '../../components/Navbar'
import { DataContext } from '../../context/DataContext'
import CurrentPosition from '../../components/CurrentPosition'
import ReactGA from "react-ga4";
function Achievement() {


    const navigation = useNavigate()
    const { data, updateData } = useContext(DataContext);
    
    const [formData, setFormData] = useState(data['achievements'] == null ? [{name:'',points:['','']}]: data['achievements'] );

         const addInput = () => {
          const data = {name:'',points:['']}
        setFormData([...formData, data]);
      };

    const nextPage =()=>{
  // console.log("sjsj")
  console.log("achievement page")
   ReactGA.send({ hitType: "pageview", page: `${window.location.pathname + window.location.search}`, title: "achievement" });
    updateData('achievements',formData)
    navigation('/app/skills')
 }
    
   
  return (
    <>
    <Navbar/>
    <CurrentPosition value={"achievements"}/>
    <h1 className=' text-lg lg:text-5xl text-center text-white'>Achievement</h1>
    
    
    <div className='md:text-2xl text-sm text-center text-white'>
      <p>If you don't want this section you can delete it</p>
    </div>
    
   

    <div className='bg-[#111111] py-[4%]'>
        {formData.map((value, index) => (
            <div key={index}>
            <AchievementInput  value={value} index={index} formData={formData} setFormData={setFormData} />
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
    
     <div className='flex justify-between  mx-[10%] my-[20%] sm:mx-[20%] sm:my-0'>
        <button type="button" onClick={()=>{navigation(-1)}}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Previous</button>
        <button type="button" onClick={()=>{nextPage()}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Next</button>
    </div>

    </>
  )
}

const AchievementInput = ({value,formData,setFormData,index}) =>{

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
                    <label  className="block mb-2 text-sm font-medium text-white">Achievement</label>
                    <input type="text" name="name" placeholder='name' value={value.name} onChange={(e) => {handleFormChange(index,e)}}   id="college_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>
                 <div className='flex justify-end'>
                </div>
                 <div className='flex justify-end'>
                </div>
                 <div className='flex justify-end'>
                    <button type="button"  onClick={addPoint} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Discription</button>
                </div>
                {
                    value.points.map((value,pointIndex)=>(
                        <div className='flex flex-row space-x-5 w-full' key={pointIndex}>
                          <div className='w-[90%]'>
                            <label  className="block mb-1 text-sm font-medium text-white">Achievement Description</label>
                             <input type="text"  placeholder='Recognized for creating the most awesome project at a hackathon.' value={value} onChange={(e)=>{handlePointChange(e,pointIndex)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                          </div> 
                          <button type="button" onClick={()=>{removePoint(pointIndex)}} className="focus:outline-none text-white mt-7 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 h-10   dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Del</button>
                        </div>
                    ))
                }
                
            </div>
        </div>
  )

}



export default Achievement
