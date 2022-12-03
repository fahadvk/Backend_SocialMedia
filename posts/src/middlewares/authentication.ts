import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  const secret: string | undefined = process.env.Jwt_Secret_Key;
  if (secret)
    verify(token, secret, (err: any, decode: any) => {
      if (err) {
        return res.sendStatus(401);
      } else {
        req.body.user = {}
        const { id, email } = decode;
        req.body.user.id = id;
        req.body.user.email = email;
        next()
      }
    });
};
