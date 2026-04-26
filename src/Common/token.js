function token(){
    let tokens={};
    let expryTm={};
    let piData=null;

    const getTokens=()=>tokens;
    const getExpryTm=()=>expryTm;
    const getPiData=()=>piData;

    const setTokens=(token)=>{
        tokens = token;
        return true;
    }
    const setExpryTm=(token)=>{
        expryTm = token;
        return true;
    }
    const setPiData=(token)=>{
        piData = token;
        return true;
    }
    return {
        setTokens,
        getTokens,
        setExpryTm,
        getExpryTm,
        getPiData,
        setPiData
    }
}

export default token();