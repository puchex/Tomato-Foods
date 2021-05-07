const config = require("../config/config");
const Customer  = require("../models/customer.model");
const jwt = require("jsonwebtoken");

exports.addToCart = async (req,res) => {
    try{
        // data = [req.body.availability,req.body.name,req.body.dish_type,req.body.info,req.body.price,req.body.image,req.user.user_id];

        const dish_id = await Customer.addToCart(req.body.dish_id,req.user.user_id);
        res.redirect('/cart');
    }
    catch(err){
        console.log(err);
    }
}

exports.showCart = async (req,res) => {
    try{
        const cartList = await Customer.showCart(req.user.user_id);
        res.render('cart',{cartList:cartList});
    }
    catch(err){
        res.send("Some error");
    }
}

exports.clearCart = async (req,res) => {
    try{
        const cartList = await Customer.clearCart(req.user.user_id);
        res.redirect('/cart');
    }
    catch(err){
        res.send("Some error");
    }
}
exports.buy = async (req,res) => {
    try{
        await Customer.buy(req.user.user_id);
        res.redirect('/orders');
    }
    catch(err){

    }
}