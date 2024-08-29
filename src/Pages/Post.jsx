import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/Config";
import { Button, Container } from "../Components/Index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="min-h-screen flex items-center justify-center py-8 bg-gray-50">
            <Container>
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="relative w-full max-w-md mb-8 border border-gray-200 shadow-lg rounded-xl p-4 bg-white hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl object-cover w-full max-h-80 transition-transform duration-500 ease-in-out transform hover:scale-105"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex space-x-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="transform hover:scale-110 transition-transform rounded-lg duration-300">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} className="transform hover:scale-110 transition-transform duration-300 rounded-lg">
                                    Delete
                                </Button>
                            </div>
                        )}
         <div className="w-full mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-4">
                            {post.title}
                        </h1>
                    </div>
                    <div className=" max-w-none text-gray-700 mx-auto">
                        {parse(post.content)}
                    </div>

                    </div>
           
                </div>
            </Container>
        </div>
    ) : null;
}
