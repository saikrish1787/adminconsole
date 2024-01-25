import React, { useState,Fragment } from 'react'
import Edit from "../Assets/edit.svg"
import Delete from "../Assets/delete.svg"
import { Modal } from './modal'
import { Dialog, Transition } from '@headlessui/react'
export const Table = (props) => {

    const [isOpen,setisOpen] = useState(false);
    const [modalOpen,setmodalOpen] = useState(false);
    const [isEdit,setisEdit] = useState(false);
    const [data,setdata] = useState({});
    const [deletedata,setdeletedata] = useState({});

    function modalhandler(){
        setisOpen(true)
        setisEdit(false)
        setdata({})
    }

    function editHandler(id,_data){
        setdata(_data)
        setisEdit(true)
        setisOpen(true)
    }

    function closeModal(){
        setmodalOpen(false)
    }

    function deletehandler(_data){
        setmodalOpen(true)
        setdeletedata(_data);
    }

    async function deletUser(){
        const res = await fetch("http://localhost:4000/user/delete",{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({id:deletedata._id})
        })
        closeModal()
        props.getuser()
    }

  return (
    <div className="">
         <button onClick={modalhandler} type="button" class="flex float-right mb-[25px] items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
            <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
            </svg>
                Add User
        </button>
        {!props.isLoading ? <table className="table w-full">
        <thead>
            <tr className="bg-base-200">
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {props.data.map((_d,_i)=>{
                return(
                    <tr key={_i} className='bg-base-100'>
                        <th>{_i + 1}</th>
                        <td>{_d.name}</td>
                        <td>{_d.age}</td>
                        <td>{_d.email}</td>
                        <td>
                            <div className='flex items-center'>
                            <button onClick={() => editHandler(_d._id,_d)} className=''>
                                <img src={Edit} className='w-[25px] h-[25px] mr-[10px]' alt='edit'/>
                            </button>
                            <button onClick={()=> deletehandler(_d)} className=''>
                                <img className='w-[28px] h-[32px]' src={Delete} alt='delete'/>
                            </button>
                            </div>
                        </td>
                    </tr>
                )
            })}
        
        </tbody>
        </table> : <span className="loading loading-spinner text-error"></span>}
        <Modal isEdit={isEdit} getuser={props.getuser} data={data} isOpen={isOpen} setisOpen={setisOpen}/>
        <Transition appear show={modalOpen} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Delete User
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {`Are you sure, Delete the user data?`}
                    </p>
                  </div>

                  <div className="mt-4 float-right">
                    <button
                      type="button"
                      className="inline-flex mr-[10px] justify-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={deletUser}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
