import React from 'react'

import {CarListData} from '../../utils/CarListData'
import CarListCard from './CarListCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


const CarListOptions = ({calculatedDistance}) => {
  
    const [active,setActive]=useState(null)
    const [selectedCar,setSelectedCar]=useState(null)

    const router=useRouter();



  return (
    <div className='mt-5 p-5  overflow-auto h-[250px]'>
      <h2 className='text-[22px] font-bold'>Recommended Rides</h2>

      
  

        {
        CarListData.map((car,index)=>(
            <div onClick={()=>{
                setActive(index)
                setSelectedCar(car)
            }} className={
                active===index ? 'bg-gray-200 p-3 rounded-lg mt-3 cursor-pointer' : 'p-3 rounded-lg mt-3 cursor-pointer'
            } key={car.id
            }>
         <CarListCard car={car} calculatedDistance={calculatedDistance}/>
         </div>
        ))
    }

   {
    selectedCar && (
        <div className='border items-center flex justify-between fixed bottom-0 bg-white p-3 shadow-xl w-full md:w-[30%]'>
        <h2>Make Payment For</h2>
        <button onClick={()=>{
            router.push(`/payment?amount=${Math.round(selectedCar.amount*calculatedDistance)}`)
        }} className='p-3 bg-black rounded-xl text-white'>Request {selectedCar.name}</button>
    </div>
    )
   }
       
      
    </div>
  )
}

export default CarListOptions
