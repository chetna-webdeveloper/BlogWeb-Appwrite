import conf from '../Conf/Conf'
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call another method
                return this.login({ email, password })
            }
            else {
                return userAccount
            }
        } catch (error) {
            console.log("Appwrite Error :: Create Account :: ", error)
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwrite Error :: login :: ", error)

        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.message.includes("missing scope")) {
                // Handle the missing scope error, possibly by redirecting the user to login
                console.log("User is not authenticated or lacks the necessary permissions.");
                navigate('/login');
            } else {
                console.log("Appwrite Error :: getCurrentUser :: ", error);
            }
        }   return null;
    }

    async logout(){
        try {
          await  this.account.deleteSessions( )
        } catch (error) {
            console.log("Appwrite Error :: logout :: ", error)
            
        }
    }
}


const authService = new AuthService()

export default authService
