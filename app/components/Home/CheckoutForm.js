import React from 'react'
import {PaymentElement, useElements,useStripe} from '@stripe/react-stripe-js'
import useNavigation from 'next/navigation'
import { useRouter } from 'next/navigation'

const CheckoutForm = ({amount}) => {
    const stripe=useStripe();
    const elements=useElements();

    const router=useRouter();

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const res=await fetch('/api/create-intent',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({amount})
        })

        const data=await res.json();
        console.log(data)

        const clientSecret=data;

        console.log('client ',clientSecret)

        elements.submit();

    
        const {error}=await stripe.confirmPayment({
            clientSecret,
           elements,
              confirmParams:{
                return_url:'http://localhost:3000/',
              
              }
        })


        router.push('/')
  


        


    }
  return (
    <div className='flex flex-col  justify-center w-full items-center mt-10'>
        <h2 className='text-bold font-sans'>Make Payment:Rs {amount}</h2>
        <form onSubmit={handleSubmit} className='max-w-md border-2 p-4 mt-10'>
            <PaymentElement/>
            <button type='submit'
             className='
                bg-black text-white px-4 py-2 rounded-md
                hover:bg-gray-800 mt-10 justify-center items-center
             '
            >Pay {amount}</button>
        </form>
    </div>
  )
}

export default CheckoutForm
