import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
//mere server se user ka browser hai na uske andar ki cookies excess
//excess kar pau or uski cookies set bhi kar pau ,taki uski cookie me CRUD operation kar pau
//kyuki  kuch tareeke hote hai jahape secure cookies user ke browser me rakh sakte hai un secure cookies ko 
//sirf server hi read kar sakta hai and server hi usko remove kar sakta hai
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))  //configuring cors

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))//data coming from url must be encoded

app.use(express.static("public"))

app.use(cookieParser())





export {app}