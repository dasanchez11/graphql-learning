const {gql} = require('apollo-server');
//TYPE DEFINITIONS FOR PRODUCTS PROJECT
exports.typeDefs = gql`
type Query {
    hello:[String] 
    products(filter:ProductsFilter): [Product!]!
    product(id:ID!): Product
    categories: [Category!]!
    category(id:ID!): Category
    reviews: [Review!]!
}

type Mutation {
    addCategory(input:AddCategoryInput!): Category!
    addProduct(input:AddProductInput!): Product!
    addReview(input:AddReviewInput!):Review!
    deleteCategory(id: ID!): Boolean! 
    deleteProduct(id:ID!): Boolean!
    deleteReview(id:ID!):Boolean!
    updateCategory(id:ID!,input:UpdateCategoryInput!):Category!
    updateProduct(id:ID!, input:UpdateProductInput!):Product!
    updateReview(id:ID!, input:UpdateReviewInput!):Review!
}

type Product {
    id: ID!
    name:String!
    description:String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    category: Category
    reviews: [Review!]!

}

type Category {
    id:ID!
    name:String!
    products(filter:ProductsFilter): [Product!]!
}

type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
}
input ProductsFilter {
    onSale:Boolean
    avgRating:Int
}

input AddCategoryInput {
    name:String!
}

input AddProductInput {
    name:String!
    description:String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    categoryId: String!
}

input AddReviewInput{
    title: String!
    comment: String!
    rating: Int!
    productId:ID!
}

input UpdateCategoryInput{
    name:String
}

input UpdateProductInput {
    name:String
    description:String
    quantity: Int
    price: Float
    onSale: Boolean
    image: String
    categoryId: String
}

input UpdateReviewInput{
    title: String
    comment: String
    rating: Int
    productId:ID
}
`