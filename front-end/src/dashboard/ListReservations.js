
import React, {useState} from "react";

function ListReservations({reservations, date}){


const displayReservations = reservations.map((reservation, index) => {

    return(
            <tr key ={index}>
                <th scope ="row">{reservation.reservation_id}</th>
                <th>{reservation.first_name}</th>
                <th>{reservation.last_name}</th>
                <th>{reservation.mobile_number}</th>
                <th>{reservation.reservation_date}</th>
                <th>{reservation.reservation_time}</th>
                <th>{reservation.people}</th>
            </tr>


    )
})
    return(
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                        <th>Reservation ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile Number</th>
                        <th>Reservation Date</th>
                        <th>Reservation Time</th>
                        <th>People</th>
                        </tr>
                    </thead>
                    <tbody>{displayReservations}</tbody>
                    </table>
            </div>
        </div>
    )
}


export default ListReservations;