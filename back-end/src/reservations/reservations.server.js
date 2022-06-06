const knex = require("../db/connection");

function list(){
    return knex("reservations").select("*");
}

function listByDate(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .orderBy("reservation_time", "asc");  
}

function create(reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecord) => createdRecord[0])
         
 }

 function read(reservation_id){
    return knex("reservations")
        .select("*")
        .where({reservation_id: reservation_id})
        .then((selectedResults) => selectedResults[0])
 }

 function update(updatedReservation){
     return knex("reservations")
        .select("*")
        .where({reservation_id: updatedReservation.reservation_id})
        .update(updatedReservation, "*")
        .then((updatedRecord) => updatedRecord[0])
 }

module.exports = {
    list,
    listByDate,
    create,
    read,
    update
};