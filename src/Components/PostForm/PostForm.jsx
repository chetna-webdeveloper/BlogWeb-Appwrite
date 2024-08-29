import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from '../Index';
import appwriteService from '../../Appwrite/Config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
    const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file && post.featuredImage) {
                    appwriteService.deleteFile(post.featuredImage);
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    console.error('Failed to create/update post');
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    data.featuredImage = file.$id;
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id,
                    });
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]/g, '-') // Replace non-alphanumeric characters with hyphens
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
        }
        return '';
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap text-black">
            <div className="w-full md:w-2/3 px-2 mb-4 md:mb-0">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 transition duration-300"
                    {...register('title', { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 transition duration-300"
                    {...register('slug', { required: true })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 transition duration-300"
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 transition duration-300"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 transition duration-300">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full"
                        />
                    </div>
                )}
                <Select
                    options={['active', 'inactive']}
                    label="Status : "
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 transition duration-300"
                    {...register('status', { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? 'bg-green-500' : undefined}
                    className="w-full mt-10 rounded-lg bg-gray-900 hover:border-2 hover:border-white hover:bg-gray-700 transition duration-300"
                >
                    {post ? 'Update' : 'Submit'}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
