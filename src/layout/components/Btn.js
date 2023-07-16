export default ({ onClick, children, style }) => {
    return (
        <div onClick={onClick} className={`${style} w-20 h-10 flex justify-center items-center rounded-lg hover:shadow-lg transition-all active:scale-95 cursor-pointer text-white text-lg font-semibold`}>
            {children}
        </div>
    )
}