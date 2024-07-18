import { NextResponse } from 'next/server';
import Stripe from 'stripe'

const stripe= new Stripe(process.env.NEXT_SECRET_KEY,{
    typescript:true,
    apiVersion:'2023-10-16'
})



export async function POST(request:any){
    const data:any=await request.json();

    const amount=parseInt(data.amount);

    try {
        
        const paymentIntent=await stripe.paymentIntents.create({
            amount,
            currency:'inr'
        }); 

       return NextResponse.json(
        paymentIntent.client_secret,
        {
            status:200
        }
       )
    } catch (error) {
        return NextResponse.json(
            {
                error:error.message
            },
            {
                status:400
            }
        )
    }
}