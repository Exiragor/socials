import * as bcrypt from "bcrypt"
import { User } from "src/entity/User"

export const prepareRegistrationDataToSave = async (user: User, data: any) => {
    user.username = data.username.toString()
    user.email = data.email.toString()
    if (data.firstname) user.firstname = data.firstname.toString()
    if (data.lastname) user.lastname = data.lastname.toString()
    user.password = await bcrypt.hash(data.password, 10)

    return user
}