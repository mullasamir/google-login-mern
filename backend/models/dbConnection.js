const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
.then(()=>{
    console.log('Connected to MongoDB');
}).catch((error)=>{
    console.log('error while connecting :',error)
})