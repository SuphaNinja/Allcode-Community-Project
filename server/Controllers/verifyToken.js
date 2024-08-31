export default function verifyToken  (req, res, next)  {
    const token = req.headers["x-access-token"];

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            res.send({ error: "Your session has expired or does not exist!!" });
            return;
        } else {
            req.userId = decoded.userId;
            next();
        }
    });
};