import { prisma } from "../lib/prisma.js";
import { Request, Response, NextFunction } from "express";
import { client } from "../app.js";

declare global {
    namespace Express {
        interface Request {
            image?: string;
        }
    }
}

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {page, size, search, category} = req.query

        // parse and validate query params so Prisma receives correct types
        const rawPage = Number(page);
        const rawSize = Number(size);
        const pageNum = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
        const sizeNum = Number.isFinite(rawSize) && rawSize > 0 ? rawSize : 10;

        const productPageKey = `Products_Page_Size:${rawPage}_${rawSize}`
        const value = await client.get(productPageKey);

        if (!value) {
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

        await client.set(productPageKey, JSON.stringify(products));

        res.status(200).json({
            ok: true,
            products
        })
        } else {
            res.status(200).json({
            ok: true,
            products: JSON.parse(value)
        })
        }
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

const uploadProductImage = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        console.log("reqis", req.file)
        const imageUrl = `uploads/${req.file.filename}`;
        const product = await prisma.product.update({
            where: { id: Number(id) },
            data: { image: imageUrl },
        });

        res.status(200).json({
            ok: true,
            product
        })

    }catch(err){
        next(err)
    }
}

export {getProducts, singleProduct, uploadProductImage}