import { deleteDetails, getOrderDetails, updateDetails } from "@/API/add";
import { Table } from "@mantine/core";
import { useEffect, useState } from "react";
import Btn from "./components/Btn";
import CheckBoxList from "./components/CheckBoxList";
import { showNotification } from "@mantine/notifications";

export default ({ setLoader, orderId }) => {

    const [plans, setPlans] = useState([])
    const [desc, setDesc] = useState([])
    const [planName, setPlanName] = useState("Basic")
    const [detailId, setDetailId] = useState(null)
    const [change, setChange] = useState(0)

    useEffect(() => {
        getOrderDetails(orderId).then((res) => {
            if (res.data.length === 0) return
            // setDesc(JSON.parse(res.data[0].Plan.description))
            setPlans(res.data)
        })
    }, [change])

    const onClick = (name, item, id) => {
        setDetailId(id)
        setPlanName(name)
        setDesc(JSON.parse(item));
    }

    const handleUpdate = (updatedData) => {
        // Handle updated data, you can use this in your state management or API calls.
        // console.log(updatedData, ">>> ID ", detailId);
        setLoader(true)
        updateDetails(detailId, { description: JSON.stringify(updatedData) }).then((res) => {
            console.log(res)
            setLoader(false)
            showNotification({
                title: 'Success',
                message: 'Status Updated Successfully',
                color: 'teal',
                autoClose: 3000,
            });
        }).catch((err) => {
            console.log(err)
            setLoader(false)
        })
    };

    const deleteDetail = (id) => {
        setLoader(true)

        deleteDetails(id).then((res) => {
            console.log(res)
            setChange(change + 1)
            setLoader(false)
            showNotification({
                title: 'Success',
                message: 'Status Updated Successfully',
                color: 'teal',
                autoClose: 3000,
            });
        }).catch((err) => {
            console.log(err)
            showNotification({
                title: 'Error',
                message: 'Something went wrong',
                color: 'red',
                autoClose: 3000,
            });
            setLoader(false)
        })
    }

    const rows = plans?.map((item, i) => (
        <tr key={i} className={`${detailId && item.id === detailId ? "bg-green-200" : ""} `}>
            <td>{item.id}</td>
            <td>{item.Plan.name} Shopify Plan</td>
            <td>{item.Plan.price}</td>
            <td>{item.createdAt.substring(0, 10)}</td>
            <td>
                <Btn style="bg-blue-500" onClick={() => onClick(item.Plan.name, item.description, item.id)}>View</Btn>
            </td>
            <td>
                <Btn style="bg-red-500" onClick={() => deleteDetail(item.id)}>Delete</Btn>
            </td>
        </tr>
    ));

    return (
        <div className='w-full flex flex-col items-center'>
            <Table fontSize="xl" className="">
                <thead className="bg-blue-300">
                    <tr>
                        <th>ID</th>
                        <th>Plan Name</th>
                        <th>Amount</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>

            {desc.length > 0 && <div className="w-full flex justify-center mt-6">
                <CheckBoxList planName={planName} data={desc} onUpdate={handleUpdate} />
            </div>}
        </div>
    )
}