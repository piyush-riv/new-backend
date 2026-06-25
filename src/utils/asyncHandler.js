const asyncHandler =(requestHandler) =>{
    return (req,res,next) => { // this gives route handler or middleware to execute a function sso return in necessary
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err));
    };
};


export {asyncHandler}



// const asyncHandler = (fun) => async (req,res,next) => {//req,res,next from fun
//     try {
//         await fun(req,res,next)
//     } catch (error) {
//        res.status(error.code || 500).json({
        //  success: false,
        //  message: error.message
        //});
//     }
// }