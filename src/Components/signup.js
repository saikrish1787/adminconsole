import React from 'react'

export const Signup = () => {
  return (
    <section className="bg-base-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-base-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                Create a new Account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Your Email</span>
                </label>
                <input type="text" placeholder="Enter your email..." className="input input-bordered w-full" required/>
                </div>
                <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Enter your name..." className="input input-bordered w-full" required/>
                </div>
                <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="**********" className="input input-bordered w-full" required/>
                </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account! <a href="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    </div>5
  </section>
  )
}
