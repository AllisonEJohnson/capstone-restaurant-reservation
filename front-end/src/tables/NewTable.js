import React, { useEffect, useState } from "react";
import TableForm from "./TableForm";
import {createTable} from "../utils/api";
import {useHistory} from 'react-router-dom';
import ErrorAlert from "../layout/ErrorAlert";

function NewTable(){
    const history = useHistory();

    const initialFormState = {
        table_name: "",
        capacity: "1",
  
    }
    const [formData, setFormData] = useState({...initialFormState});
    const [errorAlert, setErrorAlert] = useState(false);

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
        try {
        const response = await createTable(formData, abortController.signal)
        history.push(`/dashboard`)
        } catch(error){
            setErrorAlert(error);
        }

    }
    return(
        <div>
            <div>
                <h1>New Table</h1>
            </div>
            <div>
                <ErrorAlert error={errorAlert} />
                <TableForm formData={formData} changeHandler={changeHandler} submitHandler={submitHandler}/>
            </div>
        </div>
    )
}

export default NewTable;