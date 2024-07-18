'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';


const SourceContext = createContext(null);


export const useSourceContext = () => {
    return useContext(SourceContext);
};


export const SourceContextProvider = ({ children }) => {
  
  const [source, setSource] = useState(null);

  
  const updateSource = (newSource) => {
    setSource(newSource);
  };


  useEffect(()=>{
    console.log('source',source)
  },[source])
  
  const contextValue = {
    source,
    updateSource,
  };

  return (
    <SourceContext.Provider value={contextValue}>
      {children}
    </SourceContext.Provider>
  );
};
