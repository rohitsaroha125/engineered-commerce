import { prisma } from "../lib/prisma.js";
import { Request, Response, NextFunction } from "express";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {page, size, search, category} = req.query

        // parse and validate query params so Prisma receives correct types
        const rawPage = Number(page);
        const rawSize = Number(size);
        const pageNum = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
        const sizeNum = Number.isFinite(rawSize) && rawSize > 0 ? rawSize : 10;

        const searchStr = typeof search === "string" ? search : undefined;
        const parsedCategory = typeof category === "string" ? Number(category) : NaN;
        const categoryId = Number.isFinite(parsedCategory) ? parsedCategory : undefined;

        const products = await prisma.product.findMany({
            where:{
                ...(searchStr && {
                    name:{
                        contains: searchStr,
                        mode: "insensitive",
                    }
                }),
                ...(categoryId !== undefined && {
                    categoryId: categoryId
                })
            },
            take: sizeNum,
            skip: (pageNum * sizeNum) - sizeNum
        })

        res.status(200).json({
            ok: true,
            products
        })
    } catch(err) {
        next(err)
    }
}

const singleProduct = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json({
            ok: true,
            product
        })
    } catch(err) {
        next(err)
    }
}

export {getProducts, singleProduct}