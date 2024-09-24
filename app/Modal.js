"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import ReactDom from 'react-dom'
import { useState, useContext, useEffect } from 'react';
import useCart from './(store)/store'
import { loadAirwallex, redirectToCheckout } from 'airwallex-payment-elements'
export default function Modal() {
    const closeModal = useCart(state => state.setOpenModal)
    const cartItems = useCart(state => state.cart)
    const getTotalCost = useCart(state => state.getTotalCost); // Get the total cost function
    console.log(cartItems)
    const router = useRouter()

    // Log the cart items to the browser console
    console.log("Cart Items in Modal:", cartItems);
    //Log the total cost to the browser console
    console.log("Total Cost:", getTotalCost()); // Call the function to get the total cost


     //Initialize Airwallex
     useEffect(() => {
        loadAirwallex({
            env: 'demo', // Setup which Airwallex env('demo' | 'prod') to integrate with
            /*
            Set up your event target to receive the browser events message
            By setting origin: window.location.origin, you are dynamically setting the origin based on where your frontend is currently running. 
            This ensures that during development, the origin will be something like http://localhost:3000, and in production, 
            it will automatically adjust to your live domain (e.g., https://www.yourwebsite.com).
            */ 
            origin: window.location.origin,
        });
    }, []);



    async function checkout() {
        try {
            const body = {
                amount: getTotalCost(),
                currency: 'USD',
                merchant_order_id: `order_${Date.now()}`,
                return_url: 'http://www.yourwebsite.com/payment-result',
            };
    
            console.log("Request body:", body); // Log the body to see what is being sent
    
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        
            if (!response.ok) {
                throw new Error('Failed to create payment intent');
            }
        
            const { client_secret, id } = await response.json();
        
            // Redirect to Airwallex hosted payment page
            redirectToCheckout({
                env: 'demo',
                intent_id: id,
                client_secret: client_secret,
                currency: 'USD',
                methods: [
                    'card',         // Visa, Mastercard, etc.
                    'googlepay',    // Google Pay
                    'wechatpay',    // WeChat Pay
                    'sepa_direct_debit'  // Example for Direct Debit
                ]
            });
        } catch (error) {
            console.error('Error creating PaymentIntent:', error);
        }
    };
    

    return ReactDom.createPortal(
        <div className='fixed top-0 left-0 w-screen h-screen z-50'>
            <div onClick={closeModal} className='bg-transparent absolute  inset-0'> </div>
            <div className='flex flex-col bg-white absolute right-0 top-0 h-screen shadow-lg w-screen sm:w-96 max-w-screen gap-4'>
                <div className='flex items-center p-6 justify-between text-xl relative'>
                    <h1>Cart</h1>
                    <i onClick={closeModal} className="fa-solid cursor-pointer hover:opacity-60 fa-xmark"></i>
                    <div className='absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-slate-300 w-2/3'></div>
                </div>
                <div className='p-4 overflow-scroll flex-1 flex flex-col gap-4'>
                    {cartItems.length === 0 ? (
                        <p>There is nothing in your cart :'(</p>
                    ) : (
                        <>
                            {cartItems.map((cartItem, itemIndex) => {
                                return (
                                    <div key={itemIndex} className="flex border-l border-solid border-slate-700 px-2 flex-col gap-2">
                                        <div className='flex items-center justify-between'>
                                            <h2>
                                                {cartItem.title}
                                            </h2>
                                            <p>${cartItem.price}</p>
                                        </div>
                                        <p className='text-slate-600 text-sm'>Quantity: 1</p>
                                    </div>
                                )
                            })}
                        </>
                    )}
                </div>
                <div onClick={checkout} className='border border-solid border-slate-700 text-xl m-4 p-6 uppercase grid place-items-center hover:opacity-60 cursor-pointer'>Checkout</div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}
