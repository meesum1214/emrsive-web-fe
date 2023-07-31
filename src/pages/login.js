import { login } from "@/API/add"
import LoaderSection from "@/layout/components/LoaderSection"
import { showNotification } from "@mantine/notifications"
import { useRouter } from "next/router"
import { useEffect, useLayoutEffect, useState } from "react"

export default () => {
    const router = useRouter()
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    useLayoutEffect(() => {
        if (localStorage.getItem("emrsive-token")) {
            router.push("/")
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 500);
    }, [])

    const handleOnSubmit = (e) => {

        if (!data.email || !data.password) {
            showNotification({
                title: 'Error',
                message: 'All fields are required!',
                color: 'red',
                autoClose: 3000,
            });
            return;
        }

        setLoader(true)

        login(data).then((res) => {
            console.log(res)
            localStorage.setItem("emrsive-token", res.token)
            localStorage.setItem("emrsive-user", JSON.stringify(res.data))
            showNotification({
                title: 'Success',
                message: 'You have successfully Logged in!',
                color: 'teal',
                autoClose: 3000,
            });
            router.push("/")
        }).catch((err) => {
            console.log(err)
            showNotification({
                title: 'Error',
                message: err?.response?.data.message,
                color: 'red',
                autoClose: 3000,
            });
            setLoader(false)
        })
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <LoaderSection state={loader} />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-52 mr-2" src="/logo.png" alt="logo" />
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <button onClick={handleOnSubmit} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <div className="flex text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <div onClick={() => router.push("/signup")} className="ml-2 hover:cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}