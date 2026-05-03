import { Card, CardContent, Grid, Modal } from "@mui/material";
import GlobalDataTable from "../../libs/GlobalDataTable/GlobalDataTable";
import { settledBalAction } from "./Store/Action";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import InnerText from "@mui/material/Paper"
import ButtonThemes from "../../libs/ButtonThemes/ButtonThemes";

const modalStyle2 = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    borderRadius: 5,
    height: "auto",
    boaderRadius: "25px",
    padding: "10px"
};


function ExpenseGroup({ transData, selectedGroup }) {
    const dispatch = useDispatch();
    const [open,setOpen] =  useState(false);
    const [balSheet,setBalSheet] = useState([]);
    const columns = [
        { "name": "Transtion ID", selector: row => row?.id, sortable: true },
        { "name": "Paid UserName", selector: row => row?.userName, sortable: true },
        { "name": "Expense Description", selector: row => row?.description, sortable: true },
        { "name": "Expenses Amount", selector: row => row?.amount, sortable: true },
        { "name": "Transtion Time", selector: row => row?.createdAt, sortable: true },
    ];
    const columns2 = [
        { "name": "User Name", selector: row => row?.name, sortable: true },
        { "name": "Shared Amount", selector: row => row?.share, sortable: true },
        { "name": "Paid Amount", selector: row => row?.paid, sortable: true },
        { "name": "Balance Amount", selector: row => row?.balance, sortable: true },
    ];

    const handleSettleAmt = () => {
        setOpen(true);
        dispatch(settledBalAction({ "groupId": selectedGroup?.groupId })).then(res => {            
            if(res?.payload?.data?.status){
                setBalSheet(res?.payload?.data?.data?.balances);
            }
        })
    }
    const handleClose=()=>{
        setOpen(false);
    }

    return (
        <Grid>
            <h1>Total Expenses of the Group is {transData?.totalAmount} /-</h1>
            <ButtonThemes clr={"contained"} name={"Splite"} funcname={handleSettleAmt}/>
            <GlobalDataTable columns={columns} data={transData?.transactions} />
            <Modal open={open} onClose={handleClose}>
                <InnerText elevation={0} style={modalStyle2}>
                    <h3 className="startEnd">
                        Balance Settlement
                        <span className="material-symbols-outlined pointer" onClick={handleClose}>Close</span>
                    </h3>
                    <Grid container spacing={2}>
                        <GlobalDataTable columns={columns2} data={balSheet} />
                    </Grid>
                </InnerText>
            </Modal>
        </Grid>
    )
}

export default ExpenseGroup;