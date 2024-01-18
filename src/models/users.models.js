import mongoose, { Schema } from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // index:true
    },
    fullName: {
      type: String,
      required: true,
      // unique:true,
      // lowercase:true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//bcrypt package has been used to hash the password in the data base.
//we are using if statement to check whether the password has been modified or not ,this helps us not encrypt the password again and again once password has been modified then only hashing will take place or not
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10)
  next()
})
//we can create our own methods()'
//bcrypt also provides us the functionality to check passwords
//it takes the password given by the user and compares with its encrypted password(this.password)
//return true (password matches) or false
userSchema.methods.isPasswordCoorect= async function (password)
{
   return await bcrypt.compare(password,this.password)
}
//jwt has a method known as sign() which generates tokens we need to give them payload(data),etc
userSchema.methods.generateAccessToken= function ()
{
     return jwt.sign(
      {
         _id:this._id,
         email:this.email,
         username:this.userName,
         fullname:this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
     )
}
userSchema.methods.generateRefreshToken= function ()
{
   
}
export const User = mongoose.model("User", userSchema)
