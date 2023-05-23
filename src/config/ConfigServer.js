const {connect} = require ('mongoose')

module.exports={
    connectDb: ()=>{
        connect('')
        console.log('base de datos conectada')
    }
}