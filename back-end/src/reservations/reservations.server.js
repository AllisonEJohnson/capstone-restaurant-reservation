const knex = require("../db/connection");

function list(){
    return knex("reservations").select("*");
}

function listByDate(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
}

function create(reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecord) => createdRecord[0])
 }

module.exports = {
    list,
    listByDate,
    create,
};