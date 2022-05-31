import {Context} from '../index'


interface ProfileParentType {
    id: number
    bio:string
    userId:number
}

export const Profile = {
    user: async (parent:ProfileParentType,args:any,context:Context)=>{
        const {prisma}=context
        const {id,bio,userId} = parent
        return await prisma.user.findUnique({where:{
            id: userId
        }})

    }
}