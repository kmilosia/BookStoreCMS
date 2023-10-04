import React, { useState } from 'react'

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }
  return (
    <>
    <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1 w-full">
  <input
    type="checkbox"
    className="sr-only"
    checked={isChecked}
    onChange={handleCheckboxChange}
  />
  <span
    className={`flex items-center justify-center space-x-6 rounded py-2 px-7 text-sm font-medium w-full ${
      isChecked ? 'text-primary bg-green-400' : 'text-body-color bg-white'
    }`}
  >Active
  </span>
  <span
    className={`flex items-center justify-center space-x-6 rounded py-2 px-7 text-sm font-medium w-full ${
      !isChecked ? 'text-primary bg-gray-200' : 'text-body-color bg-white'
    }`}
  >Inactive
  </span>
</label>
  </>
  )
}

export default ToggleSwitch