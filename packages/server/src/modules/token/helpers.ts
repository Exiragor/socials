import * as jwt from "jsonwebtoken"
import * as conf from "config"

export const validateToken = async (token: string) => {
    const secretKey = conf.get('secretKey').toString()
    let tokenInfo
    try {
        tokenInfo = await jwt.verify(token, secretKey)
    } 
    catch (err) {
        if (err) return false
    }
    finally {
        return tokenInfo
    }
}