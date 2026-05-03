import { addMember, createGroup, groupList, membersList, usersList,addExpenses,transGroupList, settledBal, approveMember, requestMember } from "./restApi";

export const userListAction = (creds) => {
    return async (dispatch) => {
        try {
            const usersRes = await usersList(creds);
            return dispatch({
                type: "USERS_LIST",
                payload: usersRes
            });
        }
        catch (error) {
                return dispatch({
                    type: "USERS_LIST",
                    payload: error?.message || null
                });
        }
    }
};
export const groupListAction = (creds) => {
    return async (dispatch) => {
        try {
            const usersRes = await groupList(creds);
            return dispatch({
                type: "GROUPS_LIST",
                payload: usersRes
            });
        }
        catch (error) {
                return dispatch({
                    type: "GROUPS_LIST",
                    payload: error?.message || null
                });
        }
    }
};

export const createGroupAction = (creds) => {
    return async (dispatch) => {
        try {
            const createGroupRes = await createGroup(creds);
            return dispatch({
                type: "CREATE_GROUP",
                payload: createGroupRes
            });
        }
        catch (error) {
            return dispatch({
                type: "CREATE_GROUP",
                payload: error?.message || null
            });
        }
    }
};

export const addMemberAction = (creds) => {
    return async (dispatch) => {
        try {
            const usersRes = await addMember(creds);
            return dispatch({
                type: "ADD_MEMBER",
                payload: usersRes
            });
        }
        catch (error) {
            return dispatch({
                type: "ADD_MEMBER",
                payload: error?.message || null
            });
        }
    }
};
export const memberListAction = (creds) => {
    return async (dispatch) => {
        try {
            const usersRes = await membersList(creds);
            return dispatch({
                type: "MEMBERS_LIST",
                payload: usersRes
            });
        }
        catch (error) {
            return dispatch({
                type: "MEMBERS_LIST",
                payload: error?.message || null
            });
        }
    }
};
export const addExpenesAction = (creds) => {
    return async (dispatch) => {
        try {
            const addExpenseRes = await addExpenses(creds);
            return dispatch({
                type: "ADD_EXPENSE",
                payload: addExpenseRes
            });
        }
        catch (error) {
            return dispatch({
                type: "ADD_EXPENSE",
                payload: error?.message || null
            });
        }
    }
};
export const TransGrouptAction = (creds) => {
    return async (dispatch) => {
        try {
            const transGroupRes = await transGroupList(creds);
            return dispatch({
                type: "TRANS_GROUP",
                payload: transGroupRes
            });
        }
        catch (error) {
            return dispatch({
                type: "TRANS_GROUP",
                payload: error?.message || null
            });
        }
    }
};
export const settledBalAction = (creds) => {
    return async (dispatch) => {
        try {
            const settledBalRes = await settledBal(creds);
            return dispatch({
                type: "SETTLE_BAL",
                payload: settledBalRes
            });
        }
        catch (error) {
            return dispatch({
                type: "SETTLE_BAL",
                payload: error?.message || null
            });
        }
    }
};
export const approveMemberAction = (creds) => {
    return async (dispatch) => {
        try {
            const apprMemRes = await approveMember(creds);
            return dispatch({
                type: "APPROVE_MEM",
                payload: apprMemRes
            });
        }
        catch (error) {
            return dispatch({
                type: "APPROVE_MEM",
                payload: error?.message || null
            });
        }
    }
};
export const requestMemberAction = (creds) => {
    return async (dispatch) => {
        try {
            const requestMemRes = await requestMember(creds);
            return dispatch({
                type: "REQUEST_MEM",
                payload: requestMemRes
            });
        }
        catch (error) {
            return dispatch({
                type: "REQUEST_MEM",
                payload: error?.message || null
            });
        }
    }
};