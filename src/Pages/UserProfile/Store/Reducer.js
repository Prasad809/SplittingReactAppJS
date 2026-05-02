let initialValues={
    error:false,
    user:null,
    errMsg:""
}

export const userSummaryReducer=(state=initialValues,action)=>{
    switch(action.type){
        case "UESR_SUMMY":
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

