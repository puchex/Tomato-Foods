const { NotFound } = require("http-errors");
const psql = require("./database.js")

const Manager = function (manager ){
    this.name = manager.name;
    this.email = manager.email;
    this.phone = manager.phone;
    this.passwd = manager.passwd;
}
Manager.create = async (newManager) => {
    values = []
    for(key in newManager){
        values.push(newManager[key]);
    }
    let insert = await psql.query("INSERT INTO restaurants(name,email,phone,passwd) values ($1,$2,$3,$4) RETURNING rest_id;",values);
    console.log(insert)
    if(insert.rows) {
        return insert.rows[0]['cust_id'];
    }
    else {
        return 0;
    }
}

Manager.login = async (value) => {
    const result = await psql.query('SELECT * FROM restaurants WHERE email = $1;',[value]);
    const row = result.rows;
    if(row.length){
        return row[0];
    }
    else{
         return [];
    }
};

Manager.addDish = async (data) => {
    const insert = await psql.query('INSERT into dishes(availability,name,dish_type,info,price,image,rest_id) values ($1,$2,$3,$4,$5,$6,$7) RETURNING dish_id;',data);
}


module.exports = Manager;