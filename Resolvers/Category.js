

exports.Category = {
    products: (parent,args,context)=>{
        const {products} = context.db
        const {id} = parent
        const {filter} = args
        let filteredProducts = products
        if(filter && filter.onSale===true){
            filteredProducts = filteredProducts.filter(product=>product.onSale)
        }
        return filteredProducts.filter(product=>product.categoryId === id)
        // console.log(parent)
    }
}