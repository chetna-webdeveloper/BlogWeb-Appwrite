import React from 'react'
// import AuthSlice from '../../Store/AuthSlice'
import authService from '../../Appwrite/Auth'
import { logout } from '../../Store/AuthSlice'
import {useDispatch} from 'react-redux'


function LogoutBtn() {
   const dispatch = useDispatch()
 const logoutHandler=()=>{
    authService.logout()
    .then(()=>{
        dispatch(logout())
    })
 }

  return (
    <button
    onClick={logoutHandler}
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-gray-900 rounded-full'
    >Logout</button>
  )
}

export default LogoutBtn