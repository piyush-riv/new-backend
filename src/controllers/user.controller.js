import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler(async (req,res) => {
    res.status(200).json({
        message:"ok"
    })
})

export {registerUser} // to use the same name in importing ile in only export