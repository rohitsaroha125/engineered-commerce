import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    try {
        const headers = req.headers.authorization;
        if (!headers) {
            return res.status(401).json({
                message: "No token provided",
            });
        }
        const token = headers.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        next(err);
    }
};
export default authMiddleware;
