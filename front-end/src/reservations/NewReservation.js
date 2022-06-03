import React, { useEffect, useState } from "react";
import ReservationForm from "./ReservationForm";
import {createReservation} from "../utils/api";
import {useHistory} from 'react-router-dom';
import ErrorAlert from "../layout/ErrorAlert";


function NewReservation(){
    const history = useHistory();

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "1",
        status: "booked"
    }
    const [formData, setFormData] = useState({...initialFormState});

     //Handlers
     const changeHandler = ({ target }) => {
        setFormData((currentFormData) => ({
          ...currentFormData,
          [target.name]: target.value,
        }));
      };   
    
      const submitHandler = async (event) => {
        event.preventDefault();
        const abortController = new AbortController;
        const response = await createReservation(formData, abortController.signal)
        history.push(`/dashboard/?date=${response.reservation_date.slice(0,10)}`)
        console.log(response.reservation_date)
        console.log("submitted");

    }
    return(
        <div>
            <div>
                <h1>New Reservation</h1>
            </div>
            <div>
                <ReservationForm formData={formData} changeHandler={changeHandler} submitHandler={submitHandler}/>
            </div>
        </div>
    )

}

export default NewReservation;