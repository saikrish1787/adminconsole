import React, { useEffect } from 'react'
import { Table } from './Table';
import { userData } from './login';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react'


export const Home = (props) => {

  const navigate = useNavigate();

  useEffect(() => {
    if(!userData.value.name){
      navigate("/")
    }else{
      props.getAllUser()
    }
  },[])
    
  return (
    <>
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <div className="btn btn-ghost text-xl">Admin</div>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 gap-[10px] items-center">
        <p className='hover:text-gray-300'>Hi,{userData.value.name}</p>
    <button type="button" className="flex float-right items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
            </svg>
                Add User
        </button>      
        <li>
        <Menu>
      <Menu.Button>More</Menu.Button>
      <Menu.Items className="flex flex-col absolute right-[-10px] top-[55px] w-[170px] gap-4 items-start">
        <Menu.Item>
            <a href="/account-settings">
              Account settings
            </a>
        </Menu.Item>
        <Menu.Item>
            <a href="/profile">
              View Profile
            </a>
        </Menu.Item>
        <Menu.Item>
            <button>
              Logout
            </button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
      </li>
    </ul>
  </div>
</div>
    <div className='px-[250px] pt-[100px] h-screen bg-slate-900'>
    <h1 className='font-bold py-[20px] text-xl'>User List table</h1>
    <Table isLoading={props.isLoading} getuser={props.getAllUser} data={props.user}></Table>
   </div>
   </>
  )
}
