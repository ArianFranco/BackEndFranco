const {promises} = require("fs")
const fsP = promises
const fs = require("fs")
const products = []
const path = "./DB.json"

class ProductManager {
    constructor (path){
        this.products = products
        this.path = path
    }

    addProduct (product){

        if (!product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock ) return console.log ('todos los campos son necesarios')
        
        let productPush = this.products.find(prod => prod.code === product.code)    
        if (!productPush) return console.log('un producto con este codigo ya fue ingresado')
        if(this.products.length=== 0){
            return this.products.push({id: 1, ...newProduct})
        }

        return this.products.push({id: this.products.length+1, ...product})
    }

    deleteProduct(pid) {
        fsP.readFile(this.path,"utf-8",(err, data)=> {
            if(err){
                console.log(err)
                return
            }
        const product = JSON.parse(data)
        const index = product.findIndex(product => product.id === pid)
        if(index !== -1) {
            product.splice(index, 1)
        } else {
            console.log(`producto no encontrado`)
            return
        }
        fs.writeFile(path, JSON.stringify(product, null, 2),"utf-8" , err => {
            if (err){
                console.log(err)
            } else {
                console.log(`el producto ha sido eliminado`)
            } 
        }) 
        }
    )}

    createJsonFile =  (path)=> {
        fsP.writeFile(path,JSON.stringify([...product.products],null,2),"utf-8", (err)=> {
            if(err) return console.log(err)
        })
    }


    getProducts = async(limit)=> {
        try {
            let data = await fsP.readFile(this.path,"utf-8")
            const parseData = JSON.parse(data)            
            return parseData
        } catch (err) {
            return []
        }
    }
    async getProductById(pid) {
        const contenido = await fsP.readFile(this.path, "utf-8")
        
        let product = JSON.parse(contenido)
        let productId = product.find(prod => prod.id === pid)
        
        if(!product) return 'producto no encontrado' 
        
        return productId
    }
     
}

const product = new ProductManager("./DB.json")

product.addProduct({
    title: 'Skin Epica',
    description: 'Skin aleatoria de 1350RP',
    price: 500,
    thumbnail: 'link',
    code: 001,
    stock: 100
})
product.addProduct({
    title: 'Skin Legendaria',
    description: 'Skin aleatoria de 1800RP',
    price: 1000,
    thumbnail: 'link',
    code: 002,
    stock: 100
})
product.addProduct({
    title: 'Skin Epica',
    description: 'Skin aleatoria de 3200RP',
    price: 2000,
    thumbnail: 'link',
    code: 003,
    stock: 100
})


console.log(product.getProducts())
module.exports = ProductManager