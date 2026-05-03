import { notify,penddingNotify,readNotify } from "./RestApi";

export const notifyAction = (creds) => {
    return async (dispatch) => {
        try {
            const notifyRes = await notify(creds);
            return dispatch({
                type: "NOTIFY",
                payload: notifyRes
            });
        }
        catch (error) {
            dispatch({
                type: "NOTIFY",
                payload: error?.message || null
            });
        }
    }
};
export const readNotifyAction = (creds) => {
    return async (dispatch) => {
        try {
            const readNotifyRes = await readNotify(creds);
            return dispatch({
                type: "READ_NOTIFY",
                payload: readNotifyRes
            });
        }
        catch (error) {
            dispatch({
                type: "READ_NOTIFY",
                payload: error?.message || null
            });
        }
    }
};
export const pendingNotifyAction = (creds) => {
    return async (dispatch) => {
        try {
            const readNotifyRes = await penddingNotify(creds);
            return dispatch({
                type: "PENDING_NOTFY",
                payload: readNotifyRes
            });
        }
        catch (error) {
            dispatch({
                type: "PENDING_NOTFY",
                payload: error?.message || null
            });
        }
    }
};