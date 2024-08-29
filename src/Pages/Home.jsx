import React,{useEffect,useState} from 'react'
import appwriteService from '../Appwrite/Config'
import { Container,PostCard } from '../Components/Index'


function Home() {
    const [ posts,setPosts]= useState([])
    useEffect(()=>{
        appwriteService.getPosts()
        .then((posts)=>{
            if(posts){
             setPosts(posts.documents)
            }
        })
    },[])

    if(posts.length===0){
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
<div className='flex flex-wrap'>
    <div className='p-2 w-full'>
           <h1 className='text-2xl font-bold hover:text-gray-500'>
            Login to read Posts
           </h1>
    </div>

</div>
                </Container>
            </div>
        )
    }
  return (
    <div className='w-full py-8 bg-gray-100'>
        <Container>
            <div className='flex flex-wrap '>
           {posts.map((post)=>(
            <div className='p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4' key={post.$id}>
         <PostCard {...post}/>
            </div>
           ))}
            </div>
        </Container>
    </div>
  )
}

export default Home