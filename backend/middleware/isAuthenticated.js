import { jwt } from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
            success: false,
            message: "user not authenticated"
        }) 
        }
        const decode = jwt.verify(token, process.env.PRIVATE_KEY);
        if(!decode){
            return res.status(401).json({
            success: false,
            message: "invalid token"
        })
        }
        req.id = decode.id;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to authenticate"
        })
    }
}