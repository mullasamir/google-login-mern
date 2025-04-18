const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
app.use(cors());
require('./models/dbConnection')

const authRouter = require('./routes/authRouter');



app.get('/',(req,res) => {
    res.send('Hello From Auth Server');
})

app.use('/auth',authRouter)

app.listen(PORT,()=>{

    console.log(`server is running on port ${PORT}`);
})