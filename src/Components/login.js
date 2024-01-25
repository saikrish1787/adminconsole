import { signal } from '@preact/signals-react';
import React from 'react'
import {  useNavigate } from 'react-router-dom';

//Signal goes here

const email = signal("")
const password = signal("")
const isLoading = signal(false)
export const userData = signal({})

export const Login = () => {

    const navigate = useNavigate()

    async function loginhandler(){
        isLoading.value = true;
        const res = await fetch("http://localhost:4000/admin/signin",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({email:email.value,password:password.value})
        })
        const data = await res.json()
        if(data){
            userData.value = data.data
            setTimeout(() => {
                isLoading.value = false;
                navigate("/home")
            },2000)
        }
    }

  return (
    <section className="bg-base-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-base-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Your Email</span>
                </label>
                <input onChange={(e) => email.value = e.target.value} type="text" placeholder="Enter your email..." className="input input-bordered w-full" required/>
                </div>
                <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" onChange={(e) => {password.value = e.target.value}} placeholder="**********" className="input input-bordered w-full" required/>
                </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded accent-primary-600 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <button type="submit" disabled={!(email.value !== "" && password.value !== "")} className="w-full text-white disabled:bg-gray-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={loginhandler}>{isLoading.value ? <span className="loading loading-spinner loading-sm"></span> : "Sign in"}</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    </div>5
  </section>
  )
}
