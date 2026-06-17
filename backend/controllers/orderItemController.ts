import { prisma } from "../lib/prisma.ts";

const addOrder = async (req, res, next) => {
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
        data: items.map((item) => ({
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

export {addOrder}