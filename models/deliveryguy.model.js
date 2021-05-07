const { NotFound } = require("http-errors");
const psql = require("./database.js")

const Deliveryguy = function (deliveryguy ){
    this.name = deliveryguy.name;
    this.email = deliveryguy.email;
    this.phone = deliveryguy.phone;
    this.passwd = deliveryguy.passwd;
}
Deliveryguy.create = async (newDeliveryguy) => {
    values = []
    for(key in newDeliveryguy){
        values.push(newDeliveryguy[key]);
    }
    let insert = await psql.query("INSERT INTO restaurants(name,email,phone,passwd) values ($1,$2,$3,$4) RETURNING del_id;",values);
    console.log(insert)
    if(insert.rows) {
        return insert.rows[0]['cust_id'];
    }
    else {
        return 0;
    }
}

Deliveryguy.login = async (value) => {
    const result = await psql.query('SELECT * FROM restaurants WHERE email = $1;',[value]);
    const row = result.rows;
    if(row.length){
        return row[0];
    }
    else{
         return [];
    }
};

module.exports = Deliveryguy;