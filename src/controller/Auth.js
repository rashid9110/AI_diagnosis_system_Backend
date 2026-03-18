// const { loginUser } = require("../services/authService");

const { loginUser } = require("../service/AuthService");


async function logout(req,res) {
    // console.log('Cookie from postman :',req.cookies)
    console.log('Cookie from postman :', req.cookies);
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
// async function login(req,res) {

//     try{
//         const loginPayload=req.body;

//         //auth service
//         const response=await loginUser(loginPayload)

//         res.cookie('authToken',response.token,{
//             httpOnly:true,
//             secure:process.env.NODE_ENV === 'production',
//             maxAge:7*24*60*60*1000
//         })

//         return res.status(200).json({
//             success:true,
//             message:'logined in successfully',
//             data:{
//                 userRole: response.userRole,
//                 userData: response.userData
//             },
//             error:{}
            
//         }) 
//     }catch(error){
//         return res.status(error.statusCode).json({ 
//            success:false,
//            message:error.message,
//            data:{},
//            error:error,
//         })
//     }
   
    
// }

async function login(req, res) {
    try {
        const loginPayload = req.body;
        console.log(loginPayload)
        const response = await loginUser(loginPayload);
        console.log(response)

        res.cookie('authToken', response.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
            sameSite: 'None' // Necessary for cross-origin cookies
        });

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {
                userRole: response.userRole,
                userData: response.userData
            },
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            data: {},
            error: error,
        });
    }
}


module.exports={
    login,
    logout
}