import { prisma } from "../lib/prisma.js";
import { Request, Response, NextFunction } from "express";
import { client } from "../app.js";

const clearCache = async(req: Request, res: Response, next: NextFunction) => {
    try{
        // Clear the entire database without blocking the server
        await client.flushAll(); 
        res.status(200).json({
            ok: true,
            message: 'Cache wiped'
        })
    }catch(err){
        next(err)
    }
}

export {clearCache}