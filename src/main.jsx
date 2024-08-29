import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/Store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import { AuthLayout,Login } from './Components/Index.js'
// import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp'
import AllPost from './Pages/AllPost.jsx'
import AddPost from './Pages/AddPost.jsx'
import EditPost from './Pages/EditPost.jsx'
import Post from './Pages/Post.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>,
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        ),
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <SignUp/>
          </AuthLayout>
        )
      },
      {
        path:"/all-posts",
        element:(
          <AuthLayout authentication>
          {""}
            <AllPost/>
          </AuthLayout>
        )
      },
      {
        path:"/add-post",
        element:(
          <AuthLayout authentication>
          {""}
            <AddPost/>
          </AuthLayout>
        ),
      },
      {
        path:"/edit-post/:slug",
        element:(
          <AuthLayout authentication>
          {""}
            <EditPost/>
          </AuthLayout>
        ),
      },
      {
        path:"/post/:slug",
        element:<Post/>
      },
    ],

  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
<RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
