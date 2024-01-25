import React, { Fragment, useEffect, useState } from 'react'
import { Transition,Dialog } from '@headlessui/react';

export const Modal = (props) => {

    const [name,setname] = useState("")
    const [isLoading,setisLoading] = useState(false)
    const [age,setAge] = useState(null)
    const [email,setEmail] = useState("")

    useEffect(() => {
        if(props.data && props.isEdit){
          console.log(props)
            setname(props.data.name)
            setAge(props.data.age)
            setEmail(props.data.email)
        }else{
          setname("")
          setAge(null)
          setEmail("")
        }
    },[props.data,props.isEdit])


    function closeModal(){
        props.setisOpen(false)
    }

    async function addHandler(){
        setisLoading(true)
        if(props.isEdit){
            await fetch("http://localhost:4000/user/update",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({id:props.data._id,data:{name,age:Number(age),email}})
            })
        }else{
            await fetch("http://localhost:4000/user/create",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({name,age:Number(age),email})
            })
        }
        setTimeout(() => {
            setisLoading(false)
            closeModal()
            props.getuser()
        }, 3000);
       
    }

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
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
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-2xl pb-[20px] border-[#383f47] border-b-[1px]  font-medium leading-6"
              >
                {props.isEdit ? "Edit" : "Create"} user
              </Dialog.Title>
              <div className="mt-2">
              <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">What is your name?</span>
                </label>
                <input value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder="Enter your name..." className="input input-bordered w-full" />
                </div>
              </div>
              <div className="mt-2">
              <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Enter your age (Above 18+)</span>
                </label>
                <input type="number" value={age} onChange={(e)=> setAge(e.target.value)} placeholder="Enter your age (Should be Above 18+)" className="input input-bordered w-full" />
                </div>
              </div>
              <div className="mt-2">
              <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Enter your Enail address</span>
                </label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your Email Address..." className="input input-bordered w-full" />
                </div>
              </div>

              <div className="mt-4 text-center">
                <button onClick={closeModal} type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-[10px]">Cancel</button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-200 px-8 py-2 text-sm font-medium text-blue-900 hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={addHandler}
                >
                  {isLoading ? <span className="loading loading-spinner loading-sm"></span> : props.isEdit ? "Edit" : "Add"}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>  )
}
