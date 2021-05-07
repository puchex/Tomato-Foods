const config = require("../config/config");
const Manager  = require("../models/manager.model");
const jwt = require("jsonwebtoken");

exports.addDish = async (req,res) => {
    try{
        data = [req.body.availability,req.body.name,req.body.dish_type,req.body.info,req.body.price,req.body.image,req.user.user_id];

        const dish_id = Manager.addDish(data);
    }
    catch(err){
        console.log(err);
    }
}

exports.dashboard = async (req,res) =>{
    res.render('manager_dashboard');
}
