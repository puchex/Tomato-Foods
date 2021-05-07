const psql = require("./database.js")


const Dish = function (dish ){
    this.name = dish.name;
    this.dish_type = dish.dish_type;
    this.info =dish.info;
    this.price = dish.price;
    this.image = dish.image;
}

Dish.getAll = async () => {

    let dishList = await psql.query(
        `SELECT DISTINCT d.dish_id,d.name, d.price,d.availability,d.info,d.image,r.rest_id,r.name rest_name FROM dishes d   JOIN  restaurants r ON d.rest_id = r.rest_id;`);
    
    console.log(dishList.rows);
    return dishList.rows ;
}

Dish.getMenu = async (rest_name) => {

    let dishList = await psql.query(
        `SELECT DISTINCT d.dish_id,d.name, d.price,d.availability,d.info,d.image,r.rest_id,r.name rest_name FROM restaurants r , dishes d  WHERE  r.name = $1 AND d.rest_id = r.rest_id ;`,[rest_name]);
    console.log(dishList.rows);
    return dishList.rows ;
}
module.exports = Dish