import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
 
  const secret: string | undefined = process.env.JWT_SECRET_KEY;
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
