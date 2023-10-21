
import React, { useState,MouseEvent } from 'react';
import Link from 'next/link';

export default function Register(){

    return (

<section className=" w-full">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen ">
      <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 h-full">
          <div className="p-6 s pace-y-4 md:space-y-6 sm:p-8">
              <center>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Welcome Back 
                </h1>
                    <h3>Sign in to continue</h3>
              </center>
             
              <form className="space-y-3 md:space-y-3" >
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama </label>
                      <input type="text" name="nama" id="nama" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nama" />
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email </label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
                  </div>
                  <div >
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                     
                      <div className='flex '> 
                      <input type="password" name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      <label className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" >show</label>
                      </div>
                      
                  </div>
                  <div >
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                     
                      <div className='flex '> 
                      <input type="password" name="ConfirmPassword" id="ConfirmPassword" placeholder="Confirm Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      <label className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" >show</label>
                      </div>
                      
                  </div>
                <div className=' !mt-3 space-y-3 md:!mt-10'>
                    <button type="submit" className=" w-full text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
                    <Link href={'/'} >
                        <button  className="mt-3 w-full text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Back
                        </button>
                     </Link>

                </div>
                <p>Already a user? 
                    <Link href={'/login'}>
                        <span className='underline'>Login now</span>
                        
                    </Link>
                </p>
              </form>
          </div>
      </div>
  </div>
</section>

    )
}