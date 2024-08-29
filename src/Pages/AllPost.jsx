import React, { useState, useEffect } from 'react';
import appwriteService from '../Appwrite/Config';
import { Container, PostCard } from '../Components/Index';

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
    }, []);

    return (
        <div className="w-full py-8 bg-gray-200">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                            <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
