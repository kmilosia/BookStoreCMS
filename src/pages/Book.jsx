import React, { useEffect, useState } from 'react'
import {FiPlus} from 'react-icons/fi'
import {HiOutlineSearch} from 'react-icons/hi'
import {BsDot} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'


function Book() {
    const [categories, setCategories] = useState([])
    const fetchCategories = () => {
        fetch('https://random-data-api.com/api/v2/users?size=6')
        .then(response => {return response.json()})
        .then(data => {setCategories(data)})
    }
    useEffect(()=>{
        fetchCategories()
        console.log(categories);
    },[])
  return (
    <div className='h-full p-5 bg-slate-200 overflow-scroll'>
        <div className='flex flex-row justify-between items-center'>
            <h1 className='text-xl text-gray-800 font-semibold'>Categories</h1>
            <button className='flex flex-row justify-between items-center rounded-2xl bg-saphire-500 text-white px-3 py-2 text-sm hover:bg-saphire-600'>
                <div className='flex flex-row justify-between items-center'>
                    <FiPlus className='text-md mx-1 text-gray-200'/>
                    <p className='mx-2'>Add category</p>
                </div>              
            </button>           
        </div>
        <div className='flex flex-row'>
            <div className='relative'>
                <input className='rounded-md pl-3 pr-7 py-2' placeholder='Search for category...' type='text'/>
                <span className='absolute top-1/2 right-[10px] translate-y-[-50%] text-lg cursor-pointer text-gray-400 hover:text-gray-500'><HiOutlineSearch /></span>
            </div>
        </div>
        <div className='grid grid-cols-4 gap-2'>
            {categories.map(category => (
                <div key={category.id} className='flex flex-col bg-white p-6 rounded-2xl'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-row items-center'>
                            <BsDot className=' text-green-500 text-2xl'/>
                            <p className='text-green-500'>Active</p>
                        </div>
                        <button className='rounded-3xl bg-saphire-100 p-3 hover:bg-saphire-200'><AiFillEdit /></button>
                    </div>
                    <img src={category.avatar} className='w-full'/>
                    <h1 className='text-xl my-2'>{category.first_name} {category.last_name}</h1>
                    <h2 className='font-medium text-lg'>&euro;220.90</h2>
                </div>
        ))}
        </div>
    </div>
  )
}

export default Book
