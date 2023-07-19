import { Inter } from 'next/font/google'
import { Modal, Pagination, ScrollArea, Select, Table } from '@mantine/core'
import { useEffect, useState } from 'react';
import { getAllOrder, updateOrderStatus, updateStatus } from '@/API/add';
import { useDisclosure } from '@mantine/hooks';
import Btn from '@/layout/components/Btn';
import OrderDetails from '@/layout/OrderDetails';
import LoaderSection from '@/layout/components/LoaderSection';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [orders, setOrders] = useState([])
  const [orderId, setOrderId] = useState(null)
  const [status, setStatus] = useState(null)
  const [opened, { open, close }] = useDisclosure(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [loader, setLoader] = useState(true)

  const [count, setCount] = useState(0)

  const getAll = () => {
    getAllOrder().then((res) => {
      console.log(res)
      setOrders(res.data)
      setLoader(false)
    })
  }

  useEffect(() => {
    setTimeout(() => {
      getAll();
    }, 700);
  }, [count])

  const [activePage, setPage] = useState(1);

  const rows = orders.map((order, i) => (
    <tr key={i}>
      <td>{`${order.firstName} ${order.lastName}`}</td>
      <td>{order.companyName}</td>
      <td>{order.country}</td>
      <td>{order.address}</td>
      <td>{order.appartment}</td>
      <td>{order.city}</td>
      <td>{order.state}</td>
      <td>{order.zipCode}</td>
      <td>{order.phone}</td>
      <td>{order.additionalInfo}</td>
      <td>{`${order.user.firstName} ${order.user.lastName}`}</td>
      <td>
        <div
          className='bg-gray-300 w- h-10 rounded-full flex justify-center items-center font-semibold cursor-pointer hover:shadow-lg transition-all'
          onClick={() => { setOrderId(order.id); open() }}
        >{order.orderStatus}</div>
      </td>
      <td>
        <Btn
          onClick={() => { setOrderId(order.id); setDetailsOpen(true) }}
          style="bg-green-500 hover:bg-green-600"
        >More</Btn>
      </td>
    </tr>
  ));

  const statusUpdate = () => {
    setLoader(true)
    close()
    updateOrderStatus(orderId, status).then((res) => {
      console.log(res)
      setCount(count + 1)
    }).catch((err) => {
      console.log(err)
      setLoader(false)
    })
  }

  return (
    <>
      <LoaderSection state={loader} />

      <main
        className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
      >
        <div className='text-4xl font-semibold'>Emrsive Admin Panel</div>

        <ScrollArea className='mt-10 max-w-[1400px] w-full bg-gray-200' type='always'>
          <Table className='w-[2000px] mb-4' fontSize="xl">
            <thead className='bg-gray-400'>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Country</th>
                <th>Address</th>
                <th>Appartment</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Phone Number</th>
                <th>Additional Information</th>
                <th>User Name</th>
                <th>Order Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>

        <div className='flex justify-end w-full mt-8'>
          <Pagination value={activePage} onChange={setPage} total={10} />
        </div>




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


      </main>
    </>
  )
}
