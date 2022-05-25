const {v4:uuid} = require('uuid')
exports.Mutation =  {
    addCategory: (parent,args,context)=>{
        const {input} = args
        const {categories} = context.db
        const newCategory = {
            id:uuid(),
            name:input.name
        }
        categories.push(newCategory)

        return newCategory;
    },

    addProduct: (parent,args,context) =>{
        const {name,description,quantity,price,image,onSale,categoryId} = args.input
        const {products} = context.db

        const newProduct = {
            id:uuid(),
            name,
            description,
            quantity,
            price,
            image,
            onSale,
            categoryId
        }

        products.push(newProduct)
        return newProduct
    },
    addReview: (parent,args,context)=>{
        const {title,comment,rating,productId} = args.input
        const {reviews} = context.db

        const newReview = {
            id: uuid(),
            date: new Date(),
            title,
            comment,
            rating,
            productId
        }

        reviews.push(newReview)
        return newReview
    },
    deleteCategory: (parent,args,context) =>{
        const {id} = args
        let {categories,products} = context.db
        context.db.categories = categories.filter(category=>category.id!==id)
        context.db.products = products.map(product=>{
            if(product.categoryId===id){
                return {...product,categoryId:null}
            }else{
                return product
            }
        } )
        console.log(products)
        return true  
    },
    deleteProduct: (parent,args,context) =>{
        const {id} = args
        let {products,reviews} = context.db
        context.db.products = products.filter(product=>product.id!==id)
        context.db.reviews = reviews.filter(review=>review.productId!==id)
        return true
    },
    deleteReview: (partent,args,context) =>{
        const {id} = args
        let {reviews} = context.db
        context.db.reviews = reviews.filter(review=>review.id!==id)
        return true
    },
    updateCategory: (parent,args,context) =>{
        let index = null
        const {id,input} = args
        let {categories} = context.db
        context.db.categories =  categories.map((category,idx)=>{
            if(category.id===id){
                index = idx
                Object.keys(input).map(element=>{
                    category[element] = input[element]
                })
            }
            return category
        })
        
        return categories[index]
    },
    updateProduct: (parent,args,context) =>{
        let index = null
        const {id,input} = args
        let {products} = context.db
        context.db.products = products.map((product,idx)=>{
            if(product.id===id){
                index = idx
                Object.keys(input).map(element=>{
                    product[element]=input[element]
                })
            }
            return product
        })

        return products[index]

    },
    updateReview: (parent,args,context) =>{
        let index = null
        const {id,input} = args
        let {reviews} = context.db
        context.db.reviews = reviews.map((review,idx)=>{
            if(review.id===id){
                index = idx
                Object.keys(input).map(element=>{
                    review[element]=input[element]
                })
            }
            return review
        })

        return reviews[index]

    }



}