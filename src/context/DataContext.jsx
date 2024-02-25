import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({personalDetail:null,experience:null,education:null,projects:null,achievements:null,skills:null});

  const updateData = (event,newData) => {
    // console.log(newData)
    data[event] = newData
    setData(data);
  };

  const setDefault = () =>{
    setData({personalDetail:null,experience:null,education:null,projects:null,achievements:null,skills:null})
  }


  return (
    <DataContext.Provider value={{ data, updateData,setDefault }}>
      {children}
    </DataContext.Provider>
  );
};
