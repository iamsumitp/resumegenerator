import { useState,useContext,useRef } from 'react'
import Navbar from '../../components/Navbar'
import ResumeImage from '../../assets/jakesresume.jpg'
import { Route, Routes, Link } from "react-router-dom"
import { DataContext } from '../../context/DataContext'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from '../../components/LoadingComponent'
import { BASE_URL_LOCAL ,BASE_URL_PROD} from '../../constants/constant'
import ReactGA from "react-ga4";

const BASE_URL = BASE_URL_PROD
const Review = () =>{

const { data, updateData } = useContext(DataContext);



  return(
  <>

    <div className='bg-[#111111] h-screen'>
    <ToastContainer/>
      {/* navBar */}
      <Navbar/>
      <p className='text-white text-md md:text-2xl text-center'>Review your Details</p>
      {/* You can open the modal using ID.showModal() method */}

     <div className='flex justify-center md:justify-between mx-[20%]'>
            <DownloadModal data={data}/>
    </div>


      <div className='xl:mx-[20%] md:mx-[10%] mx-[4%] h-[90%]'>
        {/* personal detail */}
        <div className='text-white'>
            <h2 className='text-center text-2xl'>Personal Details</h2>
            {
            data["personalDetail"] == null ? 
            <h2 className='text-center text-sm lg:text-2xl'>EMPTY</h2>
            :
            <PersonalDetailSection data={data["personalDetail"]}/>
            }
        </div>
        <hr className="border border-gray-300 my-4 "/>
        {/* education */}
        <div className='text-white'>
            <h2 className='text-center text-sm lg:text-2xl'>Education</h2>
            {
            data["education"] == null ? 
            <h2 className='text-center text-sm lg:text-2xl'>EMPTY</h2>
            :
            <EducationSection data={data["education"]}/>
            }
        </div> 

        <hr className="border border-gray-300 my-4 "/>

         {/* experience */}
        <div className='text-white'>
            <h2 className='text-center text-sm lg:text-2xl'>Experience</h2>
            {
            data["experience"] == null ? 
            <h2 className='text-center text-2xl'>EMPTY</h2>
            :
            <ExperienceSection data={data["experience"]}/>
            }
        </div>
        
        <hr className="border border-gray-300 my-4 "/>
        {/* Projects */}
        <div className='text-white'>
            <h2 className='text-center text-sm lg:text-2xl'>Projects</h2>
            {
            data["projects"] == null ? 
            <h2 className='text-center text-2xl'>EMPTY</h2>
            :
            <ProjectSection data={data["projects"]}/>
            }
        </div>
        
        <hr className="border border-gray-300 my-4 "/>
        {/* Achievement */}
        <div className='text-white'>
            <h2 className='text-center text-sm lg:text-2xl'>Achievement</h2>
            {
            data["projects"] == null ? 
            <h2 className='text-center text-2xl'>EMPTY</h2>
            :
            <AchievementSection data={data["achievements"]}/>
            }
        </div>

        <hr className="border border-gray-300 my-4 "/>
        {/* Skills*/}
        <div className='text-white'>
            <h2 className='text-center text-sm lg:text-2xl'>Skills</h2>
            {
            data["projects"] == null ? 
            <h2 className='text-center text-2xl'>EMPTY</h2>
            :
            <SkillsSection data={data["skills"]}/>
            }
        </div>
        
        <div className='h-20'>

        </div>
        
      </div>

    </div>
  </>
  )
}

