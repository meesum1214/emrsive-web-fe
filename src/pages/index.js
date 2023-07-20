import { Inter } from 'next/font/google'
import { Modal, Select, Table } from '@mantine/core'
import { useEffect, useLayoutEffect, useState } from 'react';
import { deleteOrder, getAllOrder, updateOrderStatus } from '@/API/add';
import { useDisclosure } from '@mantine/hooks';
import Btn from '@/layout/components/Btn';
import OrderDetails from '@/layout/OrderDetails';
import LoaderSection from '@/layout/components/LoaderSection';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [orders, setOrders] = useState([])
  const [orderId, setOrderId] = useState(null)
  const [status, setStatus] = useState(null)
  const [opened, { open, close }] = useDisclosure(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [loader, setLoader] = useState(true)

  const router = useRouter()

  const [count, setCount] = useState(0)

  const getAll = () => {
    getAllOrder().then((res) => {
      // console.log(res)
      setOrders(res.data)
      setLoader(false)
    })
  }

  useLayoutEffect(() => {
    if (!localStorage.getItem("emrsive-token")) {
      router.push("/login")
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      getAll();
    }, 700);
  }, [count])

  // const [activePage, setPage] = useState(1);

  const handleDeleteOrder = (id) => {
    setLoader(true)
    deleteOrder(id).then((res) => {
      console.log(res)
      setCount(count + 1)
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

  const rows = orders.map((order, i) => (
    <tr key={i}>
      <td>{order.id}</td>
      <td>{`${order.firstName} ${order.lastName}`}</td>
      <td>{order.createdAt.substring(0, 10)}</td>
      <td>
        <div
          className='bg-gray-300 h-7 rounded-full flex justify-center items-center font-semibold cursor-pointer hover:shadow-lg transition-all text-base'
          onClick={() => { setOrderId(order.id); open() }}
        >{order.orderStatus}</div>
      </td>
      <td>${order.orderPrice}</td>
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
      setCount(count + 1)
    }).catch((err) => {
      console.log(err)
      setLoader(false)
    })
  }

  const logout = () => {
    setLoader(true)
    localStorage.removeItem("emrsive-token")
    localStorage.removeItem("emrsive-order")
    router.push("/login")
  }

  return (
    <>
      <LoaderSection state={loader} />

      <div className='absolute top-5 right-5'>
        <Btn style="bg-blue-500" onClick={logout}>Logout</Btn>
      </div>

      <main
        className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
      >
        <div className='text-4xl font-semibold'>Emrsive Admin Panel</div>

        {/* <ScrollArea className='mt-10 max-w-[1400px] w-full bg-gray-200' type='always'> */}
        <Table className='mt-10 mb-4 max-w-[1000px] w-full' fontSize="xl">
          <thead className='bg-gray-400'>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Order Status</th>
              <th>Price</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        {/* </ScrollArea> */}

        {/* <div className='flex justify-end w-full mt-8'>
          <Pagination value={activePage} onChange={setPage} total={10} />
        </div> */}

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
