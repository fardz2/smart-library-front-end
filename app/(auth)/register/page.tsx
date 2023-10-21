"use client"
import React, { useState,MouseEvent } from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Inputs = {
  nama:string,
  email: string,
  password: string,
  confirmPassword:string
};
export default function Register(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
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
             
              <form className="space-y-3 md:space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama </label>
                      <input type="text"  id="nama" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nama" 
                      {...register("nama",{required: "name is required.", })}
                      
                      />
                      <p className='text-red-500'>
                        <ErrorMessage errors={errors} name="nama" />
                      </p>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email </label>
                      <input type="email"  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" 
                           {...register("email",{required: "Email is required.", })}
                           />
       
                            
                            <p className='text-red-500'>
                              <ErrorMessage errors={errors} name="email" />
                            </p>
                  </div>
                  <div >
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                     
                      <div className='flex '> 
                      <input type="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                             {...register("password",{required: "confirmPassword is required.", })}
                             />
         
                        </div>
                              <p className='text-red-500'>
                                <ErrorMessage errors={errors} name="password" />
                              </p>
                  </div>
                  <div >
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                     
                      <div className='flex '> 
                      <input type="password"  id="ConfirmPassword" placeholder="Confirm Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        {...register("password",{required: "confirmPassword is required.", })}
                        />
    
                   </div>
                         <p className='text-red-500'>
                           <ErrorMessage errors={errors} name="password" />
                         </p>
                     
                      
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