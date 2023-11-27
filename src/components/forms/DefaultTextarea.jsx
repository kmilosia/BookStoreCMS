import React from 'react'

function DefaultTextarea(props) {
  return (
    <div className='flex flex-col mb-0'>
        <label htmlFor={props.name} className='font-semibold text-xs text-dracula-500 dark:text-dracula-400 mx-1 my-1'>{props.title}</label>
        <textarea name={props.name} id={props.name} rows={5} onChange={props.onChange} placeholder={props.placeholder} type={props.type} value={props.value} className='module-input-textarea'/>
        {props.error && <p className='error-text'>{props.error}</p>}
    </div>
  )
}

export default DefaultTextarea
