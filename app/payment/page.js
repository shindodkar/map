'use client'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import CheckoutForm from '../components/Home/CheckoutForm'

const Payment = () => {

  const searchParams=useSearchParams();

  console.log(searchParams.get('amount'))

  const stripePromise=loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);

  const options={
    mode:'payment',
    amount:parseInt(searchParams.get('amount')),
    currency:'inr',
   
  }

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={options.amount}/>
      </Elements>
    </div>
  )
}

export default Payment
