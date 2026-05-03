import { combineReducers } from "redux";
import { authReducer, RegisterReducer } from "../Pages/Login/Store/Reducer";
import { usersReducer, groupsReducer, createGroupReducer, addMemberReducer } from "../Pages/Group/Store/Reducer";
import { userSummaryReducer } from "../Pages/UserProfile/Store/Reducer";
import { notifyReducer,readNotifyReducer } from "../Pages/Notification/Store/Reducer";

const rootReducers = combineReducers({
    authReducer,
    RegisterReducer,
    usersReducer,
    groupsReducer,
    createGroupReducer,
    addMemberReducer,
    userSummaryReducer,
    notifyReducer,
    readNotifyReducer
});

export default rootReducers;