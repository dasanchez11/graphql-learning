const {ApolloServer, gql} = require('apollo-server');
const {typeDefs} = require('./Schema');
const {db} = require('./db')
const {Query} = require('./Resolvers/Query')
const {Mutation} = require('./Resolvers/Mutation')
const {Category} = require('./Resolvers/Category')
const {Product} = require('./Resolvers/Product')



// TYPE DEFINITIONS SCALAR TYPES
// const typeDefs = gql`
//     type Query {
//         hello:String 
//         numberOfAnimals: Int
//         price: Float
//         isCool: Boolean
//     }

//TYPE DEFINITIONS ARRAY TYPES
// const typeDefs = gql`
//     type Query {
//         hello:[String]
//     }
// `


  

const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query:Query,
        Category:Category,
        Product:Product,
        Mutation:Mutation
    },
    context:{
        db
    }
});

server.listen().then(({url})=>{
    console.log('server running on port '+url)
})
