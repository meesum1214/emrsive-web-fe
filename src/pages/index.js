import { Inter } from 'next/font/google'
import { Input, Modal, Pagination, Select, Table } from '@mantine/core'
import { useEffect, useLayoutEffect, useState } from 'react';
import { deleteOrder, getAllOrder, updateOrderStatus } from '@/API/add';
import { useDisclosure } from '@mantine/hooks';
import Btn from '@/layout/components/Btn';
import OrderDetails from '@/layout/OrderDetails';
import LoaderSection from '@/layout/components/LoaderSection';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { AiOutlineSearch } from 'react-icons/ai'
import OrderTable from '@/layout/Screens/Order/OrderTable';
import { DatePicker, MonthPicker } from '@mantine/dates';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter()

  const [orders, setOrders] = useState([])
  const [loader, setLoader] = useState(true)
  const [count, setCount] = useState(false)
  const [paginationInfo, setPaginationInfo] = useState({
    value: "",
    page: 1,
    limit: 8,
  })

  const getAll = () => {
    getAllOrder(paginationInfo).then((res) => {
      // console.log(res)
      setOrders(res.data)
      setLoader(false)
    }).catch((err) => {
      showNotification({
        title: 'Error',
        message: err.response.data.message,
        color: 'red',
        autoClose: 3000,
      });
      console.log(err)
      setLoader(false)
    })
  }

  useLayoutEffect(() => {
    if (!localStorage.getItem("emrsive-token")) {
      router.push("/login")
    }
  }, [])

  useEffect(() => {
    getAll();
  }, [count])



  const logout = () => {
    setLoader(true)
    localStorage.removeItem("emrsive-token")
    localStorage.removeItem("emrsive-order")
    router.push("/login")
  }

  return (
    <>
      <LoaderSection state={loader} />

      <div className='flex justify-between px-10 pt-5'>
        <div className='text-4xl font-semibold'>Emrsive Admin Panel</div>
        <Btn style="bg-blue-500" onClick={logout}>Logout</Btn>
      </div>

      <main
        className={`flex min-h-screen flex-col items-center mt-4 ${inter.className}`}
      >
        <div className='max-w-[1000px] w-full'>

          <div className='w-full flex justify-between'>
            <div className='text-3xl font-semibold'>Orders</div>

            <div className='flex'>
              <MonthPicker onChange={(e) => {
                setPaginationInfo({ ...paginationInfo, value: `${e.getFullYear()}-${(e.getMonth() + 1) < 10 ? `0${e.getMonth() + 1}`: e.getMonth() + 1}` });
                setCount(!count)
              }} />
              <DatePicker onChange={(e) => {
                setPaginationInfo({ ...paginationInfo, value: `${e.getFullYear()}-${(e.getMonth() + 1) < 10 ? `0${e.getMonth() + 1}`: e.getMonth() + 1}-${e.getDate()}` });
                setCount(!count)
              }} />
              <Input
                placeholder="Search"
                icon={<AiOutlineSearch />}
                value={paginationInfo.value}
                onChange={(e) => {
                  setPaginationInfo({ ...paginationInfo, value: e.target.value });
                  setCount(!count)
                }}
                className='ml-2'
              />
            </div>
          </div>

          <OrderTable orders={orders} count={count} setCount={setCount} setLoader={setLoader} />

          <div className='flex justify-end w-full mt-8'>
            <Pagination
              value={paginationInfo.page}
              onChange={(page) => {
                setPaginationInfo({ ...paginationInfo, page });
                setCount(!count)
              }}
              total={10}
            />
          </div>

        </div>


      </main>
    </>
  )
}
