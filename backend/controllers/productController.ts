import { prisma } from "../lib/prisma.ts";

const getProducts = async (req, res, next) => {
    try{
        const {page, size, search, category} = req.query
        const products = await prisma.product.findMany({
            where:{
                ...(search && {
                    name:{
                    contains: search,
                    mode: "insensitive",
                }
                }),
                ...(category && {
                    categoryId: Number(category)
                })
            },
            take: Number(size),
            skip: (Number(page) * Number(size)) - Number(size)
        })

        res.status(200).json({
            ok: true,
            products
        })
    } catch(err) {
        next(err)
    }
}

const singleProduct = async (req, res, next) => {
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