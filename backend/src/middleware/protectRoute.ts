import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";


// Because typescript doesn't know if decoded has a userId, we have to create an interface letting it know.
interface DecodedToken extends JwtPayload{
    userId: string;
}


// TS throws an error because req does not have a user property, so here we declare it
declare global{
    namespace Express{
        export interface Request{
            user: {
                id: string;
            }
        }
    }
}


const protectRoute = async (req: Request, res: Response, next: NextFunction) =>{
    try{

        // We get the token from the cookie
        console.log("THIS IS THE COOKIES", req.cookies.jwt);
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error: "Unauthorized - No token provided. First"});
        }

        // Then we verify the token with our JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if(!decoded){
            return res.status(401).json({error: "Unauthorized - Invalid Token. It's here"});
        }

        // If we are able to verify, then we find the user.
        const user = await prisma.user.findUnique({where: {id: decoded.userId}, select: {id: true, username: true, email: true, profilePic: true, prefLang: true}})

        if(!user){
            return res.status(404).json({error: "User not found"})
        }
        
        // If everything works well, then we add the user to the request.
        req.user = user;

        // then we call the next function
        next();
    }catch(error: any){
        console.error(error.message)
    }


    
}

export default protectRoute;