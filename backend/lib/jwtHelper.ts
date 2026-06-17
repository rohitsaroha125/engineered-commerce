import * as jwt from "jsonwebtoken"

function jwtSign(data: any): string {
    const secret = process.env.JWT_SECRET_KEY
    if (!secret) {
        throw new Error("JWT_SECRET_KEY environment variable is not set")
    }

    return jwt.sign(data, secret, {
      expiresIn: "7d",
    })
}

export default jwtSign