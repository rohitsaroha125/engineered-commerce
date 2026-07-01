import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";

export const paymentSession = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("Stripe secret key is not defined in environment variables");
        }
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { items } = req.body;

    const lineItems = items.map((item: any) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100, // Stripe expects the amount in cents
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.status(200).json({ url: session.url });
    }catch(err){
        console.log(err)
        next(err)
    }
}