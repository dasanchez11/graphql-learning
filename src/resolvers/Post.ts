import {Context} from '../index'
import {userLoader} from '../loaders/UserLoader';


interface PostParentType {
    authorId: number 
}

export const Post = {
    user: async (parent:PostParentType,args:any,context:Context)=>{
        // const {prisma}=context
        const {authorId} = parent
        // return await prisma.user.findUnique({where:{
        //     id: authorId
        // }})

        return userLoader.load(authorId)

    }
}