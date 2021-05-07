const config = require("../config/config");
const jwt = require("jsonwebtoken");

exports.loggedIn = function (req,res,next){
    let token = req.headers['cookie'];
    console.log(req.headers);
    if(!token) {
        return res.send("Try again by logging in");
    }

    try{
        if(token.startsWith('jwt=')){
            token = token.slice(4,token.length).trimLeft();
        }

        const verified = jwt.verify(token,config.TOKEN_SECRET);
        // if(verified.user_type === 1){
        //     let req_url = req.baseUrl + req.route.path;
        //     if(req_url.includes)
        // }

        req.user = verified;
        console.log(verified.user_id,verified.user_type);
        next();
    }
    catch(err){
        res.status(400).send("Invalid token");
    }
}

exports.isManager = (req,res,next) => {
    if(req.user.user_type === '3'){
         return next();
    }
     res.render('error',{message : "Access only to REstaurant Managers"+req.user.user_type});
}

exports.isCustomer = (req,res,next) => {
    if(req.user.user_type === '1'){
        return next();
    }
     res.render('error',{message:"You are not a customer"});
}

