const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const cors= require('cors');
const AuthRouter= require('./Routes/AuthRouter');
const ProductRouter=require('./Routes/ProductRouter');




require('./Models/db');

const PORTNO = 5000;
// app.get('/sign',(req,res)=>{
//     res.send("You are on the sign up page");

// })

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter )
app.use('/products', ProductRouter)


app.listen(PORTNO ,()=>{
    console.log('server is running on port 5000');

})

