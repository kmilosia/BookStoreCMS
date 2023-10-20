import React from 'react'
import { ColorRing } from 'react-loader-spinner'

function Spinner() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
    {/* <h1 className='text-xl text-orange-400 font-light my-2'>Pobieranie danych...</h1> */}
    </div>
  )
}

export default Spinner
