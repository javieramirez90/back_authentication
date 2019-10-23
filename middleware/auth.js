const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    //getting the token from headers
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    // if token has not been found, reponse (without procedding to the nex middleware)
    if (!token) return res.status(401).send("Acceso denegado. No se ha proporcionado token.");

    try {
        // if token is verified, set req.user and pass to next middleware.
        const decoded = jwt.verify(token, config.get("myprivatekey"));
        req.user = decoded;

        next();
    } catch (ex) {
        // if the header brings an invalid token.
        res.status(400).send('Token inválido.');
    }
};