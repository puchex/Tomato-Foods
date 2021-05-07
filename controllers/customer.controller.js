const Customer = require("../models/customer.model.js");
const config = require("../config/config");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

exports.register = async (req,res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.passwd,salt);
    // create Customer object

    const customer = new Customer({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        passwd : hashPassword
    });
    console.log(customer)
    try {
        const id = await Customer.create(customer);
        customer.id = id;
        console.log(id);
        // delete customer.passwd;
        // res.redirect('/')
        res.send("Welcome "+customer.name+"\n Youre registered now <a href='/'> Login here</a>");
    }
    catch(err){

        res.status(500).send(err);
    }
};


exports.login = async (req,res) => {
    try {
        const customer = await Customer.login(req.body.email);
        // console.log("in controller got passwd -->"+customer['passwd']);
        if(customer){
            // validPass = req.body.passwd === customer['passwd']
            const validPass = await bcrypt.compare(req.body.passwd,customer['passwd']);
            console.log(validPass);
            if(!validPass){
                return res.status(400).send("Login failed!!");
            }

            const token = jwt.sign({id:customer.cust_id,user_type:1},config.TOKEN_SECRET);
            res.header("auth-token",token).send("Welcome back, "+customer.name);
        }
    }
    catch(err){
        res.send(err);
    }
};

exports.get = async  (req,res) => {
    res.render('register.ejs')
}