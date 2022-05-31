import {Context} from '../../index'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken';
import {JWT_SECRET_KEY} from './keys'


interface SignUparguments {
    credentials: CredentialsArguments
    name:string
    bio:string
}

interface CredentialsArguments {
    email:string
    password:string
}

interface UserPayload {
    userErrors: {message:string}[];
    token:  null|string
}


export const authResolvers = {
    signup: async (parent:any,args:SignUparguments,context:Context):Promise<UserPayload>=>{
         const {name,credentials,bio} = args
         const {email,password} = credentials
         const {prisma} = context

        const isEmail = validator.isEmail(email)

        if(!isEmail){
            return{
                userErrors: [{
                    message:'Email is invalid'
                }],
                token:null
            }
        }

        const isValidPassword = validator.isStrongPassword(password)

        if(!isValidPassword){
            return{
                userErrors: [{
                    message:'Password is invalid'
                }],
                token:null
            }
        }

        const hashedPassword = await bcrypt.hash(password,12)

        if(!name||!bio){
            return{
                userErrors: [{
                    message:'Name and Bio are required'
                }],
                token:null
            }
        }
      
        const createdUser = await prisma.user.create({data:{
            email,name,password:hashedPassword
        }})

        await prisma.profile.create({data:{
            bio,
            userId:createdUser.id
        }})

        const token = await JWT.sign({
            userId: createdUser.id,
        },JWT_SECRET_KEY,{
            expiresIn: 3600000
        }) 


        return{
            userErrors: [{
                message:'User Created'
            }],
            token:token
        }
       
    },

    signin: async (parent:any,args:any,context:Context):Promise<UserPayload> => {
        const {password,email}:CredentialsArguments= args.credentials
        const {prisma} = context

        const user = await prisma.user.findUnique({where:
        {email:email}})
        
        if(!user){
            return{
                userErrors: [{
                    message:'Wrong Combination of email and Password'
                }],
                token: null
            }
        }

        const isValidPassword = await bcrypt.compare(password,user.password)

        if(!isValidPassword){
            return{
                userErrors: [{
                    message:'Wrong Combination of email and Password'
                }],
                token:null
            }
        }

        const token = await JWT.sign({
            userId: user.id,
        },JWT_SECRET_KEY,{
            expiresIn: 3600000
        }) 

        return{
            userErrors: [{
                message:'Login Successful'
            }],
            token:token
        }

    }
}