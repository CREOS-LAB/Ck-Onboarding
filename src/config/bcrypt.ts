import * as bcrypt from "bcrypt";

const saltRounds = 8;

export const encodePassword = async (password: string) =>{
    let salt = await bcrypt.genSalt(saltRounds)
    let hashed = await bcrypt.hash(password, salt)
    return hashed
}

export const comparePassword = async (password: string, hashed: string): Promise<Boolean> =>{
    let salt = await bcrypt.genSalt(saltRounds)
    let doMatch = await bcrypt.compare(password, hashed)
    return doMatch
}