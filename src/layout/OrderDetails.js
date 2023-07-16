import { getOrderDetails } from "@/API/add";
import { Modal, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import Btn from "./components/Btn";

export default ({ orderId }) => {

    const [plans, setPlans] = useState([])

    useEffect(() => {
        getOrderDetails(orderId).then((res) => {
            console.log(res)
            setPlans(res.data)
        })
    }, [])

    const rows = plans?.map((item, i) => (
        <tr key={i}>
            <td>{item.Plan.name}</td>
            <td>{item.Plan.price}</td>
            <td>{item.createdAt}</td>
            <td>
                <Btn style="bg-blue-400">{item.status}</Btn>
            </td>
        </tr>
    ));

    return (
        <div className='w-full flex flex-col items-center h-96'>
            <div className='text-2xl font-semibold mb-10'>Order Details</div>

            <Table fontSize="xl" className="">
                <thead>
                    <tr>
                        <th>Plan Name</th>
                        <th>Amount</th>
                        <th>Created Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>

            {/* <Modal opened={true} centered></Modal> */}
        </div>
    )
}