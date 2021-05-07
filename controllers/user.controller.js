const Customer = require("../models/customer.model.js");
const Deliveryguy = require("../models/deliveryguy.model.js");
const Manager = require("../models/manager.model.js");
const config = require("../config/config");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

exports.register = async (req,res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.passwd,salt);
    // create Customer object
    console.log(req.body.user_type)
    if(req.body.user_type === '1'){
    const customer = new Customer({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        passwd : hashPassword
    });
    try {
        const id = await Customer.create(customer);
        customer.cust_id = id;
        // console.log(id);
        // delete customer.passwd;
        res.send("Welcome "+customer.name+"\n Youre registered now <a href='/'> Login here</a>");
        // res.redirect('/dishes')
        console.log("success")
    }
    catch(err){
        res.status(500).send(err);
    }
    }
    else if(req.body.user_type === '2'){
        // const deliveryguy = new Deliveryguy({
        //     name : req.body.name,
        //     email : req.body.email,
        //     phone : req.body.phone,
        //     passwd : hashPassword
        // });
        // console.log(customer)
        // try {
        //     const id = await Customer.create(customer);
        //     customer.id = id;
        //     console.log(id);
        //     // delete customer.passwd;
        //     res.send("Welcome "+customer.name+"\n Youre registered now <a href='/'> Login here</a>");
        //     // res.redirect('/dishes')
        // }
        // catch(err){
    
        //     res.status(500).send(err);
        // }
        res.send("still working");
    }
    else{
        const manager = new Manager({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            passwd : hashPassword
        });
        try {
            const id = await Manager.create(manager);
            manager.rest_id = id;
            console.log(id);
            // delete customer.passwd;
            res.send("Welcome "+manager.name+"\n Youre registered now <a href='/'> Login here</a>");
            // res.redirect('/dishes')
        }
        catch(err){
    
            res.status(500).send(err);
        }
    }
};


exports.login = async (req,res) => {
    try {
        if(req.body.user_type === '1'){
        const customer = await Customer.login(req.body.email);
        // console.log("in controller got passwd -->"+customer['passwd']);
        if(customer){
            // validPass = req.body.passwd === customer['passwd']
            const validPass = await bcrypt.compare(req.body.passwd,customer['passwd']);
            console.log(validPass);
            if(!validPass){
                return res.status(400).send("Login failed!!");
            }

            const token = jwt.sign({user_id:customer.cust_id,user_type:1},config.TOKEN_SECRET);
            res.cookie("jwt",token,{secure: true, httpOnly: true});
            // res.send({token : token});
                res.set('x-auth',token);
             res.redirect('/dishes')
            // res.header("auth-token",token).send("Welcome back, "+customer.name);
        }
        else{
            res.redirect('/');
        }
        }
        else if (req.body.user_type === '2'){
            res.send("still working  check back soon");
        }
        else{
            const manager = await Manager.login(req.body.email);
        // console.log("in controller got passwd -->"+customer['passwd']);
        if(manager){
            // validPass = req.body.passwd === customer['passwd']
            const validPass = await bcrypt.compare(req.body.passwd,manager['passwd']);
            // console.log(validPass);
            if(!validPass){
                return res.status(400).send("Login failed!!");
            }

            const token = jwt.sign({user_id:manager.rest_id,user_type:3},config.TOKEN_SECRET);
            res.cookie("jwt",token,{secure: true, httpOnly: true});
            res.set("auth-token",token);
            res.redirect('/manager');
            // res.redirect('/dishes')
            // res.header("auth-token",token).send("Welcome back, "+customer.name);
        }
        else{
            res.redirect('/');
        }
        }
}
    catch(err){
        res.redirect('/');
    }
};

exports.get = async  (req,res) => {
    res.render('register.ejs')
}