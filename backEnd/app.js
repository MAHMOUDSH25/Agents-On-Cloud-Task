const express = require("express");
const app = express();
const cors = require("cors");
require("./db/db");
app.use(express.json());
app.use(cors());

// Route 
const userRoute = require("./routers/routes/userRoute")
const productRoute = require("./routers/routes/productRoute")
const bookingRoute = require("./routers/routes/bookingRoute")

// use for route 
app.use(userRoute);
app.use(productRoute);
app.use(bookingRoute);


////////////////////////////
const Port = 5000;
app.listen(Port,()=>{
    console.log("server is running");
})
