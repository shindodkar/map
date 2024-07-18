import React from 'react'
import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";

const Header = () => {
    const headerMenu=[
            {
                id:1,
                name:'Ride',
                icon:'/taxi.png'
            },
            {
                id:2,
                name:'Package',
                icon:'/package.png'
            },
            
    ]
  return (
    <div className='p-4 pb-3 pl-10 border-b-[4px] border-gray-200'>
        <div className='flex  gap-10  justify-between'>
            
            <Image src='/logo.png'  width={90} height={70}/>
            <div className='flex gap-10 items-center'>
                <ul className='flex space-x-3'>
                    {headerMenu.map((item)=>(
                        <li key={item.id} className='flex items-center space-x-1'>
                            <Image src={item.icon} width={30} height={30}/>
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <UserButton />
        </div>
    </div>
  )
}

export default Header;
