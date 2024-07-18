import React from 'react'
import Image from 'next/image'

const CarListCard = ({car,calculatedDistance}) => {
  return (
    <div>
       <div key={car.id} className='flex items-center gap-4 mt-3'>
     <div>

     </div>
     <Image
                src={car.image}
                alt="car"
                width={100}
                height={100}
                objectFit='contain'
                />
            <div>
              <h2 className='text-[18px] font-bold'>{car.name}</h2>
              <p className='text-[14px] text-gray-500'>number of seats:{car.seat}</p>
              <p className='text-[14px] text-gray-500 font-bold'>{car.desc}</p>
           
              <p className='text-[14px] font-bold text-black'>Rs {Math.round(car.amount*calculatedDistance )}</p>
            
            </div>
          </div>
    </div>
  )
}

export default CarListCard
