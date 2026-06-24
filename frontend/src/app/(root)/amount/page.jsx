'use client';

import AddAmountModel from '@/components/Amount/AddAmountModel'
import HeaderName from '@/components/HeaderName'
import { useMainContext } from '@/context/MainContext'
import { FaRupeeSign } from "react-icons/fa6";

import React from 'react'

const AmountPage = () => {
const {user} = useMainContext()
console.log("USER:", user);
console.log("ACCOUNT NO:", user?.account_no);

  return (
    <>
    <div className="conatiner">
    <HeaderName/>

      <div className="card w-1/3 border py-5 rounded flex items-center justify-between px-3">
      <div className="flex flex-col">
      <h1 className='text-2xl  font-bold'>Add Amount</h1>
     <p className="text-lg text-zinc-600 font-medium">
  {user?.account_no}
</p>

<p className='text-3xl flex gap-2 font-semibold'>
  Total Amount : <span className='font-semibold justify-center'><FaRupeeSign /></span> {user?.amount ?? 0}/-
</p>
      </div>
      <AddAmountModel/>
      
      </div>
    </div>
    </>
  )
}

export default AmountPage