const DownloadModal = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [email, setEmail] = useState('');
  const [isError,setIsError] = useState(false)
  const [pdfId,setPdfId] = useState('')
  const [isLoading,setIsLoading] = useState(false)
   const linkRef = useRef(null);
  

  const initiateProcess = async() =>{
    try {
        ReactGA.event({
          category: "download",
          action: "download initiated"
      });
        const response = await axios.post(`${BASE_URL}/api/createpdf`, {data});
        await axios.post(`https://whale-app-6x5ju.ondigitalocean.app/user`,{data});
        console.log(response.data)
        if(response?.data?.status == 'failure'){
            toast(response?.data?.msg)
            return 
        }
        setPdfId(response?.data?.id)
        setIsOpen(true)

    } catch (error) {
        console.log(error)
    }
  }

  const closeModal = () => {
    setIsOpen(false);
    // setEmail('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("pdf is being downloaded")
    ReactGA.event({
          category: "download",
          action: "pdf downloaded"
      });

    // if(!isValidEmail(email)){
    //     // console.log('eee')
    //     setIsError('invalid input')
    //     return
    // }

    setIsLoading(true)
    await axios.post(`${BASE_URL}/api/setemail`,{pdfId,data})
    linkRef.current.click();
    setIsOpen(false)
    setPdfId('')
    setIsError(false)
    setIsLoading(false)

  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={initiateProcess}
      >
        Download
      </button>

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-sm w-full">
              <div className="bg-white px-4 py-5">
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Download your resume</h3>
                  <div className="mt-2">
                    <form>
                      {/* <input
                        type="email"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      /> */}
                      <div className="mt-2">
                        {
                            isOpen ?
                              <a href={`${BASE_URL}/api/getpdf?id=${pdfId}`} ref={linkRef} style={{ display: 'none' }}>Hidden Link</a>
                              :
                              <></>
                        }
                        {
                          isLoading ?
                          <button
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <LoadingComponent/>
                        </button>
                        :
                          <button
                          onClick={handleSubmit}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          download
                        </button>
                        
                        }
                       
                        <button
                          type="button"
                          className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SkillsSection = ({data})=>{
// {skillName:'',skillValue:''}
    return(
        <>
        <div className='text-white'>
            {
                data?.map((val,index)=>(
                     <div key={index} className='bg-gray-800 my-2'>
                        <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
                        <span>
                            <span>{ val?.skillName}</span>:<span>{ val?.skillValue}</span>
                            </span> 
                        </p>
                    </div>
                ))
            }
        </div>
        </>
    )
}


const AchievementSection = ({data})=>{
// {name:'',points:['']}
    return(
         <>
        <div className='text-white'>
            {
                data?.map((val,index)=>(
                     <div key={index} className='bg-gray-800 my-2'>
                        <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
                        <span>
                                <span>Company </span>:<span>{ val?.name}</span>
                            </span> 
                        </p>
                         <div className='text-white text-sm md:text-md flex  flex-row justify-start space-x-20'>
                            <span>Points</span>
                            <div>
                            {
                                val['points']?.map((point,index)=>(
                                    <p key={index}>
                                        {point}
                                    </p>
                                ))
                            }
                            </div>
                        </div> 
                    </div>
                ))
            }
        </div>
        </>
    )
}


const ExperienceSection = ({data})=>{
// {company:'',role:'',location:'',date:'',points:['']}

    return(
         <>
        <div className='text-white'>
            {
                data?.map((val,index)=>(
                     <div key={index} className='bg-gray-800 my-2'>
                        <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
                        <span>
                                <span>Company </span>:<span>{ val?.company}</span>
                            </span> 
                            <span>
                                <span>Role</span>:<span>{ val?.role}</span>
                            </span>
                        </p>
                        <p className='text-white text-sm md:text-md flex  flex-row justify-start space-x-20'>
                        <span>
                                <span>Location</span>:<span>{ val?.location}</span>
                        </span> 
                        <span>
                                <span>Date</span>:<span>{ val?.date}</span>
                        </span>
                        </p> 
                         <div className='text-white text-sm md:text-md flex  flex-row justify-start space-x-20'>
                            <span>Points</span>
                            <div>
                            {
                                val['points']?.map((point,index)=>(
                                    <p key={index}>
                                        {point}
                                    </p>
                                ))
                            }
                            </div>
                        </div> 
                    </div>
                ))
            }
        </div>
        </>
    )
}


const ProjectSection = ({data}) =>{



   return(
          <>
        <div className='text-white'>
            {
                data?.map((val,index)=>(
                     <div key={index} className='bg-gray-800 my-2'> 
                        <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
                        <span>
                                <span>Project Name </span>:<span>{ val?.projectName}</span>
                            </span> 
                            <span>
                                <span>Course </span>:<span>{ val?.tech}</span>
                            </span>
                        </p>
                        <p className='text-white text-sm md:text-md flex  flex-row justify-start space-x-20'>
                        <span>
                                <span>Link </span>:<span>{ val?.link}</span>
                        </span> 
                        </p> 
                         <div className='text-white text-sm md:text-md flex  flex-row justify-start space-x-20'>
                            <span>Points</span>
                            <div>
                            {
                                val['points']?.map((point,index)=>(
                                    <p key={index}>
                                        {point}
                                    </p>
                                ))
                            }
                            </div>
                        </div> 
                    </div>
                ))
            }
        </div>
        </>
    )
}

const EducationSection = ({data}) =>{


// {cllgName:'',course:'',location:'',year:''}
    return(
          <>
        <div className='text-white'>
            {
                data?.map((val,index)=>(
                     <div className='bg-gray-800 my-2' key={index}>
                        <p className='text-white  text-sm md:text-md flex flex-row justify-start space-x-20'>
                        <span>
                                <span>College Name </span>:<span>{ val?.cllgName}</span>
                            </span> 
                            <span>
                                <span>Course </span>:<span>{ val?.course}</span>
                            </span>
                        </p>
                        <p className='text-white text-sm text-md flex  flex-row justify-start space-x-20'>
                        <span>
                                <span>Location </span>:<span>{ val?.location}</span>
                            </span> 
                            <span>
                                <span>year</span>:<span>{ val?.year}</span>
                            </span>
                        </p> 
                    </div>
                ))
            }
        </div>
        </>
    )
}
const PersonalDetailSection = ({data}) => {


    return(
        <div className="bg-gray-800 my-2">
        <div className='text-white'>
            <p className='text-white text-sm md:text-md flex flex-row justify-start space-x-20'>
               <span>
                    <span>First Name </span>:<span>{ data?.firstName}</span>
                </span> 
                <span>
                    <span>Last Name </span>:<span>{ data?.lastName}</span>
                </span>
            </p>
             <p className='text-white text-sm md:text-md flex  flex-row justify-start space-x-20'>
               <span>
                    <span>Email </span>:<span>{ data?.email}</span>
                </span> 
                <span>
                    <span>Phone Numer </span>:<span>{ data?.phoneNo}</span>
                </span>
            </p>
             <p className='text-white text-sm md:text-md flex  flex-row justify-start space-x-20'>
               <span>
                    <span>Github </span>:<span>{ data?.github}</span>
                </span> 
                <span>
                    <span>Linkedin </span>:<span>{ data?.linkedin}</span>
                </span>
            </p>
        </div>
        </div>
    )
}

const isValidEmail = (email) => {
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailPattern.test(email);
};

export default Review
