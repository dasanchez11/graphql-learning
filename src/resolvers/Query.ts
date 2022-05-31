import {Context} from '../index'

export const Query = {
    profile: async (parent:any,args:{userId:string},context:Context) =>{
        const {userId}=args
        const {userInfo,prisma} = context
        if(!userInfo){
            return null
        }

        return await prisma.profile.findUnique({where:{
            userId:Number(userId)
        }})

    },
    posts: async (parent:any,args:any,context:Context) =>{
        const {prisma} = context
        const posts = await prisma.post.findMany({
            orderBy: [{
                createdAt:"desc"
            }
            ]
        })
        return posts
    },
    me: async (parent:any,args:any,context:Context)=>{
        const {prisma,userInfo} = context

        if(!userInfo){
            return null
        }

        return await prisma.user.findUnique({where:{
            id:userInfo.userId
        }})

    }
}