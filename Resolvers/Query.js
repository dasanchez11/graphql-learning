


exports.Query = {
    hello: ()=>{
        return ["Hello","World","Diego"]
    },
    products: (parent,args,context)=>{
        const {products,reviews} = context.db
        const {filter} = args
        let filteredProducts = products
        if(filter){
            const {onSale,avgRating} = filter
            if(onSale){
                filteredProducts = filteredProducts.filter(product=>product.onSale)
            }
            if([1,2,3,4,5].includes(avgRating)){
                filteredProducts = filteredProducts.filter(product=>{
                    let revOfProduct = reviews.filter(rev => product.id===rev.productId)
                    let averageOfProduct = revOfProduct.reduce((acc,rev)=>{return acc+ (rev.rating/revOfProduct.length)},0)
                    return averageOfProduct>=avgRating
                })
            }
        }
        return filteredProducts
    },
    product: (parent,args,context) =>{
        const {products} = context.db
        const productId = args.id
        const product = products.find(product=>product.id === productId)
        if(!product){
            return null
        }else{
            return product
        }
    },
    categories: (parent,args,context)=>{
        const {categories} = context.db
        return categories
    },
    category: (parent,args,context)=>{
        const {categories} = context.db
        const categoryId = args.id
        const category = categories.find(category=>category.id ===categoryId)
        return category
    },
    reviews: (parent,args,context) =>{
        const {reviews} = context.db
        return reviews
    }
}