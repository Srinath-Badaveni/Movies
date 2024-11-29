import React from 'react'

export default function Scroll({handlePrev,handleNext,PageNo}) {
  return (
    <div className='bg-gray-800 p-4 mt-8 justify-center flex'>
        <div onClick={handlePrev} className='px-8 hover:cursor-pointer'><i class="fa-solid fa-arrow-left"></i></div>
        <div className='font-bold'>{PageNo}</div>
        <div onClick={handleNext} className='px-8 hover:cursor-pointer'><i class="fa-solid fa-arrow-right"></i></div>
    </div>
  )
}
