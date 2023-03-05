// This file handles the numbers for completed tasks

import React from 'react'
import "./NumberBox.css"

const NumberBox = (props) => {
  return (
    <div className='NumberBox mx-2'>{props.count}</div>
  )
}

export default NumberBox