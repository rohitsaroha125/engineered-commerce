import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwtSign from "../lib/jwtHelper.js";
import { Request, Response, NextFunction } from "express";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name, email, password} = req.body
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({data: {
      name,
      email,
      password: hash
    },
    select:{
      id: true,
      name: true,
      email: true
    }
  });
    const token = jwtSign(user)
    res.status(200).json({
      ok: true,
      user,
      token
    });
  } catch (err) {
    console.log("error is ", err)
    res.status(500).json({
      ok: false,
      err,
    });
  }
};

const login = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const {email, password} = req.body
    console.log("emailis", email)
    const user: any = await prisma.user.findUnique({
      where: {email}
    })

    if (!user) {
      const err:any = new Error("No Email Found")
      err.statusCode = 404
      return next(err)
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const err:any = new Error("Email/Password wrong")
      err.statusCode = 401
      return next(err)
    }

    const token = jwtSign(user)

    res.status(201).json({
      ok: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    })
  }catch(err){
    next(err)
  }
}

export {register, login};
