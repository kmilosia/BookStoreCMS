import React from 'react'

function DefaultTextarea(props) {
  return (
    <div className='flex flex-col mb-0'>
        <label className='font-semibold text-xs text-dracula-500 dark:text-dracula-400 mx-1 my-1'>{props.title}</label>
        <textarea rows={5} onChange={props.onChange} placeholder={props.placeholder} type={props.type} value={props.value} className='module-input-textarea'/>
    </div>
  )
}

export default DefaultTextarea
