import { Loader } from "@mantine/core"

export default ({ state }) => {
    return (
        state && <div className="fixed top-0 left-0 w-screen h-screen bg-[#ffffffbb] flex justify-center items-center z-50">
            <Loader color="orange" />
        </div>
    )
}