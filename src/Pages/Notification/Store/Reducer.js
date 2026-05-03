let initialValues={
    error:false,
    user:null,
    errMsg:""
}

export const notifyReducer=(state=initialValues,action)=>{
    switch(action.type){
        case "NOTIFY":
            // if(action){
                return state = {
                    ...state,
                    user:action.payload.data,
                    error:false,
                    errMsg:""
                }
            // }
            case "SETERR":
                return state={
                    ...state,
                    user:null,
                    error:true,
                    errMsg:action.payload.data.message?.[0]?.description
                }
            default:
                return state
    }
};

export const readNotifyReducer=(state=initialValues,action)=>{
    switch(action.type){
        case "READ_NOTIFY":
            // if(action){
                return state = {
                    ...state,
                    user:action.payload.data,
                    error:false,
                    errMsg:""
                }
            // }
            case "SETERR":
                return state={
                    ...state,
                    user:null,
                    error:true,
                    errMsg:action.payload.data.message?.[0]?.description
                }
            default:
                return state
    }
};

export const pendingReducer=(state=initialValues,action)=>{
    switch(action.type){
        case "PENDING_NOTFY":
            // if(action){
                return state = {
                    ...state,
                    user:action.payload.data,
                    error:false,
                    errMsg:""
                }
            // }
            case "SETERR":
                return state={
                    ...state,
                    user:null,
                    error:true,
                    errMsg:action.payload.data.message?.[0]?.description
                }
            default:
                return state
    }
};