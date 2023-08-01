import { Inter } from 'next/font/google'
import { Input, Pagination, Popover, Select, Tooltip } from '@mantine/core'
import { useEffect, useState } from 'react';
import { getAllOrder, getByPlanId } from '@/API/add';
import Btn from '@/layout/components/Btn';
import LoaderSection from '@/layout/components/LoaderSection';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { AiOutlineClear, AiOutlineSearch } from 'react-icons/ai'
import OrderTable from '@/layout/Screens/Order/OrderTable';
import { DatePicker, MonthPicker } from '@mantine/dates';
import Header from '@/layout/components/Header';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter()

  const [orders, setOrders] = useState([])
  const [loader, setLoader] = useState(true)
  const [count, setCount] = useState(false)
  const [paginationInfo, setPaginationInfo] = useState({
    value: "",
    planId: null,
    page: 1,
    limit: 8,
    totalPages: 1,
  })

  const getAll = () => {
    let token = localStorage.getItem("emrsive-token")
    if (!token) {
      router.push("/login")
    }

    getAllOrder(paginationInfo).then((res) => {
      // console.log(res.data)
      setOrders(res.data)
      setPaginationInfo({ ...paginationInfo, totalPages: res.totalPages, planId: null })
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

  useEffect(() => {
    getAll();
  }, [count])

  const searchByPlan = (e) => {
    if (!e) {
      getAll();
      return;
    }
    getByPlanId({ ...paginationInfo, page: 1, planId: e }).then((res) => {
      setOrders(res.data)
      setPaginationInfo({ ...paginationInfo, totalPages: res.totalPages, page: 1, planId: e, value: "" })
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

  return (
    <>
      <LoaderSection state={loader} />

      <Header setLoader={setLoader} />

      <main
        className={`flex flex-col items-center mt-8 ${inter.className}`}
      >
        <div className='max-w-[1000px] w-full'>

          <div className='w-full flex justify-between'>
            <div className='text-3xl font-semibold'>Orders</div>

            <div className='flex'>

              <Select
                className='mr-2'
                dropdownPosition='bottom'
                placeholder="Search By Plan"
                data={[
                  { value: 1, label: 'Basic Shopify Plan' },
                  { value: 2, label: 'Standard Shopify Plan' },
                  { value: 3, label: 'Premium Shopify Plan' },
                ]}
                clearable
                value={paginationInfo.planId}
                onChange={searchByPlan}
              />

              <Popover position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <div className='mr-2'>
                    <Btn style="bg-blue-500 w-32">Select Date</Btn>
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <DatePicker
                    value={paginationInfo.value}
                    onChange={(e) => {
                      setPaginationInfo({ ...paginationInfo, page: 1, value: `${e.getFullYear()}-${(e.getMonth() + 1) < 10 ? `0${e.getMonth() + 1}` : e.getMonth() + 1}-${e.getDate()}` });
                      setCount(!count)
                    }}
                    placeholder="Select date"
                  />
                </Popover.Dropdown>
              </Popover>

              <Popover position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <div>
                    <Btn style="bg-blue-500 w-32">Select Month</Btn>
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <MonthPicker
                    value={paginationInfo.value}
                    onChange={(e) => {
                      setPaginationInfo({ ...paginationInfo, page: 1, value: `${e.getFullYear()}-${(e.getMonth() + 1) < 10 ? `0${e.getMonth() + 1}` : e.getMonth() + 1}` });
                      setCount(!count)
                    }}
                  />
                </Popover.Dropdown>
              </Popover>

              <Input
                placeholder="Search"
                icon={<AiOutlineSearch />}
                value={paginationInfo.value}
                onChange={(e) => {
                  setPaginationInfo({ ...paginationInfo, page: 1, value: e.target.value });
                  setCount(!count)
                }}
                className='ml-2'
              />


              <Tooltip label="Clear Filters">
                <div>
                  <AiOutlineClear className='cursor-pointer' size={35} onClick={() => {
                    setPaginationInfo({ ...paginationInfo, page: 1, value: "", planId: null });
                    setCount(!count)
                  }} />
                </div>
              </Tooltip>

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
              total={paginationInfo.totalPages}
            />
          </div>

        </div>


      </main>
    </>
  )
}
