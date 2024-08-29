import React from 'react'
import LogoImg from '../../assets/Logo.png'

function Logo({width}) {
  return (
    <div><img src={LogoImg} alt="hello" width={width} className='rounded-lg border   border-black'/></div>
  )
}

export default Logo