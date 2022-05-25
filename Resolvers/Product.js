
exports.Product= {
    category: (parent,args,context)=>{
        const {categories} = context.db
        return categories.find(category=>category.id === parent.categoryId)
    },
    reviews: (parent,args,context) =>{
        const {reviews} = context.db
        return reviews.filter(review=>review.productId === parent.id)
    }
}