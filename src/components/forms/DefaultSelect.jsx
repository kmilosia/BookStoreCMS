import React from 'react'
import Select from 'react-select'

function DefaultSelect(props) {
  return (
    <div className='flex flex-col mb-1'>
        <label className='font-semibold text-xs text-dracula-500 mx-1 my-1'>{props.title}</label>
        <Select onChange={props.onChange} maxMenuHeight={100} value={props.value} placeholder={props.placeholder} options={props.options} isClearable={true} isSearchable={true} isMulti={props.isMulti} className="my-react-select-module-container w-full" classNamePrefix="my-react-select-module"/>
    </div>
  )
}

export default DefaultSelect
