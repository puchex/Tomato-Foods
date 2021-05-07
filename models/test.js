const { NotFound } = require("http-errors");
const psql = require("./database.js")


customer = async () =>  {
    let result = await psql.query('SELECT * FROM customers WHERE email = $1;',["wr@gmail.com"]);
    var rows = result.rows
    if(rows.length){
        console.log(rows[0]['passwd']);}
    else{
            console.log("No data found");
        }
    return;
}

customer();

console.log("ok")