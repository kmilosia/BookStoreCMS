import React from 'react'

function TitledImage({imageURL,title}) {
  return (
    <div className='relative rounded-md overflow-hidden group'>
      <img src={imageURL} className='w-full object-cover rounded-md aspect-video' alt='' />
      <div className='absolute inset-0 flex flex-col items-start justify-end'>
         <div className='bg-gradient-to-b from-transparent to-black w-full h-full absolute top-[1000px] left-0 mix-blend-multiply group-hover:top-0' />
          <h3 className='p-2 text-xs z-10 absolute bottom-[1000px] group-hover:bottom-0 left-0 text-white'>{title}</h3>
      </div>                        
    </div>
  )
}

export default TitledImage
