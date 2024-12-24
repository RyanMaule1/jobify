import bycrpt from "bcryptjs"


export const hashPassword = async (password) => {
    
    const salt = await bycrpt.genSalt(10)
    const encryptedPassword = await bycrpt.hash(password, salt)
    return encryptedPassword
}
    

export const checkPassword = async (password, userPassword) => {
    
   const comparePassword = await bycrpt.compare(password, userPassword)
    //.compare allows us to compare the encrypted versions of the passwords
    return comparePassword
    
}