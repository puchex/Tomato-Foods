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
         
        throw new NotFoundError("User doesnt exist");
    }
};

module.exports = Customer;