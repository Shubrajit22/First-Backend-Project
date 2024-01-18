import mongoose,{Schema} from "mongoose";
const userSchema = new Schema({
   userName:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
   },
    email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    // index:true
   },
    fullName:{
    type:String,
    required:true,
    // unique:true,
    // lowercase:true,
    trim:true,
    index:true
   },
   avatar:{
    type:String,
    required:true
   },
   coverImage:{
    type:String,
   },
   watchHistory:[{
    type:Schema.Types.ObjectId,
    ref:"Video"
   }],
   password:{
    type:String,
    required:[true,'Password is required'],
   },
   refreshToken:{
    type:String
   }
},
   {
    timestamps:true
   }
   
   
   
)






export const User = mongoose.model("User",userSchema);