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
      colors={['#a855f7', '#6b21a8', '#d8b4fe', '#3b0764', '#7e22ce']}
    />
    </div>
  )
}

export default Spinner
