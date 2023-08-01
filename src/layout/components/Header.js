import { Divider, Popover } from "@mantine/core"
import { CgProfile } from "react-icons/cg"
import Btn from "./Btn"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"

export default ({ setLoader }) => {
    const router = useRouter()
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        let user = localStorage.getItem("emrsive-user")
        setUserInfo(JSON.parse(user))
    }, [])

    const logout = () => {
        setLoader(true)
        localStorage.removeItem("emrsive-token")
        localStorage.removeItem("emrsive-order")
        router.push("/login")
    }
    return (
        <div className='flex items-center justify-between px-10 py-1 bg-orange-400'>
            <Image src='/logo.png' alt="Logo" width={150} height={50} className="w-auto h-auto" />

            <div className='text-3xl font-semibold text-white'>Emrsive Admin Panel</div>

            <Popover position="bottom-end" withArrow shadow="md">
                <Popover.Target>
                    <div>
                        <CgProfile size={50} className='text-white cursor-pointer' />
                    </div>
                </Popover.Target>
                <Popover.Dropdown>
                    <div className='font-semibold text-lg'>{userInfo.firstName} {userInfo.lastName}</div>
                    <Divider className='my-2' />
                    <div className='flex justify-center'>
                        <Btn style="bg-blue-500" onClick={logout}>Logout</Btn>
                    </div>
                </Popover.Dropdown>
            </Popover>
        </div>
    )
}