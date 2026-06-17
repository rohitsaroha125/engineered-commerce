import { prisma } from "../lib/prisma.ts";
const getProducts = async (req, res, next) => {
    try {
        const { page, size, search } = req.query;
        const products = await prisma.product.findMany({
            take: Number(page),
            skip: Number(page) * Number(size)
        });
        res.status(200).json({
            ok: true,
            products
        });
    }
    catch (err) {
        next(err);
    }
};
export { getProducts };
