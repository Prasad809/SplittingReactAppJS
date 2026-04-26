import { addMember, createGroup, groupList, membersList, usersList } from "./restApi";

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