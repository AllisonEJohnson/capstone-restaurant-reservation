import React, { useEffect, useState } from "react";
import {useHistory, useParams} from 'react-router-dom';
import { listTables, readReservation, updateTableForSeating } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import SeatReservationForm from "./SeatReservationForm";



function SeatReservation(){
    const params = useParams();
    const reservation_id = params.reservation_id;
    const history = useHistory();

    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState([]);
    const [formData, setFormData] = useState({})
    const [reservation, setReservation] = useState({});
    const [reservationError, setReservationError] = useState([]);
    
    //Handlers
    const changeHandler = ({ target }) => {
        setFormData(target.value);
        };   



    const submitHandler = async (event) => {
        event.preventDefault();
        try{

            console.log("reservation id", reservation_id);
            const tableData = JSON.parse(formData)
            console.log("formData tableId", tableData.table_id);
            const response = await updateTableForSeating(tableData.table_id, reservation_id)
            response.status = "Occupied";
            history.push("/dashboard")
        } catch(error){
            throw error;
        }
     }

    // load tables
    useEffect(loadTables, []);

    function loadTables() {
      const abortController = new AbortController();
      setTablesError(null);
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
      return () => abortController.abort();
    }

    //load reservation
    useEffect(loadReservation, []);

    function loadReservation() {
      const abortController = new AbortController();
      setReservationError(null);
      readReservation( reservation_id, abortController.signal)
        .then(setReservation)
        .catch(setReservationError);
      return () => abortController.abort();
    }


    if(tables) {
        return (
            <main>
                <h1>Seat Reservation</h1>
                <h3>Reservation ID: {reservation_id}    Party Size: {reservation.people}</h3>
                <div>
                <ErrorAlert error={tablesError} />
                <SeatReservationForm tables={tables} submitHandler={submitHandler} changeHandler={changeHandler}/>
                </div>
            </main>

        )
    } else {
        return (
            <div>
                <h3>There are no tables available.</h3>
            </div>
        )
    }



}

export default SeatReservation;