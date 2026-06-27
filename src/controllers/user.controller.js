import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse  } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req,res) => {
    //  get user details from frontend
    // validation if the entered data is correct / non empty
    // check if user already exists : username , email
    // check for images, check for avatar --> Upload to cloudinary
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation 
    // return res

    const{fullName,email,username,password}=req.body
    console.log("email",email);

    if (
        [fullName,email,username,password].some((field) =>{return field?.trim() === ""})
    ) {
        throw new ApiError(400 , "All fields are required")
    }
    const existedUser=await User.findOne({
        $or:[{username},{email}] // check if there is any registered email or username
    })
    if(existedUser){
        throw new ApiError(409,"User already registered");
    }
    const avatarLocalPath = req.files?.avatar?.[0]?.path;  //multer gives .files its good practice to optionaly chain so that if we dont have access
    const coverImageLocalPath =  req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )



})

export {registerUser} // to use the same name in importing ile in only export

//The Array.prototype.some() method in JavaScript checks if at least one element in an array passes a specified test function