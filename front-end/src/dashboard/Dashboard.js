import React, { useEffect, useState } from "react";
import { listReservations, listByDate } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "./ListReservations";
import useQuery from '../utils/useQuery';
import { today } from "../utils/date-time";
import { previous, next } from "../utils/date-time";
import { Link, useHistory } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  //If date is not given, should preform get request with today's date.
  let date = today();
  const query = useQuery().get('date');
  if(query){
    date = query;
  }
 


  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const view_date = date;
    const abortController = new AbortController();
    setReservationsError(null);
    console.log(date);
    listByDate( date, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div classname ="container">
          <Link to={`/dashboard/?date=${previous(date)}`} className="btn btn-dark">
            Previous
          </Link>
          <Link to={`/dashboard`} className="btn btn-light">
            Today
          </Link>
          <Link to={`/dashboard/?date=${next(date)}`} className="btn btn-dark">
            Next
          </Link>
      </div>
      <ErrorAlert error={reservationsError} />
      <ListReservations reservations={reservations} date = {date} />
    </main>
  );
}

export default Dashboard;
