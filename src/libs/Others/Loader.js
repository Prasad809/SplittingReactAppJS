function Loader({percentage}){
    return(
        <div className="loader-container">
            <div className="loader">
                {percentage}
            </div>
        </div>
    )
}

export default Loader