import jwt from "jsonwebtoken";
function jwtSign(data) {
    return jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
    });
}
export default jwtSign;
