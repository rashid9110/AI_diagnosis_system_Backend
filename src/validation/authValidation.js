const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
// const { JWT_SECRET } = require('../config/serverConfig');
// const UnauthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req,res,next) {
    console.log("Cookies from Request:", req.cookies);

    const token=req.cookies['authToken'];

    if(!token){
        return res.status(401).json({
            success:false,
            data:{},
            error:'Not authenticated',
            message:'No Auth Token provided'
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(!decoded){
            throw new Error("Invalid token");
        }

        //if reached here then user is aunthenticated allow them to access the api


        req.user={
            email:decoded.email,
            id:decoded.id,
            role:decoded.role,
        }
    
      next();

    } catch (error) {
        if(error.name==='TokenExpiredError'){
            console.error(error.message)
            res.cookie('authToken',"",{
                httpOnly:true,
                secure:false,
                maxAge:7*24*60*60*1000
            })
            return res.status(200).json({
                success:true,
                message:'Logged out successfully',
                data:{},
                error:{}
                
         
            })
        }
        return res.status(401).json({ 
            success:false,
            data:{},
            error:error,
            message:'Invalid Token provided'
        }) 
    }

  
}

// async function isLoggedIn(req, res, next) {
//     const token = req.cookies['authToken'];

//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: 'No Auth Token provided',
//             data: {},
//             error: 'Not authenticated'
//         });
//     }

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.user = { email: decoded.email, id: decoded.id, role: decoded.role };
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: 'Invalid Token provided',
//             data: {},
//             error: error
//         });
//     }
// }

// /**
//  * This function checks if the authenticated user is an adimn or not?
//  * Because we will call isAdmin after isLoggedIn thats way we will receive user details
//  */


function isAdmin(req,res,next) {
    const isLoggedInUser=req.user;
    if(isLoggedInUser.role==="ADMIN"){
        next(); 
    }else{
        return res.status(401).json({
            success:false,
            data:{},
            message:"You are not authorised for this action",
            error:{
                statusCode:401,
                reason:"Unauthorised user for this action"
            }
        })
    }
}

module.exports={
    isLoggedIn,
    isAdmin,
}