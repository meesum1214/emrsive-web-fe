import { deleteOrder, updateOrderStatus } from "@/API/add";
import OrderDetails from "@/layout/OrderDetails";
import Btn from "@/layout/components/Btn";
import { Modal, Select, Table } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useState } from "react";

export default ({ orders, count, setCount, setLoader }) => {

    const [orderId, setOrderId] = useState(null)
    const [status, setStatus] = useState(null)
    const [opened, { open, close }] = useDisclosure(false);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const router = useRouter()

    const rows = orders.map((order, i) => (
        <tr key={i} className="bg-gray-100 border-b-2 border-gray-300">
            <td>{order.id}</td>
            <td>{`${order.firstName} ${order.lastName}`}</td>
            <td>${order.orderPrice}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>
                <div
                    className='bg-gray-300 h-7 w-40 rounded-full flex justify-center items-center font-semibold cursor-pointer hover:shadow-lg transition-all text-base'
                    onClick={() => { setOrderId(order.id); open() }}
                >{order.orderStatus}</div>
            </td>
            <td>
                <Btn
                    onClick={() => { localStorage.setItem("emrsive-order", JSON.stringify(order)), router.push("/order") }}
                    style="bg-green-500 hover:bg-green-600"
                >More</Btn>
            </td>
            <td>
                <Btn
                    onClick={() => handleDeleteOrder(order.id)}
                    style="bg-red-500 hover:bg-red-600"
                >Delete</Btn>
            </td>
        </tr>
    ));

    const statusUpdate = () => {
        setLoader(true)
        close()
        updateOrderStatus(orderId, status).then((res) => {
            console.log(res)
            setCount(!count)
        }).catch((err) => {
            console.log(err)
            setLoader(false)
        })
    }

    const handleDeleteOrder = (id) => {
        setLoader(true)
        deleteOrder(id).then((res) => {
            console.log(res)
            setCount(!count)
            showNotification({
                title: 'Success',
                message: 'Order Deleted Successfully',
                color: 'teal',
                autoClose: 3000,
            });
        }).catch((err) => {
            console.log(err)
            setLoader(false)
        })
    }


    return (
        <div className="h-[460px] bg-gray-100">
            <Table className='my-2 w-full' fontSize="xl">
                <thead className='bg-gray-400'>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Order Status</th>
                        <th>Details</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>


            <Modal opened={opened} onClose={close} centered withCloseButton={false}>
                <div className='flex flex-col justify-center items-center'>
                    <div className='text-2xl font-semibold mb-10'>Update Order Status</div>

                    <Select
                        className='sm:w-2/3 w-full'
                        dropdownPosition='bottom'
                        placeholder="Pick one"
                        data={[
                            { value: 'Pending', label: 'Pending' },
                            { value: 'In Progress', label: 'In Progress' },
                            { value: 'Half Completed', label: 'Half Completed' },
                            { value: 'Completed', label: 'Completed' },
                        ]}
                        clearable
                        value={status}
                        onChange={(value) => setStatus(value)}
                    />

                    <div className='sm:w-2/3 w-full mt-5 flex justify-evenly'>
                        <Btn style="bg-red-500" onClick={close}>Cancel</Btn>
                        <Btn style="bg-blue-500" onClick={statusUpdate}>Save</Btn>
                    </div>
                </div>
            </Modal>

            <Modal opened={detailsOpen} onClose={() => setDetailsOpen(false)} centered withCloseButton={false} size="xl">
                <OrderDetails orderId={orderId} />
            </Modal>
        </div>
    )
}