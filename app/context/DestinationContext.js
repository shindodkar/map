'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';


const DestinationContext = createContext(null);


export const useDestinationContext = () => {
    return useContext(DestinationContext);
};


export const DestinationContextProvider = ({ children }) => {
  
  const [destination, setdestination] = useState(null);

  
  const updatedestination = (newdestination) => {
    setdestination(newdestination);
  };


  useEffect(()=>{
    console.log('destination',destination)
  },[destination])
  
  const contextValue = {
    destination,
    updatedestination,
  };

  return (
    <DestinationContext.Provider value={contextValue}>
      {children}
    </DestinationContext.Provider>
  );
};
