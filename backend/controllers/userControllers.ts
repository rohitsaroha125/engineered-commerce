import { prisma } from "../lib/prisma.ts";
import type { Request, Response, NextFunction } from "express";


const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name, email, password} = req.body
    const user = await prisma.user.create({data: {
      name,
      email,
      password
    }});
    res.status(200).json({
      ok: true,
      user,
    });
  } catch (err) {
    console.log("error is ", err)
    res.status(500).json({
      ok: false,
      err,
    });
  }
};

const login = async(req, res, next) => {
  try{
    const {email, password} = req.body
    const user = await prisma.user.findUnique({
      where: {email}
    })

    if (!user) {
      const err:any = new Error("No Email Found")
      err.statusCode = 404
      return next(err)
    }

    const passwordMatch = user?.password === password
    if (!passwordMatch) {
      const err:any = new Error("Email/Password wrong")
      err.statusCode = 401
      return next(err)
    }

    res.status(201).json({
      ok: true,
      data: user
    })
  }catch(err){
    next(err)
  }
}

export {register, login};
