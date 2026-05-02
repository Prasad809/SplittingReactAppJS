import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSummaryAction } from "./Store/Action";
import GlobalDataTable from "../../libs/GlobalDataTable/GlobalDataTable";

function UserProfile() {
    const dispatch = useDispatch();
    const authReducer = useSelector((state) => state?.authReducer);
    const userRefNum = authReducer?.user?.userRefNum;
    const [userSummary, setUserSummary] = useState([]);

    const columns = [
        { name: "Group Name", selector: (row) => row.groupName, sortable: true },
        { name: "Group ID", selector: (row) => row.groupId, sortable: true },
        { name: "Trasction Des", selector: (row) => row.description, sortable: true },
        { name: "Amount", selector: (row) => row.amount, sortable: true },
        { name: "createdAt", selector: (row) => row.createdAt, sortable: true },
        { name: "type", selector: (row) => row.type, sortable: true },
    ];
    useEffect(() => {
        dispatch(userSummaryAction({ "userId": userRefNum })).then(res => {
            if (res?.payload?.data?.status) {
                setUserSummary(res?.payload?.data?.data)
            }
        })
    }, []);
    return (
        <div>
            <GlobalDataTable columns={columns} data={userSummary} />
        </div>
    )
}
export default UserProfile;