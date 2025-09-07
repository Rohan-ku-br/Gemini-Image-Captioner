const mongoose = require('mongoose')

function connectdb(){
    mongoose.connect(process.env.MONGOOSEDB_URI)
    .then(()=>{
        console.log('db connect successfully...');
        
    })
    .catch(()=>{
        console.log('connection failed...');
        
    })
}

module.exports = connectdb
