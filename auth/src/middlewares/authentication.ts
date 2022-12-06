import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { findUser } from "../Models/userModel";
export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies);
  if (req.cookies?.token) {
    const token: string = req.cookies.token;
    const secret: string | undefined = process.env.JWT_SECRET_KEY;
    console.log(token, secret);
    if (secret) {
      try {
        verify(token, secret, async (err: any, decoded: any) => {
          if (err) {
            console.log(err);
            return res.send(401).send("authentiactionfailed");
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
