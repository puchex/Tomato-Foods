const config = require("../config/config");
const jwt = require("jsonwebtoken");

exports.loggedIn = function (req,res,next){
    let token = req.header('Authorization');

    if(!token) {
        return res.send("Try again by logging in");
    }

    try{
        if(token.startsWith('Bearer ')){
            token = token.slice(7,token.length).trimLeft();
        }

        const verified = jwt.verify(token,config.TOKEN_SECRET);
        // if(verified.user_type === 1){
        //     let req_url = req.baseUrl + req.route.path;
        //     if(req_url.includes)
        // }

        req.user = verified;
        next();
    }
    catch(err){
        res.status(400).send("Invalid token");
    }
}

