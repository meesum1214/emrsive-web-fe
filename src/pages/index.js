import LoaderSection from "@/layout/components/LoaderSection"
import Card from "../layout/Screens/Dashboard/Card"
import Header from "@/layout/components/Header"
import { useEffect, useState } from "react"
import { getAnalytics } from "@/API/add"
import { showNotification } from "@mantine/notifications"
import { Popover, Tooltip } from "@mantine/core"
import Btn from "@/layout/components/Btn"
import { DatePicker, MonthPicker } from "@mantine/dates"
import { AiOutlineClear } from "react-icons/ai"
import { useRouter } from "next/router"

export default () => {
  const router = useRouter()
  const [loader, setLoader] = useState(true)
  const [analytics, setAnalytics] = useState(null)
  const [time, setTime] = useState("Overall")
  const [date, setDate] = useState({
    start: "",
    end: "",
  })

  useEffect(() => {
    let token = localStorage.getItem("emrsive-token")
    if (!token) {
      router.push("/login")
    }

    getAnalytics(date.start, date.end).then((res) => {
      // console.log(res.data)
      setAnalytics(res.data)
      setLoader(false)
    }).catch((err) => {
      if (err.response.status !== 401) {
        console.log(err)
        showNotification({
          title: 'Error',
          message: err.response.data.message,
          color: 'red',
          autoClose: 5000,
        })
      }
      setLoader(false)
    })
  }, [date])

  return (
    <>
      <LoaderSection state={loader} />
      <Header setLoader={setLoader} />

      <div className="flex flex-col items-center mt-6 px-3">
        <div className='max-w-[1000px] w-full'>
          <div className='w-full flex justify-between'>
            <div className='text-3xl font-semibold'>Dashboard</div>

            <div className="flex">
              <Popover position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <div className='mr-2'>
                    <Btn style="bg-blue-500 w-24">Daily</Btn>
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <DatePicker
                    value={date.start}
                    onChange={(e) => {
                      setTime("Daily")
                      setLoader(true)
                      setDate({ ...date, start: e, end: e })
                    }}
                    placeholder="Select date"
                  />
                </Popover.Dropdown>
              </Popover>

              <Popover position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <div>
                    <Btn style="bg-blue-500 w-24">Monthly</Btn>
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <MonthPicker
                    value={date.start}
                    onChange={(e) => {
                      setTime("Monthly")
                      setLoader(true)
                      if (e.getMonth() === 1) {
                        setDate({ ...date, start: `${e.getFullYear()}-${e.getMonth() + 1}-01`, end: `${e.getFullYear()}-${e.getMonth() + 1}-28` })
                        return
                      }
                      if (e.getMonth() === 3 || e.getMonth() === 5 || e.getMonth() === 8 || e.getMonth() === 10) {
                        setDate({ ...date, start: `${e.getFullYear()}-${e.getMonth() + 1}-01`, end: `${e.getFullYear()}-${e.getMonth() + 1}-30` })
                        return
                      }
                      setDate({ ...date, start: `${e.getFullYear()}-${e.getMonth() + 1}-01`, end: `${e.getFullYear()}-${e.getMonth() + 1}-31` })
                    }}
                  />
                </Popover.Dropdown>
              </Popover>

              <Tooltip label="Clear Filters">
                <div>
                  <AiOutlineClear className='cursor-pointer' size={35} onClick={() => {
                    setLoader(true)
                    setDate({ start: "", end: "" })
                    setTime("Overall")
                  }} />
                </div>
              </Tooltip>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card title="Total Revenue" value={`$${analytics?.revenue}`} time={time} />
            <Card title="Total Sales" value={`#${analytics?.sales}`} time={time} />
            <Card title="Basic Plan Revenue" value={`$${analytics?.planRevenue == {} ? "0" : analytics?.planRevenue.Basic}`} time={time} />
            <Card title="Basic Plan Sales" value={`#${analytics?.planOrders.Basic}`} time={time} />
            <Card title="Standard Plan Revenue" value={`$${analytics?.planRevenue.Standard}`} time={time} />
            <Card title="Standard Plan Sales" value={`#${analytics?.planOrders.Standard}`} time={time} />
            <Card title="Premium Plan Revenue" value={`$${analytics?.planRevenue.Premium}`} time={time} />
            <Card title="Premium Plan Sales" value={`#${analytics?.planOrders.Premium}`} time={time} />
          </div>
        </div>
      </div>
    </>
  )
}