import Btn from "@/layout/components/Btn"
import { Select } from "@mantine/core"

export default ({ status, setStatus, close, statusUpdate }) => {
    return (
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
                <Btn style="bg-red-500" onClick={() => { close(); setStatus(null) }}>Cancel</Btn>
                <Btn style="bg-blue-500" onClick={() => { statusUpdate(); setStatus(null) }}>Save</Btn>
            </div>
        </div>
    )
}