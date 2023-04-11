const {promises} = require ("fs")
const fsP = promises
const fs = require("fs")

const cart = [{id: 1,
products: []}]

const path = "carrito.json"

class CartManager {
    constructor(path) {
      this.path = path;
    }
constructor (path) {
    this.path = path
    this.products = cart
}

async createCart() {
    try {
        await fsP.writeFile(this.path, JSON.stringify(this.products, null, 2), {encoding: "utf-8"}) 
    }
    catch (err){
        console.log(err)
    }
}

async getProducts(cid) {
    try{    
        const data = await fsP.readFile(this.path, "utf-8")
        const cart = JSON.parse(data)
        const index = cart.find(prod => prod.id == cid)
        if(!index) return console.log("error") 
        else {
            return index
        }
    } 
    catch(err){
        console.log(err)
    }
}

}

module.exports = CartManager;