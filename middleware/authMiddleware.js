import { UnauthenticatedError, UnauthorizedError } from "../errors/customError.js"
import { checkJwt } from "../utils/tokenUtils.js"

export const authenticateUser = async(req, res, next) => {
    const {token} = req.cookies

    if(!token) {
        throw new UnauthenticatedError('Unauthorized access')
    }

    try {
        const {userId, role} = checkJwt(token)
        req.user = {userId, role}
        next()
    } catch (error) {
        throw new UnauthenticatedError(error)
    }
  
}   

export const authorizePermissions = (...roles) => {
    return (req,res,next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError("Unauthorized to access this task")
        }
        console.log(roles);
        next();
    }
    
}