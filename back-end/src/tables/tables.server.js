const knex = require("../db/connection");

function create(table){
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((createdRecord) => createdRecord[0])
}

function list(){
    return knex("tables")
        .select("*")
        .orderBy("table_name", "asc")
}

function read(table_id){
    return knex("tables")
        .select("*")
        .where({table_id: table_id})
        .then((selectedResults) => selectedResults[0])
 }

function update(updatedTable){
    return knex("tables")
       .select("*")
       .where({table_id: updatedTable.table_id})
       .update(updatedTable, "*")
       .then((updatedRecord) => updatedRecord[0])
}

function readReservation(reservation_id){
    return knex("reservations")
        .select("*")
        .where({reservation_id: reservation_id})
        .then((selectedResults) => selectedResults[0])
 }




module.exports = {
    create,
    list,
    update,
    read,
    readReservation
};