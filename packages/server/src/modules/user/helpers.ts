import * as bcrypt from "bcrypt"
import { User } from "src/entity/User"
import * as jwt from "jsonwebtoken"
import * as conf from "config"
import { Status } from "../../types/Status";

export const prepareRegistrationDataToSave = async (user: User, data: any) => {
    user.username = data.username
    user.email = data.email
    user.birthDate = data.birthDate
    user.password = await bcrypt.hash(data.password, 10)
    user.status = Status.Active

    return user
}

export const checkPassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
}

export const generateAccessTokenSecret = async (user: User) => {
    const secretKey = conf.get('secretKey').toString()
    const secret = user.username + Date.now().toString()
    const token = await jwt.sign({ id: user.id, secret }, secretKey).toString()

    user.accessSecret = secret
    user.accessToken = token

    return user
}