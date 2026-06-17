import jwt from "jsonwebtoken"

// augment Express Request type to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = (req, res, next) => {
    try{
        const headers = req.headers.authorization
        if (!headers) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const secret = process.env.JWT_SECRET_KEY
    if (!secret) {
        throw new Error("JWT_SECRET_KEY environment variable is not set")
    }

    const token = headers.split(" ")[1];
    const decoded = jwt.verify(
      token,
      secret
    ) as any;
    req.user = decoded;
    next();
    }catch(err) {
        next(err)
    }
}

export default authMiddleware