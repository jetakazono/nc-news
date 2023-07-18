export const Error = ({ errorStatus, errorMessage }) => {
    return (<>
    <section className=" text-center flex flex-col content-center">
        <span className="text-gray-500 text-6xl "><span>{errorStatus}</span></span>
        <span className="text-gray-500 text-xl">{errorMessage}</span>
    </section>
    </> 
    )
}
