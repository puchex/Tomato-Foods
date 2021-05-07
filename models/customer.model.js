const { NotFound } = require("http-errors");
const psql = require("./database.js")

// module.exports = class User{
//     constructor()
// }

const Customer = function (customer ){
    this.name = customer.name;
    this.email = customer.email;
    this.phone = customer.phone;
    this.passwd = customer.passwd;
}
Customer.create = async (newCustomer) => {
    values = []
    for(key in newCustomer){
        values.push(newCustomer[key]);
    }
    let insert = await psql.query("INSERT INTO customers(name,email,phone,passwd) values ($1,$2,$3,$4) RETURNING cust_id;",values);
    console.log(insert)
    if(insert.rows) {
        return insert.rows[0]['cust_id'];
    }
    else {
        return 0;
    }
}

Customer.login = async (value) => {
    const result = await psql.query('SELECT * FROM customers WHERE email = $1;',[value]);
    const row = result.rows;
    if(row.length){
        return row[0];
    }
    else{
         return [];
    }
};

Customer.addToCart = async(dish_id,cust_id) => {
    // let clear = await psql.query('SELECT * FROM cart,dishes  WHERE cart.dish  cartNOT dish_id = $1 ;',[dish_id]);
    // if(clear.rows.length){
    //     await Customer.clearCart();
    // }
    let result = await psql.query('SELECT * FROM cart WHERE dish_id = $1 AND cust_id = $2;',[dish_id,cust_id]);
    if(result.rows.length){
        let update = await psql.query('UPDATE cart SET quantity = quantity + 1 WHERE dish_id = $1 AND cust_id = $2;',[dish_id,cust_id]);
    }
    else{
        let insert = await psql.query('INSERT INTO cart values ($2,$1,1);',[dish_id,cust_id]);
    }
    return ;
}

Customer.showCart = async(cust_id) => {
    let result = await psql.query('SELECT * FROM cart,dishes WHERE cart.cust_id = $1 AND dishes.dish_id = cart.dish_id;',[cust_id]);
    if(result.rows.length){
        return result.rows;
    }
    else{
        return [];
    }
}

Customer.clearCart = async(cust_id) => {
    let result = await psql.query('DELETE FROM CART WHERE cust_id = $1;',[cust_id]);
    return ;
}

Customer.buy = async(cust_id) => {
    let 
}
module.exports = Customer;