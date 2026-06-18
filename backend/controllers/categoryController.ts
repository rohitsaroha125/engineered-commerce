import { prisma } from "../lib/prisma.js";
import { Request, Response, NextFunction } from "express";

const getAllCategories = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const categories = await prisma.category.findMany()
        res.status(200).json({
            ok: true,
            categories
        })
    }catch(err){
        next(err)
    }
}

const getProductsByCategory = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {page, size} = req.query
        const {categoryId} = req.params
        const products = await prisma.product.findMany({
            where: {
                categoryId: Number(categoryId)
            },
            take: Number(size),
            skip: (Number(page) * Number(size)) - Number(size)
        })

        res.status(200).json({
            ok: true,
            products
        })
    }catch(err){
        next(err)
    }
}

export {getAllCategories, getProductsByCategory}