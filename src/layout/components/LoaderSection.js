import { Image, Loader } from "@mantine/core"

export default ({ state, style }) => {
    return (
        state && <div className={`${style} fixed top-0 left-0 w-screen h-screen bg-[#ffffffbb] flex justify-center items-center z-50`}>
            {/* <Loader color="indigo" /> */}
            <Image src="/favicon.png" width={50} className="spinner" />
        </div>
    )
}