import { verify } from "jsonwebtoken"
export default function profileHandler(req, res) {
    
    const {token} = req.cookies
    
    if (!token) {
      return res.status(401).json("You are not logged in");
    }

    try {
        const user = verify(token, "secret");
        console.log(user);
        res.json({email : user.email, username : user.username});
    } catch (error) {
        return res.status(401).json("The token is invalid");
    }
}