import React from 'react';
import {useHistory} from 'react-router-dom';

function TableForm({formData, changeHandler, submitHandler}){
    const history = useHistory();

    return(
        <div>
            <form>
                <label htmlFor="table_name">
                    Table Name:
                    <input
                        type="text"
                        name="table_name"
                        id="table_name"
                        value={formData.table_name}
                        onChange={changeHandler}
                        required
                    />
                </label>
                <br />
                <label htmlFor="capacity">
                    Capacity Size:
                    <input
                        type="number"
                        name="capacity"
                        id="capacity"
                        value={formData.capacity}
                        onChange={changeHandler}
                        required
                    />
                </label>
                <br />
                <button className="btn btn-outline-danger btn-sm mr-1" onClick={() => history.goBack()}>Cancel</button>
                <button type="submit" className="btn btn-outline-primary btn-sm" onClick={(event) => submitHandler(event)}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default TableForm;