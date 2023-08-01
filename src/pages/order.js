import OrderDetails from "@/layout/OrderDetails";
import Btn from "@/layout/components/Btn";
import LoaderSection from "@/layout/components/LoaderSection";
import { Divider } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default () => {
    const [loader, setLoader] = useState(true)
    const [order, setOrder] = useState(null)

    const router = useRouter()

    useEffect(() => {
        let o = JSON.parse(localStorage.getItem("emrsive-order"))
        if (!o) {
            showNotification({
                title: 'Error',
                message: 'Select order first!',
                color: 'red',
                autoClose: 3000,
            });
            router.push("/");
        } else {
            setOrder(o)
        }

        setTimeout(() => {
            setLoader(false)
        }, 500);
    }, [])

    const back = () => {
        localStorage.removeItem("emrsive-order")
        router.back()
    }

    return (
        <>
            <LoaderSection state={loader} />

            <div className='absolute top-5 left-5'>
                <Btn style="bg-blue-500" onClick={back}>Back</Btn>
            </div>

            <div className="bg-gray-100 flex justify-center items-center min-h-screen">
                <div className="bg-white shadow-xl rounded-md max-w-[1000px] w-full mx-4 min-h-[500px] p-4">
                    <div className="text-2xl font-semibold text-center mb-3">Order Details</div>
                    <Divider />

                    <div className="w-full p-3 text-lg flex justify-between">
                        <div>
                            <div><b>Order ID:</b> {order?.id}</div>
                            <div><b>Date:</b> {order?.createdAt.substring(0, 10)}</div>
                        </div>

                        <div><b>Amount:</b> ${order?.orderPrice}</div>
                    </div>

                    <Divider />

                    <div className="p-3 w-full flex justify-between">

                        <div>
                            <div className="flex items-center">
                                <img
                                    src="/profile.png"
                                    width={100}
                                    height={100}
                                    className="mr-3"
                                />

                                <div>
                                    <div><b>Customer:</b> {order?.firstName} {order?.lastName}</div>
                                    <div><b>Comapany:</b> {order?.companyName}</div>
                                    <div className="mt-1 flex justify-center items-center h-8 font-semibold rounded-md bg-gray-500 text-white">{order?.orderStatus}</div>
                                </div>
                            </div>

                            <div className="mt-2">
                                <div className="text-xl font-semibold">Payment Detail:</div>

                                <img
                                    src="/payment.png"
                                    width={260}
                                    height={260}
                                />
                            </div>
                        </div>

                        <div className="w-72">
                            <div className="text-xl font-semibold">Billing Details:</div>
                            <Divider my={5} />
                            <div className="flex justify-between">
                                <div><b>Country: </b> {order?.country}</div>
                                <div><b>City: </b> {order?.city}</div>
                            </div>
                            <div><b>Address: </b>{order?.address}</div>
                            {order?.appartment && <div><b>Appartment: </b>{order.appartment}</div>}
                            <div className="flex justify-between">
                                <div><b>State: </b> {order?.state}</div>
                                <div><b>Zip Code: </b> {order?.zipCode}</div>
                            </div>
                            <div><b>Phone: </b>{order?.phone}</div>
                            {order?.additionalInfo && <div><b>Additional Note: </b>{order.additionalInfo}</div>}
                        </div>

                    </div>

                    <Divider />

                    <div className="w-full p-3">
                        <div className="text-xl font-semibold">Order Summary:</div>
                        <div>
                            {order && <OrderDetails setLoader={setLoader} orderId={order.id} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}