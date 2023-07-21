export const Error = ({ errorStatus, errorMessage }) => {
    const message = errorStatus === 500 ? "Whoops, something went wrong on our servers." : errorMessage
    return (<>
        <section className=" text-center flex flex-col content-center items-center h-screen">
        
            <h2 className="text-gray-500 text-8xl my-6">{errorStatus}</h2>
            <span className="text-gray-500 text-xl capitalize   ">{message}</span>
            <div className="mt-6">
                <a href="/" className="text-gray-500 bg-gray-200 p-3 rounded-md hover:shadow-md">Go back home</a>
            </div>
        </section>
    </> 
)}
    
    