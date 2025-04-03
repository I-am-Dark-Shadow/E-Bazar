

const CardLoading = () => {
    return (
       <div className="border p-4 grid gap-1 lg:max-w-52 min-w-36 rounded-md animate-pulse">
            <div className="min-h-16 lg:min-h-24  bg-blue-50">

            </div>
            <div className="p-2 lg:p-3 bg-blue-50 rounded w-20">

            </div>
            <div className="p-3 lg:p-4 bg-blue-50 rounded">

            </div>
            <div className="p-3 lg:p-4 bg-blue-50 rounded w-14">

            </div>

            <div className="flex items-center justify-between gap-3">
                <div className="p-2 lg:p-3 bg-blue-50 rounded w-10 lg:w-16"></div>

                <div className="p-2 lg:p-3 bg-blue-50 rounded w-10 lg:w-16"></div>
            </div>


        </div>

    )
}

export default CardLoading
