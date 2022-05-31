import { JWT_SECRET_KEY } from "../resolvers/Mutations/keys"
import JWT from 'jsonwebtoken';
import {Context} from '../index'


export const getUserFromToken =  (token:string) =>{
    try {
        return  JWT.verify(token,JWT_SECRET_KEY) as {
            userId:number
        }
        
    } catch (error) {
        return null
    }   

}


interface CanUserMutatePostParams {
    userId: number
    postId: number
    prisma: Context["prisma"]
}


export const canUserMutatePost = async ({userId,postId,prisma}:CanUserMutatePostParams) =>{
    const user = await prisma.user.findUnique({where:{
        id:userId
    }})

    
    if(!user){
        return{
            userErrors: [{
                message:'User not found'
            }],
            post: null
        }
    }

    const postSearch = await prisma.post.findUnique({where:{id:postId}})

    if(postSearch?.authorId !==userId){
        return {
            userErrors:[{
                message: 'Post Not owned by user'
            }],
            post:null
        }
    }
}