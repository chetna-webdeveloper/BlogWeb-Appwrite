// import React from 'react'
// import { Link } from 'react-router-dom'
// import appwriteService from '../../Appwrite/Config'

// function PostCard({$id,title,featuredImage}) {
//   return (
//   <Link to={`/post/${$id}`}>
//   <div className='w-full  bg-gray-100 rounded-xl p-4'>
//     <div className='w-full justify-center mb-4'>
//         <img 
//         src={appwriteService.getFilePreview(featuredImage)} 
//         alt={title} 
//         className='rounded-xl'/>
//     </div>
//     <h2
//     className='text-xl font-bold'
//     >{title}</h2>
//   </div>
//   </Link>
//   )
// }

// export default PostCard

import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../../Appwrite/Config';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="w-full md:w-1/3 lg:w-1/4 p-4">
      <div className="group bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="relative h-56 w-full bg-gray-100 flex items-center justify-center">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="object-cover h-full w-full group-hover:opacity-90 transition-opacity duration-300"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
