import React from 'react'
import {Container, PostForm as PostFormComponent } from '../Components/Index'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
        <PostFormComponent/>
        </Container>
    </div>
  )
}

export default AddPost