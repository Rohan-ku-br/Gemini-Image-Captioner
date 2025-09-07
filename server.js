require('dotenv').config()
const app = require('./src/app');

const connectdb = require('./src/db/db');
connectdb()

app.listen(3000, ()=>{
    console.log('server run on port 3000...');
    
})