import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";

const secret: string | undefined = process.env.JWT_SECRET_KEY;
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (secret)
    verify(token, secret, (err: any, decode: any) => {
      if (err) {
        console.log(err);
        return res.sendStatus(401);
      } else {
        req.body.user = {};
        const { id, email } = decode;
        req.body.user.id = id;
        req.body.user.email = email;
        next();
      }
    });
};

export const adminAuth = (req:Request,res:Response,next:NextFunction)=>{
  console.log("object");
  const {Admintoken} = req.cookies
  console.log(Admintoken,"token");
  if(secret)
  {
   verify(Admintoken,secret,(err:any,decoded:any)=>{
    if(err)
    {
     return res.sendStatus(401)
    }
    else{
     console.log(decoded);
     if(!isValidObjectId(decoded.id)) return res.status(401).clearCookie('Admintoken',{path:'/'})
     req.body.user ={}
     req.body.user.id = decoded.id
     next()
    }
   })
  }
 }