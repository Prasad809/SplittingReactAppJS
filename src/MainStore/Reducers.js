import { combineReducers } from "redux";
import { authReducer, RegisterReducer } from "../Pages/Login/Store/Reducer";
import { usersReducer, groupsReducer, createGroupReducer, addMemberReducer, addExpenseReducer, transGroupReducer, settledBalReducer, apprveMemReducer, requestMemReducer } from "../Pages/Group/Store/Reducer";
import { userSummaryReducer } from "../Pages/UserProfile/Store/Reducer";
import { notifyReducer,pendingReducer,readNotifyReducer } from "../Pages/Notification/Store/Reducer";

const rootReducers = combineReducers({
    authReducer,
    RegisterReducer,
    usersReducer,
    groupsReducer,
    createGroupReducer,
    addMemberReducer,
    userSummaryReducer,
    notifyReducer,
    readNotifyReducer,
    addExpenseReducer,
    transGroupReducer,
    settledBalReducer,
    apprveMemReducer,
    requestMemReducer,
    pendingReducer
});

export default rootReducers;