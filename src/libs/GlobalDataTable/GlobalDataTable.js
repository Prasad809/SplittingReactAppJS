import DataTable from "react-data-table-component";
import Loader from "../Others/Loader";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#f4f4f4',
      fontWeight: 'bold',
      fontSize: '16px',
      padding: '12px',
      paddingRight:"10px"
    },
  },
  cells: {
    style: {
      fontSize: '14px',
      padding: '10px',
    },
  },
  rows: {
    style: {
      minHeight: '50px',
      borderBottom: '1px solid #eee',
    },
  },
};


function GlobalDataTable({...props}){
    return(
        <DataTable {...props} progressComponent={<Loader />} customStyles={customStyles}/>
    )
}
export default GlobalDataTable;