const config = require("../config/config");
const Dish  = require("../models/dish.model");
const jwt = require("jsonwebtoken");


exports.getDishes = async (req,res) => {
    try{
        const dishList = await Dish.getAll();
        console.log(dishList.length);
        if(dishList.length){
        res.render('dishes',{dishList: dishList});
        }
        else{
            res.render('error.ejs',{message : "Sorry no dishes added yet"})
        }
    }
    catch(err){
        res.render('error.ejs',{message:"Something's wrong "+err});
    }
}

exports.getMenu = async (req,res) => {
    try{
        const dishList = await Dish.getMenu(req.params['rest_name']);
        console.log(dishList.length);
        if(dishList.length){
        res.render('dishes',{dishList: dishList});
        }
        else{
            res.render('error.ejs',{message : "Sorry no dishes from that restaurant"});
        }
    }
    catch(err){
        res.render('error.ejs',{message:"Something's wrong "});
    }
}