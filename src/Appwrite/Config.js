import conf from "../Conf/Conf";
import { Client, ID, Databases, Storage, Flag, Query } from "appwrite";

export class Service {
    client = new Client()
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)

    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,  

                }
            )
        } catch (error) {
            console.log("Appwrite Error :: createpost :: ", error)

        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Error :: updatePost :: ", error)

        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite Error :: deletePost :: ", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug

            )
        } catch (error) {
            console.log("Appwrite Error :: getPost :: ", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite Error :: getPosts :: ", error)
            return false
        }
    }

    // file upload service

    async uploadFile(file){
       try {
        return await this.storage.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
       } catch (error) {
        console.log("Appwrite Error :: uploadFile :: ", error)
        return false
       }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Error :: deleteFIle :: ", error)
            return false
        }
    }

    getFilePreview(fileId){
     
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
   
    }
}

const service = new Service()

export default service