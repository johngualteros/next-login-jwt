import jwt from "jsonwebtoken";
import { serialize } from "cookie";
export default function loginHandler(req, res) {
    const { email, password } = req.body;

    if(email === 'admin@local.local' && password === 'admin'){
        const token = jwt.sign({
            exp : Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
            email: 'admin@local.local',
            username: 'john',
        }, 'secret')

        const serialized = serialize('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: '/'
        })
        res.setHeader('Set-Cookie', serialized);
        return res.json('Login Route');
    }
    return res.status(401).json('Login Failed');
}