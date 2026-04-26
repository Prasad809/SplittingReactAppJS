import { combineReducers } from "redux";
import { authReducer, RegisterReducer } from "../Pages/Login/Store/Reducer";
import { usersReducer, groupsReducer, createGroupReducer, addMemberReducer } from "../Pages/Group/Store/Reducer";

const rootReducers = combineReducers({
    authReducer,
    RegisterReducer,
    usersReducer,
    groupsReducer,
    createGroupReducer,
    addMemberReducer
});

export default rootReducers;