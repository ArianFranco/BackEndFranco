const {Router} = require("express")
const ProductManager = require("../ProductManager")

const product = new ProductManager("../DB.json")
const router = Router()

router.get("/", async (req, res)=>{
    const { limit } = req.query
    const products = await product.getProducts()        
    if(!limit) {
        return res.send({
            status: 'success',
            products
        })            
    }
    return res.send({
        status: 'success',
        products: products.slice(0, limit)
    })   
})

router.get("/:pid", async (req, res)=>{
    const {pid}= req.params
    const productDb = await product.getProductById(parseInt(pid))
    if (!productDb) {
        return res.send({status: 'error', error: 'error error error'})
    }
    res.send({productDb})
})


router.post("/", async (req, res)=>{
    const user = req.body
    console.log(user)
    const pushDB = await product.addProduct(user)
    if(!pushDB) {
        return res.status(400).send({status: "error", message: "error error error"})
    }
    res.status(200).send({status: "OK", message: "todo gud"})
})

router.put("/:pid", async (req, res)=>{
    const {pid} = req.params
    const newProduct = req.body
    const productUpdate = await product.updateProduct(parseInt(pid), newProduct)
    
    if(productUpdate) return res.status(400).send("error error error")
    res.status(200).send("actualizado")
})

router.delete("/:pid", async (req, res)=>{
    const {pid} = req.params
    const productDelete = await product.deleteProduct(parseInt(pid))

    if(productDelete !== undefined) {
    res.status(200).send("eliminado")
    }else {
    res.status(400).send("error error error") 
    }
}) 

module.exports = router