const conf ={
appwriteUrl:String(import.meta.env.VITE_APPRWRITE_URL),
appwriteProjectId : String(import.meta.env.VITE_APPRWRITE_PROJECT_ID),
appwriteBucketId : String(import.meta.env.VITE_APPRWRITE_BUCKET_ID),
appwriteCollectionId : String(import.meta.env.VITE_APPRWRITE_COLLECTION_ID),
appwriteDatabaseId : String(import.meta.env.VITE_APPRWRITE_DATABASE_ID)

}

export default conf