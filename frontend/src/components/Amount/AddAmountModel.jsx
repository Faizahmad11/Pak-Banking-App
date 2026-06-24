'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'
import { FaRupeeSign } from "react-icons/fa6";
import { SiRazorpay } from "react-icons/si";
import * as yup from 'yup'
import { Formik, Field } from "formik";
import { toast } from 'react-toastify'
import { loadScript } from '@/utils/loadScript'
import { checkout_url } from '@/utils/constant'
export default function AddAmountModel(id) {
  let [isOpen, setIsOpen] = useState(false)
const intial_state={
    amount:""
}
const validationSchema = yup.object({
    amount:yup.number().min(1,"Enter Minimun Amount 1 PKR").required("Amount Is Required")
})
const [loading,setLoading] = useState(false) 

const onSubmitHandler = async (values, { resetForm }) => {

try {
    setLoading(true);
    // console.log(values);
   await loadScript(checkout_url)

  const options = {
 key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  amount: (values.amount*100).toString(),
  currency: "INR",
  name: "Soumya Corp.",
  description: "Test Transaction",
//   image: { logo },
  order_id: "order_id",

   handler: async function (response) {
console.log(response)

   },

//   handler: async function (response) {
//     const data = {
//       orderCreationId: order_id,
//       razorpayPaymentId: response.razorpay_payment_id,
//       razorpayOrderId: response.razorpay_order_id,
//       razorpaySignature: response.razorpay_signature,
//     };

//     const result = await axios.post(
//       "http://localhost:5000/payment/success",
//       data
//     );

//     alert(result.data.msg);
//   },

            prefill: {
            name: "Pak Bank",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
            },
            notes: {
            address: "Kono Banking",
            },
           theme: {
  color: "#61dafb",
},
            };
const paymentObject = new window.Razorpay (options);
paymentObject.open();
 

    toast.success("Amount Added")
    resetForm();
} catch (error) {
       toast.error(error?.response?.data?.msg || error?.message);
}finally{
    setLoading(false)
}


};


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
              <button
               type="button"
          onClick={openModal}
              className='text-3xl text-green-700 cursor-pointer'><CiSquarePlus/>
              </button>
       

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-[50vh] items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                  >
                    <span>
                    Add Payment

                    </span>
                    <button  onClick={closeModal} className='text-2xl text-black p-2 bg-green-100 rounded-full cursor-pointer'>
                        <IoClose/>
                    </button>
                  </Dialog.Title>
                 
                  <Formik onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={intial_state}>
                        {({values,handleSubmit})=>(
                     <form onSubmit={handleSubmit} className="w-[96%] lg:w-[80%] mx-auto">
                    <div className="mb-3 flex items-center gap-x-2 border w-full px-2">
                      <FaRupeeSign />

                   <Field
                   name="amount"
                  type="text"
                 inputMode="numeric"
                 pattern="[0-9]*"
                 onInput={(e) => {
                 e.target.value = e.target.value.replace(/\D/g, "");
                        }}
                className="w-full py-2 outline-none border-none px-2 rounded"
                placeholder="Enter Amount (in PKR)"
                />
                </div>

                <div className="mb-3 flex w-full justify-end">
                    <button  type="submit"
  disabled={Number(values.amount) < 1 || loading} className="px-5   flex items-center text-white py-2 rounded gap-x-2 bg-green-600 hover:bg-green-700 disabled:bg-rose-300">
                    <span>
                        Pay
                        </span>  
                         <SiRazorpay />
                    </button>
                </div>
                   </form>
                        )}

                  </Formik>
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
