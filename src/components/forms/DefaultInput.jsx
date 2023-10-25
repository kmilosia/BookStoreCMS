import React from 'react'

function DefaultInput(props) {
  return (
    <div className='flex flex-col mb-1'>
        <label className='font-semibold text-xs text-dracula-500 mx-1 my-1'>{props.title}</label>
        <input onChange={props.handle} placeholder={props.placeholder} type={props.type} value={props.value} className='module-input-text'/>
    </div>
  )
}

export default DefaultInput
