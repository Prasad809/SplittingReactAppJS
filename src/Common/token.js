function token(){
    let tokens={};
    let expryTm={};
    let piData=null;
    let groupDtls={};

    const getTokens=()=>tokens;
    const getExpryTm=()=>expryTm;
    const getPiData=()=>piData;
    const getGroupDtls=()=>groupDtls;

    const setTokens=(token)=>{
        tokens = token;
        return true;
    };
    const setExpryTm=(token)=>{
        expryTm = token;
        return true;
    };
    const setPiData=(token)=>{
        piData = token;
        return true;
    };
    const setGroupDtls=(token)=>{
        groupDtls = token;
        return true;
    };
    return {
        setTokens,
        getTokens,
        setExpryTm,
        getExpryTm,
        getPiData,
        setPiData,
        getGroupDtls,
        setGroupDtls
    }
}

export default token();