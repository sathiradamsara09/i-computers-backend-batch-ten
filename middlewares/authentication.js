import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();
export default function authenticateUser(req, res, next) {

    const header = req.header("Authorization")
   
   

        if(header !=null){

            const token = header.replace("Bearer ", "");

               //console.log("TOKEN RECEIVED");
               //console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

            jwt.verify(token, process.env.JWT_SECRET ,
                (error, decoded)=>{

                    //console.log("JWT VERIFY ERROR:", error);

                    if(decoded == null){
                        res.status(401).json({
                                message : "Invalid Token please login again "
                            });
                            return;
                    }
    

                        req.user = decoded
                        next();

                    }
            )

        }else{
            next();
        }
    }    

                 