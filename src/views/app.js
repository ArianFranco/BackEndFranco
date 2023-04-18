const express = require ("express")
const productRouter = require("../routes/products")
const cartRouter = require("../routes/cart")

const { Server } = require ('socket.io')

const PORT = 8080
const app = express()

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})

const socketServer = new Server(httpServer)


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/", productRouter)
app.use('/api/productos', productRouter)
app.use("/", cartRouter)

app.get('/chat',(req, res)=>{
    res.render('chat, {}')
})

app.listen(PORT, () => {

    console.log(`server listen ${PORT}`)

})