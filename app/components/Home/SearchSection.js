import React, { useEffect } from 'react'
import InputItems from './InputItems'
import { useDestinationContext } from '../../context/DestinationContext'
import { useSourceContext } from '../../context/SourceContext'
import CarListOptions from './CarListOptions'
import { useState } from 'react'

const SearchSection = () => {

  const {source,updateSource}=useSourceContext();
  const {destination,updatedestination}=useDestinationContext();
  const [calculatedDistance,setCalculatedDistance]=useState(null)

  useEffect(()=>{
    console.log(calculatedDistance)
  },[calculatedDistance])

  const calculateDistance=()=>{

    //calcaute the distance betwwen source and the desitnation
    const dist=google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(source.lat,source.lng),
      new google.maps.LatLng(destination.lat,destination.lng)
    )
    

   
    setCalculatedDistance(dist*0.000621374)


  }
  return (
    <div>
  <div className='p-2 md:pd-6 border-[2px] rounded-xl'>
        <p className='text-[20px] font-bold'>Get a Ride</p>
        <div >
                <InputItems type='source' />
                <InputItems type='destination'/>

                <button onClick={calculateDistance} className='bg-black text-white w-full p-3 rounded-lg mt-3'>Search</button>
            </div>

    </div>
    {
      calculatedDistance &&(
        <CarListOptions calculatedDistance={calculatedDistance} />
      )
    }
    </div>
  
  )
}

export default SearchSection
