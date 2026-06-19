import { prisma } from "../lib/prisma.js";
import { Request, Response, NextFunction } from "express";

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const items = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: id,
        },
      });

      const orderItems = await tx.orderItems.createMany({
        data: items.map((item: any) => ({
          ...item,
          orderId: order.id,
        })),
      });

      return { order, orderItems };
    });

    res.status(200).json({
      ok: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

const orderPayment = async(req: Request, res: Response, next: NextFunction) => {
  try{
    
  } catch(err) {

  }
}

export {addOrder}