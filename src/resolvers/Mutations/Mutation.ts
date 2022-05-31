// import { Post, prisma } from '@prisma/client'
// import {Context} from '../../index'
// import {Prisma} from '@prisma/client'
import {postResolvers} from './post'
import {authResolvers} from './auth'


export const Mutation = {
    ...postResolvers,
    ...authResolvers
}