
import React from "react";

function ListReservations({reservations, date}){


const displayReservations = reservations.map((reservation, index) => {
    
    if(reservation.status !== "finished"){

    return(
            <tr key ={index}>
                <td scope ="row">{reservation.reservation_id}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.last_name}</td>
                <td>{reservation.mobile_number}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.people}</td>
                <td><p data-reservation-id-status={reservation.reservation_id}>{reservation.status}</p></td>
                <td>{reservation.status !== "booked"? null : (
                <>
                  <a
                    href={`/reservations/${reservation.reservation_id}/seat`}
                    className="btn btn-outline-primary mx-1"
                  >
                    Seat
                  </a>
                </> 
                )}
            </td>

            </tr>


    )
}
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
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>{displayReservations}</tbody>
                    </table>
            </div>
        </div>
    )
}


export default ListReservations;