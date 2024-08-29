import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { Outlet } from 'react-router-dom'
import authService from './Appwrite/Auth'
import { Footer, Header } from './Components/Index'
import {login,logout} from './Store/AuthSlice'

function App() {
   const [loading,setLoading]=useState(true)
   const dispatch = useDispatch()


   useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
            dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
   },[])

  return !loading? (
    <div className='w-full bg-gray-200'>
      <div>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):"Try to Reload..."
}

export default App
