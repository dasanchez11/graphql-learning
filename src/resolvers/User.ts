import {Context} from '../index'


interface UserParentType {
    id: number
}

export const User = {
    posts: async (parent:UserParentType,args:any,context:Context)=>{
        const {prisma,userInfo}=context
        const {id} = parent

        const post = await prisma.post.findMany({where:{
            authorId:id
        },
        orderBy:{
            createdAt:"desc"
        }})

       

        if(id===userInfo?.userId){
            return await prisma.post.findMany({where:{
                authorId:id
            },
            orderBy:{
                createdAt:"desc"
            }})
        }else{
            return await prisma.post.findMany({where:{
                authorId:id,
                publish:true
            },
            orderBy:{
                createdAt:"desc"
            }})
        }
        

    }
}