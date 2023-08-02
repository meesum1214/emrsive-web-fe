export default ({title, value="", time}) => {
    return (
        <div className="bg-gray-700 shadow-lg rounded-xl flex items-start h-32 w-full justify-center py-4 px-8 my-2">
            <div className="flex items-center justify-start w-full">
                <div className="flex-col w-[85%]">
                    <div className="text-sm font-medium text-violet-600 my-2">{title}</div>
                    <div className="class flex items-center">
                        <div className="text-3xl font-bold text-gray-200">{value}</div>
                        <div className="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-green-500 font-medium ">
                            {/* <div className="text-xs bg-green-200 px-2 rounded-lg">+ 78%</div> */}
                        </div>
                    </div>
                    <div className="w-full h-1 rounded bg-gray-300 my-1">
                        <div className="w-full h-1 rounded bg-green-500"></div>
                    </div>
                    <div className="text-xs font-medium text-gray-400 ">{time}</div>
                </div>
            </div>
        </div>
    )
}