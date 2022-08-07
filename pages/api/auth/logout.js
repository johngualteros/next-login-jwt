import {verify} from 'jsonwebtoken'
import {serialize} from 'cookie'
export default function logout(req, res){
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json("You are not logged in");
    }
    try {
        verify(token, "secret");
        const serialized = serialize("token", null, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 0,
          path: "/",
        });
        res.setHeader("Set-Cookie", serialized);
        return res.json("Logout Route");
    } catch (error) {
        return res.status(401).json("The token is invalid");
    }
}