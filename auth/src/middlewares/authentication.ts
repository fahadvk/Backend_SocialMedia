  import { Request, Response, NextFunction } from "express";
import { verify ,VerifyErrors} from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import { findUser } from "../Models/UserModel";
const secret: string | undefined = process.env.JWT_SECRET_KEY;
export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies?.token) {
    const token: string = req.cookies.token;
    if (secret) {
      try {
        verify(token, secret, async (err: any, decoded: any) => {
          if (err) {
            console.log(err);
            return res.status(401).send("authentiactionfailed");
          } else {
            req.body.user = {};
            req.body.user.id = decoded.id;
            req.body.user.email = decoded.email;
            const data = await findUser(decoded.email);
            if (data) {
              req.body.user.name = data.name;
              return next();
            }
          }
        });
      } catch (error) {
        console.log(error)
      }
    } else {
      return res.status(401).send("authencation failed");
    }
  } else {
    res.status(401).send("authentication failed");
  }
};

export const adminAuth = (req:Request,res:Response,next:NextFunction)=>{
 const {Admintoken} = req.cookies
 if(secret)
 {
  verify(Admintoken,secret,(err:any,decoded:any)=>{
   if(err)
   {
    return res.sendStatus(401)
   }
   else{
    console.log(decoded);
    if(!isValidObjectId(decoded.id)) return res.sendStatus(401)
    req.body.user ={}
    req.body.user.id = decoded.id
    next()
   }
  })
 }
}