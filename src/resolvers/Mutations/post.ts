import { Post } from '@prisma/client'
import {Context} from '../../index'
import {Prisma} from '@prisma/client'
import { canUserMutatePost } from '../../utils/utils'

interface PostArgs {
    post:{
        title?: string
        content?: string
    }
}

interface PostPayloadType {
    userErrors: {
        message:string
    }[],
    post: Post | Prisma.Prisma__PostClient<Post>| null

}



export const postResolvers = {
    postCreate: async (parent:any,args:PostArgs,context:Context):Promise<PostPayloadType> =>{
        const {title,content} = args.post
        const {prisma,userInfo} = context

        if(!userInfo){
            return {
                userErrors: [{
                    message: "Forbidden Access Unauthenticated"
                }],
                post: null
            }
        }


        if(!title||!content){
            return {
                userErrors: [{
                    message: "You must provide a title and a content"
                }],
                post: null
            }
        }
        return {
            userErrors:[],
            post:prisma.post.create({
                data:{
                    title,
                    content,
                    authorId:userInfo.userId
                }
            })
        }
    },

    postUpdate: async (parent:any,args:{post:PostArgs["post"],postId:string},context:Context):Promise<PostPayloadType> =>{
        const {post,postId} = args
        const {title,content}=post
        const {prisma,userInfo} = context

        
        if(!userInfo){
            return {
                userErrors: [{
                    message: "Forbidden Access Unauthenticated"
                }],
                post: null
            }
        }
        
        const error = await canUserMutatePost({userId:userInfo.userId,postId:Number(postId),prisma:prisma})

        if(error){
            return error
        }

        if(!title&&!content){
            return{
                userErrors:[{
                    message:'You need to have a title or a content to update the post'
                }],
                post:null
            }
        }

        const existingPost = await prisma.post.findUnique({
            where: {
                id:Number(postId)
            }
        })
        if(!existingPost){
            return {
                userErrors:[{
                    message: 'Could not find the requested post'
                }],
                post:null
            }
        }


        let payloadToUpdate = {
            title,
            content
        }

        if(!title) delete payloadToUpdate.title
        if(!content) delete payloadToUpdate.content


        return{
            userErrors:[],
            post: prisma.post.update({
                data:{...payloadToUpdate
                },
                where:{
                    id:Number(postId)
                }
            })
        }
    },

    postDelete: async (parent:any,args:{postId:string},context:Context):Promise<PostPayloadType> =>{
        const {postId} = args
        const {prisma,userInfo} = context

        if(!userInfo){
            return {
                userErrors: [{
                    message: "Forbidden Access Unauthenticated"
                }],
                post: null
            }
        }
        
        const error = await canUserMutatePost({userId:userInfo.userId,postId:Number(postId),prisma:prisma})

        if(error){
            return error
        }

        const post = await prisma.post.findUnique({where:{id:Number(postId)}})
       
        if(!post){
            return {
                userErrors:[{
                    message: 'Could not find the requested post'
                }],
                post:null
            }   
        }

        

        await prisma.post.delete({where:{
            id:Number(postId)
        }})

        return {
            userErrors:[],
            post:post
        }
    },
    postPublish: async(parent:any,args:{postId:string},context:Context):Promise<PostPayloadType> =>{
        const {postId} = args
        const {prisma,userInfo} = context

        if(!userInfo){
            return {
                userErrors: [{
                    message: "Forbidden Access Unauthenticated"
                }],
                post: null
            }
        }

        const error = await canUserMutatePost({userId:userInfo.userId,postId:Number(postId),prisma:prisma})

        if(error){
            return error
        }

        const post = await prisma.post.findUnique({where:{id:Number(postId)}})
       
        if(!post){
            return {
                userErrors:[{
                    message: 'Could not find the requested post'
                }],
                post:null
            }   
        }

        const updatedPost = await prisma.post.update({data:{
            publish:true
        },where:{
            id:post.id
        }, })


        return {
            userErrors:[{
                message: 'Post Published'
            }],
            post:updatedPost
        }  


    },
    postUnpublish: async(parent:any,args:{postId:string},context:Context):Promise<PostPayloadType> =>{
        const {postId} = args
        const {prisma,userInfo} = context

        if(!userInfo){
            return {
                userErrors: [{
                    message: "Forbidden Access Unauthenticated"
                }],
                post: null
            }
        }

        const error = await canUserMutatePost({userId:userInfo.userId,postId:Number(postId),prisma:prisma})

        if(error){
            return error
        }

        const post = await prisma.post.findUnique({where:{id:Number(postId)}})
       
        if(!post){
            return {
                userErrors:[{
                    message: 'Could not find the requested post'
                }],
                post:null
            }   
        }

        const updatedPost = await prisma.post.update({data:{
            publish:false
        },where:{
            id:post.id
        }, })


        return {
            userErrors:[{
                message: 'Post Published'
            }],
            post:updatedPost
        }  
    }
}

