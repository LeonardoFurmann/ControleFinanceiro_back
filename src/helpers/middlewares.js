import jwt from 'jsonwebtoken'
const JWT_SECRET =  process.env.JWT_SECRET

export const verifyToken =(req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido ou em formato inválido.' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token , JWT_SECRET, (err, decoded) => {
        if(err) return res.status(401).json({ error: "Login não autorizado"});
        req.userId = decoded.userId;
        next();
    })
}