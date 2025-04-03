import errorimage from "../assets/wrong.jpg"

const NoData = () => {
    return (
        <>
            <div className="container mx-auto p-3 flex flex-col items-center justify-center">
                <div className="bg-gray-100 w-full h-full p-5 mt-0 rounded-lg">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-lg lg:text-2xl font-bold text-gray-500">No Items Found</h1>
                        <p className="text-gray-500 text-sm lg:text-md">Please Add some Items!!</p>
                    </div>
                </div>
                <img className="mt-10 lg:w-1/4 w-1/2 opacity-70 rounded-xl shadow-md" src={errorimage} alt="image" />
            </div>
        </>
    )
}

export default NoData