const jwt = require("jsonwebtoken");


module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header("auth-token");
    if(!token) {
        return res.status(401).json({message: "No token, authorization denied"});
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token')
    }
}