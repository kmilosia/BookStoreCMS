import React from 'react'

function TextInput(props) {
  return (
 
    <div class="relative my-1">
        {props.value ?
        <input onChange={props.handle} value={props.value} type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-dracula-950 bg-transparent rounded-sm border-2 border-dracula-300 appearance-none dark:text-white dark:border-dracula-600 dark:focus:border-dracula-400 focus:outline-none focus:ring-0 focus:border-dracula-500 peer" placeholder=" " />
        :
        <input onChange={props.handle} type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-dracula-950 bg-transparent rounded-sm border-2 border-dracula-300 appearance-none dark:text-white dark:border-dracula-600 dark:focus:border-dracula-400 focus:outline-none focus:ring-0 focus:border-dracula-500 peer" placeholder=" " />
        }
        <label for="floating_outlined" class="absolute text-sm text-dracula-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dracula-900 px-1 peer-focus:text-dracula-500 peer-focus:dark:text-dracula-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">{props.label}</label>
    </div> 
    
  )
}

export default TextInput
