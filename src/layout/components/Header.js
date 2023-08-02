import { Divider, Popover } from "@mantine/core"
import Btn from "./Btn"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default ({ setLoader }) => {
    const router = useRouter()
    const [userInfo, setUserInfo] = useState({})

    const menu = [
        {
            id: 1,
            name: "Dashboard",
            link: "/"
        },
        {
            id: 2,
            name: "Orders",
            link: "/orders"
        },
    ]

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
        <header className="text-gray-600 body-font border-b">
            <div className="container mx-auto flex flex-wrap px-5 py-2 flex-col md:flex-row items-center">
                <Image src='/logo.png' alt="Logo" width={100} height={50} className="w-auto h-auto cursor-pointer" />
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    {
                        menu.map((item, i) => (
                            <Link key={i} href={item.link} className="mr-5 hover:text-gray-900">{item.name}</Link>
                        ))
                    }
                </nav>
                <Popover position="bottom-end" withArrow shadow="md">
                    <Popover.Target>
                        <div>
                            <Btn>Profile</Btn>
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
        </header>
    )
}