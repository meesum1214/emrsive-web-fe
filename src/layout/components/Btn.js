export default ({ onClick, children, style }) => {
    return (
        <div onClick={onClick} className={`${style} bg-primary-600 select-none w-20 h-9 flex justify-center items-center rounded-lg hover:shadow-lg transition-all active:scale-95 cursor-pointer text-white font-semibold`}>
            {children}
        </div>
    )
}