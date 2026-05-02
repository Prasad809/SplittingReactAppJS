import { userSummary } from "./restApi";

export const userSummaryAction = (creds) => {
    return async (dispatch) => {
        try {
            const userSummaryRes = await userSummary(creds);
            return dispatch({
                type: "UESR_SUMMY",
                payload: userSummaryRes
            });
        }
        catch (error) {
            dispatch({
                type: "UESR_SUMMY",
                payload: error?.message || null
            });
        }
    }
};
