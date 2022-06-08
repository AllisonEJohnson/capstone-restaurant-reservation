function ListTables({tables, finishHandler}){

    const displayTables = tables.map((table, index) => {
        if(table.occupied || table.reservation_id){
            return(
                <tr key ={index}>
                    <td scope ="row">{table.table_id}</td>
                    <td>{table.table_name}</td>
                    <td>{table.capacity}</td>
                    <td>{table.reservation_id}</td>
                    <td><p data-table-id-status={table.table_id}>Occupied</p></td>
                    <td><button data-table-id-finish={table.table_id} className='button' type='' 
                    onClick={() => finishHandler(table)}>Finish</button></td>
                </tr>
            )
        } else {
            return(
                <tr key ={index}>
                    <td scope ="row">{table.table_id}</td>
                    <td>{table.table_name}</td>
                    <td>{table.capacity}</td>
                    <td>{table.reservation_id}</td>
                    <td><p className="col" data-table-id-status={table.table_id}>Free</p></td>
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
                        <th>Table ID</th>
                        <th>Table Name</th>
                        <th>Capacity</th>
                        <th>Reservation ID</th>
                        <th>Occupied</th>
                        </tr>
                    </thead>
                    <tbody>{displayTables}</tbody>
                    </table>
            </div>
        </div>
    )
}

export default ListTables;